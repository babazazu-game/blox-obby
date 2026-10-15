import type { PartDef, StageDef } from '../engine/level.ts';
import { L } from '../i18n.ts';

/**
 * Трассы «Обби: Блок за блоком» — по одной на мир (WORLDS в worlds.ts), 8 этапов.
 * Только данные, формат — engine/level.ts.
 *
 * Координаты этапа: центр верха его чекпоинта = (0, 0, 0), плита 6×6
 * (z ∈ [−3, 3]), бег «вперёд» = −Z. Повороты (`turn`) делает построитель —
 * этап всегда описан «прямо». Всё на СЕТКЕ 2 м: центры по x чётные, края по z
 * нечётные, размеры кратны 2 — блок моста встаёт ровно к краю платформы.
 *
 * Пределы без блоков (controller.ts): прыжок вдаль ~4.6 м, вверх ~2.4 м.
 * Пропасть ≥ 6 м и стена ≥ 3 м без блоков не берутся — в этом головоломка.
 * Один блок = +2 м моста или +1 м высоты.
 *
 * Цвет блоков без `c` — палитра мира (подставляет построитель).
 */

/** Плита: центр x, ВЕРХ на top, ближний край z0, размеры sx×sz, высота h (для стен h = top + 1). */
const P = (x: number, top: number, z0: number, sx = 6, sz = 4, h = 1): PartDef => ({ s: [sx, h, sz], p: [x, top - h / 2, z0 - sz / 2] });
/** Пропасть шириной gap от края чекпоинта (z = −3) и платформа за ней. */
const afterGap = (gap: number, top = 0, sz = 4): PartDef => P(0, top, -3 - gap, 6, sz);
/** Стена высотой top сразу за полом длиной 4 м. */
const wall = (top: number): PartDef[] => [P(0, 0, -3, 6, 4), P(0, top, -7, 6, 4, top + 1)];
/** Лава внизу на всю длину этапа (мир лавы): упал — сгорел. */
const lava = (len: number, y = -4): PartDef => ({ s: [16, 1, len], p: [0, y - 0.5, -3 - len / 2], kind: 'lava' });
/** Лифт: плита 4×4 ездит вперёд на travel м за t секунд туда-обратно, ближний край — z0. */
const lift = (z0: number, travel: number, t = 6): PartDef => ({ s: [4, 1, 4], p: [0, -0.5, z0 - 2], c: 0x2a74e8, move: { d: [0, 0, -travel], t } });
const bounce = (z0: number): PartDef => ({ s: [4, 0.6, 4], p: [0, -0.3, z0 - 2], c: 0xff6fb5, kind: 'bounce' });
const ice = (zc: number, x = 0): PartDef => ({ s: [2, 0.6, 2], p: [x, -0.3, zc], c: 0xf2f2f2, kind: 'vanish' });
const belt = (z0: number, len: number, push: [number, number, number], w = 6): PartDef => ({ s: [w, 1, len], p: [0, -0.5, z0 - len / 2], kind: 'conveyor', push });
/** Шар-бампер (маятник): ездит поперёк трассы на ±swing м, отбрасывает. */
const bumper = (zc: number, swing = 4, t = 3, y = 1.4, r = 2.2, phase = 0): PartDef => ({ s: [r, r, r], p: [-swing + phase, y, zc], c: 0xff4fa0, kind: 'bumper', move: { d: [swing * 2, 0, 0], t } });
/** Карусель: круглая платформа диаметром dia, ближний край z0. */
const turntable = (z0: number, dia = 8, spin = 0.9): PartDef => ({ s: [dia, 0.6, dia], p: [0, -0.3, z0 - dia / 2], c: 0xffd23a, kind: 'turntable', spin });
/** Ветер: зона wxhxd над полом, центр по z — zc. */
const fan = (zc: number, push: [number, number, number], w = 10, h = 5, d = 8, y = 2.5): PartDef => ({ s: [w, h, d], p: [0, y, zc], kind: 'fan', push });
/** Стена из 5 дверей шириной 2 (x = −4…4), ложные — по индексам. */
const doors = (zc: number, fakes: number[]): PartDef[] => [-4, -2, 0, 2, 4].map((x, i) => ({ s: [2, 3.2, 1], p: [x, 1.6, zc], kind: 'door', fake: fakes.includes(i), c: [0xff4fa0, 0x3ad1ff, 0xffd23a, 0x8a6cff, 0x6dff8a][i] }));
/** Тайная тропа: ряды по 3 плиты 2×2 (x = −2, 0, 2), в каждом ряду одна настоящая — индекс в path. */
const tiptoe = (z0: number, path: number[]): PartDef[] => path.flatMap((real, row) => [-2, 0, 2].map((x, i) => ({ s: [2, 0.6, 2], p: [x, -0.3, z0 - 1 - row * 2], kind: 'tile', fake: i !== real })));
const spinner = (zc: number, len = 9, spin = 1.6): PartDef => ({ s: [len, 0.6, 0.6], p: [0, 0.5, zc], c: 0xe8403a, kind: 'spinner', spin });

/* ── Мир 1: ЛУГ — учимся строить ─────────────────────────────────────── */
const MEADOW: StageDef[] = [
  { blocks: 1, hint: 'hint1', parts: [afterGap(6)] },
  { blocks: 2, parts: [afterGap(8)], turn: -1 },
  { blocks: 1, hint: 'hint3', parts: wall(3) },
  { blocks: 2, hint: 'hint4', parts: wall(4), turn: 1 },
  // два разрыва по 6 с островом: не потрать оба блока на первый
  { blocks: 2, hint: 'hint5', parts: [afterGap(6), P(0, 0, -19)] },
  // конвейер сносит вбок — беги быстро и держись против ленты
  { blocks: 0, check: false, hint: 'hintBelt', parts: [belt(-3, 12, [2.4, 0, 0]), P(0, 0, -15)], turn: -1 },
  { blocks: 2, parts: [afterGap(6), P(0, 3, -13, 6, 4, 4)] },
  // лестница-зигзаг вверх, потом длинный мост
  { blocks: 3, parts: [P(-2, 1, -3, 2, 2), P(2, 2, -5, 2, 2), P(-2, 3, -7, 2, 2), P(0, 3, -9, 6, 4), P(0, 3, -23, 6, 4)] },
];

/* ── Мир 2: КОНФЕТЫ — батуты, лифты, исчезайки ────────────────────────── */
const CANDY: StageDef[] = [
  { blocks: 0, check: false, hint: 'hint13', parts: [bounce(-3), P(0, 5, -7, 6, 4, 6)] },
  { blocks: 2, parts: [afterGap(8)], turn: 1 },
  { blocks: 0, check: false, hint: 'hint12', parts: [lift(-5, 10), P(0, 0, -21)] },
  { blocks: 0, check: false, hint: 'hintIce', parts: [ice(-6), ice(-10), ice(-14), P(0, 0, -17)], turn: -1 },
  // батут через пропасть на высокую плиту (подъём 3 — без батута не залезть;
  // плита в 2 м от батута: на 4 м не долетал тот, кто бежит не на полную скорость — проверено ботами)
  { blocks: 0, check: false, parts: [bounce(-3), P(0, 3, -9, 6, 4)] },
  // две карусели в разные стороны
  { blocks: 0, check: false, hint: 'hintSpin', parts: [turntable(-5, 8, 0.8), turntable(-15, 8, -1.0), P(0, 0, -25)] },
  { blocks: 2, parts: wall(4), turn: 1 },
  { blocks: 1, check: false, parts: [ice(-6), ice(-10), P(0, 0, -13), P(0, 0, -23)] },
];

/* ── Мир 3: ЛАВА — внизу везде лава ───────────────────────────────────── */
const LAVA: StageDef[] = [
  { blocks: 2, hint: 'hint11', parts: [afterGap(8), lava(12)] },
  { blocks: 0, check: false, parts: [lift(-5, 10), P(0, 0, -21), lava(18)], turn: -1 },
  // мост над лавой, по нему ходят маятники-бамперы
  { blocks: 0, check: false, hint: 'hintBump', parts: [P(0, 0, -3, 4, 14), bumper(-7, 3, 2.6), bumper(-12, 3, 3.2, 1.4, 2.2, 6), P(0, 0, -17), lava(18)] },
  { blocks: 2, parts: [afterGap(6), P(0, 0, -19), lava(20)], turn: 1 },
  { blocks: 0, check: false, parts: [P(0, 0, -5, 10, 10), spinner(-10), lava(16)] },
  { blocks: 1, parts: [afterGap(4), P(0, 3, -11, 6, 4, 4), lava(12)], turn: -1 },
  { blocks: 0, check: false, parts: [bounce(-3), P(0, 3, -9, 6, 4), lava(12)] },
  { blocks: 4, parts: [afterGap(10), P(0, 3, -17, 6, 4, 4), lava(18)] },
];

/* ── Мир 4: СНЕГ — всё вместе ─────────────────────────────────────────── */
const SNOW: StageDef[] = [
  { blocks: 0, check: false, parts: [lift(-5, 10), P(0, 0, -21), lift(-27, 10, 5), P(0, 0, -43)], turn: -1 },
  // в гору: стена 3, потом ещё +4
  { blocks: 3, parts: [P(0, 0, -3), P(0, 3, -7, 6, 4, 4), P(0, 7, -11, 6, 4, 8)] },
  { blocks: 5, parts: [afterGap(14)], turn: 1 },
  { blocks: 0, check: false, parts: [P(0, 0, -3, 10, 16), spinner(-7, 9, 1.4), spinner(-14, 9, -1.9)] },
  { blocks: 0, check: false, parts: [bounce(-3), P(0, 3, -9, 4, 4), ice(-17, 0), P(0, 0, -21)] },
  // ледяные островки — не в начале: там толпа ботов толкается и роняет всех (жалоба)
  { blocks: 1, check: false, hint: 'hint14', parts: [ice(-6), ice(-10), ice(-14), P(0, 0, -17, 10, 10), spinner(-22)] },
  { blocks: 4, parts: [afterGap(8), P(0, 4, -15, 6, 4, 5)], turn: -1 },
  // финал: мост, лифт, стенка
  { blocks: 2, check: false, hint: 'hintFinal', parts: [afterGap(6), lift(-15, 8, 5), P(0, 0, -29), P(0, 3, -33, 6, 4, 4)] },
];

/* ── Мир 5: ШОУ — в духе Fall Guys ───────────────────────────────────── */
const SHOW: StageDef[] = [
  // стена дверей: две из пяти ложные — ломай с разбега
  { blocks: 0, check: false, hint: 'hintDoors', parts: [P(0, 0, -3, 10, 10), ...doors(-7.5, [1, 4])] },
  // тайная тропа: настоящая плита в каждом ряду одна, остальные проваливаются
  { blocks: 0, check: false, hint: 'hintTip', parts: [...tiptoe(-3, [1, 0, 0, 1, 2, 2]), P(0, 0, -15)], turn: 1 },
  // маятники на узком мосту
  { blocks: 0, check: false, hint: 'hintBump', parts: [P(0, 0, -3, 4, 16), bumper(-6, 3, 2.4), bumper(-11, 3, 3, 1.4, 2.2, 6), bumper(-15, 3, 2.2), P(0, 0, -19)] },
  { blocks: 0, check: false, hint: 'hintSpin', parts: [turntable(-5, 8, 1.1), turntable(-15, 8, -1.3), P(0, 0, -25)], turn: -1 },
  // ветер сбоку и мост: блок ставь, пока не сдуло
  { blocks: 1, check: false, hint: 'hintWind', parts: [P(0, 0, -3, 10, 6), fan(-6, [2.2, 0, 0], 10, 5, 6), afterGap(12, 0, 4)] },
  // восходящий поток: прыгни в столб ветра — поднимет на высокую плиту
  { blocks: 0, check: false, hint: 'hintUp', parts: [P(0, 0, -3, 6, 4), fan(-9, [0, 9, 0], 4, 7, 4, 3.5), P(0, 6, -11, 6, 4, 7)], turn: 1 },
  { blocks: 2, check: false, parts: [P(0, 0, -3, 10, 6), ...doors(-6.5, [0, 3]), afterGap(14, 0, 4)] },
  // финал: тропа, карусель, маятник
  { blocks: 0, check: false, hint: 'hintFinal2', parts: [...tiptoe(-3, [2, 1, 1, 0]), turntable(-13, 8, 1.0), P(0, 0, -23, 4, 10), bumper(-28, 3, 2.6), P(0, 0, -33)] },
];

/* ── Мир 6: ФАБРИКА — ленты, толкатели, лифты ─────────────────────────── */
const FACTORY: StageDef[] = [
  { blocks: 2, check: false, hint: 'hintBack', parts: [belt(-11, 8, [0, 0, 2.6]), P(0, 0, -19)] },
  // толкатели над лентой
  { blocks: 0, check: false, hint: 'hintBump', parts: [belt(-3, 14, [0, 0, -2]), bumper(-8, 3, 1.8), bumper(-13, 3, 2.2, 1.4, 2.2, 6), P(0, 0, -17)], turn: -1 },
  // лифт поперёк: ездит влево-вправо, ловить момент
  { blocks: 0, check: false, hint: 'hintSide', parts: [{ s: [4, 1, 4], p: [-6, -0.5, -7], c: 0x3a8fd0, move: { d: [12, 0, 0], t: 6 } }, P(0, 0, -11)] },
  // лифты вверх ступенями
  { blocks: 0, check: false, hint: 'hintUpLift', parts: [{ s: [4, 1, 4], p: [0, -0.5, -5], c: 0x3a8fd0, move: { d: [0, 4, 0], t: 4 } }, P(0, 4, -7, 6, 4, 5), { s: [4, 1, 4], p: [0, 3.5, -13], c: 0x3a8fd0, move: { d: [0, 4, 0], t: 4 } }, P(0, 8, -15, 6, 4, 9)], turn: 1 },
  { blocks: 2, check: false, parts: [belt(-3, 4, [0, 0, 2.2]), P(0, 4, -7, 6, 4, 5)] },
  { blocks: 0, check: false, hint: 'hintSpin', parts: [turntable(-5, 10, 0.9), spinner(-10, 9, -2.2), P(0, 0, -15)], turn: -1 },
  { blocks: 4, check: false, hint: 'hintWind', parts: [P(0, 0, -3, 10, 4), fan(-13, [-2, 0, 0], 10, 5, 12), afterGap(12, 0, 4)] },
  { blocks: 2, check: false, hint: 'hintFinal', parts: [belt(-3, 8, [0, 0, -2.5]), ...doors(-12.5, [2]), P(0, 0, -11, 10, 4), afterGap(20, 0, 4)] },
];


/* ── Вторые половины трасс: этапы 9–16 каждого мира ───────────────────────
 * Трассы были короткие (жалоба пользователя) — каждая удвоена. Это не копии
 * первых восьми, а усложнения и сочетания: длиннее мосты, выше стены,
 * по два-три препятствия на этапе. Сложность растёт к финалу мира. */
const sideLift = (z0: number, swing = 6, t = 6): PartDef => ({ s: [4, 1, 4], p: [-swing, -0.5, z0 - 2], c: 0x3a8fd0, move: { d: [swing * 2, 0, 0], t } });
const upLift = (z0: number, top: number, rise = 4, t = 4): PartDef => ({ s: [4, 1, 4], p: [0, top - 0.5, z0 - 2], c: 0x3a8fd0, move: { d: [0, rise, 0], t } });

const MEADOW2: StageDef[] = [
  { blocks: 3, parts: [afterGap(10)], turn: 1 },
  { blocks: 2, parts: wall(4) },
  { blocks: 2, parts: [afterGap(6), P(0, 3, -13, 6, 4, 4)] },
  { blocks: 0, check: false, hint: 'hintBelt', parts: [belt(-3, 14, [-2.6, 0, 0]), P(0, 0, -17)], turn: -1 },
  { blocks: 2, parts: [afterGap(6), P(0, 0, -19)] },
  { blocks: 0, parts: [P(-2, 1, -3, 2, 2), P(2, 2, -5, 2, 2), P(-2, 3, -7, 2, 2), P(2, 4, -9, 2, 2), P(0, 4, -11, 6, 4)], turn: 1 },
  { blocks: 4, parts: [afterGap(8), P(0, 4, -15, 6, 4, 5)] },
  { blocks: 5, hint: 'hintFinal', parts: [afterGap(14)] },
];

const CANDY2: StageDef[] = [
  { blocks: 0, check: false, parts: [bounce(-3), P(0, 3, -9, 6, 4), P(0, 3, -17, 6, 4)] },
  { blocks: 0, check: false, hint: 'hint12', parts: [lift(-5, 14, 7), P(0, 0, -25)], turn: 1 },
  { blocks: 0, check: false, hint: 'hintIce', parts: [ice(-6), ice(-10), ice(-14), ice(-18), P(0, 0, -21)] },
  { blocks: 0, check: false, hint: 'hintSpin', parts: [turntable(-5, 8, 0.9), turntable(-15, 8, -1.1), turntable(-25, 8, 1.2), P(0, 0, -35)], turn: -1 },
  { blocks: 3, parts: [afterGap(10)] },
  // стена 4 за лентой назад (5 м с тремя блоками непроходима: на 5 нужно 4 блока — ступенька + башенка)
  { blocks: 2, check: false, hint: 'hintBack', parts: [belt(-3, 6, [0, 0, 2.4]), P(0, 4, -9, 6, 4, 5)] },
  { blocks: 0, check: false, parts: [bounce(-3), P(0, 3, -9, 4, 4), ice(-17), P(0, 0, -21)], turn: 1 },
  { blocks: 4, hint: 'hintFinal', parts: [afterGap(8), P(0, 4, -15, 6, 4, 5)] },
];

const LAVA2: StageDef[] = [
  { blocks: 3, parts: [afterGap(10), lava(14)] },
  { blocks: 0, check: false, hint: 'hintBump', parts: [P(0, 0, -3, 4, 18), bumper(-6, 3, 2.4), bumper(-11, 3, 3, 1.4, 2.2, 6), bumper(-16, 3, 2.2), P(0, 0, -21), lava(22)], turn: 1 },
  { blocks: 0, check: false, hint: 'hint12', parts: [lift(-5, 12, 5), P(0, 0, -23), lava(20)] },
  { blocks: 2, parts: [afterGap(4), P(0, 4, -11, 6, 4, 5), lava(12)] },
  { blocks: 0, check: false, parts: [P(0, 0, -5, 10, 14), spinner(-9), spinner(-15, 9, -2), lava(18)], turn: -1 },
  { blocks: 0, check: false, hint: 'hintIce', parts: [ice(-6), ice(-10), ice(-14), P(0, 0, -17), lava(18)] },
  { blocks: 0, check: false, hint: 'hintBelt', parts: [belt(-3, 12, [2.2, 0, 0], 4), P(0, 0, -15), lava(16)] },
  { blocks: 3, hint: 'hintFinal', parts: [afterGap(8), P(0, 0, -21), lava(22)] },
];

const SNOW2: StageDef[] = [
  { blocks: 0, check: false, parts: [P(0, 0, -3, 10, 20), spinner(-7, 9, 1.5), spinner(-13, 9, -1.8), spinner(-19, 9, 2.1)] },
  { blocks: 6, parts: [afterGap(16)], turn: 1 },
  { blocks: 0, check: false, hint: 'hint12', parts: [lift(-5, 10, 5), P(0, 0, -21), lift(-27, 12, 6), P(0, 0, -45)] },
  { blocks: 3, parts: [P(0, 0, -3), P(0, 3, -7, 6, 4, 4), P(0, 6, -11, 6, 4, 7), P(0, 9, -15, 6, 4, 10)], turn: -1 },
  { blocks: 1, check: false, hint: 'hint14', parts: [ice(-6), ice(-10), ice(-14), P(0, 0, -17, 10, 10), spinner(-22, 9, -1.7)] },
  { blocks: 1, check: false, parts: [bounce(-3), P(0, 3, -9, 6, 4), P(0, 3, -19, 6, 4)], turn: 1 },
  { blocks: 4, parts: [afterGap(8), P(0, 4, -15, 6, 4, 5)] },
  { blocks: 2, check: false, hint: 'hintFinal', parts: [afterGap(6), lift(-15, 8, 5), P(0, 0, -29), P(0, 3, -33, 6, 4, 4)] },
];

const SHOW2: StageDef[] = [
  { blocks: 0, check: false, hint: 'hintDoors', parts: [P(0, 0, -3, 10, 14), ...doors(-6.5, [0, 2]), ...doors(-12.5, [3])], turn: 1 },
  { blocks: 0, check: false, hint: 'hintTip', parts: [...tiptoe(-3, [0, 1, 2, 2, 1, 0, 0, 1]), P(0, 0, -19)] },
  { blocks: 0, check: false, hint: 'hintBump', parts: [turntable(-5, 8, 1), P(0, 0, -15, 4, 10), bumper(-20, 3, 2.4), P(0, 0, -25)], turn: -1 },
  { blocks: 2, check: false, hint: 'hintWind', parts: [P(0, 0, -3, 10, 6), fan(-6, [-2.2, 0, 0], 10, 5, 6), afterGap(14, 0, 4)] },
  { blocks: 1, check: false, hint: 'hintUp', parts: [P(0, 0, -3, 6, 4), fan(-9, [0, 9, 0], 4, 7, 4, 3.5), P(0, 6, -11, 6, 4, 7), P(0, 6, -21, 6, 4)], turn: 1 },
  { blocks: 0, check: false, parts: [P(0, 0, -3, 10, 4), ...doors(-5.5, [1, 3]), ...tiptoe(-7, [1, 2, 1, 0]), P(0, 0, -15)] },
  { blocks: 0, check: false, hint: 'hintSpin', parts: [turntable(-5, 8, 1.2), turntable(-15, 8, -1.4), turntable(-25, 8, 1.6), P(0, 0, -35)], turn: -1 },
  { blocks: 2, check: false, hint: 'hintFinal2', parts: [...tiptoe(-3, [1, 0, 1, 2]), P(0, 0, -11, 10, 6), ...doors(-14.5, [1, 3]), afterGap(22, 0, 4)] },
];

const FACTORY2: StageDef[] = [
  { blocks: 3, check: false, hint: 'hintBack', parts: [belt(-13, 8, [0, 0, 3]), P(0, 0, -21)], turn: 1 },
  { blocks: 0, check: false, hint: 'hintSide', parts: [sideLift(-5), P(0, 0, -11), sideLift(-15, 6, 5), P(0, 0, -21)] },
  { blocks: 0, check: false, hint: 'hintUpLift', parts: [upLift(-3, 0), P(0, 4, -7, 6, 4, 5), upLift(-11, 4), P(0, 8, -15, 6, 4, 9), upLift(-19, 8), P(0, 12, -23, 6, 4, 13)], turn: -1 },
  { blocks: 0, check: false, hint: 'hintBump', parts: [belt(-3, 18, [0, 0, -2]), bumper(-7, 3, 1.8), bumper(-12, 3, 2.2, 1.4, 2.2, 6), bumper(-17, 3, 1.6), P(0, 0, -21)] },
  { blocks: 2, check: false, hint: 'hintBack', parts: [belt(-3, 8, [0, 0, 2.6]), P(0, 4, -11, 6, 4, 5)], turn: 1 },
  { blocks: 0, check: false, hint: 'hintSpin', parts: [turntable(-5, 10, 1.0), spinner(-10, 9, -2.4), P(0, 0, -15, 6, 4), turntable(-21, 10, -1.2), spinner(-26, 9, 2.4), P(0, 0, -31)] },
  { blocks: 4, check: false, hint: 'hintWind', parts: [P(0, 0, -3, 10, 4), fan(-14, [1.6, 0, 0], 10, 5, 14), afterGap(14, 0, 4)], turn: -1 },
  { blocks: 2, check: false, hint: 'hintFinal', parts: [belt(-3, 6, [0, 0, -2.5]), ...doors(-10.5, [1, 3]), P(0, 0, -9, 10, 4), afterGap(16, 0, 4), sideLift(-25), P(0, 0, -31)] },
];

/** Трасса мира = первая половина + вторая (по 16 этапов). */
export const COURSES: StageDef[][] = [
  [...MEADOW, ...MEADOW2], [...CANDY, ...CANDY2], [...LAVA, ...LAVA2],
  [...SNOW, ...SNOW2], [...SHOW, ...SHOW2], [...FACTORY, ...FACTORY2],
];

/** Подсказки этапов (ключ → текст). Позже уйдут в локализацию. */
export const HINTS: Record<string, string> = {
  hint1: L('Пропасть не перепрыгнуть! Подойди к краю и поставь блок — E или 🧱', "Too far to jump! Walk to the edge and place a block — E or 🧱"),
  hint3: L('Стена высокая — поставь блок-ступеньку у стены', "The wall is high — place a block as a step"),
  hint4: L('Поставь блок на блок — получится башенка', "Stack a block on a block to build a tower"),
  hint5: L('Блоков ровно два — не потрать оба на первую пропасть!', "Only two blocks — don't spend both on the first gap!"),
  hintBelt: L('Лента сносит в сторону — беги и держись против неё', "The belt pushes you sideways — run against it"),
  hintBack: L('Лента тащит назад к пропасти — не стой на месте!', "The belt drags you back to the gap — keep moving!"),
  hint11: L('Внизу лава! Не упади', "Lava below! Don't fall"),
  hint12: L('Подожди платформу и запрыгивай', "Wait for the platform and hop on"),
  hint13: L('Прыгни на батут!', "Jump on the trampoline!"),
  hint14: L('Белые плиты исчезают — беги быстрее! Перепрыгни крутилку', "White tiles vanish — run fast! Jump over the spinner"),
  hintIce: L('Ледяные плиты исчезают — не стой на месте!', "Ice tiles vanish — keep moving!"),
  hintFinal: L('Последний этап! Соберись!', "Final stage! Focus!"),
  hintFinal2: L('Финал шоу: тропа, карусель и маятник!', "Show finale: path, carousel and pendulum!"),
  hintSpin: L('Карусель крутит — беги к краю в нужный момент', "The carousel spins — run to the edge at the right moment"),
  hintBump: L('Шары-маятники сбивают с моста — проскакивай между ними', "Pendulum balls knock you off — slip between them"),
  hintDoors: L('Часть дверей ненастоящие — врежься с разбега!', "Some doors are fake — run right through!"),
  hintTip: L('Тайная тропа: часть плит проваливается. Смотри, где прошли другие!', "Secret path: some tiles drop. Watch where others walked!"),
  hintWind: L('Ветер сдувает вбок — держись против ветра', "Wind blows you sideways — lean into it"),
  hintUp: L('Прыгни в столб ветра — он поднимет наверх', "Jump into the updraft — it lifts you up"),
  hintSide: L('Лифт ездит поперёк — запрыгивай, когда он рядом', "The lift moves sideways — hop on when it's close"),
  hintUpLift: L('Лифт поднимает — встань на него и жди', "The lift goes up — stand on it and wait"),
};
