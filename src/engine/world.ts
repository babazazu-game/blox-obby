import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

/**
 * Общий для всей роблокс-серии «мир»: рендерер, небо, свет, плита-основание.
 * Конкретная игра меняет только палитру (WorldLook), а не код.
 *
 * Свет взят со стиля 1 (классика): яркое солнце сверху-сбоку + голубая заливка
 * неба. Один теневой источник — на телефонах каждый следующий стоит прохода.
 */

export interface WorldLook {
  skyTop: number;
  skyBottom: number;
  ground: number;
  fog: number;
  /** Море облаков внизу — опция ИГРЫ, а не базы: в одной игре падают в облака, в другой — в лаву. */
  cloudSea?: boolean;
}

export const CLASSIC: WorldLook = { skyTop: 0x2f86f0, skyBottom: 0xe6f3ff, ground: 0x5cb85c, fog: 0xdcecff };

export interface World {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  sun: THREE.DirectionalLight;
  /** Тень солнца ездит за игроком: так карта теней мала, а трасса может быть длинной. */
  followShadow(target: THREE.Vector3): void;
  /** Небо и туман мира (порталы ведут в разные миры). */
  setSky(top: number, horizon: number): void;
}

export function createWorld(parent: HTMLElement, look: WorldLook = CLASSIC): World {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.shadowMap.enabled = true;
  // PCFSoft брал 16 выборок на пиксель против 4 у PCF — на встроенной графике это заметно.
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  // Neutral держит насыщенность: AgX и ACES выбеливали красный и синий пластик в пастель (проверено).
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1.0;
  parent.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  /*
   * Небо — КУПОЛ, а не картинка фона. Картинка висит на экране и не знает, где
   * горизонт: при наклоне камеры он уезжал, а на стыке с туманом получалась
   * резкая линия (жалоба пользователя). Купол красит по направлению взгляда:
   * у горизонта и ниже — ровно цвет тумана, поэтому дальние острова, облака
   * и небо сливаются в одну дымку.
   */
  scene.fog = new THREE.Fog(look.fog, 55, 230);
  const sky = skyDome(look.skyTop, look.fog);
  scene.add(sky);

  /*
   * Блики на пластике (как на референсе) дают не лампы, а КАРТА ОКРУЖЕНИЯ:
   * гладкий материал отражает светлую комнату — на рёбрах и скруглениях
   * появляется та самая «игрушечная» полоска света. Считается один раз.
   */
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.45;

  // Заливка: голубое небо сверху, тёплый отражённый свет снизу — тени не чёрные, а голубоватые.
  scene.add(new THREE.HemisphereLight(0xbfe0ff, 0xfff0d8, 0.9));
  const sun = new THREE.DirectionalLight(0xfff1dc, 3.0);
  sun.position.set(25, 45, 18);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  const s = sun.shadow.camera;
  // Тень нужна только возле игрока: узкий квадрат даёт ту же чёткость на карте 1024, что 2048 на широком.
  s.left = -18; s.right = 18; s.top = 18; s.bottom = -18; s.near = 1; s.far = 140;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.03;
  scene.add(sun, sun.target);

  if (look.cloudSea) addCloudSea(scene);
  addSkyClouds(scene);

  const offset = sun.position.clone();
  return {
    renderer, scene, sun,
    // купол ездит за игроком: камера всегда в его центре, край купола недосягаем
    followShadow(t) { sun.position.copy(t).add(offset); sun.target.position.copy(t); sky.position.copy(t); },
    setSky(top, horizon) {
      const u = (sky.material as THREE.ShaderMaterial).uniforms;
      u.top.value.setHex(top); u.hor.value.setHex(horizon);
      (scene.fog as THREE.Fog).color.setHex(horizon);
    },
  };
}

/** Купол неба: сверху насыщенно-голубой, к горизонту плавно уходит в цвет тумана. */
function skyDome(top: number, horizon: number): THREE.Mesh {
  const m = new THREE.ShaderMaterial({
    uniforms: { top: { value: new THREE.Color(top) }, hor: { value: new THREE.Color(horizon) } },
    vertexShader: 'varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    // tonemapping/colorspace — те же преобразования, что у остальной сцены: иначе небо
    // у горизонта не совпадало бы по цвету с туманом на островах.
    fragmentShader: [
      'uniform vec3 top; uniform vec3 hor; varying vec3 vDir;',
      'void main(){ float k = smoothstep(0.0, 0.55, vDir.y); gl_FragColor = vec4(mix(hor, top, pow(k, 0.8)), 1.0);',
      '#include <tonemapping_fragment>',
      '#include <colorspace_fragment>',
      '}',
    ].join('\n'),
    side: THREE.BackSide, depthWrite: false, fog: false,
  });
  const dome = new THREE.Mesh(new THREE.SphereGeometry(420, 32, 16), m);
  dome.renderOrder = -1;
  dome.frustumCulled = false;
  return dome;
}

/*
 * Облака — пухлые комки из сфер одним InstancedMesh: сотни шаров = один вызов
 * отрисовки. Сферы низкополигональные, но материал без бликов и с подсветкой
 * изнутри (emissive), поэтому граней не видно — читается «вата».
 */
// Lambert, а не Standard: облака занимают полэкрана, а PBR-расчёт на каждом их пикселе
// не даёт ничего — блика у облака нет.
const cloudMat = new THREE.MeshLambertMaterial({ color: 0xffffff, emissive: 0xdde9ff, emissiveIntensity: 0.55 });

function puffs(scene: THREE.Scene, items: { p: THREE.Vector3; r: number }[]): void {
  const mesh = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1, 1), cloudMat, items.length);
  const m = new THREE.Matrix4();
  items.forEach((it, i) => mesh.setMatrixAt(i, m.compose(it.p, new THREE.Quaternion(), new THREE.Vector3(it.r, it.r * 0.75, it.r))));
  scene.add(mesh);
}

/** Море облаков под трассой: туда падают. Заменяет зелёную землю — на референсе её нет. */
/*
 * Подложка моря облаков — ОГРОМНАЯ плоскость: её край уходит дальше конца
 * тумана (fog far) и растворяется в нём. Было 600 м — трасса длиннее, и край
 * «висел» в кадре (жалоба пользователя). Сами пухлые облака кладёт
 * `cloudsAlong()` вдоль трассы — уже когда игра знает, где трасса.
 */
function addCloudSea(scene: THREE.Scene): void {
  const base = new THREE.Mesh(new THREE.PlaneGeometry(8000, 8000), cloudMat);
  base.rotation.x = -Math.PI / 2; base.position.y = SEA_Y;
  scene.add(base);
}
const SEA_Y = -40;

/**
 * Облака вдоль трассы: море внизу (пухлые шары над подложкой), облачка
 * ПОБЛИЖЕ — чуть ниже платформ сбоку (чувство высоты у самого персонажа),
 * и немного высоких в небе. Всё одним InstancedMesh на слой.
 */
export function cloudsAlong(scene: THREE.Scene, points: THREE.Vector3[], sea = true): void {
  const low: { p: THREE.Vector3; r: number }[] = [];
  const near: { p: THREE.Vector3; r: number }[] = [];
  const high: { p: THREE.Vector3; r: number }[] = [];
  const R = (a: number, b: number) => a + Math.random() * (b - a);
  for (const c of points) {
    if (sea) for (let i = 0; i < 14; i++) low.push({ p: new THREE.Vector3(c.x + R(-140, 140), SEA_Y + R(0, 4), c.z + R(-20, 20)), r: R(9, 16) });
    for (let i = 0; i < 2; i++) {
      const side = Math.random() < 0.5 ? -1 : 1;
      const cx = c.x + side * R(7, 18), cy = c.y - R(6, 14), cz = c.z + R(-8, 8);
      // облачко из 3–4 шаров
      for (let k = 0; k < 3 + (Math.random() * 2 | 0); k++) near.push({ p: new THREE.Vector3(cx + R(-2.5, 2.5), cy + R(-0.6, 0.6), cz + R(-1.5, 1.5)), r: R(1.6, 2.8) });
    }
    if (Math.random() < 0.5) {
      const cx = c.x + R(-90, 90), cy = c.y + R(30, 55), cz = c.z + R(-30, 30);
      for (let k = 0; k < 5; k++) high.push({ p: new THREE.Vector3(cx + (k - 2) * 4.5, cy + R(0, 2), cz + R(0, 3)), r: R(4, 7) });
    }
  }
  if (low.length) puffs(scene, low);
  puffs(scene, near);
  if (high.length) puffs(scene, high);
}

function addSkyClouds(scene: THREE.Scene): void {
  const items: { p: THREE.Vector3; r: number }[] = [];
  for (let c = 0; c < 14; c++) {
    const a = Math.random() * Math.PI * 2, d = 90 + Math.random() * 90;
    const cx = Math.cos(a) * d, cz = Math.sin(a) * d - 40, cy = 30 + Math.random() * 35;
    const n = 4 + (Math.random() * 4 | 0);
    for (let k = 0; k < n; k++) {
      const r = 4 + Math.random() * 4;
      items.push({ p: new THREE.Vector3(cx + (k - n / 2) * 4.5, cy + Math.random() * 3 - (k === 0 || k === n - 1 ? 1.5 : 0), cz + Math.random() * 4), r });
    }
  }
  puffs(scene, items);
}

/*
 * Блок — скруглённый куб с «игрушечным» пластиком.
 * Сетки-текстуры нет: в роблоксе у Part гладкий пластик, а линии плитки
 * дробили платформы и мешали оценить их размер для прыжка.
 * Clearcoat (лак) пробовали — шейдер почти вдвое дороже, а на глаз блик от
 * карты окружения при roughness 0.32 почти тот же. Материал общий на цвет:
 * одна программа и меньше переключений состояния.
 */
const geoCache = new Map<string, THREE.BufferGeometry>();
const matCache = new Map<number, THREE.MeshStandardMaterial>();
export function block(size: THREE.Vector3Like, color: number): THREE.Mesh {
  const key = `${size.x}|${size.y}|${size.z}`;
  let geo = geoCache.get(key);
  if (!geo) {
    const r = Math.min(0.18, Math.min(size.x, size.y, size.z) * 0.2);
    geo = new RoundedBoxGeometry(size.x, size.y, size.z, 2, r);
    geoCache.set(key, geo);
  }
  let mat = matCache.get(color);
  if (!mat) { mat = new THREE.MeshStandardMaterial({ color, roughness: 0.32 }); matCache.set(color, mat); }
  const m = new THREE.Mesh(geo, mat);
  m.castShadow = m.receiveShadow = true;
  return m;
}

/**
 * Склеить НЕПОДВИЖНЫЕ меши по материалу в один меш на материал.
 * Трасса — десятки блоков, каждый был отдельным вызовом отрисовки (и ещё одним
 * в проходе теней). Физике меши не нужны — у неё свои Box3, снятые до склейки.
 */
export function mergeStatic(scene: THREE.Scene, meshes: THREE.Mesh[]): void {
  const groups = new Map<THREE.Material, THREE.BufferGeometry[]>();
  for (const m of meshes) {
    // updateWorldMatrix(родители=true): столбик таблички лежит в группе, и без пересчёта
    // родителей бралась её устаревшая (нулевая) матрица — столбик уезжал в центр мира.
    m.updateWorldMatrix(true, false);
    const g = m.geometry.clone().applyMatrix4(m.matrixWorld);
    const mat = m.material as THREE.Material;
    if (!groups.has(mat)) groups.set(mat, []);
    groups.get(mat)!.push(g);
    m.removeFromParent();
  }
  for (const [mat, geos] of groups) {
    const merged = new THREE.Mesh(mergeGeometries(geos), mat);
    merged.castShadow = merged.receiveShadow = true;
    scene.add(merged);
    geos.forEach((g) => g.dispose());
  }
}
