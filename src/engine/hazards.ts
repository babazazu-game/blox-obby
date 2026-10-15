import * as THREE from 'three';
import { BODY, type Physics, type Solid } from './physics.ts';
import type { Controller } from './controller.ts';
import type { PartDef } from './level.ts';
import { lavaTexture, iceTexture, bounceTexture, stripeTexture, conveyorTexture, doorTexture, tileTexture, fanTexture, sized } from './textures.ts';

/**
 * Опасности и «живые» блоки обби — общая часть серии (часть идей — из Fall Guys):
 *
 *  - lava      — коснулся → на чекпоинт (светится и «дышит»);
 *  - bounce    — батут: подбрасывает на ~6 м;
 *  - vanish    — лёд: исчезает через полсекунды после того, как на него встали, возвращается через 3 с;
 *  - spinner   — вращающаяся балка: НЕ твёрдая, задела — на чекпоинт;
 *  - conveyor  — лента: сносит стоящего (`push`);
 *  - door      — дверь в стене дверей; `fake: true` — ломается от касания, остальные — стена;
 *  - tile      — плита тайной тропы; `fake: true` — проваливается, когда на неё встали;
 *  - bumper    — шар-бампер: НЕ твёрдый, отбрасывает (часто с `move` — маятник/каток);
 *  - turntable — карусель: крутит стоящего вокруг центра (`spin`);
 *  - fan       — вентилятор: зона, где дует ветер (`push`, вверх — подъём);
 *  - move      — любой блок ездит туда-обратно и возит стоящего (`Solid.delta`).
 *
 * `tick()` двигает и анимирует всё раз в кадр; `affect()` применяет эффекты к
 * КОНКРЕТНОМУ ходоку — и к игроку, и к ботам (они тоже ломают двери и отлетают
 * от бамперов, иначе бот «сквозь бампер» сразу выдаёт, что он бот).
 */

export const BOUNCE_V = 21;
const VANISH_DELAY = 0.5;
const VANISH_BACK = 3;
const FAKE_DELAY = 0.12;
/** Через сколько сломанная дверь/провалившаяся плита возвращается. 6 с — бот за
 *  товарищем не успевал пробежать в пролом двойной стены дверей. */
const RESTORE = 12;

interface Item {
  def: PartDef;
  mesh: THREE.Mesh;
  solid: Solid | null;
  base: THREE.Vector3;
  t: number;
  /** vanish/tile: сколько стоят / сколько уже нет */
  touchT: number;
  goneT: number;
  /** door/tile: сломан (провалился) */
  broken: boolean;
}

export type HazardEvent = 'kill' | 'bounce' | 'bump' | 'break' | null;

export class Hazards {
  private items: Item[] = [];
  private time = 0;
  private lavaMats: THREE.MeshStandardMaterial[] = [];
  private belts: { tex: THREE.Texture; speed: number; sign: number }[] = [];
  private fans: THREE.Texture[] = [];
  private lavaTex = lavaTexture();
  private tex = { ice: iceTexture(), bounce: bounceTexture(), stripe: stripeTexture(), tile: tileTexture() };
  /** Пауза между ударами бампера по одному ходоку — иначе он «прилипает» к шару. */
  private bumpCd = new WeakMap<Controller, number>();

  constructor(private physics: Physics) {}

  /** Вызывает buildLevel для каждого блока с kind/move. ang — поворот трассы. */
  register(def: PartDef, mesh: THREE.Mesh, solid: Solid | null, ang = 0): void {
    const [w, h, d] = def.s;
    void ang;
    switch (def.kind) {
      case 'lava': {
        // Карта и свечение — одна и та же текстура: жёлтые жилы светятся, корка тёмная.
        const t = sized(this.lavaTex, w, d, 3);
        const m = new THREE.MeshStandardMaterial({ map: t, emissiveMap: t, emissive: 0xffffff, emissiveIntensity: 0.9, roughness: 0.7 });
        this.lavaMats.push(m); mesh.material = m;
        break;
      }
      case 'vanish': mesh.material = new THREE.MeshStandardMaterial({ map: sized(this.tex.ice, w, d), roughness: 0.15, metalness: 0.05 }); break;
      case 'bounce': mesh.material = new THREE.MeshStandardMaterial({ map: sized(this.tex.bounce, w, d), roughness: 0.35 }); break;
      case 'conveyor': {
        // Стрелки бегут по направлению сноса — ребёнок видит, куда тянет, ещё до того, как встал.
        const t = conveyorTexture();
        const along = Math.abs(def.push?.[0] ?? 0) > Math.abs(def.push?.[2] ?? 0);
        t.repeat.set(Math.max(1, Math.round((along ? w : d) / 2)), Math.max(1, Math.round((along ? d : w) / 2)));
        t.rotation = along ? Math.PI / 2 : 0;
        t.center.set(0.5, 0.5);
        mesh.material = new THREE.MeshStandardMaterial({ map: t, roughness: 0.6 });
        this.belts.push({ tex: t, speed: Math.hypot(...(def.push ?? [0, 0, 0])) / 2, sign: Math.sign((def.push?.[2] ?? 0) + (def.push?.[0] ?? 0)) });
        break;
      }
      case 'spinner': {
        const t = this.tex.stripe.clone(); t.repeat.set(Math.round(w / 1.2), 1); t.needsUpdate = true;
        mesh.material = new THREE.MeshStandardMaterial({ map: t, roughness: 0.3 });
        mesh.castShadow = true;
        break;
      }
      case 'door': {
        // Все двери выглядят ОДИНАКОВО — в этом игра: какая ложная, видно только ударом.
        mesh.material = new THREE.MeshStandardMaterial({ map: doorTexture(def.c ?? 0xff6fb5), roughness: 0.5 });
        break;
      }
      case 'tile': mesh.material = new THREE.MeshStandardMaterial({ map: sized(this.tex.tile, w, d), roughness: 0.4 }); break;
      case 'bumper': {
        // Шар вместо ящика: круглое «отбрасывает» читается сразу, ящик — нет.
        mesh.geometry = new THREE.SphereGeometry(w / 2, 24, 16);
        const t = this.tex.stripe.clone(); t.repeat.set(4, 2); t.needsUpdate = true;
        mesh.material = new THREE.MeshStandardMaterial({ map: t, color: def.c ?? 0xffffff, roughness: 0.3 });
        break;
      }
      case 'turntable': {
        mesh.geometry = new THREE.CylinderGeometry(w / 2, w / 2, h, 40);
        const t = this.tex.stripe.clone(); t.repeat.set(8, 1); t.needsUpdate = true;
        mesh.material = [new THREE.MeshStandardMaterial({ map: t, roughness: 0.4 }), new THREE.MeshStandardMaterial({ color: def.c ?? 0xf7c41c, roughness: 0.45 }), new THREE.MeshStandardMaterial({ color: def.c ?? 0xf7c41c })];
        break;
      }
      case 'fan': {
        // Столб ветра: полупрозрачный, полосы бегут по направлению потока.
        const t = fanTexture();
        mesh.material = new THREE.MeshBasicMaterial({ map: t, transparent: true, opacity: 0.35, depthWrite: false, side: THREE.DoubleSide });
        mesh.castShadow = false;
        this.fans.push(t);
        break;
      }
    }
    this.items.push({ def, mesh, solid, base: mesh.position.clone(), t: 0, touchT: 0, goneT: 0, broken: false });
  }

  /** Раз в кадр: движение, анимации, восстановление сломанного. Вызывать ДО affect(). */
  tick(dt: number): void {
    this.time += dt;
    for (const b of this.belts) b.tex.offset.y = -this.time * b.speed * b.sign;
    for (const t of this.fans) t.offset.y = -this.time * 1.5;
    // Лава «течёт»: текстура медленно ползёт, свечение дышит — видно издалека, что это не пол.
    for (const m of this.lavaMats) {
      m.map!.offset.set(this.time * 0.05, Math.sin(this.time * 0.4) * 0.08);
      m.emissiveIntensity = 0.75 + Math.sin(this.time * 2.6) * 0.25;
    }
    for (const it of this.items) {
      const d = it.def;
      // езда туда-обратно: плавно (косинус), без рывка на концах
      if (d.move) {
        const k = (1 - Math.cos((this.time / d.move.t) * Math.PI * 2)) / 2;
        const np = it.base.clone().add(new THREE.Vector3(...d.move.d).multiplyScalar(k));
        const delta = np.clone().sub(it.mesh.position);
        it.mesh.position.copy(np);
        if (it.solid) { it.solid.box.translate(delta); it.solid.delta = delta; }
      }
      switch (d.kind) {
        case 'bounce':
          it.t = Math.max(0, it.t - dt);
          it.mesh.scale.y = 1 - Math.sin((it.t / 0.35) * Math.PI) * 0.35;
          break;
        case 'spinner': it.mesh.rotation.y = this.time * (d.spin ?? 1.5); break;
        case 'turntable': it.mesh.rotation.y += (d.spin ?? 0.8) * dt; break;
        case 'bumper': it.mesh.rotation.x += dt * 2; break;
        case 'vanish': {
          const m = it.mesh.material as THREE.MeshStandardMaterial;
          if (it.goneT > 0) {
            it.goneT -= dt;
            if (it.goneT <= 0) { it.solid = this.physics.addMesh(it.mesh, 'vanish'); it.mesh.visible = true; m.opacity = 1; m.transparent = false; it.touchT = 0; }
          } else {
            if (it.touchT > 0) it.touchT += dt;
            m.transparent = it.touchT > 0;
            m.opacity = it.touchT > 0 ? 0.55 + Math.cos(it.touchT * 30) * 0.3 : 1;   // мигает: сейчас исчезну
            if (it.touchT >= VANISH_DELAY && it.solid) { this.physics.remove(it.solid); it.solid = null; it.mesh.visible = false; it.goneT = VANISH_BACK; }
          }
          break;
        }
        case 'tile':
        case 'door': {
          if (it.broken) {
            // ложная плита падает вниз, ложная дверь просто пропала; через RESTORE с — на месте
            if (d.kind === 'tile' && it.mesh.visible) { it.mesh.position.y -= dt * 12; if (it.mesh.position.y < it.base.y - 15) it.mesh.visible = false; }
            it.goneT -= dt;
            if (it.goneT <= 0) this.restore(it);
          } else if (it.touchT > 0) {
            it.touchT += dt;
            if (it.touchT >= FAKE_DELAY) this.breakItem(it);
          }
          break;
        }
      }
    }
  }

  private breakItem(it: Item): void {
    it.broken = true; it.goneT = RESTORE; it.touchT = 0;
    if (it.solid) { this.physics.remove(it.solid); it.solid = null; }
    if (it.def.kind === 'door') it.mesh.visible = false;
  }

  private restore(it: Item): void {
    it.broken = false;
    it.mesh.position.copy(it.base);
    it.mesh.visible = true;
    it.solid = this.physics.addMesh(it.mesh, it.def.kind);
  }

  /** Вернуть всё сломанное (новый забег). */
  resetAll(): void { for (const it of this.items) if (it.broken) this.restore(it); }

  /**
   * Эффекты для одного ходока (игрок или бот). Вызывать ДО его ctl.update():
   * в этом же кадре он уже едет, подброшен, отброшен.
   */
  affect(ctl: Controller, dt: number): HazardEvent {
    let ev: HazardEvent = null;
    const cd = Math.max(0, (this.bumpCd.get(ctl) ?? 0) - dt);
    this.bumpCd.set(ctl, cd);
    for (const it of this.items) {
      const d = it.def;
      const onIt = it.solid !== null && ctl.ground === it.solid;
      switch (d.kind) {
        case 'conveyor': if (onIt && d.push) ctl.pos.add(new THREE.Vector3(...d.push).multiplyScalar(dt)); break;
        case 'lava': if (onIt || (it.solid && ctl.touched.includes(it.solid))) ev = 'kill'; break;
        case 'bounce':
          if (onIt && ctl.vel.y <= 0.01) { ctl.vel.y = BOUNCE_V; ctl.grounded = false; it.t = 0.35; ev = ev ?? 'bounce'; }
          break;
        case 'vanish': if (onIt && it.touchT === 0 && it.goneT <= 0) it.touchT = 0.0001; break;
        case 'spinner': if (this.hitsSpinner(it, ctl.pos)) ev = 'kill'; break;
        case 'door':
          if (d.fake && !it.broken && it.solid && (onIt || ctl.touched.includes(it.solid))) { this.breakItem(it); ev = ev ?? 'break'; }
          break;
        case 'tile':
          if (d.fake && !it.broken && onIt && it.touchT === 0) it.touchT = 0.0001;
          break;
        case 'turntable':
          if (onIt) {
            // крутим стоящего вокруг центра карусели вместе с ней
            const a = (d.spin ?? 0.8) * dt, c = it.mesh.position;
            const x = ctl.pos.x - c.x, z = ctl.pos.z - c.z;
            ctl.pos.x = c.x + x * Math.cos(a) + z * Math.sin(a);
            ctl.pos.z = c.z - x * Math.sin(a) + z * Math.cos(a);
          }
          break;
        case 'fan': {
          const half = new THREE.Vector3(...d.s).multiplyScalar(0.5);
          const c = it.mesh.position, p = ctl.pos;
          const inside = Math.abs(p.x - c.x) < half.x && Math.abs(p.z - c.z) < half.z && p.y + 1 > c.y - half.y && p.y < c.y + half.y;
          if (inside && d.push) {
            ctl.pos.x += d.push[0] * dt; ctl.pos.z += d.push[2] * dt;
            if (d.push[1] > 0) { ctl.vel.y = Math.max(ctl.vel.y, d.push[1]); ctl.grounded = false; }
          }
          break;
        }
        case 'bumper': {
          if (cd > 0) break;
          const r = d.s[0] / 2;
          const c = it.mesh.position;
          const body = ctl.pos.clone(); body.y += 1.2;
          const away = body.clone().sub(c);
          if (away.length() < r + 0.7) {
            away.y = 0;
            if (away.lengthSq() < 1e-4) away.set(1, 0, 0);
            away.normalize();
            ctl.vel.set(away.x * 13, 7, away.z * 13);
            ctl.grounded = false;
            this.bumpCd.set(ctl, 0.4);
            ev = ev ?? 'bump';
          }
          break;
        }
      }
    }
    return ev;
  }

  /** Есть ли балка-крутилка ближе r к точке (по расстоянию до отрезка балки) — боту пора прыгать. */
  spinnerNear(p: THREE.Vector3, r: number): boolean {
    for (const it of this.items) {
      if (it.def.kind !== 'spinner') continue;
      const local = p.clone().sub(it.mesh.position).applyAxisAngle(new THREE.Vector3(0, 1, 0), -it.mesh.rotation.y);
      if (Math.abs(local.y) > 2) continue;
      if (Math.abs(local.x) < it.def.s[0] / 2 && Math.abs(local.z) < r) return true;
    }
    return false;
  }

  /** Тело против повёрнутой балки: переводим ходока в её оси и сравниваем как AABB. */
  private hitsSpinner(it: Item, p: THREE.Vector3): boolean {
    const local = p.clone().sub(it.mesh.position).applyAxisAngle(new THREE.Vector3(0, 1, 0), -it.mesh.rotation.y);
    const [sx, sy, sz] = it.def.s;
    const r = BODY.halfW * 0.8;   // чуть прощаем: задел краем плеча — не считается
    return Math.abs(local.x) < sx / 2 + r && Math.abs(local.z) < sz / 2 + r && local.y < sy / 2 && local.y + BODY.height > -sy / 2;
  }
}
