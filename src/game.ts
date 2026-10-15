/**
 * Сборка игры «Обби: Блок за блоком».
 *
 * Два режима:
 *  - ХАБ — стартовая площадь: лавки (скины, улучшения, питомцы, следы), сундук дня,
 *    доска рекордов и порталы в миры по кругу (следующий открывается, когда пройден предыдущий);
 *  - ЗАБЕГ — трасса мира (8 этапов-головоломок моста), в конце — награда и назад в хаб.
 *
 * Все трассы строятся при загрузке далеко друг от друга (по 1 км): туман прячет
 * чужие миры, а отсечение по экрану не рисует их вовсе. Так переход в мир —
 * мгновенный телепорт без подгрузки.
 *
 * Что важно сохранить (из заготовки base-three): resize по фактическому размеру,
 * setAnimationLoop, пауза по уходу со вкладки (п. 1.3), load() доводит полосу до конца.
 */

import * as THREE from 'three';
import { core } from './core.ts';
import { createWorld, block, CLASSIC, cloudsAlong, mergeStatic } from './engine/world.ts';
import { Decor, MEADOW, decorateCourse } from './engine/decor.ts';
import { Avatar } from './engine/avatar.ts';
import { Input } from './engine/input.ts';
import { FollowCamera } from './engine/camera.ts';
import { Controller } from './engine/controller.ts';
import { Physics } from './engine/physics.ts';
import { buildLevel, markReached } from './engine/level.ts';
import { Hazards } from './engine/hazards.ts';
import { Bots, BOT_MAT } from './engine/bots.ts';
import { Hud, coinHtml } from './engine/hud.ts';
import { FpsMeter } from './engine/fps.ts';
import { sfx } from './engine/sfx.ts';
import { Coins } from './engine/coins.ts';
import { Particles } from './engine/particles.ts';
import { Shop } from './engine/shop.ts';
import { Pet, makePet } from './engine/pet.ts';
import { Portal, Stall, Chest, textSprite, setSpriteText } from './engine/hub.ts';
import { COURSES, HINTS } from './game/levels.ts';
import { WORLDS } from './game/worlds.ts';
import { Bridge, WOOD } from './game/bridge.ts';
import { SKINS } from './game/skins.ts';
import { UPGRADES, PETS, TRAILS } from './game/upgrades.ts';
import { progress } from './progress.ts';
import { L } from './i18n.ts';
import { watchRewarded, interstitialBetweenLevels } from './ads.ts';

export interface Game {
  renderer: THREE.WebGLRenderer;
  resize(width: number, height: number): void;
  load(onProgress: (value: number) => void): Promise<void>;
  start(): void;
}

/** Награды: чекпоинт 5, финиш мира 50 + 25 за каждый следующий мир (монета трассы — 1 × бонусы). */
const COIN_CP = 5, COIN_FINISH = 50, FIRST_CLEAR = 100;
/** После стольких падений на одном этапе предлагаем пропустить его за ролик. */
const SKIP_AFTER = 5;
/** Лидерборд площадки (создать в Консоли с этим техническим именем). */
const LB_WINS = 'wins';
/** Упал на столько ниже точки возрождения — возвращаем на неё. */
const FALL_LIMIT = 20;

export function createScene(parent: HTMLElement): Game {
  const world = createWorld(parent, { ...CLASSIC, cloudSea: true });
  const { renderer, scene, followShadow } = world;
  const cam = new FollowCamera();
  const input = new Input(parent);
  const physics = new Physics();
  const hazards = new Hazards(physics);
  const hud = new Hud(parent);
  // draw calls рядом с FPS: сразу видно, не разросся ли декор
  const fps = new FpsMeter(parent, () => `DC ${renderer.info.render.calls}`);
  const fx = new Particles(scene);
  const tmp = new THREE.Vector3();

  /* ────────────────────────────── ХАБ ────────────────────────────── */
  const HUB = new THREE.Vector3(0, 0, 0);
  // Площадь и всё на ней расставлено по кругу: угол θ от «севера» (−Z) по часовой.
  const ring = (deg: number, r: number) => new THREE.Vector3(Math.sin(deg * Math.PI / 180) * r, 0, -Math.cos(deg * Math.PI / 180) * r);
  const faceCenter = (p: THREE.Vector3) => Math.atan2(-p.x, -p.z);   // проём/прилавок — лицом к центру
  const plaza = block({ x: 54, y: 2, z: 54 }, 0x52c23a);
  plaza.position.set(0, -1, 0);
  scene.add(plaza);
  physics.addMesh(plaza);
  // дорожки от центра к каждому порталу — видно, куда идти
  // порталы по кругу через равный угол; лавки, сундук и доска — посередине между ними
  const STEP = 360 / WORLDS.length;
  const HALF = (k: number) => (k + 0.5) * STEP;
  for (let i = 0; i < WORLDS.length; i++) {
    const path = block({ x: 3.5, y: 0.1, z: 19 }, 0xe8d8b0);
    const mid = ring(i * STEP, 10);
    path.position.set(mid.x, 0.05, mid.z); path.rotation.y = -i * STEP * Math.PI / 180; path.receiveShadow = true;
    scene.add(path);
  }
  {
    const d = new Decor(MEADOW, 77);
    d.root(new THREE.Vector3(0, 0, 0), 40);
    // ёлки по краю площади, с проходами к порталам
    for (let i = 0; i < 40; i++) {
      const deg = (i / 40) * 360;
      if (WORLDS.some((_, k) => Math.abs(((deg - k * STEP + 540) % 360) - 180) < 12)) continue;
      const p = ring(deg, 24.5);
      d.tree(p.x, 0, p.z, d.range(0.8, 1.2));
    }
    for (let i = 0; i < 8; i++) d.island(Math.cos(i * 0.8) * d.range(45, 70), d.range(-8, 6), Math.sin(i * 0.8) * d.range(45, 70), d.range(6, 12));
    d.tower(-65, 0, -55, WORLDS[0].track);
    d.flush(scene, physics);
  }
  // порталы по кругу: каждый мир — в свою сторону
  const portals = WORLDS.map((w, i) => { const p = ring(i * STEP, 20); return new Portal(scene, physics, p, faceCenter(p), w.portal, w.name); });
  const stallAt = (deg: number) => { const p = ring(deg, 11.5); return [p, faceCenter(p)] as const; };
  const stalls = {
    skins: new Stall(scene, physics, ...stallAt(HALF(6)), 0xff7a2f, L('Скины', 'Skins'), '👕'),
    upg: new Stall(scene, physics, ...stallAt(HALF(0)), 0x2a74e8, L('Улучшения', 'Upgrades'), '⚡'),
    pets: new Stall(scene, physics, ...stallAt(HALF(2)), 0x9b59d0, L('Питомцы', 'Pets'), '🐾'),
    trails: new Stall(scene, physics, ...stallAt(HALF(4)), 0xff6fb5, L('Следы', 'Trails'), '✨'),
  };
  const chest = new Chest(scene, physics, ring(HALF(1), 7));
  const board = textSprite([L('РЕКОРДЫ', 'RECORDS')], { w: 512, h: 400 });
  board.scale.set(5, 3.9, 1);
  board.position.copy(ring(HALF(5), 19)).setY(3.6);
  scene.add(board);
  {
    const post = block({ x: 0.3, y: 1.6, z: 0.3 }, 0x444a52);
    post.position.copy(ring(HALF(5), 19)).setY(0.8); post.userData.static = true; scene.add(post);
  }

  {
    // Неподвижные кубики хаба (лавки, арки порталов, столб доски) — склеить по цвету:
    // по отдельности это ~100 вызовов отрисовки (и ещё столько же в тенях).
    const st: THREE.Mesh[] = [];
    scene.traverse((o) => { if ((o as THREE.Mesh).isMesh && o.userData.static) st.push(o as THREE.Mesh); });
    mergeStatic(scene, st);
  }

  /* ───────────────────────────── МИРЫ ───────────────────────────── */
  /** Колонна в центре спирали башни: полосы цветов мира, сверху — флаг-корона. */
  function towerColumn(scene: THREE.Scene, physics: Physics, pts: THREE.Vector3[], colors: number[]): void {
    const cx = pts.reduce((a, p) => a + p.x, 0) / pts.length, cz = pts.reduce((a, p) => a + p.z, 0) / pts.length;
    const top = Math.max(...pts.map((p) => p.y)) + 12, bottom = -30;
    const meshes: THREE.Mesh[] = [];
    for (let y = bottom, k = 0; y < top; y += 4, k++) {
      const m = block({ x: 9, y: 4, z: 9 }, colors[k % colors.length]);
      m.position.set(cx, y + 2, cz); scene.add(m); physics.addMesh(m, 'decor'); meshes.push(m);
    }
    const crown = block({ x: 11, y: 1, z: 11 }, 0xffd23a); crown.position.set(cx, top + 0.5, cz); scene.add(crown); meshes.push(crown);
    mergeStatic(scene, meshes);
  }
  const courses = COURSES.map((defs, i) => {
    const origin = new THREE.Vector3(1000 * (i + 1), 0, 0);
    const stages = buildLevel(defs, scene, physics, hazards, { origin, colors: WORLDS[i].track });
    decorateCourse(scene, stages, WORLDS[i].palette, WORLDS[i].track, 100 + i, physics);
    cloudsAlong(scene, stages.map((s) => s.origin));
    if (WORLDS[i].id === 'tower') towerColumn(scene, physics, stages.map((s) => s.origin), WORLDS[i].track);
    return { stages, coins: new Coins(scene, stages) };
  });
  cloudsAlong(scene, [HUB, new THREE.Vector3(30, 0, 0), new THREE.Vector3(-30, 0, 0), new THREE.Vector3(0, 0, 30), new THREE.Vector3(0, 0, -30)]);

  /* ──────────────────────────── ИГРОК ───────────────────────────── */
  const skinLook = (id: string) => (SKINS.find((k) => k.id === id) ?? SKINS[0]).look;
  let player = new Avatar(skinLook(progress.get('skin')));
  scene.add(player.root);
  const ctl = new Controller(player, (p, v, dt) => physics.move(p, v, dt));
  const wearSkin = (id: string) => {
    progress.set('skin', id);
    scene.remove(player.root);
    player = new Avatar(skinLook(id));
    scene.add(player.root);
    ctl.setAvatar(player);
  };
  let pet: Pet | null = null;
  const setPet = (id: string) => {
    progress.set('pet', id);
    pet?.dispose(scene); pet = null;
    const it = PETS.find((p) => p.id === id);
    if (it && it.id !== 'none') { pet = new Pet(scene, it.look); pet.group.position.copy(ctl.pos); }
  };
  const trailColors = () => TRAILS.find((tr) => tr.id === progress.get('trail'))?.colors ?? [];
  const bridge = new Bridge(scene, physics, ctl, parent);
  const bots = new Bots(scene, physics, 6, hazards);

  /* ───────────────────────────── СОСТОЯНИЕ ───────────────────────── */
  let mode: 'menu' | 'hub' | 'run' = 'menu';
  let wi = 0;                      // текущий мир
  let reached = 0;                 // достигнутый чекпоинт в забеге
  let runTime = 0, falls = 0, runCoins = 0, coinFrac = 0, chutes = 0, stageFalls = 0;
  /** На время рекламы игра стоит (звук глушит каркас). */
  let adPaused = false;
  /** DEV: камера следит не за игроком, а за этой точкой (съёмка роликов — за ботом). */
  let camTarget: THREE.Vector3 | null = null;
  const withAd = async <T,>(show: () => Promise<T>): Promise<T> => {
    adPaused = true; core.gameplayStop();
    try { return await show(); } finally { adPaused = false; clock.getDelta(); if (mode !== 'menu') core.gameplayStart(); }
  };
  const lastSafe = new THREE.Vector3();
  let t = 0;
  const course = () => courses[wi];
  /** В башне под трассой — предыдущий виток: упал ниже чекпоинта на 7 м — начинай с него. */
  const fallLimit = () => (WORLDS[wi].id === 'tower' ? 7 : FALL_LIMIT);
  const lvl = (id: string) => progress.get('upgrades')[id] ?? 0;

  const addCoins = (n: number) => {
    if (n <= 0) return;
    runCoins += n;
    progress.set('coins', progress.get('coins') + n);
    hud.setCoins(progress.get('coins'));
  };
  /** Монеты трассы: копилка (+1 за уровень) и питомец (+%); дробная часть копится. */
  const trackCoins = (n: number) => {
    const bonus = PETS.find((p) => p.id === progress.get('pet'))?.bonus ?? 0;
    coinFrac += n * (1 + lvl('piggy')) * (1 + bonus);
    const whole = Math.floor(coinFrac);
    coinFrac -= whole;
    addCoins(whole);
  };
  hud.setCoins(progress.get('coins'));
  // громкость из настроек (⚙️): звуки и музыка — каждый своим ползунком
  sfx.setSfxVolume(progress.get('sfxVol') ?? 1);
  sfx.setMusicVolume(progress.get('musicVol') ?? 1);
  hud.setVolumes(progress.get('sfxVol') ?? 1, progress.get('musicVol') ?? 1);
  hud.onVolume = (kind, v) => {
    if (kind === 'sfx') { sfx.setSfxVolume(v); progress.set('sfxVol', v); sfx.play('coin', 0); }
    else { sfx.setMusicVolume(v); progress.set('musicVol', v); }
  };

  const fmtTime = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  const refreshHub = () => {
    const un = progress.get('unlocked'), best = progress.get('best');
    portals.forEach((p, i) => p.setLocked(i >= un, i >= un ? L('🔒 ЗАКРЫТО', '🔒 LOCKED') : best[WORLDS[i].id] ? `⏱ ${fmtTime(best[WORLDS[i].id])}` : L('ВХОД', 'ENTER')));
    setSpriteText(board, [L('РЕКОРДЫ', 'RECORDS'), ...WORLDS.map((w) => `${w.name}  ${best[w.id] ? fmtTime(best[w.id]) : '—'}`)]);
  };

  /* ───────────────────────────── ЛАВКИ ───────────────────────────── */
  const buy = (price: number): boolean => {
    if (progress.get('coins') < price) { sfx.play('denied', 0); return false; }
    progress.set('coins', progress.get('coins') - price);
    hud.setCoins(progress.get('coins'));
    sfx.play('coin', 0);
    return true;
  };
  const closeShop = () => { core.gameplayStart(); hud.showHud(true); bridge.setVisible(mode === 'run'); };
  const T = { buy: L('Купить', 'Buy'), wear: L('Надеть', 'Wear'), worn: L('Надето', 'Worn'), close: L('Закрыть', 'Close'), max: L('МАКС', 'MAX') };
  const shops = {
    skins: new Shop(parent, SKINS, () => ({ coins: progress.get('coins'), owned: progress.get('owned'), selected: progress.get('skin') }),
      (id) => { const it = SKINS.find((k) => k.id === id)!; if (!buy(it.price)) return false; progress.set('owned', [...progress.get('owned'), id]); return true; },
      (id) => { wearSkin(id); sfx.play('click', 0); }, closeShop, { title: L('СКИНЫ', 'SKINS'), ...T }),
    upg: new Shop(parent, UPGRADES.map((u) => ({ id: u.id, name: u.name, icon: u.icon, prices: u.prices, desc: u.desc })),
      () => ({ coins: progress.get('coins'), levels: progress.get('upgrades') }),
      (id) => {
        const u = UPGRADES.find((x) => x.id === id)!, l = lvl(id);
        if (l >= u.prices.length || !buy(u.prices[l])) return false;
        progress.set('upgrades', { ...progress.get('upgrades'), [id]: l + 1 });
        fx.emit('confetti', tmp.copy(ctl.pos).setY(ctl.pos.y + 2), 0.6);
        return true;
      }, () => undefined, closeShop, { title: L('УЛУЧШЕНИЯ', 'UPGRADES'), ...T }),
    pets: new Shop(parent, PETS.map((p) => ({ id: p.id, name: p.name, price: p.price, ...(p.id === 'none' ? { icon: '🚫' } : { make: () => makePet(p.look) }) })),
      () => ({ coins: progress.get('coins'), owned: progress.get('pets'), selected: progress.get('pet') }),
      (id) => { const it = PETS.find((p) => p.id === id)!; if (!buy(it.price)) return false; progress.set('pets', [...progress.get('pets'), id]); return true; },
      (id) => { setPet(id); sfx.play('click', 0); }, closeShop, { title: L('ПИТОМЦЫ', 'PETS'), ...T }),
    trails: new Shop(parent, TRAILS.map((tr) => ({ id: tr.id, name: tr.name, price: tr.price, ...(tr.colors.length ? { colors: tr.colors } : { icon: '🚫' }) })),
      () => ({ coins: progress.get('coins'), owned: progress.get('trails'), selected: progress.get('trail') }),
      (id) => { const it = TRAILS.find((x) => x.id === id)!; if (!buy(it.price)) return false; progress.set('trails', [...progress.get('trails'), id]); return true; },
      (id) => { progress.set('trail', id); sfx.play('click', 0); }, closeShop, { title: L('СЛЕДЫ', 'TRAILS'), ...T }),
  };
  const openShop = (s: Shop) => { core.gameplayStop(); sfx.play('click', 0); hud.showHud(false); bridge.setVisible(false); s.open(); };
  const shopOpen = () => !!parent.querySelector('.shop.on');

  /* ───────────────────────────── ПЕРЕХОДЫ ───────────────────────── */
  const enterStage = (i: number) => {
    const st = course().stages[i];
    const b = st.def?.blocks ?? 0;
    bridge.startStage(st.origin, b > 0 ? b + lvl('spare') : 0);
    const h = st.def?.hint;
    hud.hint(h ? HINTS[h] ?? null : null);
    hud.setStage(`${WORLDS[wi].name} · ${i + 1} / ${course().stages.length - 1}`, i / (course().stages.length - 1));
    cam.turnTo(st.yaw + Math.PI);
    stageFalls = 0;
    hud.showSkip(null);
  };

  /** Пропуск этапа за ролик: ставим игрока на следующий чекпоинт — дальше обычная логика. */
  const skipStage = async () => {
    if (mode !== 'run') return;
    if (!(await withAd(watchRewarded))) return;
    const next = course().stages[reached + 1];
    if (!next) return;
    hud.showSkip(null);
    ctl.pos.copy(next.spawn).setY(next.spawn.y + 0.3); ctl.vel.set(0, 0, 0);
  };

  const enterHub = () => {
    mode = 'hub';
    world.setSky(WORLDS[0].sky, WORLDS[0].fog);
    bridge.clearAll();
    bridge.startStage(HUB, 0);
    bridge.setVisible(false);
    ctl.setSpawn(new THREE.Vector3(0, 0.01, 3), Math.PI);
    ctl.respawn();
    bots.toHub(HUB, 16);
    for (const p of portals) p.trigger.reset();
    hud.setStage(L('ХАБ', 'HUB'), 0);
    hud.hint(L('Выбери портал — или загляни в лавки 🛒', 'Pick a portal — or visit the shops 🛒'));
    hud.showHomeButton(false);
    hud.showSkip(null);
    core.gameplayStart();
    cam.turnTo(0);
    pet?.group.position.copy(ctl.pos);
    refreshHub();
  };

  const startRun = (w: number) => {
    mode = 'run';
    wi = w;
    reached = 0; runTime = 0; falls = 0; runCoins = 0; coinFrac = 0;
    chutes = lvl('chute');
    const c = course();
    hazards.resetAll();
    c.coins.reset();
    c.coins.pick = 1.3 + lvl('magnet');
    for (const st of c.stages) (st.pad.material as THREE.MeshStandardMaterial).color.setHex(st.index === c.stages.length - 1 ? 0xf7c41c : 0x8e98a6);
    world.setSky(WORLDS[w].sky, WORLDS[w].fog);
    bridge.clearAll();
    ctl.setSpawn(c.stages[0].spawn, c.stages[0].yaw);
    ctl.respawn();
    lastSafe.copy(ctl.pos);
    bots.fallLimit = fallLimit();
    bots.toCourse(c.stages);
    bridge.setVisible(true);
    enterStage(0);
    hud.showHomeButton(true);
    hud.toast(`${L('МИР', 'WORLD')}: ${WORLDS[w].name}`, 1600);
    sfx.play('checkpoint', 0, 0.5);   // вход в мир — вдвое тише (просьба пользователя)
    cam.yaw = c.stages[0].yaw + Math.PI;
    pet?.group.position.copy(ctl.pos);
  };

  const finish = () => {
    mode = 'hub';   // пока висит карточка — забег закончен
    bridge.startStage(course().stages[reached].origin, 0);
    hud.hint(null);
    hud.toast(L('ФИНИШ!', 'FINISH!'), 1600);
    sfx.play('finish', 0);
    fx.emit('confetti', tmp.copy(ctl.pos).setY(ctl.pos.y + 1.5), 2.5);
    addCoins(COIN_FINISH + 25 * wi);
    const id = WORLDS[wi].id, best = { ...progress.get('best') };
    // первое прохождение мира — бонус: первые миры проходятся один раз,
    // и без бонуса после них не на что купить даже дешёвый скин
    if (!best[id]) { addCoins(FIRST_CLEAR); hud.toast(`${L('ПЕРВОЕ ПРОХОЖДЕНИЕ', 'FIRST CLEAR')} +${FIRST_CLEAR}`, 1800); }
    const record = !best[id] || runTime < best[id];
    if (record) best[id] = runTime;
    const was = progress.get('unlocked');
    hud.showSkip(null);
    core.gameplayStop();
    core.leaderboards.submit(LB_WINS, progress.get('runs') + 1);
    progress.patch({ best, runs: progress.get('runs') + 1, unlocked: Math.max(was, Math.min(WORLDS.length, wi + 2)) });
    const opened = progress.get('unlocked') > was;
    const stars = falls <= 3 ? 3 : falls <= 10 ? 2 : 1;
    setTimeout(() => hud.showFinish({
      title: record ? L('НОВЫЙ РЕКОРД!', 'NEW RECORD!') : L('ТЫ ПРОШЁЛ!', 'YOU MADE IT!'), stars,
      line: `⏱ ${fmtTime(runTime)}   💀 ${falls}   ${coinHtml()} +${runCoins}${opened ? `<br>🔓 ${L('Открыт мир', 'Unlocked')} ${WORLDS[wi + 1].name}!` : ''}`,
      next: L('В ХАБ', 'TO HUB'),
      bonus: { label: L(`📺 ×2 монеты (+${runCoins})`, `📺 ×2 coins (+${runCoins})`), onClick: async () => {
        const got = runCoins;
        if (!(await withAd(watchRewarded))) return false;
        addCoins(got); sfx.play('coin', 0);
        return true;
      } },
    }, () => void withAd(interstitialBetweenLevels).then(enterHub)), 1400);
  };

  hud.onHome = () => { if (mode === 'run') { sfx.play('click', 0); mode = 'hub'; void withAd(interstitialBetweenLevels).then(enterHub); } };

  const openMenu = () => {
    mode = 'menu';
    core.gameplayStop();
    hud.showHud(false);
    bridge.setVisible(false);
    hud.showMenu({ title1: L('ОББИ:', 'OBBY:'), title2: L('БЛОК ЗА БЛОКОМ', 'BLOCK BY BLOCK'), play: L('ИГРАТЬ', 'PLAY'), sub: `${coinHtml()} ${progress.get('coins')}` }, () => {
      sfx.play('click', 0);
      void sfx.startMusic();   // музыка — с нажатием «ИГРАТЬ»: раньше браузер звук не разрешает
      hud.showHud(true);
      enterHub();
    });
  };

  /* ───────────────────────────── СОБЫТИЯ ────────────────────────── */
  bridge.onReset = () => ctl.respawn();
  bridge.onSound = (n, at) => {
    sfx.play(n);
    if (n === 'place') fx.emit('wood', tmp.copy(at).setY(at.y + 0.5));
    if (n === 'remove') fx.emit('poof', at, 0.6);
  };
  ctl.onJump = () => sfx.play('jump');
  ctl.onLand = (v) => {
    if (v > 9) sfx.play('land');
    fx.emit('dust', tmp.copy(ctl.pos).setY(ctl.pos.y + 0.1), Math.min(1.6, v / 12));
  };

  /* ───────────────────────────── ШАГ ИГРЫ ───────────────────────── */
  const fwd = new THREE.Vector3();
  let trailT = 0;
  /** Один шаг игры (без отрисовки) — его же гоняют проверки в DEV. */
  const tick = (dt: number) => {
    t += dt;
    input.update();
    const frozen = hud.menuOpen || shopOpen();
    if (frozen) { input.state.move.x = input.state.move.y = 0; input.state.jump = false; }
    const look = input.consumeLook();
    if (!frozen) cam.rotate(look.x, look.y, look.zoom);
    if (mode === 'menu') { cam.yaw += dt * 0.12; cam.pitch = 0.3; }

    // Опасности — до контроллера: платформа уже сдвинулась, батут уже подбросил.
    hazards.tick(dt);
    const ev = hazards.affect(ctl, dt);
    if (ev === 'bounce') sfx.play('bounce', 0.1);
    if (ev === 'bump') { sfx.play('bounce', 0.15); cam.shake(0.2); fx.emit('poof', tmp.copy(ctl.pos).setY(ctl.pos.y + 1.2), 0.6); }
    if (ev === 'break') { sfx.play('remove', 0); fx.emit('wood', tmp.copy(ctl.pos).setY(ctl.pos.y + 1.5), 2); }
    ctl.update(dt, input.state.move, input.state.jump, cam.forward(fwd));

    if (mode === 'run') {
      runTime += dt;
      const g = ctl.ground;
      // «Безопасное» место для парашюта: стоим на обычной опоре (не на лаве/исчезайке/ленте)
      if (ctl.grounded && g && (!g.kind || g.kind === 'checkpoint' || g.kind === 'placed')) lastSafe.copy(ctl.pos);
      const fell = ctl.pos.y < ctl.spawn.y - fallLimit();
      if (ev === 'kill' || fell) {
        if (ev === 'kill') { fx.emit('lava', tmp.copy(ctl.pos).setY(ctl.pos.y + 0.8)); cam.shake(0.35); }
        sfx.play(ev === 'kill' ? 'lava' : 'respawn', 0);
        falls++;
        if (++stageFalls >= SKIP_AFTER) hud.showSkip(L('⏭ Пропустить этап 📺', '⏭ Skip stage 📺'), () => void skipStage());
        if (chutes > 0) {
          // парашют: обратно туда, где стоял, а не на чекпоинт
          chutes--;
          ctl.pos.copy(lastSafe).setY(lastSafe.y + 0.5); ctl.vel.set(0, 0, 0);
          hud.toast(`🪂 ×${chutes}`, 800);
        } else ctl.respawn();
        fx.emit('poof', tmp.copy(ctl.pos).setY(ctl.pos.y + 1.2));
      }
      // Встал на чекпоинт своей трассы дальше достигнутого — он становится точкой возрождения.
      const stg = (g as (typeof g & { stage?: number }) | null)?.stage;
      const c = course();
      if (stg !== undefined && stg > reached && c.stages[stg]?.checkpoint === g) {
        for (let i = reached + 1; i <= stg; i++) markReached(c.stages[i]);
        reached = stg;
        ctl.setSpawn(c.stages[reached].spawn, c.stages[reached].yaw);
        if (reached < c.stages.length - 1) {
          enterStage(reached);
          hud.toast(L('ЧЕКПОИНТ!', 'CHECKPOINT!')); sfx.play('checkpoint', 0); addCoins(COIN_CP);
          fx.emit('confetti', tmp.copy(ctl.pos).setY(ctl.pos.y + 1.5));
        } else finish();
      }
      const got = c.coins.update(dt, ctl.pos);
      if (got) { trackCoins(got); sfx.play('coin'); fx.emit('coin', tmp.copy(ctl.pos).setY(ctl.pos.y + 1.6)); }
    } else {
      course().coins.update(dt, null);
      if (ctl.pos.y < -15) { ctl.respawn(); sfx.play('respawn', 0); }
    }

    if (mode === 'hub' && !frozen) {
      portals.forEach((p, i) => {
        if (!p.trigger.enter(ctl.pos)) return;
        if (i < progress.get('unlocked')) startRun(i);
        else { sfx.play('denied', 0); hud.toast(`🔒 ${L('Сначала пройди', 'First beat')} ${WORLDS[i - 1].name}`, 1500); }
      });
      if (stalls.skins.trigger.enter(ctl.pos)) openShop(shops.skins);
      if (stalls.upg.trigger.enter(ctl.pos)) openShop(shops.upg);
      if (stalls.pets.trigger.enter(ctl.pos)) openShop(shops.pets);
      if (stalls.trails.trigger.enter(ctl.pos)) openShop(shops.trails);
      if (chest.trigger.enter(ctl.pos)) {
        const today = new Date().toISOString().slice(0, 10);
        if (progress.get('chest') !== today) {
          const n = 30 + Math.floor(Math.random() * 31);
          progress.set('chest', today);
          addCoins(n);
          chest.pop();
          sfx.play('checkpoint', 0);
          fx.emit('coin', tmp.copy(chest.group.position).setY(1.8), 3);
          hud.toast(`🎁 +${n}`, 1500);
        } else { sfx.play('denied', 0); hud.toast(L('🎁 Приходи завтра!', '🎁 Come back tomorrow!'), 1300); }
      }
    }
    chest.update(dt, progress.get('chest') !== new Date().toISOString().slice(0, 10), t);
    for (const p of portals) p.update(t);

    bridge.update(ctl.yaw);
    bots.update(dt, reached, cam.camera.position, ctl.pos, ctl);
    fx.update(dt);
    const moving = Math.hypot(ctl.vel.x, ctl.vel.z) > 1;
    pet?.update(dt, ctl.pos, ctl.yaw, moving);
    // след: пара искр на бегу, не чаще — пул частиц общий
    const tc = trailColors();
    trailT -= dt;
    if (tc.length && moving && trailT <= 0) { fx.emit('trail', tmp.copy(ctl.pos).setY(ctl.pos.y + 0.4), 1, tc); trailT = 0.06; }
    cam.update(dt, camTarget ?? ctl.pos);
    followShadow(ctl.pos);
  };

  /* ───────────────────────────── DEV ─────────────────────────────── */
  const gotoStage = (i: number) => {
    if (mode !== 'run') startRun(wi);
    bridge.reset();
    reached = i;
    const st = course().stages[i];
    ctl.setSpawn(st.spawn, st.yaw);
    ctl.respawn();
    enterStage(i);
  };
  if (import.meta.env.DEV) {
    // Перескок для проверки: N/B — этап вперёд/назад, 1–6 — сразу в мир. Только в разработке.
    addEventListener('keydown', (e) => {
      if (mode === 'menu') return;
      if (e.code === 'KeyN') gotoStage(Math.min(reached + 1, course().stages.length - 2));
      if (e.code === 'KeyB') gotoStage(Math.max(reached - 1, 0));
      if (/^Digit[1-6]$/.test(e.code)) startRun(+e.code.slice(5) - 1);
    });
    Object.assign(window, {
      __renderer: renderer, __scene: scene, __ctl: ctl, __cam: cam, __bridge: bridge, __phys: physics, __tick: tick,
      __bots: bots, __fx: fx, __camFollow: (v: THREE.Vector3 | null) => { camTarget = v; player.root.visible = !v; if (pet) pet.group.visible = !v; }, __goto: gotoStage, __stage: () => reached, __origin: () => course().stages[reached].origin,
      __startRun: startRun, __enterHub: enterHub, __mode: () => mode, __courses: courses, __shops: shops, __openShop: openShop,
    });
  }

  let paused = false;
  const clock = new THREE.Clock();
  document.addEventListener('visibilitychange', () => {
    paused = document.hidden;
    if (!paused) clock.getDelta();
  });

  return {
    renderer,
    resize(width, height) { cam.resize(width, height); },
    async load(onProgress) {
      /*
       * Прогрев. Без него игра подвисала, когда в кадр ВПЕРВЫЕ попадал новый
       * материал (лава, лёд, голограмма бота, деревянный блок): видеокарта в этот
       * момент собирает под него шейдер и грузит текстуру. Делаем это сразу,
       * за полосой загрузки. Материалы, которых ещё нет в сцене, подкладываем кубиками.
       */
      ctl.setSpawn(new THREE.Vector3(0, 0.01, 3), Math.PI);
      ctl.respawn();
      bots.toHub(HUB, 16);
      setPet(progress.get('pet'));
      refreshHub();
      const warm = new THREE.Group();
      for (const m of [WOOD, BOT_MAT]) warm.add(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), m));
      warm.position.copy(ctl.pos);
      scene.add(warm);
      const hidden: THREE.Object3D[] = [];
      scene.traverse((o) => { if (!o.visible) { hidden.push(o); o.visible = true; } });
      scene.traverse((o) => {
        const mat = (o as THREE.Mesh).material as THREE.MeshStandardMaterial | THREE.MeshStandardMaterial[] | undefined;
        for (const m of mat ? (Array.isArray(mat) ? mat : [mat]) : []) for (const tx of [m.map, m.emissiveMap]) if (tx) renderer.initTexture(tx);
      });
      onProgress(0.4);
      await sfx.load();
      onProgress(0.6);
      await renderer.compileAsync(scene, cam.camera);
      // Шейдеров мало — дольше всего грузится ГЕОМЕТРИЯ: склеенные трассы и декор
      // уходят в видеокарту при первом попадании в кадр, и поворот камеры дёргался.
      // Один кадр «всё видно» (без отсечения) в маленькую цель — всё загружено заранее.
      const culled: THREE.Object3D[] = [];
      scene.traverse((o) => { if (o.frustumCulled) { culled.push(o); o.frustumCulled = false; } });
      const rt = new THREE.WebGLRenderTarget(64, 64);
      renderer.setRenderTarget(rt); renderer.render(scene, cam.camera); renderer.setRenderTarget(null);
      rt.dispose();
      for (const o of culled) o.frustumCulled = true;
      for (const o of hidden) o.visible = false;
      scene.remove(warm);
      onProgress(1);
    },
    start() {
      core.gameplayStart();
      openMenu();
      renderer.setAnimationLoop(() => {
        // Потолок шага: после подвисания вкладки не «телепортируемся» сквозь пол.
        const real = clock.getDelta();
        const dt = Math.min(real, 1 / 20);
        if (paused || adPaused) return;
        tick(dt);
        renderer.render(scene, cam.camera);
        fps.frame(real);
      });
    },
  };
}
