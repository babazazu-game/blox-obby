import * as THREE from 'three';
import { block, mergeStatic } from './world.ts';
import type { Physics, Solid } from './physics.ts';
import type { Hazards } from './hazards.ts';

/**
 * Уровень обби из ДАННЫХ — общий формат серии.
 *
 * Уровень = цепочка этапов. Этап описан в своих локальных координатах:
 * начало — центр его чекпоинта (верх плиты на y = 0), бег — в сторону −Z.
 * Построитель сам ставит этапы друг за другом, стыкуя конец предыдущего
 * с началом следующего, поэтому этап можно вставить, убрать или
 * переставить, не пересчитывая чужие координаты.
 *
 * Новая игра серии пишет только данные (свой `levels.ts`), а не код.
 *
 * ПОВОРОТЫ: `turn` у этапа поворачивает ВСЕ следующие этапы на 90° (−1 — налево,
 * 1 — направо). Этапы по-прежнему описаны «вперёд по −Z», поворот делает
 * построитель: координаты и размеры частей крутятся на кратный 90° угол, поэтому
 * физика остаётся на ровных ящиках (AABB), а сетка 2 м — ровной.
 */

export type Vec3 = [number, number, number];

export interface PartDef {
  /** Размер ящика. */
  s: Vec3;
  /** Центр ящика в координатах этапа. */
  p: Vec3;
  c?: number;
  /** Тип: 'lava' | 'bounce' | 'vanish' | 'spinner' (см. hazards.ts) или свой — игра решает сама. */
  kind?: string;
  /** Езда туда-обратно: смещение d за полупериод, полный цикл t секунд. */
  move?: { d: Vec3; t: number };
  /** Для spinner — скорость вращения, рад/с. */
  spin?: number;
  /** Для conveyor/fan — куда и как быстро сносит (м/с), в координатах этапа. */
  push?: Vec3;
  /** Для door/tile: ложная (дверь ломается, плита проваливается). */
  fake?: boolean;
}

export interface StageDef {
  parts: PartDef[];
  /** Где кончается этап: сюда встанет чекпоинт следующего (по умолчанию — за последним блоком). */
  end?: Vec3;
  /** Запас блоков игрока на этот этап (механика моста; 0/нет — обычное обби). */
  blocks?: number;
  /** Подсказка на старте этапа (ключ локализации или текст). */
  hint?: string;
  /** false — не гонять этап через tools/level_check (движущиеся части счётчик не понимает). */
  check?: boolean;
  /** Поворот трассы ПОСЛЕ этого этапа: −1 налево, 1 направо. */
  turn?: -1 | 1;
}

export interface BuiltStage {
  index: number;
  checkpoint: Solid;
  pad: THREE.Mesh;
  /** Точка возрождения — над центром чекпоинта. */
  spawn: THREE.Vector3;
  /** Начало координат этапа (центр верха чекпоинта): от него считается сетка. */
  origin: THREE.Vector3;
  def?: StageDef;
  /** Опоры этапа по порядку прохождения: чекпоинт, блоки (без лавы/вертушек), чекпоинт следующего.
   *  По ним ходят боты-игроки (bots.ts). Ссылки на живые Box3 — ездящие платформы двигаются сами. */
  chain: THREE.Box3[];
  /** Куда смотреть на старте этапа (рад, как Controller.yaw): трасса может поворачивать. */
  yaw: number;
  /** Опоры без монеты над ними (плиты тайной тропы: монеты выдали бы настоящий путь). */
  noCoin: THREE.Box3[];
}

export interface BuildOpts {
  /** Где стоит первый чекпоинт трассы. */
  origin?: THREE.Vector3;
  /** Цвета блоков без своего цвета (палитра мира) — по кругу. */
  colors?: number[];
}

/** Поворот локальной точки этапа на угол a (кратный 90°) вокруг вертикали. */
function rot(x: number, z: number, a: number): [number, number] {
  const c = Math.round(Math.cos(a)), s = Math.round(Math.sin(a));
  return [x * c + z * s, -x * s + z * c];
}

/** Плита чекпоинта 6×6: края на нечётных координатах — ровно по сетке 2 м (см. GRID). */
const CP_SIZE: Vec3 = [6, 1, 6];
/** Шаг сетки серии: центры клеток на чётных координатах этапа, края — на нечётных. */
export const GRID = 2;
const CP_IDLE = 0x8e98a6;
export const CP_DONE = 0x3ad15a;

export function buildLevel(stages: StageDef[], scene: THREE.Scene, physics: Physics, hazards?: Hazards, opts: BuildOpts = {}): BuiltStage[] {
  const out: BuiltStage[] = [];
  /** Неподвижные блоки — в конце склеим по цвету (mergeStatic): меньше вызовов отрисовки. */
  const statics: THREE.Mesh[] = [];
  const at = (opts.origin ?? new THREE.Vector3()).clone();   // где стоит чекпоинт текущего этапа
  let ang = 0;                                                  // поворот трассы
  let ci = 0;
  stages.forEach((st, i) => {
    const cp = checkpoint(i, at.clone(), ang, scene, physics, statics);
    cp.def = st;
    out.push(cp);
    for (const d of st.parts) {
      const [px, pz] = rot(d.p[0], d.p[2], ang);
      const swap = Math.abs(Math.round(Math.sin(ang))) === 1;
      const sx = swap ? d.s[2] : d.s[0], sz = swap ? d.s[0] : d.s[2];
      const color = d.c ?? (opts.colors ? opts.colors[ci++ % opts.colors.length] : 0xe8403a);
      const m = block({ x: sx, y: d.s[1], z: sz }, color);
      m.position.set(at.x + px, at.y + d.p[1], at.z + pz);
      if (d.kind === 'spinner') m.rotation.y = ang;
      const ghost = d.kind === 'spinner' || d.kind === 'bumper' || d.kind === 'fan';
      scene.add(m);
      // Вертушка не твёрдая: она сбивает, а не держит — сталкиваться с ней физикой нельзя.
      const solid = ghost ? null : physics.addMesh(m, d.kind);
      const def = { ...d, move: d.move ? { ...d.move, d: rotV(d.move.d, ang) } : undefined, push: d.push ? rotV(d.push, ang) : undefined };
      if (hazards && (d.kind || d.move)) hazards.register(def, m, solid, ang);
      // опоры для ботов: не лава, не двери, не ложные плиты — боты идут по настоящей тропе
      if (solid && d.kind !== 'lava' && d.kind !== 'door' && !d.fake) cp.chain.push(solid.box);
      if (solid && d.kind === 'tile') cp.noCoin.push(solid.box);
      if (!d.kind && !d.move) statics.push(m);
    }
    const end = st.end ?? autoEnd(st);
    const [ex, ez] = rot(end[0], end[2], ang);
    at.add(new THREE.Vector3(ex, end[1], ez));
    // налево (−1): «вперёд» −Z становится −X, то есть поворот на +90°; направо — на −90°
    if (st.turn) ang += st.turn === -1 ? Math.PI / 2 : -Math.PI / 2;
  });
  // финиш — последний «чекпоинт» после всех этапов
  out.push(checkpoint(stages.length, at.clone(), ang, scene, physics, statics, 'finish'));
  for (let i = 0; i < stages.length; i++) out[i].chain.push(out[i + 1].checkpoint.box);
  mergeStatic(scene, statics);
  return out;
}

const rotV = (v: Vec3, a: number): Vec3 => { const [x, z] = rot(v[0], v[2], a); return [x, v[1], z]; };

/** Конец этапа по умолчанию: следующий чекпоинт ВПЛОТНУЮ за самым дальним блоком, на высоте его верха.
 *  Зазор в 2 м здесь был — в него падали, не ожидая лишней ямы после решённой головоломки. */
const NOT_SUPPORT = new Set(['lava', 'spinner', 'door', 'bumper', 'fan']);

function autoEnd(st: StageDef): Vec3 {
  // Лава и вертушки — не опоры: лава под трассой тянется до конца этапа, и чекпоинт
  // вставал на её уровень вплотную к ней — стоящий на нём сразу «горел» (нашли боты).
  const solid = st.parts.filter((d) => !NOT_SUPPORT.has(d.kind ?? '') && !d.fake);
  let far = solid[0];
  for (const d of solid) if (d.p[2] - d.s[2] / 2 < far.p[2] - far.s[2] / 2) far = d;
  return [far.p[0], far.p[1] + far.s[1] / 2, far.p[2] - far.s[2] / 2 - CP_SIZE[2] / 2];
}

function checkpoint(i: number, at: THREE.Vector3, ang: number, scene: THREE.Scene, physics: Physics, statics: THREE.Mesh[], kind = 'checkpoint'): BuiltStage {
  const pad = block({ x: CP_SIZE[0], y: CP_SIZE[1], z: CP_SIZE[2] }, kind === 'finish' ? 0xf7c41c : CP_IDLE);
  pad.position.set(at.x, at.y - CP_SIZE[1] / 2, at.z);
  // Материал у блоков общий на цвет — чекпоинту нужен свой, его перекрашиваем.
  pad.material = (pad.material as THREE.MeshStandardMaterial).clone();
  scene.add(pad);
  const solid = physics.addMesh(pad, kind);
  (solid as Solid & { stage?: number }).stage = i;
  // Табличка = номер этапа, который НАЧИНАЕТСЯ с этой плиты (финиш — звезда).
  const sign = numberSign(kind === 'finish' ? '★' : String(i + 1));
  const [sx, sz] = rot(-CP_SIZE[0] / 2 + 0.4, -CP_SIZE[2] / 2 + 0.4, ang);
  sign.group.position.set(at.x + sx, at.y, at.z + sz);
  scene.add(sign.group);
  statics.push(sign.pole);
  const [bx, bz] = rot(0, 1.5, ang);
  // смотрим «вперёд по трассе»: локальное −Z, повёрнутое на угол трассы (0 = +Z у Controller)
  return { index: i, checkpoint: solid, pad, spawn: new THREE.Vector3(at.x + bx, at.y + 0.01, at.z + bz), origin: at.clone(), chain: [solid.box], yaw: Math.PI + ang, noCoin: [] };
}

/** Номер этапа — табличка на столбике у края плиты (дальний левый угол): видно издалека и не заслоняет камеру. */
function numberSign(text: string): { group: THREE.Group; pole: THREE.Mesh } {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d')!;
  g.fillStyle = '#ffffff'; g.beginPath(); g.roundRect(4, 4, 120, 120, 22); g.fill();
  g.fillStyle = '#1d2a3a'; g.font = 'bold 80px Arial, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText(text, 64, 70);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const group = new THREE.Group();
  const pole = block({ x: 0.15, y: 2.4, z: 0.15 }, 0x444a52);
  pole.position.set(0, 1.2, 0);
  const sign = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex }));
  sign.scale.set(1.1, 1.1, 1);
  sign.position.set(0, 2.9, 0);
  group.add(pole, sign);
  return { group, pole };
}

/** Отметить чекпоинт пройденным (перекрасить плиту). */
export function markReached(st: BuiltStage): void {
  (st.pad.material as THREE.MeshStandardMaterial).color.setHex(CP_DONE);
}
