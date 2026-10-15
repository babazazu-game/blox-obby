// Бот-проверка этапов моста в браузере (DEV). Вставляется через консоль/инструмент:
// гоняет __tick() без отрисовки и решает каждый этап заданным сценарием.
(() => {
  const K = (t, c) => dispatchEvent(new KeyboardEvent(t, { code: c }));
  const DT = 1 / 60;
  const loc = () => { const o = __origin(); const p = __ctl.pos; return { x: p.x - o.x, y: p.y - o.y, z: p.z - o.z }; };
  const tick = (n = 1) => { for (let i = 0; i < n; i++) { __cam.yaw = 0; __tick(DT); } };
  const tap = (c) => { K('keydown', c); tick(1); K('keyup', c); tick(1); };
  // идти вперёд до локальной z (без прыжков)
  function go(z) { K('keydown', 'KeyW'); let n = 0; while (loc().z > z && n++ < 600) tick(); K('keyup', 'KeyW'); tick(20); }
  // бежать вперёд и прыгнуть, когда z < jz; держать бег до zEnd
  function leap(jz, zEnd) { K('keydown', 'KeyW'); let n = 0, j = false; const st = __stage();
    while (n++ < 400) { tick(); const l = loc(); if (!j && l.z < jz) { K('keydown', 'Space'); j = true; tick(3); K('keyup', 'Space'); }
      if (__stage() !== st || (l.z < zEnd && __ctl.grounded)) break; }
    K('keyup', 'KeyW'); tick(20); }
  // карабкаться: бег + прыжки по кулдауну, пока не пройдём zEnd
  function hop(zEnd) { K('keydown', 'KeyW'); let n = 0; const st = __stage();
    while (n++ < 600) { if (n % 12 === 0) tap('Space'); else tick(); if (__stage() !== st || loc().z < zEnd) break; }
    K('keyup', 'KeyW'); tick(30); }
  const place = () => tap('KeyE');
  // прыжок с отпусканием бега над целью: короткий точный прыжок на маленькую плиту
  function leapTo(jz, releaseZ) { K('keydown', 'KeyW'); let n = 0, j = false;
    while (n++ < 300) { tick(); const l = loc(); if (!j && l.z < jz) { K('keydown', 'Space'); j = true; tick(3); K('keyup', 'Space'); }
      if (j && l.z < releaseZ) { K('keyup', 'KeyW'); break; } }
    n = 0; while (!__ctl.grounded && n++ < 200) tick(); tick(2); }
  // ждать, пока движущаяся платформа подъедет: её ближний край (локально) в окне [lo, hi]
  function waitPlatform(lo, hi) { const o = __origin(); let n = 0;
    while (n++ < 1200) { tick(); const m = __phys.solids.find((s) => s.delta && s.delta.lengthSq() > 0 && Math.abs(s.box.max.z - o.z - (lo + hi) / 2) < 12);
      if (m && m.box.max.z - o.z <= hi && m.box.max.z - o.z >= lo) return; } }
  // ехать на платформе, пока её дальний край не станет ближе limit
  function ride(limit) { let n = 0; while (n++ < 900) { tick(); const g = __ctl.ground; if (g && g.delta && g.box.min.z - __origin().z < limit) return; } }
  const S = [
    () => { go(-2.2); place(); leap(-4.4, -10); },
    () => { go(-2.2); place(); go(-4.2); place(); leap(-6.4, -12); },
    () => { go(-4.2); place(); hop(-9); },
    () => { go(-4.2); place(); place(); hop(-9); },
    () => { go(-2.2); place(); leap(-4.4, -10); go(-12.2); place(); leap(-14.4, -20); },
    () => { go(-2.2); place(); go(-4.2); place(); go(-6.2); place(); leap(-8.4, -14); },
    () => { go(-2.2); place(); leap(-4.4, -10); go(-10.2); place(); hop(-15); },
    () => { go(-4.2); place(); place(); hop(-9); },
    () => { go(-2.2); place(); go(-4.2); place(); leap(-6.4, -12); go(-12.2); place(); hop(-17); },
    () => { go(-2.2); place(); go(-4.2); place(); go(-6.2); place(); go(-8.2); place(); leap(-10.4, -16); },
    () => { go(-2.2); place(); go(-4.2); place(); leap(-6.4, -12); },
    () => { go(-2.4); waitPlatform(-5.5, -4.8); leapTo(-2.6, -6); ride(-18.6); leap(99, -22); },
    () => { hop(-9); },
    () => { go(-2.4); leapTo(-2.6, -5.4); leapTo(-6.6, -9.4); leapTo(-10.6, -13.4); leapTo(-14.6, -18.2); hop(-26); },
  ];
  const out = [];
  S.forEach((f, i) => {
    __goto(i); tick(30);
    const blocks = __bridge.left;
    // до трёх попыток: на вертушке и исчезайках бот может ошибиться, как и человек
    for (let a = 0; a < 3 && __stage() === i; a++) { if (a) { __goto(i); tick(240); } f(); } // 4 с ожидания: исчезайки успевают вернуться }
    // этап пройден, если игрок добрался до чекпоинта следующего (бот бежит до него)
    if (__stage() === i) { go(-40); }
    out.push(`этап ${i + 1}: ${__stage() > i ? 'ПРОЙДЕН' : 'НЕ ПРОЙДЕН'} (блоков было ${blocks}, осталось ${__bridge.left}) pos ${Object.values(loc()).map((v) => v.toFixed(1)).join(',')}`);
  });
  return out.join('\n');
})()
