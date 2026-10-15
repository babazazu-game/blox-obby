import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { block } from './world.ts';
import type { Physics } from './physics.ts';

/**
 * Детали ХАБА серии (стартовая площадь перед забегом): портал в мир, лавка,
 * сундук, доска с текстом. Только вид + зона срабатывания; что происходит
 * при входе — решает игра (колбэки).
 *
 * Зона срабатывания — ящик (Box3); игра каждый кадр спрашивает `inside(pos)`,
 * а «один раз на вход» обеспечивает `Trigger`: срабатывает при входе и снова
 * взводится только после выхода. Иначе магазин открывался бы каждый кадр,
 * пока игрок стоит на коврике.
 */

export class Trigger {
  private was = false;
  constructor(readonly box: THREE.Box3) {}
  /** true ровно в кадр входа. */
  enter(p: THREE.Vector3): boolean {
    const now = this.box.containsPoint(new THREE.Vector3(p.x, p.y + 0.5, p.z));
    const fired = now && !this.was;
    this.was = now;
    return fired;
  }
  reset(): void { this.was = true; }   // считать, что игрок уже внутри (после телепорта сюда)
}

/** Пометить неподвижные кубики группы — игра склеит их (mergeStatic): лавка и портал — по ~12 деталей. */
function markStatic(g: THREE.Object3D, skip: THREE.Object3D[] = []): void {
  g.traverse((o) => { if ((o as THREE.Mesh).isMesh && !skip.includes(o) && !skip.includes(o.parent!)) o.userData.static = true; });
}

/** Надпись на холсте — для вывесок, табличек, доски. */
export function textSprite(lines: string[], opts: { w?: number; h?: number; bg?: string; fg?: string; font?: number } = {}): THREE.Sprite {
  const W = opts.w ?? 512, H = opts.h ?? 128;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const g = c.getContext('2d')!;
  drawText(g, W, H, lines, opts);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t }));
  s.userData.canvas = c;
  s.userData.opts = opts;
  return s;
}

function drawText(g: CanvasRenderingContext2D, W: number, H: number, lines: string[], opts: { bg?: string; fg?: string; font?: number }): void {
  g.clearRect(0, 0, W, H);
  if (opts.bg !== 'none') { g.fillStyle = opts.bg ?? 'rgba(20,28,40,.85)'; g.beginPath(); g.roundRect(4, 4, W - 8, H - 8, 26); g.fill(); }
  g.fillStyle = opts.fg ?? '#fff';
  g.textAlign = 'center'; g.textBaseline = 'middle';
  // Кегль подбирается так, чтобы САМАЯ длинная строка влезла по ширине с полями:
  // длинные названия («ЛАВА 🔒 ЗАКРЫТО», «РЕКОРДЫ…») раньше вылезали за плашку.
  let fs = opts.font ?? Math.min(H / lines.length * 0.62, 72);
  g.font = `900 ${fs}px Rubik, Arial, sans-serif`;
  const widest = Math.max(...lines.map((l) => g.measureText(l).width));
  if (widest > W - 48) { fs *= (W - 48) / widest; g.font = `900 ${fs}px Rubik, Arial, sans-serif`; }
  // round-стыки: с острыми (miter) обводка букв давала «колючки» на углах (жалоба пользователя)
  g.lineJoin = 'round'; g.miterLimit = 2;
  g.lineWidth = fs * 0.14; g.strokeStyle = 'rgba(0,0,0,.45)';
  lines.forEach((l, i) => {
    const y = H / 2 + (i - (lines.length - 1) / 2) * fs * 1.15;
    g.strokeText(l, W / 2, y); g.fillText(l, W / 2, y);
  });
}

/** Перерисовать текст спрайта (доска рекордов). */
export function setSpriteText(s: THREE.Sprite, lines: string[]): void {
  const c = s.userData.canvas as HTMLCanvasElement;
  drawText(c.getContext('2d')!, c.width, c.height, lines, s.userData.opts);
  (s.material.map as THREE.CanvasTexture).needsUpdate = true;
}

/** Портал в мир: арка из блоков, крутящийся вихрь цвета мира, табличка. Закрытый — с решёткой и замком. */
export class Portal {
  readonly group = new THREE.Group();
  readonly trigger: Trigger;
  private swirl: THREE.Mesh;
  private bars: THREE.Group;
  private label: THREE.Sprite;
  private title: string;

  /** yaw — куда «смотрит» проём (по нему входят). */
  constructor(scene: THREE.Scene, physics: Physics, at: THREE.Vector3, yaw: number, color: number, name: string) {
    const g = this.group;
    for (const sx of [-2.6, 2.6]) {
      const p = block({ x: 1, y: 5, z: 1 }, 0x8e98a6); p.position.set(sx, 2.5, 0); g.add(p);
    }
    const top = block({ x: 6.2, y: 1, z: 1.2 }, color); top.position.set(0, 5.4, 0); g.add(top);
    // вихрь: диск с полосатой спиралью, крутится в update
    const c = document.createElement('canvas'); c.width = c.height = 256;
    const x = c.getContext('2d')!;
    const col = '#' + color.toString(16).padStart(6, '0');
    const gr = x.createRadialGradient(128, 128, 8, 128, 128, 128);
    gr.addColorStop(0, '#ffffff'); gr.addColorStop(0.35, col); gr.addColorStop(1, 'rgba(255,255,255,0.15)');
    x.fillStyle = gr; x.fillRect(0, 0, 256, 256);
    x.strokeStyle = 'rgba(255,255,255,.55)'; x.lineWidth = 10;
    for (let k = 0; k < 4; k++) { x.beginPath(); for (let a = 0; a < 6; a += 0.1) { const r = a * 20; x.lineTo(128 + Math.cos(a + k * Math.PI / 2) * r, 128 + Math.sin(a + k * Math.PI / 2) * r); } x.stroke(); }
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
    this.swirl = new THREE.Mesh(new THREE.CircleGeometry(2.1, 40), new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.9, side: THREE.DoubleSide, depthWrite: false }));
    this.swirl.position.set(0, 2.5, 0);
    g.add(this.swirl);
    // Решётка закрытого портала — 5 прутьев склеены в ОДНУ деталь (+ замок): по отдельности
    // это 6 вызовов отрисовки на портал, ×4 портала, ×2 с тенями.
    this.bars = new THREE.Group();
    const geos: THREE.BufferGeometry[] = [];
    for (let i = -2; i <= 2; i++) { const b = block({ x: 0.25, y: 4.6, z: 0.25 }, 0x5a5f6b); geos.push(b.geometry.clone().translate(i * 0.95, 2.4, 0.3)); }
    this.bars.add(new THREE.Mesh(mergeGeometries(geos), block({ x: 0.25, y: 4.6, z: 0.25 }, 0x5a5f6b).material));
    const lock = block({ x: 1.1, y: 1, z: 0.5 }, 0xf7c41c); lock.position.set(0, 2.6, 0.55); this.bars.add(lock);
    g.add(this.bars);
    this.title = name;
    this.label = textSprite([name], { w: 512, h: 200 });
    this.label.scale.set(5, 1.95, 1);
    this.label.position.set(0, 7, 0);
    g.add(this.label);
    g.position.copy(at);
    g.rotation.y = yaw;
    scene.add(g);
    g.updateMatrixWorld(true);
    // столбы — твёрдые, чтобы в портал входили через проём, а не сквозь колонну
    for (const ch of g.children.slice(0, 2)) physics.addMesh(ch);
    markStatic(g, [this.swirl, this.bars, ...this.bars.children]);
    const center = new THREE.Vector3(0, 2.5, 0).applyMatrix4(g.matrixWorld);
    this.trigger = new Trigger(new THREE.Box3().setFromCenterAndSize(center, new THREE.Vector3(4, 5, 4)));
  }

  /** Закрыт ли портал; sub — вторая строка таблички («Пройди ЛУГ», лучшее время…). */
  setLocked(locked: boolean, sub = ''): void {
    this.bars.visible = locked;
    (this.swirl.material as THREE.MeshBasicMaterial).opacity = locked ? 0.35 : 0.9;
    setSpriteText(this.label, sub ? [this.title, sub] : [this.title]);
  }

  update(t: number): void { this.swirl.rotation.z = -t * 1.6; }
}

/** Лавка: прилавок, полосатый навес, вывеска и плита-«коврик» — встал на неё, открылся магазин. */
export class Stall {
  readonly group = new THREE.Group();
  readonly trigger: Trigger;

  constructor(scene: THREE.Scene, physics: Physics, at: THREE.Vector3, yaw: number, color: number, title: string, icon: string) {
    const g = this.group;
    const counter = block({ x: 4, y: 1.2, z: 1.4 }, 0xc8874a); counter.position.set(0, 0.6, -1); g.add(counter);
    for (const sx of [-1.9, 1.9]) { const p = block({ x: 0.25, y: 3.4, z: 0.25 }, 0xffffff); p.position.set(sx, 1.7, -1.4); g.add(p); }
    // навес полосами: цвет лавки и белый — по-ярмарочному
    for (let i = 0; i < 6; i++) {
      const st = block({ x: 0.7, y: 0.25, z: 2.2 }, i % 2 ? 0xffffff : color);
      st.position.set(-1.75 + i * 0.7, 3.45, -0.9); st.rotation.x = 0.25; g.add(st);
    }
    const sign = textSprite([`${icon} ${title}`], { w: 512, h: 128, bg: '#' + color.toString(16).padStart(6, '0') });
    sign.scale.set(4.2, 1.05, 1); sign.position.set(0, 4.5, -1); g.add(sign);
    const mat = block({ x: 3, y: 0.12, z: 2 }, color); mat.position.set(0, 0.06, 1); g.add(mat);
    g.position.copy(at); g.rotation.y = yaw;
    scene.add(g);
    g.updateMatrixWorld(true);
    physics.addMesh(counter);
    markStatic(g);
    const c = new THREE.Vector3(0, 0.5, 1).applyMatrix4(g.matrixWorld);
    this.trigger = new Trigger(new THREE.Box3().setFromCenterAndSize(c, new THREE.Vector3(3, 2.5, 3)));
  }
}

/** Сундук дня: открывается раз в сутки, крышка подпрыгивает. */
export class Chest {
  readonly group = new THREE.Group();
  readonly trigger: Trigger;
  private lid: THREE.Mesh;
  private open = 0;

  constructor(scene: THREE.Scene, physics: Physics, at: THREE.Vector3) {
    const g = this.group;
    const body = block({ x: 2, y: 1.2, z: 1.4 }, 0x9a5a28); body.position.y = 0.6; g.add(body);
    this.lid = block({ x: 2.1, y: 0.5, z: 1.5 }, 0xc8874a); this.lid.position.y = 1.45; g.add(this.lid);
    for (const sx of [-0.7, 0.7]) { const b = block({ x: 0.2, y: 1.75, z: 1.55 }, 0xf7c41c); b.position.set(sx, 0.88, 0); g.add(b); }
    const lock = block({ x: 0.4, y: 0.45, z: 0.2 }, 0xf7c41c); lock.position.set(0, 1.15, 0.75); g.add(lock);
    g.position.copy(at); scene.add(g);
    g.updateMatrixWorld(true);
    physics.addMesh(body);
    this.trigger = new Trigger(new THREE.Box3().setFromCenterAndSize(at.clone().add(new THREE.Vector3(0, 1, 0)), new THREE.Vector3(3.6, 3, 3.6)));
  }

  /** Показать открытие (крышка откидывается и закрывается). */
  pop(): void { this.open = 1.2; }

  update(dt: number, ready: boolean, t: number): void {
    this.open = Math.max(0, this.open - dt);
    this.lid.rotation.x = -Math.sin(Math.min(1, this.open) * Math.PI) * 1.1;
    this.lid.position.z = this.lid.rotation.x * 0.3;
    // готовый сундук подпрыгивает — зовёт подойти
    this.group.position.y = ready ? Math.abs(Math.sin(t * 3)) * 0.15 : 0;
  }
}
