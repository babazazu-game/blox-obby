// Ролик геймплея ПОКАДРОВО (DEV): игра шагает ровно на 1/30 с, кадр рендерится в 1920×1080
// и 1080×1920 и уходит в art/store/film/<lang>_<land|port>/ через dev-приёмник (vite.config.ts).
// Скорость машины не важна — тормозов в ролике не будет. Собирает видео tools/film_make.py.
//
// Открыть игру (?lang=en — английский), нажать ИГРАТЬ и выполнить в консоли:
//   eval(await (await fetch('/tools/film.js')).text())
// Прогресс: window.__film ('кадр 120/900' … 'готово').
(() => {
  const lang = new URLSearchParams(location.search).get('lang') === 'en' ? 'en' : 'ru';
  const FPS = 30, DT = 1 / FPS;
  const r = __renderer, cam = __cam.camera;
  r.setAnimationLoop(null);
  r.setPixelRatio(1);
  const SIZES = [['land', 1920, 1080], ['port', 1080, 1920]];
  let frame = 0;

  const capture = async (override) => {
    for (const [tag, w, h] of SIZES) {
      r.setSize(w, h, false);
      cam.aspect = w / h;
      // в портрете кадр узкий — отводим камеру, чтобы трасса влезала
      cam.fov = tag === 'port' ? 70 : 55;
      cam.updateProjectionMatrix();
      if (override) override(tag);
      r.render(__scene, cam);
      const url = r.domElement.toDataURL('image/jpeg', 0.9);
      await fetch(`/__shot?dir=${lang}_${tag}&name=${String(frame).padStart(5, '0')}.jpg`, { method: 'POST', body: url });
    }
    frame++;
  };

  /** Сцена «за ботом»: мир w, этап st, сек. Камера держится за самым быстрым ботом. */
  const botScene = async (w, st, secs, pre = 1.5) => {
    __startRun(w);
    const c = __courses[w];
    __goto(Math.min(st + 1, c.stages.length - 2));     // игрок на этап впереди (иначе боты «догоняют» его), сам он спрятан
    const list = __bots.list;
    list.forEach((b, i) => { b.toCourse(c.stages); b.placeAt(st); b.waitT = i * 0.4; });
    for (let i = 0; i < pre * FPS; i++) __tick(DT);     // разбежались
    // ведущий — кто дальше всех по своей цепочке
    const lead = () => list.reduce((a, b) => (b.stage > a.stage ? b : a), list[0]);
    let hero = lead(), stage = -1;
    __camFollow(hero.ctl.pos);
    for (let i = 0; i < secs * FPS; i++) {
      if (hero.stage !== stage) { stage = hero.stage; __cam.turnTo(c.stages[Math.min(stage, c.stages.length - 1)].yaw + Math.PI); }
      __tick(DT);
      // ведущий упал и отстал — переключаемся на нового
      const l = lead();
      if (l.stage > hero.stage + 0) { hero = l; __camFollow(hero.ctl.pos); }
      await capture();
      window.__film = `кадр ${frame}`;
    }
    __camFollow(null);
  };

  /** Облёт: камера по кругу вокруг точки (центр хаба, башня). */
  const orbitScene = async (setup, center, radius, height, secs, lookY = center.y, spin = 0.35) => {
    setup();
    for (let i = 0; i < secs * FPS; i++) {
      __tick(DT);
      const a = i * DT * spin;
      await capture((tag) => {
        const k = tag === 'port' ? 1.35 : 1;
        cam.position.set(center.x + Math.sin(a) * radius * k, center.y + height * k, center.z + Math.cos(a) * radius * k);
        cam.lookAt(center.x, lookY, center.z);
      });
      window.__film = `кадр ${frame}`;
    }
  };

  const towerCenter = () => {
    const P = __courses[6].stages.map((s) => s.origin);
    const v = P[0].clone(); v.set(0, 0, 0);
    P.forEach((p) => v.add(p)); v.multiplyScalar(1 / P.length);
    return v;
  };

  (async () => {
    // 1. хаб с порталами
    await orbitScene(() => { __enterHub(); for (let i = 0; i < 60; i++) __tick(DT); }, { x: 0, y: 0, z: 0 }, 26, 13, 4, 2);
    // 2. ЛУГ: строят мост и башенку
    await botScene(0, 0, 5);
    // 3. КОНФЕТЫ: батут
    await botScene(1, 4, 4);
    // 4. ЛАВА: маятники над лавой
    await botScene(2, 2, 5);
    // 5. ШОУ: двери и тайная тропа
    await botScene(4, 2, 5);
    // 6. ФАБРИКА: ленты
    await botScene(5, 0, 4);
    // 7. БАШНЯ: подъём и облёт
    await botScene(6, 4, 4);
    const tc = towerCenter();
    await orbitScene(() => __startRun(6), tc, 48, 30, 5, tc.y + 10, 0.5);
    __enterHub();
    window.__film = `готово: ${frame} кадров`;
  })();
  return 'запущено';
})();
