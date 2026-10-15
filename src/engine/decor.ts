import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { BuiltStage } from './level.ts';

/**
 * Окружение обби: летающие острова, деревья, каменные «корни» под чекпоинтами,
 * башня на горизонте. Палитра и вид деревьев — от мира (луг, конфеты, лава, снег).
 *
 * Только декор — без физики. Сотни кусочков склеиваются в ОДНУ геометрию на цвет
 * (несколько вызовов отрисовки на весь декор); тени декор не отбрасывает
 * и не принимает — проход теней рисовал бы его треугольники второй раз.
 */

export type TreeKind = 'pine' | 'lolly' | 'dead' | 'snowpine';
export interface DecorPalette {
  grass: number; rock: number; rockDark: number; trunk: number;
  leaf: number; leafLight: number; flower: number; tree: TreeKind;
}
export const MEADOW: DecorPalette = { grass: 0x52c23a, rock: 0x8e8a86, rockDark: 0x726e6a, trunk: 0x7a4a26, leaf: 0x2f9a45, leafLight: 0x45b858, flower: 0xffe14d, tree: 'pine' };

type Part = { geo: THREE.BufferGeometry; color: number };
import type { Physics } from './physics.ts';

/** Сборщик декора: копит детали, `flush()` склеивает их по цвету в сцену. */
export class Decor {
  private parts: Part[] = [];
  private seed: number;
  /** Габариты твёрдых деталей: декор не «призрачный» — в дерево упираешься,
   *  на скалу можно запрыгнуть (жалоба пользователя: проходил сквозь кусты и конфеты). */
  readonly colliders: THREE.Box3[] = [];

  constructor(public pal: DecorPalette = MEADOW, seed = 1234) { this.seed = seed; }

  rnd(): number { return ((this.seed = (this.seed * 16807) % 2147483647) / 2147483647); }
  range(a: number, b: number): number { return a + this.rnd() * (b - a); }

  box(color: number, sx: number, sy: number, sz: number, x: number, y: number, z: number, ry = 0, r = 0.12, solid = true): void {
    // segments = 1: фаска вместо гладкого скругления. С 2 декор весил ~450 тыс. треугольников
    // (тысячи кубиков по 300) — FPS 35 на встроенной графике. С 1 — по 108, издали то же.
    const g = new RoundedBoxGeometry(sx, sy, sz, 1, Math.min(r, Math.min(sx, sy, sz) * 0.3));
    g.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, ry, 0)), new THREE.Vector3(1, 1, 1)));
    this.parts.push({ geo: g, color });
    if (solid && Math.min(sx, sy, sz) >= 0.2) { g.computeBoundingBox(); this.colliders.push(g.boundingBox!.clone()); }
  }

  /** Дерево в стиле мира: ёлка, леденец, мёртвое дерево, заснеженная ёлка. */
  tree(x: number, y: number, z: number, s = 1): void {
    const P = this.pal;
    switch (P.tree) {
      case 'lolly': {
        // леденец: белая палочка + круглая «конфета» из двух цветов
        this.box(P.trunk, 0.25 * s, 2.2 * s, 0.25 * s, x, y + 1.1 * s, z);
        this.box(P.leaf, 1.6 * s, 1.6 * s, 0.5 * s, x, y + 2.9 * s, z, this.rnd() * Math.PI, 0.5 * s);
        this.box(P.leafLight, 0.9 * s, 0.9 * s, 0.56 * s, x, y + 2.9 * s, z, this.rnd() * Math.PI, 0.3 * s);
        break;
      }
      case 'dead': {
        // обгорелый ствол с двумя ветками и тлеющими угольками
        this.box(P.trunk, 0.5 * s, 2.4 * s, 0.5 * s, x, y + 1.2 * s, z);
        this.box(P.trunk, 1.2 * s, 0.3 * s, 0.3 * s, x + 0.5 * s, y + 1.9 * s, z, 0.3);
        this.box(P.trunk, 0.3 * s, 0.3 * s, 1.0 * s, x, y + 1.5 * s, z - 0.4 * s, 0.2);
        this.box(P.leaf, 0.3 * s, 0.3 * s, 0.3 * s, x + 1.0 * s, y + 2.1 * s, z);
        break;
      }
      default: {
        // ёлка из блоков: ствол + три яруса «лап», у снежной верх каждого яруса — шапка снега
        this.box(P.trunk, 0.5 * s, 1.2 * s, 0.5 * s, x, y + 0.6 * s, z);
        const tiers = [[2.2, 1.0, 1.4], [1.6, 0.9, 2.2], [1.0, 0.8, 2.9]];
        tiers.forEach(([w, h, yy], i) => {
          const ry = this.rnd() * Math.PI;
          this.box(P.tree === 'snowpine' ? P.leaf : i % 2 ? P.leafLight : P.leaf, w * s, h * s, w * s, x, y + yy * s, z, ry, 0.15);
          if (P.tree === 'snowpine') this.box(P.leafLight, w * 0.85 * s, 0.25 * s, w * 0.85 * s, x, y + (yy + h / 2) * s, z, ry, 0.1);
        });
      }
    }
  }

  /** Летающий остров: «трава» сверху, ступенчатый камень снизу, деревья и цветы. */
  island(x: number, y: number, z: number, size: number, trees = true): void {
    const P = this.pal;
    this.box(P.grass, size, 0.9, size, x, y - 0.45, z, 0, 0.3);
    let w = size * 0.92, yy = y - 0.9;
    for (let i = 0; i < 3 + Math.floor(this.rnd() * 2); i++) {
      const h = this.range(1.2, 2.2);
      this.box(i % 2 ? P.rock : P.rockDark, w, h, w * this.range(0.8, 1), x + this.range(-0.4, 0.4), yy - h / 2, z + this.range(-0.4, 0.4), this.rnd(), 0.25);
      yy -= h;
      w *= this.range(0.55, 0.75);
    }
    if (!trees) return;
    const n = Math.max(1, Math.floor(size / 3));
    for (let i = 0; i < n; i++) this.tree(x + this.range(-size / 3, size / 3), y, z + this.range(-size / 3, size / 3), this.range(0.8, 1.3));
    for (let i = 0; i < n * 2; i++) this.box(P.flower, 0.25, 0.25, 0.25, x + this.range(-size / 2.3, size / 2.3), y + 0.12, z + this.range(-size / 2.3, size / 2.3), 0, 0.05, false);
  }

  /** Каменный «корень» под плитой: трасса — цепочка островков, а не плитки в пустоте. */
  root(p: THREE.Vector3, w0 = 5): void {
    let w = w0, yy = p.y - 1;
    for (let i = 0; i < 3; i++) {
      const h = this.range(1, 1.8);
      this.box(i % 2 ? this.pal.rock : this.pal.rockDark, w, h, w, p.x + this.range(-0.3, 0.3), yy - h / 2, p.z + this.range(-0.3, 0.3), this.rnd() * 0.5, 0.25);
      yy -= h; w *= 0.6;
    }
  }

  /** Башня-обби на горизонте: столб и цветные площадки спиралью. */
  tower(x: number, y: number, z: number, colors: number[]): void {
    const H = 46;
    this.box(this.pal.rock, 7, H, 7, x, y + H / 2 - 10, z, 0, 0.4);
    for (let i = 0; i < 16; i++) {
      const a = i * 0.9, r = 5.5;
      this.box(colors[i % colors.length], 4, 0.8, 3, x + Math.cos(a) * r, y - 6 + i * 2.6, z + Math.sin(a) * r, -a, 0.2);
    }
    this.island(x, y - 10, z, 14, true);
  }

  /** physics — сделать детали твёрдыми (каждая — ящик по своим габаритам). */
  flush(scene: THREE.Scene, physics?: Physics): void {
    if (physics) for (const b of this.colliders) physics.add({ box: b, kind: 'decor' });
    this.colliders.length = 0;
    const byColor = new Map<number, THREE.BufferGeometry[]>();
    for (const p of this.parts) {
      if (!byColor.has(p.color)) byColor.set(p.color, []);
      byColor.get(p.color)!.push(p.geo);
    }
    for (const [color, geos] of byColor) {
      const m = new THREE.Mesh(mergeGeometries(geos), new THREE.MeshStandardMaterial({ color, roughness: 0.7 }));
      m.castShadow = false;
      m.receiveShadow = false;
      scene.add(m);
      geos.forEach((g) => g.dispose());
    }
    this.parts = [];
  }
}

/**
 * Окружение вдоль трассы: корни под чекпоинтами, острова по бокам этапа
 * (по бокам — относительно направления трассы: она поворачивает).
 */
export function decorateCourse(scene: THREE.Scene, stages: BuiltStage[], pal: DecorPalette, colors: number[], seed = 1234, physics?: Physics): void {
  const d = new Decor(pal, seed);
  for (const st of stages) d.root(st.origin);
  // Трасса поворачивает: остров «сбоку» одного этапа может лечь на путь следующего.
  // Пока декор был призрачным, этого не было видно; твёрдый — перегораживал дорогу
  // (нашли боты). Остров ближе 5 м к любой опоре трассы не ставим.
  const route = stages.flatMap((st) => st.chain);
  const clear = (x: number, z: number, size: number) =>
    route.every((b) => Math.hypot(Math.max(0, b.min.x - x, x - b.max.x), Math.max(0, b.min.z - z, z - b.max.z)) > size / 2 + 5);
  const isl = (x: number, y: number, z: number, size: number) => { if (clear(x, z, size)) d.island(x, y, z, size); };
  for (const st of stages) {
    // поперёк трассы: «вперёд» = (sin yaw, cos yaw), бок = (cos yaw, −sin yaw)
    const sx = Math.cos(st.yaw), sz = -Math.sin(st.yaw);
    for (const side of [-1, 1]) {
      if (d.rnd() < 0.25) continue;
      const near = d.range(13, 20), far = d.range(30, 55);
      isl(st.origin.x + side * sx * near, st.origin.y + d.range(-5, 3), st.origin.z + side * sz * near, d.range(4, 7));
      if (d.rnd() < 0.7) isl(st.origin.x + side * sx * far, st.origin.y + d.range(-10, 8), st.origin.z + side * sz * far, d.range(8, 14));
    }
  }
  const last = stages[stages.length - 1];
  if (clear(last.origin.x + 40, last.origin.z - 30, 20)) d.tower(last.origin.x + 40, last.origin.y, last.origin.z - 30, colors);
  d.flush(scene, physics);
}
