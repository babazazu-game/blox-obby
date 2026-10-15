import * as THREE from 'three';
import { Avatar, type AvatarLook, type Hair, type Face } from './avatar.ts';
import { Controller } from './controller.ts';
import { block } from './world.ts';
import { GRID, type BuiltStage } from './level.ts';
import type { Hazards } from './hazards.ts';
import type { Physics, Solid } from './physics.ts';

/**
 * Боты-«игроки»: создают ощущение онлайн-сервера Роблокса в одиночной игре.
 *
 * Бот идёт по `chain` этапа — опорам по порядку (чекпоинт → блоки → чекпоинт).
 * Для каждого перехода считает разрыв и подъём:
 *  - достаёт прыжком — разбегается и прыгает у края;
 *  - не достаёт — СТРОИТ свои блоки (мост или башенку), как игрок. Блоки бота
 *    твёрдые только для него (physics.move extra) — игрок не может ими
 *    воспользоваться и «решить» головоломку чужими руками.
 * Иногда ошибается (прыгает раньше) и падает — живые игроки тоже падают.
 * Застрял дольше STUCK — «прошёл, пока ты не видел»: переносится на следующий чекпоинт.
 *
 * Держатся рядом с игроком: обогнавший больше чем на AHEAD этапов ждёт
 * (стоит, крутит головой), отставший больше BEHIND — переносится поближе.
 */

const NICKS = ['Kirill_2014', 'pro_nastya', 'DimkaYT', 'SuperMax777', 'Lizka_kitty', 'Noob_Master', 'TimurPlay', 'sonya.bloxy', 'Artem_GG', 'xX_Egor_Xx', 'Vika_cute', 'MegaBuilder'];
const STUCK = 14;
/** Радиус «тела» для толкания (плечи R6 — 1 м в ширину). */
const PUSH_R = 0.45;
const STAGE_LIMIT = 25;
/** Насколько бот может убежать вперёд игрока (этапов), прежде чем ждать.
 *  Было 2 — боты всё время маячили впереди (жалоба пользователя); теперь максимум на этап. */
const AHEAD = 1;
const BEHIND = 3;
const JUMP_REACH = 4.0;   // с запасом от физического предела 4.6 — бот разбегается не идеально
const JUMP_UP = 2.0;

const SKINS = [0xf6d03a, 0xf1c7a0, 0xe0ac7e, 0x8d5a3b, 0xffdbb5];
const CLOTH = [0xe8403a, 0x2a74e8, 0x2fb04a, 0x9b59d0, 0xff7a2f, 0x161616, 0xff6fb5, 0x16a3a3, 0xf7c41c];
const HAIRS: Hair[] = ['short', 'spiky', 'long', 'cap', 'beanie', 'none'];
const FACES: Face[] = ['smile', 'grin', 'happy', 'cool'];
/*
 * Блок бота — «голограмма»: голубой, почти прозрачный, с белой обводкой, без тени.
 * Он твёрд только для бота. Сначала был просто полупрозрачный деревянный — игрок
 * принимал его за настоящий, прыгал и проваливался (жалоба пользователя), поэтому
 * теперь он не похож на блок игрока ничем и исчезает, как только бот по нему прошёл.
 */
export const BOT_MAT = new THREE.MeshStandardMaterial({ color: 0x8fd8ff, emissive: 0x3aa0ff, emissiveIntensity: 0.35, transparent: true, opacity: 0.22, depthWrite: false, roughness: 0.3 });
const BOT_EDGE = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 });
/** Через сколько секунд после того, как бот прошёл дальше, его блоки исчезают. */
const BLOCK_LINGER = 0.8;
const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];

export function randomLook(): AvatarLook {
  return { skin: pick(SKINS), shirt: pick(CLOTH), pants: pick(CLOTH), shoes: pick([0xffffff, 0x222222, 0xe8403a]), sleeve: pick([0, 0.35, 1]), hair: pick(HAIRS), hairColor: pick([0x3a2414, 0x161210, 0xc4561c, 0xe8c25a, 0x6b3b1f]), hat: pick(CLOTH), face: pick(FACES) };
}

/** Ник над головой: спрайт всегда смотрит в камеру, читается с любого ракурса. */
function nameTag(nick: string): THREE.Sprite {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 64;
  const g = c.getContext('2d')!;
  // кегль под ширину холста: длинный ник не обрезается по краям
  const fs = Math.min(34, 34 * 236 / Math.max(1, (g.font = 'bold 34px Arial, sans-serif', g.measureText(nick).width)));
  g.font = `bold ${fs}px Arial, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle';
  // round-стыки: с острыми (miter) обводка букв давала «колючки» на углах
  g.lineJoin = 'round'; g.miterLimit = 2;
  g.lineWidth = 7; g.strokeStyle = 'rgba(0,0,0,.65)'; g.strokeText(nick, 128, 34);
  g.fillStyle = '#ffffff'; g.fillText(nick, 128, 34);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, depthTest: false, transparent: true }));
  s.scale.set(2.4, 0.6, 1);
  s.position.y = 3.35;
  s.renderOrder = 10;
  return s;
}

class Bot {
  readonly avatar: Avatar;
  readonly ctl: Controller;
  stage = 0;
  private k = 0;                       // индекс текущей опоры в chain
  private blocks: { mesh: THREE.Mesh; solid: Solid; stage: number; dieAt: number; born: number }[] = [];
  private clock = 0;
  private builtFor = -1;               // для какого перехода уже построено
  private buildQueue: THREE.Vector3[] = [];
  private buildT = 0;
  private stuckT = 0;
  private waitT = Math.random() * 3;   // пауза на старте: все не срываются разом
  private sloppy = false;              // этот прыжок будет кривым
  private jump = false;
  /** Счётчики для отладки: сколько раз застрял и перенёсся, сколько раз упал. */
  teleports = 0; falls = 0;
  /** Своя скорость бега (доля от максимума): кто-то носится, кто-то бредёт. */
  // Темп разный: часть ботов заметно медленнее игрока и отстаёт — как в живом сервере.
  private pace = 0.55 + Math.random() * 0.4;
  /** Своя полоса по ширине платформы: толпа не идёт гуськом по центру и не закрывает дорогу. */
  private lane = (Math.random() < 0.5 ? -1 : 1) * (1.2 + Math.random() * 0.8);
  private pushT = 0;
  private stageT = 0;
  /** Колонка сетки для своего моста: −2 или +2 м от центра — центр (x = 0) остаётся игроку. */
  private col = Math.random() < 0.5 ? -GRID : GRID;

  /** Пустой список этапов — бот гуляет по хабу. */
  stages: BuiltStage[] = [];
  hub: { c: THREE.Vector3; r: number } | null = null;
  private wanderT = 0;
  private wanderTo = new THREE.Vector3();

  constructor(private scene: THREE.Scene, private physics: Physics, public readonly skill: number, nick: string, private hazards?: Hazards) {
    this.avatar = new Avatar(randomLook(), true);
    this.avatar.root.add(nameTag(nick));
    scene.add(this.avatar.root);
    this.ctl = new Controller(this.avatar, (p, v, dt) => physics.move(p, v, dt, this.blocks.map((b) => b.solid)));
  }

  placeAt(stage: number): void {
    this.stage = stage; this.k = 0; this.builtFor = -1; this.buildQueue = []; this.stuckT = 0; this.stageT = 0;
    const sp = this.stages[stage].spawn.clone();
    sp.x += (Math.random() - 0.5) * 3; sp.z += (Math.random() - 0.5) * 2;
    this.ctl.setSpawn(sp, this.stages[stage].yaw);
    this.ctl.respawn();
  }

  update(dt: number, playerStage: number): void {
    this.clock += dt;
    // Блок бота виден, только пока бот на нём стоит (и миг после установки — видно, что поставил).
    // Висящий «мост» манил игрока прыгнуть — и тот проваливался сквозь чужой блок.
    for (const b of this.blocks) b.mesh.visible = this.ctl.ground === b.solid || this.clock - b.born < 0.5;
    if (this.blocks.some((b) => b.dieAt <= this.clock)) this.clear(this.blocks.filter((b) => b.dieAt <= this.clock));
    if (!this.stages.length) { this.wander(dt); return; }
    const st = this.stages[this.stage];
    const chain = st.chain;
    // Слишком далеко от игрока — подтягиваем, слишком далеко впереди — ждём.
    if (this.stage < playerStage - BEHIND) this.placeAt(Math.max(0, playerStage - 1));
    const waiting = this.stage > playerStage + AHEAD || this.stage >= this.stages.length - 1 || this.waitT > 0;
    this.waitT -= dt;

    // Дошли до следующей опоры?
    const g = this.ctl.ground?.box;
    if (g) {
      const idx = chain.indexOf(g, this.k);
      if (idx > this.k) { this.k = idx; this.stuckT = 0; this.expireBlocks(); }
      if (this.k >= chain.length - 1) this.nextStage();
    }

    let move = { x: 0, y: 0 };
    const fwd = new THREE.Vector3(0, 0, -1);
    // Ждущий бот уходит к краю плиты чекпоинта, а не стоит посередине дороги.
    if (waiting && this.ctl.grounded) {
      this.jump = false;
      const o = st.origin;
      // к краю плиты ПОПЕРЁК трассы (трасса поворачивает — бок считаем от угла этапа)
      const side = this.lane >= 0 ? 2.3 : -2.3;
      const spot = new THREE.Vector3(o.x + Math.cos(st.yaw) * side, o.y, o.z - Math.sin(st.yaw) * side);
      const d = spot.sub(this.ctl.pos); d.y = 0;
      if (d.length() > 0.3) { fwd.copy(d.normalize()); move = { x: 0, y: 0.6 }; }
    }
    if (!waiting && this.k < chain.length - 1 && this.stage < this.stages.length - 1) {
      const cur = chain[this.k], next = chain[this.k + 1];
      const gk0 = this.ctl.ground?.kind;
      const gap = gapXZ(cur, next), up = next.max.y - cur.max.y;
      const tKey = this.stage * 100 + this.k;
      // Строят, только если на этапе вообще дают блоки: на лифте и батуте блоков нет — там своя механика.
      // с батута строить не надо — он сам подбросит (бот видел высокую плиту и строил башню)
      const onPad = this.physics.solids.some((sd) => sd.box === cur && sd.kind === 'bounce');
      const needBuild = !onPad && (st.def?.blocks ?? 0) > 0 && (gap > JUMP_REACH || up > JUMP_UP);
      if (needBuild && this.builtFor !== tKey && this.ctl.grounded && this.onBox(cur)) this.planBuild(cur, next, gap, up, tKey);

      // Куда бежать: к ближайшей точке следующей опоры (по x — к её середине).
      // По своей полосе — только по широким опорам и не над мостом (мост из блоков — 2 м в ширину, по центру).
      // Оси перехода: «вдоль» — куда бежим (x или z, трасса поворачивает), «поперёк» — другая.
      const { al, la } = axes(this.dirTo(cur, next));
      const wide = next.max[la] - next.min[la] >= 4 && !needBuild;
      const lat = (next.min[la] + next.max[la]) / 2 + (wide ? this.lane : this.colOff(cur, next));
      const target = new THREE.Vector3();
      target[la] = THREE.MathUtils.clamp(lat, next.min[la] + 0.6, next.max[la] - 0.6);
      target[al] = THREE.MathUtils.clamp(this.ctl.pos[al], next.min[al] + 0.8, next.max[al] - 0.8);
      target.y = next.max.y;
      if (this.buildQueue.length) {
        // строим: стоим у края текущей опоры и ставим по блоку
        const edge = this.edgePoint(cur, next);
        target.copy(edge);
        if (this.ctl.pos.distanceTo(edge) < 0.6) {
          this.buildT -= dt;
          if (this.buildT <= 0) { this.addBlock(this.buildQueue.shift()!); this.buildT = 0.45 + Math.random() * 0.3; }
          target.copy(this.ctl.pos);
        }
      }
      // Не допрыгнуть и строить нечем (лифт уехал) — ждём у края, пока подъедет.
      // Ждать имеет смысл только ЕДУЩУЮ опору (лифт); у неподвижной высокой плиты
      // (столб ветра рядом) ждать нечего — бот бежит вперёд, и ветер поднимет его сам.
      // движется следующая опора ИЛИ та, на которой стоим (едем на лифте — ждём, пока довезёт)
      const moving = (b: THREE.Box3) => this.physics.solids.some((sd) => sd.box === b && sd.delta && sd.delta.lengthSq() > 1e-8);
      const nextMoves = moving(next) || moving(cur);
      if (!needBuild && nextMoves && (gap > JUMP_REACH || up > JUMP_UP + 0.3) && gk0 !== 'bounce' && this.onBox(cur)) {
        const e = this.edgePoint(cur, next);
        target.copy(this.ctl.pos.distanceTo(e) > 0.5 ? e : this.ctl.pos);
      }
      const d = target.clone().sub(this.ctl.pos); d.y = 0;
      // на льду (исчезает через 0.5 с) медленный бот не успевает — там все бегут в полную силу
      const hurry = gk0 === 'vanish' || gk0 === 'tile';
      if (d.length() > 0.15) { fwd.copy(d.normalize()); move = { x: 0, y: hurry ? 1 : this.pace }; }

      // Прыжок: впереди нет опоры, или следующая выше и уже рядом.
      this.jump = false;
      if (this.ctl.grounded && !this.buildQueue.length && move.y) {
        const ahead = this.ctl.pos.clone().addScaledVector(fwd, this.sloppy ? 1.4 : 0.6);
        const nearNext = gapXZ(new THREE.Box3(this.ctl.pos.clone().subScalar(0.4), this.ctl.pos.clone().addScalar(0.4)), next) < 1.0;
        // крутилка рядом — перепрыгнуть балку (опасности теперь бьют и ботов)
        const bar = this.hazards?.spinnerNear(this.ctl.pos, 2.2) ?? false;
        if (bar || !this.supported(ahead) || this.blocked(fwd) || (nearNext && next.max.y - this.ctl.pos.y > 0.4)) {
          this.jump = true;
          this.sloppy = Math.random() > this.skill;   // следующий прыжок — кривой с шансом
        }
      }
      this.stuckT += dt;
      // Упёрся (настоящая дверь, стенка) — бежит, а скорости нет: через секунду
      // пробует другую полосу. Так бот «ищет» ложную дверь, как живой игрок.
      // и в прыжке тоже: у стены бот подпрыгивает («впереди препятствие»), и счёт «на земле» не шёл никогда
      if (move.y && Math.hypot(this.ctl.vel.x, this.ctl.vel.z) < 0.6) this.pushT += dt; else this.pushT = 0;
      if (this.pushT > 0.7) { this.lane = (Math.floor(Math.random() * 5) - 2) * 2; this.pushT = 0; }
      // общий лимит на этап: «дошёл до середины — упал» по кругу сбрасывает stuckT,
      // и бот мог крутиться на одном этапе вечно
      this.stageT += dt;
      if (this.stuckT > STUCK || this.stageT > STAGE_LIMIT) this.nextStage(true);
    }
    // Опасности действуют и на ботов: батут, лава, лента, бампер, двери, ветер.
    if (this.hazards?.affect(this.ctl, dt) === 'kill') { this.falls++; this.ctl.respawn(); }
    this.ctl.update(dt, move, this.jump, fwd);
    if (this.ctl.pos.y < this.ctl.spawn.y - 20) { this.falls++; this.ctl.respawn(); this.k = 0; this.builtFor = -1; this.buildQueue = []; }
  }

  /** Хаб: бродит между случайными точками площади, иногда стоит, иногда подпрыгивает. */
  private wander(dt: number): void {
    const h = this.hub!;
    this.wanderT -= dt;
    if (this.wanderT <= 0) {
      const a = Math.random() * Math.PI * 2, r = Math.random() * h.r;
      this.wanderTo.set(h.c.x + Math.cos(a) * r, h.c.y, h.c.z + Math.sin(a) * r);
      this.wanderT = 2 + Math.random() * 5;
    }
    const d = this.wanderTo.clone().sub(this.ctl.pos); d.y = 0;
    const go = d.length() > 0.6;
    const fwd = go ? d.normalize() : new THREE.Vector3(0, 0, -1);
    this.ctl.update(dt, { x: 0, y: go ? this.pace * 0.7 : 0 }, Math.random() < 0.004, fwd);
    if (this.ctl.pos.y < h.c.y - 15) this.toHub(h.c, h.r);
  }

  /** Поставить в хаб. */
  toHub(c: THREE.Vector3, r: number): void {
    this.stages = []; this.hub = { c, r };
    this.clear([...this.blocks]);
    const a = Math.random() * Math.PI * 2, d = 3 + Math.random() * (r - 3);
    this.ctl.setSpawn(new THREE.Vector3(c.x + Math.cos(a) * d, c.y + 0.01, c.z + Math.sin(a) * d), Math.random() * 6);
    this.ctl.respawn();
    this.wanderT = 0;
  }

  /** Пустить на трассу мира. */
  toCourse(stages: BuiltStage[]): void {
    this.clear([...this.blocks]);
    this.stages = stages;
    this.placeAt(0);
    // старт вразнобой: кто-то сразу, кто-то «зашёл позже» — до 12 с
    this.waitT = Math.random() < 0.5 ? Math.random() * 2 : 4 + Math.random() * 8;
  }

  private nextStage(teleport = false): void {
    // Свои блоки прошлого этапа убираем через пару секунд: не копим мусор на трассе.
    const old = this.blocks.filter((b) => b.stage === this.stage);
    this.expireBlocks();
    this.stage = Math.min(this.stage + 1, this.stages.length - 1);
    this.k = 0; this.builtFor = -1; this.buildQueue = []; this.stuckT = 0; this.stageT = 0;
    this.waitT = Math.random() < 0.4 ? 1 + Math.random() * 4 : 0;   // кто-то задерживается на чекпоинте
    this.ctl.setSpawn(this.stages[this.stage].spawn, this.stages[this.stage].yaw);
    if (teleport) { this.teleports++; this.clear(old); this.ctl.respawn(); }
  }

  /** Бот перешёл на следующую опору — все его блоки отслужили, скоро исчезнут. */
  private expireBlocks(): void {
    for (const b of this.blocks) if (b.dieAt === Infinity && !this.buildQueue.length) b.dieAt = this.clock + BLOCK_LINGER;
  }

  private clear(list: { mesh: THREE.Mesh; solid: Solid }[]): void {
    for (const b of list) { this.scene.remove(b.mesh); const i = this.blocks.indexOf(b as never); if (i >= 0) this.blocks.splice(i, 1); }
  }

  /** План стройки по тем же правилам, что у игрока: мост на уровне опоры или башенка у стены. */
  private planBuild(cur: THREE.Box3, next: THREE.Box3, gap: number, up: number, key: number): void {
    this.builtFor = key;
    const dir = this.dirTo(cur, next);
    const o = this.stages[this.stage].origin;
    const snap = (v: number, b: number) => b + Math.round((v - b) / GRID) * GRID;
    const edge = this.edgePoint(cur, next);
    const cx = snap(edge.x + dir.x * GRID * 0.6, o.x), cz = snap(edge.z + dir.z * GRID * 0.6, o.z);
    const q: THREE.Vector3[] = [];
    const { al, la } = axes(dir);
    if (up > JUMP_UP) {
      // башенка вплотную к стене: n блоков стопкой на уровне текущей опоры
      const n = Math.ceil(up - JUMP_UP);
      const b = new THREE.Vector3();
      b[la] = snap((next.min[la] + next.max[la]) / 2 + this.colOff(cur, next), o[la]);
      b[al] = dir[al] < 0 ? next.max[al] + GRID / 2 : next.min[al] - GRID / 2;
      for (let i = 0; i < n; i++) q.push(new THREE.Vector3(b.x, cur.max.y + 0.5 + i, b.z));
    } else {
      const n = Math.ceil((gap - JUMP_REACH) / GRID);
      for (let i = 0; i < n; i++) q.push(new THREE.Vector3(cx + dir.x * GRID * i, cur.max.y - 0.5, cz + dir.z * GRID * i));
    }
    this.buildQueue = q;
    this.buildT = 0.6;
  }

  private addBlock(c: THREE.Vector3): void {
    const m = block({ x: GRID, y: 1, z: GRID }, 0xd9a36a);
    // Полупрозрачный: блок бота твёрд только для него — игрок по нему не пройдёт,
    // и это должно быть видно, а не выглядеть как провал сквозь пол.
    m.material = BOT_MAT;
    m.castShadow = false;
    m.receiveShadow = false;
    m.add(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(GRID, 1, GRID)), BOT_EDGE));
    m.position.copy(c);
    this.scene.add(m);
    m.updateMatrixWorld();
    this.blocks.push({ mesh: m, solid: { box: new THREE.Box3().setFromObject(m), kind: 'bot' }, stage: this.stage, dieAt: Infinity, born: this.clock });
  }

  private dirTo(a: THREE.Box3, b: THREE.Box3): THREE.Vector3 {
    // Ось, по которой опоры РАЗНЕСЕНЫ (или стоят вплотную — пол и стена): по ней и бежим.
    // Раньше вплотную стоящие считались «не разнесёнными», и после поворота трассы
    // бот брал ось Z по умолчанию — строил башенку не у той стены.
    const e = 0.01;
    const sepX = b.min.x >= a.max.x - e || b.max.x <= a.min.x + e;
    const sepZ = b.min.z >= a.max.z - e || b.max.z <= a.min.z + e;
    const ca = a.getCenter(new THREE.Vector3()), cb = b.getCenter(new THREE.Vector3());
    const dx = cb.x - ca.x, dz = cb.z - ca.z;
    const useX = sepX && (!sepZ || Math.abs(dx) > Math.abs(dz));
    return useX ? new THREE.Vector3(Math.sign(dx), 0, 0) : new THREE.Vector3(0, 0, Math.sign(dz) || -1);
  }

  /** Смещение колонки стройки: только если обе опоры достаточно широки, чтобы мост встал сбоку. */
  private colOff(cur: THREE.Box3, next: THREE.Box3): number {
    const { la } = axes(this.dirTo(cur, next));
    return cur.max[la] - cur.min[la] >= 6 && next.max[la] - next.min[la] >= 6 ? this.col : 0;
  }

  /** Точка у края текущей опоры в сторону следующей — отсюда строят и прыгают. */
  private edgePoint(cur: THREE.Box3, next: THREE.Box3): THREE.Vector3 {
    const dir = this.dirTo(cur, next);
    const { al, la } = axes(dir);
    const p = new THREE.Vector3(0, cur.max.y, 0);
    p[la] = (cur.min[la] + cur.max[la]) / 2 + this.colOff(cur, next);
    p[al] = dir[al] < 0 ? cur.min[al] + 0.6 : cur.max[al] - 0.6;
    // у стены башенка стоит в клетке перед стеной — встаём на клетку раньше
    if (next.max.y - cur.max.y > JUMP_UP) p[al] -= dir[al] * GRID;
    return p;
  }

  /** Препятствие перед носом на уровне колен–пояса (своя башенка, ступенька) — надо прыгать. */
  private blocked(fwd: THREE.Vector3): boolean {
    const p = this.ctl.pos.clone().addScaledVector(fwd, 0.75);
    const probe = new THREE.Box3(new THREE.Vector3(p.x - 0.25, p.y + 0.4, p.z - 0.25), new THREE.Vector3(p.x + 0.25, p.y + 1.4, p.z + 0.25));
    return this.physics.solids.some((s) => probe.intersectsBox(s.box)) || this.blocks.some((b) => probe.intersectsBox(b.solid.box));
  }

  private onBox(b: THREE.Box3): boolean { return this.ctl.ground?.box === b; }

  private supported(p: THREE.Vector3): boolean {
    const probe = new THREE.Box3(new THREE.Vector3(p.x - 0.2, p.y - 0.6, p.z - 0.2), new THREE.Vector3(p.x + 0.2, p.y + 0.05, p.z + 0.2));
    return this.physics.solids.some((s) => probe.intersectsBox(s.box)) || this.blocks.some((b) => probe.intersectsBox(b.solid.box));
  }
}

/** Стоит ли точка (бот) близко к отрезку камера → голова игрока и ближе игрока к камере. */
function blocksView(p: THREE.Vector3, cam: THREE.Vector3, player: THREE.Vector3): boolean {
  const head = player.clone(); head.y += 1.6;
  const body = p.clone(); body.y += 1.3;
  const ab = head.clone().sub(cam), ap = body.clone().sub(cam);
  const t = ap.dot(ab) / ab.lengthSq();
  if (t <= 0.05 || t >= 0.95) return false;
  return ap.sub(ab.multiplyScalar(t)).length() < 1.3;
}

/** Оси перехода по направлению: al — вдоль бега, la — поперёк. */
function axes(dir: THREE.Vector3): { al: 'x' | 'z'; la: 'x' | 'z' } {
  return dir.x !== 0 ? { al: 'x', la: 'z' } : { al: 'z', la: 'x' };
}

function gapXZ(a: THREE.Box3, b: THREE.Box3): number {
  return Math.hypot(Math.max(0, b.min.x - a.max.x, a.min.x - b.max.x), Math.max(0, b.min.z - a.max.z, a.min.z - b.max.z));
}

export class Bots {
  readonly list: Bot[] = [];

  constructor(scene: THREE.Scene, physics: Physics, count = 6, hazards?: Hazards) {
    // Ники без повторов: два «TimurPlay» рядом сразу выдают ботов.
    const nicks = [...NICKS].sort(() => Math.random() - 0.5);
    for (let i = 0; i < count; i++) this.list.push(new Bot(scene, physics, 0.45 + Math.random() * 0.4, nicks[i % nicks.length], hazards));   // skill: меньше — чаще кривой прыжок и падение
  }

  /** Все боты — гулять по хабу (центр, радиус площади). */
  toHub(c: THREE.Vector3, r: number): void { for (const b of this.list) b.toHub(c, r); }
  /** Все боты — на трассу мира вместе с игроком. */
  toCourse(stages: BuiltStage[]): void { for (const b of this.list) b.toCourse(stages); }

  /**
   * Толкание: персонажи не проходят друг сквозь друга (жалоба пользователя), а
   * расталкиваются — каждый отходит на половину перекрытия и получает лёгкий
   * толчок скоростью. Цилиндры радиусом PUSH_R по горизонтали; по высоте — только
   * если стоят на одном уровне (на голову запрыгнуть можно).
   */
  private shove(movers: Controller[], dt: number): void {
    const R2 = PUSH_R * 2;
    for (let i = 0; i < movers.length; i++) for (let j = i + 1; j < movers.length; j++) {
      const a = movers[i], b = movers[j];
      if (Math.abs(a.pos.y - b.pos.y) > 2.2) continue;
      const dx = b.pos.x - a.pos.x, dz = b.pos.z - a.pos.z;
      const d = Math.hypot(dx, dz);
      if (d >= R2) continue;
      const nx = d > 1e-4 ? dx / d : 1, nz = d > 1e-4 ? dz / d : 0;
      const push = (R2 - d) / 2;
      a.pos.x -= nx * push; a.pos.z -= nz * push;
      b.pos.x += nx * push; b.pos.z += nz * push;
      // лёгкий отскок: толкнул бегущего — его чуть повело в сторону
      const k = Math.min(1, dt * 60) * 1.5;
      a.vel.x -= nx * k; a.vel.z -= nz * k;
      b.vel.x += nx * k; b.vel.z += nz * k;
    }
  }

  update(dt: number, playerStage: number, cam?: THREE.Vector3, player?: THREE.Vector3, playerCtl?: Controller): void {
    this.shove([...(playerCtl ? [playerCtl] : []), ...this.list.map((b) => b.ctl)], dt);
    for (const b of this.list) {
      b.update(dt, playerStage);
      // Бот между камерой и игроком закрывает дорогу — прячем его, пока он там
      // (так же Роблокс прячет то, во что упирается камера).
      if (cam && player) b.avatar.root.visible = !blocksView(b.ctl.pos, cam, player);
    }
  }
}
