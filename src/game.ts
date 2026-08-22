/**
 * Сцена. ЗАГОТОВКА — её и надо заменить своей игрой.
 *
 * Здесь намеренно нет ни одного вызова SDK, рекламы и сохранений: всё это
 * живёт в системных модулях рядом (`core.ts`, `ads.ts`, `progress.ts`).
 * Смысл разделения тот же, ради которого писался каркас, — площадка меняется
 * отдельно от игры, а игра от площадки не зависит вовсе.
 *
 * ── ЧТО ТУТ ВАЖНО ОСТАВИТЬ, ЗАМЕНЯЯ СОДЕРЖИМОЕ ──────────────────────────
 *
 * 1. `resize(w, h)` — камера пересчитывается по ФАКТИЧЕСКОМУ размеру, а не
 *    по константам. Иначе на телефоне в ландшафте кадр обрежется, а это
 *    п. 1.10.1, одно из самых частых замечаний.
 * 2. Цикл кадров через `setAnimationLoop`, а не `requestAnimationFrame`.
 *    Разница не косметическая: только первый умеет работать в VR/AR-сессии
 *    и корректно останавливается по `setAnimationLoop(null)`.
 * 3. Пауза по уходу со вкладки. Браузер и так режет кадры в фоне, но игра
 *    обязана ещё и замолчать (п. 1.3), а таймеры — не идти.
 * 4. `load()` двигает полосу загрузки. Даже если грузить пока нечего, шкала
 *    должна доходить до конца: замершая полоса читается как зависшая игра.
 */

import * as THREE from 'three';
import { core } from './core.ts';

export interface Game {
  renderer: THREE.WebGLRenderer;
  /** Пересчитать кадр под новый размер холста. */
  resize(width: number, height: number): void;
  /** Догрузить ассеты, двигая полосу `0..1`. */
  load(onProgress: (value: number) => void): Promise<void>;
  /** Запустить цикл кадров. */
  start(): void;
}

/** Сколько мира влезает в кадр по вертикали. Ширина — сколько получится. */
const VIEW_HEIGHT = 6;

export function createScene(parent: HTMLElement): Game {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    // Прозрачный фон не нужен: цвет неба всё равно свой, а альфа-канал
    // на мобильных стоит лишний проход композитинга.
    alpha: false,
    powerPreference: 'high-performance',
  });
  renderer.setClearColor(0xe8dcc8);
  parent.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  /*
   * Камера ОРТОГРАФИЧЕСКАЯ.
   *
   * Для головоломки с полем это почти всегда правильный выбор: у предметов
   * не «разъезжаются» края к углам экрана, одинаковые фигуры выглядят
   * одинаково в любом месте поля, и попадание пальцем считается без учёта
   * перспективы. Если игре нужна глубина — меняется на PerspectiveCamera,
   * но тогда и раскладку поля придётся считать иначе.
   */
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
  camera.position.set(0, 6, 8);
  camera.lookAt(0, 0, 0);

  // Свет: заливка + направленный с тенью. Три источника, как в студийной
  // раскладке, здесь были бы роскошью — на мобильных каждый теневой источник
  // стоит отдельного прохода.
  scene.add(new THREE.HemisphereLight(0xffffff, 0x8d7a5f, 1.6));
  const key = new THREE.DirectionalLight(0xffffff, 1.4);
  key.position.set(4, 8, 5);
  scene.add(key);

  // ── ЗАМЕНИТЬ СВОИМ ──────────────────────────────────────────────────────
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ color: 0xd9c9ad, roughness: 0.95 }),
  );
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1.6, 1.6, 1.6),
    new THREE.MeshStandardMaterial({ color: 0x45b834, roughness: 0.35 }),
  );
  cube.position.y = 0.8;
  scene.add(cube);
  // ────────────────────────────────────────────────────────────────────────

  let paused = false;
  const clock = new THREE.Clock();

  /*
   * Уход со вкладки — это пауза (п. 1.3).
   *
   * Звук глушит каркас, здесь останавливается только время: без этого при
   * возврате из фона `getDelta()` вернёт все накопленные секунды разом,
   * и сцена дёрнется вперёд на минуту игры.
   */
  document.addEventListener('visibilitychange', () => {
    paused = document.hidden;
    if (!paused) clock.getDelta();   // выбрасываем накопленное
  });

  return {
    renderer,

    resize(width, height) {
      const aspect = width / height;
      const halfH = VIEW_HEIGHT / 2;
      const halfW = halfH * aspect;
      camera.left = -halfW;
      camera.right = halfW;
      camera.top = halfH;
      camera.bottom = -halfH;
      camera.updateProjectionMatrix();
    },

    async load(onProgress) {
      // Заготовка грузить нечего, но полосу всё равно доводим до конца:
      // замершая шкала читается как зависшая игра. Здесь появится
      // THREE.LoadingManager с настоящими моделями и текстурами.
      onProgress(1);
    },

    start() {
      core.gameplayStart();
      renderer.setAnimationLoop(() => {
        const dt = clock.getDelta();
        if (paused) return;
        cube.rotation.y += dt * 0.8;   // ЗАМЕНИТЬ СВОИМ
        renderer.render(scene, camera);
      });
    },
  };
}
