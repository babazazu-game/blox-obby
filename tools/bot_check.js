// Проверка ВСЕХ трасс ботами в браузере (DEV): на каждом этапе каждого мира
// хотя бы один из 6 ботов должен дойти до следующего чекпоинта САМ (без перескока «застрял»).
// Открыть игру, нажать ИГРАТЬ и выполнить в консоли:
//   eval(await (await fetch('/tools/bot_check.js')).text())
(() => {
  const out = [];
  let bad = 0;
  // window.__bcWorlds = [0, 1] — проверить только эти миры (вся проверка длинная)
  const only = window.__bcWorlds;
  __courses.forEach((c, w) => {
    if (only && !only.includes(w)) return;
    __startRun(w);
    const n = c.stages.length - 1;
    for (let st = 0; st < n; st++) {
      // игрок «впереди», чтобы боты не ждали его (правило AHEAD в bots.ts)
      __goto(Math.min(st + 2, n - 1));
      __bots.list.forEach((b, i) => { b.toCourse(c.stages); b.placeAt(st); b.teleports = 0; b.falls = 0; b.waitT = i * 1.2; });   // вразнобой, как в игре
      let t = 0;
      while (t < 45 * 60 && __bots.list.some((b) => b.stage === st)) { __tick(1 / 60); t++; }
      const tp = __bots.list.reduce((a, b) => a + b.teleports, 0), fl = __bots.list.reduce((a, b) => a + b.falls, 0);
      // этап проходим, если хотя бы один бот прошёл его САМ (без перескока «застрял»):
      // на льду и тайной тропе задние падают за передними — как живые игроки, это не баг уровня
      const ok = __bots.list.some((b) => b.stage !== st && b.teleports === 0);
      if (!ok) bad++;
      out.push(`${ok ? 'ok ' : 'BAD'} мир ${w + 1} этап ${st + 1}: ${(t / 60).toFixed(0)}с, телепортов ${tp}/6, падений ${fl}`);
    }
  });
  __enterHub();
  out.push(bad ? `\nЗАСТРЕВАЮТ НА ${bad} ЭТАПАХ` : '\nВсе этапы боты прошли сами');
  return out.join('\n');
})()
