// Проверка проходимости трасс ПО ДАННЫМ: в каждом этапе (в его собственных
// координатах — повороты трассы тут не важны) переходы между соседними
// опорами укладываются в прыжок + выданные блоки.
// Этапы с check:false (лифты, батуты, ленты) счётчик не понимает — их проверяют
// боты в браузере (tools/bot_check.js).   npx tsx tools/level_check.ts
import { COURSES } from '../src/game/levels.ts';
import { WORLDS } from '../src/game/worlds.ts';
import type { PartDef, StageDef } from '../src/engine/level.ts';

const MAX_GAP = 4.6, MAX_UP = 2.2, GRID = 2;
type Box = { min: number[]; max: number[] };
const box = (d: PartDef): Box => ({ min: d.p.map((v, i) => v - d.s[i] / 2), max: d.p.map((v, i) => v + d.s[i] / 2) });
const cp = (o: number[]): Box => ({ min: [o[0] - 3, o[1] - 1, o[2] - 3], max: [o[0] + 3, o[1], o[2] + 3] });
const gapXZ = (a: Box, b: Box) => Math.hypot(Math.max(0, b.min[0] - a.max[0], a.min[0] - b.max[0]), Math.max(0, b.min[2] - a.max[2], a.min[2] - b.max[2]));

function autoEnd(st: StageDef): number[] {
  const solid = st.parts.filter((d) => d.kind !== 'lava' && d.kind !== 'spinner');
  let far = solid[0];
  for (const d of solid) if (d.p[2] - d.s[2] / 2 < far.p[2] - far.s[2] / 2) far = d;
  return [far.p[0], far.p[1] + far.s[1] / 2, far.p[2] - far.s[2] / 2 - 3];
}

let bad = 0;
COURSES.forEach((stages, wi) => {
  console.log(`\n=== ${WORLDS[wi].name} ===`);
  stages.forEach((st, si) => {
    if (st.check === false) { console.log(`--  этап ${si + 1}: проверяют боты (движущиеся части)`); return; }
    const chain: Box[] = [cp([0, 0, 0]), ...st.parts.filter((d) => d.kind !== 'lava').map(box), cp(st.end ?? autoEnd(st))];
    // блоки этапа тратятся на любые переходы: +2 м дальности или +1 м высоты за блок
    const nb = st.blocks ?? 0;
    let need = 0;
    for (let i = 1; i < chain.length; i++) {
      const g = gapXZ(chain[i - 1], chain[i]), up = chain[i].max[1] - chain[i - 1].max[1];
      // высота: башенка выше 2 блоков с земли не запрыгивается — для стены выше 4.2 м
      // нужна ещё ступенька (на 5 м — 4 блока, а не 3: ловили непроходимые этапы)
      const upNeed = up <= MAX_UP ? 0 : Math.ceil(up - MAX_UP) + (up > 2 * MAX_UP ? 1 : 0);
      need += Math.max(0, Math.ceil((g - MAX_GAP) / GRID)) + upNeed;
    }
    const ok = need <= nb;
    if (!ok) bad++;
    const note = need === 0 && nb > 0 ? ' (блоки не нужны — нет головоломки)' : '';
    console.log(`${ok ? 'ok ' : 'BAD'} этап ${si + 1}: нужно ~${need}, дано ${nb}${note}`);
  });
});
console.log(bad ? `\nНЕПРОХОДИМЫХ ЭТАПОВ: ${bad}` : '\nВсе этапы проходимы (по данным)');
process.exit(bad ? 1 : 0);
