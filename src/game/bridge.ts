import * as THREE from 'three';
import { block } from '../engine/world.ts';
import { woodTexture } from '../engine/textures.ts';
import { GRID } from '../engine/level.ts';
import { BODY, type Physics, type Solid } from '../engine/physics.ts';
import type { Controller } from '../engine/controller.ts';
import { tapSize, safeInsets } from 'yg-core';
import { L } from '../i18n.ts';

/**
 * Механика «Блок за блоком»: у игрока запас блоков на этап, он ставит их
 * по сетке перед собой, чтобы перебраться через пропасть или на стену.
 *
 * Куда встанет блок, показывает ПРИЗРАК — полупрозрачный ящик:
 *  - клетка — на шаг вперёд по направлению взгляда (взгляд округляется до
 *    одной из четырёх сторон: по диагонали на сетке ставить непонятно);
 *  - высота — вровень с тем, на чём стоишь (верх блока = уровень ног);
 *  - если клетка уже занята НАШИМ блоком — призрак встаёт на него сверху:
 *    так строится башенка, чтобы залезть на высокую стену.
 * Зелёный — можно, красный — нельзя (занято, нет блоков, внутри игрока).
 *
 * Клавиши: E — поставить, Q — убрать (блок под призраком или последний),
 * R — начать этап заново. На телефоне — кнопки над кнопкой прыжка.
 */

const SIZE = { x: GRID, y: 1, z: GRID };
const COLOR = 0xc8874a;
/** Блок моста — деревянный ящик: отличается от цветных платформ трассы с первого взгляда. */
export const WOOD = new THREE.MeshStandardMaterial({ map: woodTexture(), roughness: 0.75 });
/** Насколько игрок может заходить в клетку, куда ставят блок (его отодвинет). */
const NUDGE = 0.6;   // «деревянный» — отличается от цветных блоков трассы

export class Bridge {
  /** Сколько блоков ещё можно поставить на этом этапе. */
  left = 0;
  private placed: { mesh: THREE.Mesh; solid: Solid }[] = [];
  /** Все блоки за забег (и прошлых этапов) — чтобы новый забег начинался с чистой трассы. */
  private all: { mesh: THREE.Mesh; solid: Solid }[] = [];
  private ghost: THREE.Mesh;
  private ghostOk = false;
  private origin = new THREE.Vector3();
  private lastFloorY = 0;
  private dir = new THREE.Vector3(0, 0, -1);
  private keysDown = new Set<string>();
  private ui: HTMLDivElement;
  private counter: HTMLDivElement;
  onChange?: () => void;
  /** Игра вызывает при R: вернуть игрока на чекпоинт. */
  onReset?: () => void;

  constructor(private scene: THREE.Scene, private physics: Physics, private ctl: Controller, parent: HTMLElement) {
    this.ghost = new THREE.Mesh(
      new THREE.BoxGeometry(SIZE.x * 0.98, SIZE.y * 0.98, SIZE.z * 0.98),
      new THREE.MeshBasicMaterial({ color: 0x3ad15a, transparent: true, opacity: 0.38, depthWrite: false }),
    );
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(this.ghost.geometry), new THREE.LineBasicMaterial({ color: 0xffffff }));
    this.ghost.add(edges);
    scene.add(this.ghost);

    addEventListener('keydown', (e) => {
      if (this.keysDown.has(e.code)) return;   // автоповтор клавиши не ставит пачку блоков
      this.keysDown.add(e.code);
      if (e.code === 'KeyE' || e.code === 'Enter') this.place();
      else if (e.code === 'KeyQ') this.remove();
      else if (e.code === 'KeyR') this.reset();
    });
    addEventListener('keyup', (e) => this.keysDown.delete(e.code));

    // Кнопки и счётчик — DOM поверх холста.
    this.ui = document.createElement('div');
    this.ui.className = 'bridge-ui';
    this.counter = document.createElement('div');
    this.counter.className = 'bridge-count';
    const mk = (cls: string, label: string, fn: () => void) => {
      const b = document.createElement('button');
      b.className = 'bridge-btn ' + cls;
      b.innerHTML = label;
      // pointerdown, а не click: на телефоне click приходит с задержкой и иногда теряется при беге
      b.addEventListener('pointerdown', (e) => { e.preventDefault(); e.stopPropagation(); fn(); });
      b.addEventListener('touchstart', (e) => e.stopPropagation(), { passive: true });
      return b;
    };
    const btns = document.createElement('div');
    btns.className = 'bridge-btns';
    // Сверху вниз: «заново» (редкое и самое «опасное» — подальше от пальца), «вернуть», «поставить» — ближе всех к прыжку.
    btns.append(mk('reset', '⟲<span>R</span>', () => this.reset()), mk('take', '↩<span>Q</span>', () => this.remove()), mk('put', '🧱<span>E</span>', () => this.place()));
    this.ui.append(this.counter, btns);
    parent.appendChild(this.ui);
    injectCss();
    const lay = () => {
      const ins = safeInsets();
      const s = tapSize(Math.round(Math.min(innerWidth, innerHeight) * 0.13));
      btns.style.setProperty('--s', s + 'px');
      btns.style.right = ins.right + 12 + 'px';
      btns.style.bottom = ins.bottom + Math.round(Math.min(innerWidth, innerHeight) * 0.2) * 1.6 + 'px';
      // В ландшафте — в одну линию с плашкой этапа; в узком портрете там нет места
      // (плашка этапа и монеты занимают всю ширину) — строкой ниже, под полосой прогресса.
      const u = Math.min(innerHeight / 540, innerWidth / 400);
      this.counter.style.top = ins.top + Math.round(u * (innerWidth < innerHeight * 0.8 ? 84 : 12)) + 'px';
      this.counter.style.fontSize = Math.max(14, Math.round(u * 22)) + 'px';
    };
    lay();
    addEventListener('resize', lay);
  }

  /** Начало этапа: свой запас и своя сетка. Блоки прошлых этапов остаются — по ним уже прошли. */
  startStage(origin: THREE.Vector3, blocks: number): void {
    this.origin.copy(origin);
    this.placed = [];
    this.left = blocks;
    this.ui.style.display = blocks > 0 ? '' : 'none';
    this.refresh();
  }

  /** Сброс этапа: убрать все поставленные на нём блоки и вернуть запас. */
  reset(): void {
    for (const p of this.placed) { this.scene.remove(p.mesh); this.physics.remove(p.solid); this.left++; }
    this.all = this.all.filter((a) => !this.placed.includes(a));
    this.placed = [];
    this.refresh();
    this.onReset?.();
  }

  /** Спрятать счётчик и кнопки (меню открыто). */
  setVisible(on: boolean): void { this.ui.style.visibility = on ? '' : 'hidden'; this.ghost.visible = on; this.hidden = !on; }
  private hidden = false;

  clearAll(): void {
    for (const p of this.all) { this.scene.remove(p.mesh); this.physics.remove(p.solid); }
    this.all = []; this.placed = [];
  }

  /** Звук/эффект — игра подписывается. */
  onSound?: (n: 'place' | 'remove' | 'denied', at: THREE.Vector3) => void;

  place(): void {
    if (!this.ghostOk || this.left <= 0) { this.onSound?.('denied', this.ghost.position); return; }
    this.onSound?.('place', this.ghost.position);
    const push = this.bodyOverlap(this.ghost.position);
    if (push > 0) this.ctl.pos.addScaledVector(this.dir, -(push + 0.01));
    const m = block(SIZE, COLOR);
    m.material = WOOD;
    m.position.copy(this.ghost.position);
    this.scene.add(m);
    const rec = { mesh: m, solid: this.physics.addMesh(m, 'placed') };
    this.placed.push(rec);
    this.all.push(rec);
    this.left--;
    this.refresh();
  }

  remove(): void {
    if (!this.placed.length) return;
    // Сначала — блок в клетке призрака, иначе последний поставленный.
    let i = this.placed.findIndex((p) => Math.abs(p.mesh.position.x - this.ghost.position.x) < 0.1 && Math.abs(p.mesh.position.z - this.ghost.position.z) < 0.1);
    if (i < 0) i = this.placed.length - 1;
    const q = this.placed[i];
    // Нельзя выдернуть блок из-под себя — игрок провалится, и это читается как баг.
    if (this.ctl.ground === q.solid) return;
    this.onSound?.('remove', this.placed[i].mesh.position);
    this.scene.remove(q.mesh); this.physics.remove(q.solid);
    this.placed.splice(i, 1);
    this.all.splice(this.all.indexOf(q), 1);
    this.left++;
    this.refresh();
  }

  /** Каждый кадр: где призрак и можно ли туда ставить. */
  update(facing: number): void {
    this.ghost.visible = this.left > 0 && !this.hidden;
    if (this.ctl.grounded) this.lastFloorY = this.ctl.pos.y;
    // взгляд → одна из четырёх сторон
    const dx = Math.sin(facing), dz = Math.cos(facing);
    const dir = this.dir.set(0, 0, 0);
    if (Math.abs(dx) > Math.abs(dz)) dir.x = Math.sign(dx); else dir.z = Math.sign(dz);
    const o = this.origin;
    const snap = (v: number, base: number) => base + Math.round((v - base) / GRID) * GRID;
    // Клетка, на которой стоишь, плюс одна вперёд.
    const cx = snap(this.ctl.pos.x, o.x) + dir.x * GRID;
    const cz = snap(this.ctl.pos.z, o.z) + dir.z * GRID;
    let top = Math.round(this.lastFloorY - o.y) + o.y;
    // Клетка на уровне ног занята (пол впереди, свой блок) — ставим ВЫШЕ, на неё сверху:
    // так получается ступенька у стены и башенка. Раньше поднимались только над
    // своими блоками — и перед стеной, где впереди продолжается пол, ставить было
    // нельзя вовсе (жалоба пользователя на этапе 3). Выше +2 не лезем: туда
    // уже не запрыгнуть, а призрак на высоте сбивает с толку.
    this.ghostOk = false;
    for (let k = 0; k <= 2; k++) {
      this.ghost.position.set(cx, top + k - 0.5, cz);
      if (this.free(this.ghost.position)) { this.ghostOk = this.left > 0; break; }
    }
    (this.ghost.material as THREE.MeshBasicMaterial).color.setHex(this.ghostOk ? 0x3ad15a : 0xe8403a);
  }

  /** Насколько игрок заходит в клетку призрака по направлению взгляда (0 — не заходит). */
  private bodyOverlap(c: THREE.Vector3): number {
    const p = this.ctl.pos;
    const ox = Math.min(p.x + BODY.halfW, c.x + SIZE.x / 2) - Math.max(p.x - BODY.halfW, c.x - SIZE.x / 2);
    const oz = Math.min(p.z + BODY.halfW, c.z + SIZE.z / 2) - Math.max(p.z - BODY.halfW, c.z - SIZE.z / 2);
    const oy = Math.min(p.y + BODY.height, c.y + 0.5) - Math.max(p.y + 0.02, c.y - 0.5);
    if (ox <= 0 || oz <= 0 || oy <= 0) return 0;
    return Math.min(ox, oz);
  }

  /*
   * Можно ли ставить в клетку. Игрок, стоящий на границе клеток, краем тела
   * задевает клетку впереди — так стоит почти любой ребёнок, подбежав к стене.
   * Запрещать из-за этого нельзя (бот-проверка не могла пройти этапы со стенами),
   * поэтому небольшой заход (≤ NUDGE) разрешён: при установке игрока отодвинет назад.
   */
  private free(c: THREE.Vector3): boolean {
    const b = new THREE.Box3(new THREE.Vector3(c.x - SIZE.x / 2 + 0.02, c.y - 0.48, c.z - SIZE.z / 2 + 0.02), new THREE.Vector3(c.x + SIZE.x / 2 - 0.02, c.y + 0.48, c.z + SIZE.z / 2 - 0.02));
    if (this.bodyOverlap(c) > NUDGE) return false;
    return !this.physics.solids.some((s) => b.intersectsBox(s.box));
  }

  private refresh(): void {
    // Блоки кончились, а этап не пройден — ребёнок должен знать, что делать: подсказываем сброс.
    this.counter.innerHTML = this.left > 0 ? `🧱 × ${this.left}` : `🧱 × 0 <small>· ${L('не хватает? ⟲ R — заново', 'not enough? ⟲ R — reset')}</small>`;
    this.counter.classList.toggle('empty', this.left === 0);
    this.onChange?.();
  }
}

let cssDone = false;
function injectCss(): void {
  if (cssDone) return;
  cssDone = true;
  const s = document.createElement('style');
  s.textContent = `
.bridge-ui{position:absolute;inset:0;pointer-events:none;z-index:6;font-family:Arial,sans-serif}
.bridge-count{position:absolute;left:50%;transform:translateX(-50%);padding:6px 18px;border-radius:14px;background:#c8874a;color:#fff;font-family:Rubik,Arial,sans-serif;font-weight:900;font-size:22px;text-shadow:0 2px 0 #6b3e18;box-shadow:0 3px 0 #8a5528,0 6px 12px rgba(0,0,0,.2)}
.bridge-count small{font-size:15px;font-weight:700;opacity:.95}
.bridge-count.empty{background:#8e98a6;box-shadow:0 3px 0 #5c6470}
.bridge-btns{position:absolute;display:flex;flex-direction:column;gap:10px;pointer-events:auto}
.bridge-btn{width:var(--s);height:var(--s);border-radius:16px;border:3px solid rgba(255,255,255,.8);background:rgba(200,135,74,.85);color:#fff;font-size:calc(var(--s)*.42);display:flex;align-items:center;justify-content:center;position:relative;touch-action:none;cursor:pointer;box-shadow:0 4px 0 rgba(0,0,0,.25)}
.bridge-btn span{position:absolute;right:4px;bottom:2px;font-size:13px;font-weight:700;opacity:.85}
.bridge-btn.take{background:rgba(42,116,232,.85)}
.bridge-btn.reset{background:rgba(120,128,140,.85)}
.bridge-btn:active{transform:translateY(2px)}
`;
  document.head.appendChild(s);
}
