/**
 * Точка входа. Порядок запуска здесь — не «как получилось», а требование
 * площадки, и менять его местами нельзя.
 *
 *   1. Экран загрузки уже на экране: он в разметке, а не в движке.
 *   2. Ждём SDK. Язык обязан быть известен ДО первого кадра (п. 2.14):
 *      показать интерфейс по-английски и через секунду переписать по-русски —
 *      ровно то замечание, которое эта команда уже получала.
 *   3. Поднимаем рендерер и сцену.
 *   4. Грузим ассеты, двигая полосу.
 *   5. Убираем экран загрузки и говорим площадке `LoadingAPI.ready()` —
 *      когда картинка ДЕЙСТВИТЕЛЬНО видна, но не позже 90 секунд (п. 1.19.2).
 *
 * Ни один шаг не имеет права подвесить игру навсегда: у SDK бывает плохой
 * день, у сети тоже. Поэтому ожидания идут со сроком, а по его истечении
 * игра просто продолжает без площадки.
 */


import { pixelRatio, splashCaption, splashHide, splashProgress } from 'yg-core';
import { core } from './core.ts';
import { t } from './i18n.ts';
import { showStickyBanner } from './ads.ts';
import { createScene, type Game } from './game.ts';

/**
 * Ждать чего-либо дольше этого нельзя: игрок смотрит на полосу загрузки.
 * Если SDK не ответил, игра запускается без него — локально это обычное дело.
 */
// Локально и на GitHub Pages SDK нет вовсе — ждать 8 с при каждой перезагрузке незачем.
const SDK_DEADLINE_MS = /^(localhost|127.0.0.1)$|github.io$/.test(location.hostname) ? 800 : 8000;

/** Докуда доходит полоса, пока ждём SDK. Дальше её двигают ассеты. */
const HEAD_START = 0.34;

function withDeadline<T>(promise: Promise<T>, ms: number): Promise<T | null> {
  return Promise.race([
    promise.then((v) => v).catch(() => null),
    new Promise<null>((resolve) => setTimeout(() => resolve(null), ms)),
  ]);
}

async function boot(): Promise<void> {
  splashProgress(0.08);

  await withDeadline(core.ready, SDK_DEADLINE_MS);

  // Подпись появляется ТОЛЬКО теперь: до этого язык неизвестен, а написать
  // не на том языке и переписать — то самое нарушение п. 2.14.
  splashCaption(t('loading'));
  splashProgress(HEAD_START);

  const parent = document.getElementById('game')!;
  const game = createScene(parent);

  watchSize(game, parent);
  // Счётчик кадров — свой, игровой (engine/fps.ts): каркасный налезал на плашку этапа.

  await game.load((value) => splashProgress(HEAD_START + (1 - HEAD_START) * value));

  game.start();

  // Кадр отрисован — только теперь убираем заставку и отчитываемся площадке.
  requestAnimationFrame(() => {
    splashHide();
    core.loadingReady();
    void showStickyBanner();
  });
}

/**
 * Размер холста: физические пиксели внутри, CSS-пиксели снаружи.
 *
 * ── ПОЧЕМУ НЕ ПРОСТО `setSize(clientWidth, clientHeight)` ────────────────
 *
 * Потому что на телефоне с `devicePixelRatio` 3 это втрое меньше настоящего
 * разрешения экрана, и браузер растянет готовую картинку обратно. Мылится
 * всё разом — и модели, и текст, — сколько бы ни было пикселей в текстурах.
 * Ровно на это в прошлой игре была жалоба «плохое качество на телефоне».
 *
 * `setPixelRatio` решает это в одну строку, но плотность ему надо давать
 * УРЕЗАННУЮ: `devicePixelRatio` на телефонах бывает 3 и 4, а закрашивать
 * приходится в квадрат от него. Потолок держит `yg-core/viewport`.
 *
 * ── ПОЧЕМУ ЧЕРЕЗ ResizeObserver, А НЕ ПО СОБЫТИЮ `resize` ────────────────
 *
 * Размер контейнера меняется не только от поворота окна: sticky-баннер
 * площадки может забрать себе полосу внизу, а адресная строка телефона —
 * появиться и исчезнуть, не тронув `window.resize`. Наблюдатель ловит все
 * эти случаи одинаково.
 */
function watchSize(game: Game, parent: HTMLElement): void {
  let last = { w: 0, h: 0, dpr: 0 };

  const sync = (): void => {
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    const dpr = pixelRatio();
    if (w === last.w && h === last.h && dpr === last.dpr) return;
    last = { w, h, dpr };
    if (w <= 0 || h <= 0) return;

    game.renderer.setPixelRatio(dpr);
    game.renderer.setSize(w, h, true);
    game.resize(w, h);
  };

  sync();

  if (typeof ResizeObserver !== 'undefined') new ResizeObserver(sync).observe(parent);
  else window.addEventListener('resize', sync);

  // Поворот телефона доезжает не сразу: вёрстка успевает не всегда, и замер
  // на самом событии даёт старые размеры. Повтор следующим кадром дёшев.
  window.addEventListener('orientationchange', () => {
    sync();
    requestAnimationFrame(sync);
  });
}

void boot();
