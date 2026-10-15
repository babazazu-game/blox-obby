// Скриншоты для витрин (Яндекс, Y8) прямо из игры, в DEV.
// Открыть игру (?lang=en для английских), нажать ИГРАТЬ и выполнить в консоли:
//   eval(await (await fetch('/tools/store_shots.js')).text())
// Кадры ложатся в art/store/shots/ через dev-приёмник /__shot (vite.config.ts).
(async () => {
  const lang = new URLSearchParams(location.search).get('lang') === 'en' ? 'en' : 'ru';
  const r = __renderer, cam = __cam.camera;
  const shot = async (name, w, h) => {
    const pr = r.getPixelRatio();
    r.setPixelRatio(1); r.setSize(w, h, false);
    cam.aspect = w / h; cam.updateProjectionMatrix();
    __tick(1 / 60); r.render(__scene, cam);
    const url = r.domElement.toDataURL('image/png');
    r.setPixelRatio(pr); dispatchEvent(new Event('resize'));
    await fetch(`/__shot?name=${lang}_${name}.png`, { method: 'POST', body: url });
  };
  const run = (w, st, yaw = 0, n = 150) => {
    __startRun(w); __goto(st);
    for (let i = 0; i < n; i++) __tick(1 / 60);
    __cam.yaw += yaw;
    for (let i = 0; i < 30; i++) __tick(1 / 60);
  };
  const scenes = [
    ['1_hub', () => { __enterHub(); for (let i = 0; i < 240; i++) __tick(1 / 60); }],
    ['2_meadow', () => run(0, 4, 0.5)],
    ['3_candy', () => run(1, 5, -0.4)],
    ['4_lava', () => run(2, 2, 0.6)],
    ['5_show', () => run(4, 1, 0.3)],
    ['6_tower', () => run(6, 9, 0.9, 200)],
  ];
  for (const [name, set] of scenes) {
    set(); await shot(name + '_1920x1080', 1920, 1080);
    set(); await shot(name + '_1080x1920', 1080, 1920);
  }
  __enterHub();
  return 'готово: ' + scenes.length * 2 + ' кадров';
})();
