/**
 * Миры «Обби: Блок за блоком»: в каждый ведёт свой портал из хаба, у каждого
 * своя трасса (levels.ts), небо, туман, цвета блоков и декор. Только данные.
 */
import type { DecorPalette as Palette } from '../engine/decor.ts';

export interface WorldDef {
  name: string;
  /** Ключ сохранения/рекорда. */
  id: string;
  /** Цвет портала в хабе. */
  portal: number;
  sky: number;
  fog: number;
  track: number[];
  palette: Palette;
}

export const WORLDS: WorldDef[] = [
  {
    name: 'ЛУГ', id: 'meadow', portal: 0x3ad15a, sky: 0x2f86f0, fog: 0xdcecff,
    track: [0xe8403a, 0xf7c41c, 0x2fb04a, 0x2a74e8, 0x9b59d0, 0xff7a2f, 0xff6fb5],
    palette: { grass: 0x52c23a, rock: 0x8e8a86, rockDark: 0x726e6a, trunk: 0x7a4a26, leaf: 0x2f9a45, leafLight: 0x45b858, flower: 0xffe14d, tree: 'pine' },
  },
  {
    name: 'КОНФЕТЫ', id: 'candy', portal: 0xff6fb5, sky: 0xc56ff0, fog: 0xffe3f3,
    track: [0xff6fb5, 0x7fe0d0, 0xffd23a, 0xb98cff, 0xff9a7a, 0x8fd8ff],
    palette: { grass: 0xff9fd0, rock: 0xfff3e6, rockDark: 0xf2d8c4, trunk: 0xffffff, leaf: 0xff5fa8, leafLight: 0x7fe0d0, flower: 0xffffff, tree: 'lolly' },
  },
  {
    name: 'ЛАВА', id: 'lava', portal: 0xff6a1f, sky: 0x9a2d1a, fog: 0xffb48a,
    track: [0x6b6f78, 0xff7a2f, 0x3d3f45, 0xffc23a, 0x8a4a2a],
    palette: { grass: 0x4a4a50, rock: 0x3a3a40, rockDark: 0x2a2a2f, trunk: 0x2a2220, leaf: 0xff6a1f, leafLight: 0xffb23a, flower: 0xff3a1a, tree: 'dead' },
  },
  {
    name: 'СНЕГ', id: 'snow', portal: 0x8fd8ff, sky: 0x5aa8f0, fog: 0xeef6ff,
    track: [0x8fd8ff, 0xffffff, 0x2a74e8, 0xb98cff, 0x16a3a3],
    palette: { grass: 0xf4faff, rock: 0x9fb4c8, rockDark: 0x7f94a8, trunk: 0x6a4a2a, leaf: 0x2f7a55, leafLight: 0xeaf6ff, flower: 0x8fd8ff, tree: 'snowpine' },
  },
  {
    // мир в духе Fall Guys: яркое шоу — двери, тайная тропа, маятники, карусели, ветер
    name: 'ШОУ', id: 'show', portal: 0xffd23a, sky: 0x8a6cff, fog: 0xffe8fb,
    track: [0xff4fa0, 0xffd23a, 0x3ad1ff, 0x8a6cff, 0x6dff8a],
    palette: { grass: 0xffd23a, rock: 0xff8fc8, rockDark: 0xe86aa8, trunk: 0xffffff, leaf: 0x3ad1ff, leafLight: 0xff4fa0, flower: 0xffffff, tree: 'lolly' },
  },
  {
    // фабрика: ленты, толкатели, лифты вбок и вверх
    name: 'ФАБРИКА', id: 'factory', portal: 0xff9a1f, sky: 0x2a6f7a, fog: 0xc8dde0,
    track: [0xffb800, 0x5a6270, 0x3a8fd0, 0xff7a2f, 0x8a929e],
    palette: { grass: 0x6a727e, rock: 0x4a525e, rockDark: 0x3a414c, trunk: 0x2a2f36, leaf: 0xffb800, leafLight: 0x3a8fd0, flower: 0xff7a2f, tree: 'dead' },
  },
];
