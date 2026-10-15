import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

/**
 * Блочный аватар серии — силуэт R6 классического Роблокса.
 *
 * Что делает его «роблоксовым» (первая версия без этого выглядела как
 * набор кубиков, проверено на скриншоте):
 *  - голова — ЦИЛИНДР со скруглёнными краями, а не куб; лицо обёрнуто по нему;
 *  - одежда: рукава и обувь — отдельные куски другого цвета на конечностях;
 *  - причёска или шапка: без неё персонаж читается как манекен.
 *
 * Конечности висят на ШАРНИРАХ (Group в плече/бедре), а не вращаются
 * вокруг центра: иначе рука крутится «пропеллером».
 * Анимация процедурная — на телефоне бесплатно даже для десятка ботов.
 */

export type AvatarState = 'idle' | 'run' | 'jump' | 'fall';
export type Hair = 'none' | 'short' | 'spiky' | 'long' | 'cap' | 'beanie';
export type Face = 'smile' | 'grin' | 'cool' | 'happy';

export interface AvatarLook {
  skin: number;
  shirt: number;
  pants: number;
  shoes?: number;
  /** Длина рукава в долях руки: 0 — без рукавов (классический нуб), 1 — длинный. */
  sleeve?: number;
  hair?: Hair;
  hairColor?: number;
  /** Цвет шапки (cap/beanie). */
  hat?: number;
  face?: Face;
}

export const NOOB: AvatarLook = { skin: 0xf6d03a, shirt: 0x1f6fe0, pants: 0x34b34a, shoes: 0x34b34a, sleeve: 0, hair: 'none', face: 'smile' };

const U = 0.5;              // полстада роблокса = 0.5 м, рост ≈ 2.6
const LEG = 2 * U, TORSO = 2 * U;
// Размеры сняты с официального эталона Roblox BlockyCharacter.fbx (art/ref/roblox):
// голова = 0.6 ширины торса, шеи нет, фаска на рёбрах крошечная.
const HEAD_R = 0.6 * U, HEAD_H = 1.2 * U, HEAD_FILLET = 0.24 * U;
const BEVEL = 0.035;

// ── геометрия (кэш: десяток ботов не плодит одинаковые буферы) ───────────────
const geos = new Map<string, THREE.BufferGeometry>();
function cached(key: string, make: () => THREE.BufferGeometry): THREE.BufferGeometry {
  let g = geos.get(key);
  if (!g) { g = make(); geos.set(key, g); }
  return g;
}
const rbox = (x: number, y: number, z: number, r: number) => cached(`b${x}|${y}|${z}|${r}`, () => new RoundedBoxGeometry(x, y, z, 2, r));

/**
 * Голова классического Roblox — ВЕРТИКАЛЬНЫЙ ЦИЛИНДР со скруглёнными верхним
 * и нижним рёбрами (профиль, провёрнутый вокруг оси). Диаметр = высота = 1.2 стада.
 * Куб и «зефирку» пробовали — пользователь сразу видел подделку.
 */
function cylinderHead(): THREE.BufferGeometry {
  return cached('cylhead', () => {
    const r = HEAD_R, h = HEAD_H, f = HEAD_FILLET;
    const pts: THREE.Vector2[] = [new THREE.Vector2(0, -h / 2)];
    const N = 10;
    for (let i = 0; i <= N; i++) { const a = -Math.PI / 2 + (i / N) * (Math.PI / 2); pts.push(new THREE.Vector2(r - f + Math.cos(a) * f, -h / 2 + f + Math.sin(a) * f)); }
    for (let i = 0; i <= N; i++) { const a = (i / N) * (Math.PI / 2); pts.push(new THREE.Vector2(r - f + Math.cos(a) * f, h / 2 - f + Math.sin(a) * f)); }
    pts.push(new THREE.Vector2(0, h / 2));
    return new THREE.LatheGeometry(pts, 48);
  });
}

// ── текстура лица ────────────────────────────────────────────────────────────
const faceCache = new Map<Face, THREE.Texture>();
function faceTexture(kind: Face): THREE.Texture {
  let t = faceCache.get(kind);
  if (t) return t;
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d')!;
  const ink = '#151515';
  g.fillStyle = ink; g.strokeStyle = ink; g.lineCap = 'round'; g.lineJoin = 'round';
  if (kind === 'cool') {
    // очки-«шторки»
    g.beginPath(); g.roundRect(46, 84, 164, 40, 14); g.fill();
    g.fillStyle = 'rgba(255,255,255,0.55)'; g.fillRect(64, 92, 30, 7);
  } else {
    for (const x of [92, 164]) {
      g.fillStyle = ink; g.beginPath(); g.ellipse(x, 100, 13, 21, 0, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#fff'; g.beginPath(); g.arc(x - 4, 92, 5, 0, Math.PI * 2); g.fill();   // блик
    }
  }
  g.fillStyle = ink; g.lineWidth = 11;
  g.beginPath();
  if (kind === 'grin' || kind === 'happy') {
    g.moveTo(80, 146); g.quadraticCurveTo(128, 214, 176, 146); g.closePath();
    g.fillStyle = kind === 'grin' ? '#fff' : '#7a2430'; g.fill(); g.stroke();
  } else {
    g.arc(128, 132, 46, 0.22 * Math.PI, 0.78 * Math.PI); g.stroke();
  }
  t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  faceCache.set(kind, t);
  return t;
}

// ── материалы ────────────────────────────────────────────────────────────────
const mats = new Map<number, THREE.MeshStandardMaterial>();
function mat(color: number): THREE.MeshStandardMaterial {
  let m = mats.get(color);
  if (!m) { m = new THREE.MeshStandardMaterial({ color, roughness: 0.45 }); mats.set(color, m); }
  return m;
}
function mesh(geo: THREE.BufferGeometry, color: number, x = 0, y = 0, z = 0): THREE.Mesh {
  const m = new THREE.Mesh(geo, mat(color));
  m.position.set(x, y, z);
  m.castShadow = true;
  return m;
}

/** Рука/нога: верх одного цвета (рукав/штанина), низ другого (кожа/обувь). */
function limb(top: number, bottom: number, bottomLen: number): THREE.Group {
  const g = new THREE.Group();
  const w = U * 0.97;
  const b = Math.max(0, Math.min(LEG, bottomLen));
  if (b < LEG) g.add(mesh(rbox(w, LEG - b, U, BEVEL), top, 0, -(LEG - b) / 2));
  // Нижний кусок чуть толще: шов между ними читается как край рукава/ботинка.
  // Одной ширины с конечностью: у Roblox ботинок/кисть не толще руки (у нас было толще — выглядело самодельно).
  if (b > 0) g.add(mesh(rbox(w, b, U, BEVEL), bottom, 0, -LEG + b / 2));
  return g;
}

/**
 * Склеить детали группы по материалу: ёжик из 8 конусов был 8 вызовами отрисовки
 * (и ещё 8 в тенях) на КАЖДОГО бота. Детали неподвижны относительно головы — склейка безопасна.
 */
function mergeGroup(g: THREE.Group): THREE.Group {
  const byMat = new Map<THREE.Material, THREE.BufferGeometry[]>();
  g.updateMatrixWorld(true);
  g.traverse((o) => {
    const m = o as THREE.Mesh;
    if (!m.isMesh) return;
    const geo = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry.clone();
    geo.applyMatrix4(m.matrix);
    for (const k of Object.keys(geo.attributes)) if (k !== 'position' && k !== 'normal') geo.deleteAttribute(k);
    const mat = m.material as THREE.Material;
    if (!byMat.has(mat)) byMat.set(mat, []);
    byMat.get(mat)!.push(geo);
  });
  const out = new THREE.Group();
  for (const [mat, geos] of byMat) {
    const mesh = new THREE.Mesh(mergeGeometries(geos), mat);
    mesh.castShadow = true;
    out.add(mesh);
  }
  return out;
}

function hair(kind: Hair, color: number, hat: number): THREE.Group {
  const g = new THREE.Group();
  const top = HEAD_H / 2;
  switch (kind) {
    case 'short':
      g.add(mesh(rbox(1.36 * U, 0.42 * U, 1.36 * U, 0.18), color, 0, top - 0.02));
      g.add(mesh(rbox(1.36 * U, 0.7 * U, 0.36 * U, 0.14), color, 0, top - 0.25 * U, -0.52 * U));
      break;
    case 'spiky':
      g.add(mesh(rbox(1.34 * U, 0.36 * U, 1.34 * U, 0.16), color, 0, top - 0.02));
      for (let i = 0; i < 7; i++) {
        const a = (i / 7) * Math.PI * 2;
        const s = mesh(cached('spike', () => new THREE.ConeGeometry(0.2 * U, 0.6 * U, 5)), color, Math.cos(a) * 0.35 * U, top + 0.3 * U, Math.sin(a) * 0.35 * U - 0.05);
        s.rotation.set(Math.sin(a) * 0.5, 0, -Math.cos(a) * 0.5);
        g.add(s);
      }
      break;
    case 'long':
      g.add(mesh(rbox(1.4 * U, 0.44 * U, 1.4 * U, 0.2), color, 0, top - 0.02));
      g.add(mesh(rbox(1.42 * U, 1.9 * U, 0.42 * U, 0.16), color, 0, top - 0.95 * U, -0.52 * U));
      for (const x of [-0.6, 0.6]) g.add(mesh(rbox(0.24 * U, 1.1 * U, 1.0 * U, 0.1), color, x * U, top - 0.55 * U, -0.1 * U));
      break;
    case 'cap':
      g.add(mesh(rbox(1.4 * U, 0.5 * U, 1.4 * U, 0.22), hat, 0, top + 0.05));
      g.add(mesh(rbox(1.1 * U, 0.08 * U, 0.7 * U, 0.03), hat, 0, top - 0.12 * U, 0.85 * U));
      break;
    case 'beanie':
      g.add(mesh(cached('beanie', () => new THREE.SphereGeometry(0.72 * U, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2)), hat, 0, top - 0.12 * U));
      g.add(mesh(cached('pom', () => new THREE.SphereGeometry(0.18 * U, 12, 8)), hat, 0, top + 0.62 * U));
      break;
  }
  return g;
}

const BLOB_GEO = new THREE.CircleGeometry(0.8, 20);
const BLOB_MAT = (() => {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d')!;
  const gr = g.createRadialGradient(32, 32, 4, 32, 32, 32);
  gr.addColorStop(0, 'rgba(0,0,0,.45)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  return new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false });
})();

export class Avatar {
  readonly root = new THREE.Group();
  /** Всё, что качается при беге, — отдельно от root: root остаётся «физическим» телом. */
  private body = new THREE.Group();
  private torso = new THREE.Group();
  private armL = new THREE.Group(); private armR = new THREE.Group();
  private legL = new THREE.Group(); private legR = new THREE.Group();
  private head = new THREE.Group();
  private state: AvatarState = 'idle';
  private t = Math.random() * 10;
  private cur = { arm: 0, leg: 0, armUp: 0, bob: 0, lean: 0 };

  /** Габариты для коллайдера физики. */
  static readonly HEIGHT = LEG + TORSO + 0.11 * U + HEAD_H;
  static readonly WIDTH = 2 * U;

  /**
   * cheapShadow — вместо настоящей тени мягкое пятно под ногами (как в Роблоксе).
   * Для ботов: настоящая тень рисует все ~14 деталей аватара второй раз,
   * а у шести ботов это ~90 лишних вызовов отрисовки в кадре.
   */
  constructor(look: AvatarLook = NOOB, cheapShadow = false) {
    const shoes = look.shoes ?? 0x2b2b30;
    const sleeve = look.sleeve ?? 0.35;
    this.root.add(this.body);

    for (const [leg, x] of [[this.legL, -0.5 * U], [this.legR, 0.5 * U]] as const) {
      leg.position.set(x, LEG, 0);
      leg.add(limb(look.pants, shoes, 0.32 * U));
      this.body.add(leg);
    }

    // Торс крепится в бёдрах: наклон корпуса на бегу идёт от таза, а не от центра.
    this.torso.position.y = LEG;
    this.body.add(this.torso);
    this.torso.add(mesh(rbox(2 * U, TORSO, U, BEVEL), look.shirt, 0, TORSO / 2));

    for (const [arm, x] of [[this.armL, -1.5 * U], [this.armR, 1.5 * U]] as const) {
      arm.position.set(x, TORSO - 0.25 * U, 0);
      const a = limb(look.shirt, look.skin, LEG * (1 - sleeve));
      a.position.y = 0.25 * U;
      arm.add(a);
      this.torso.add(arm);
    }

    this.head.position.y = TORSO;
    // Шея — узкий цилиндр ~⅓ ширины головы (по картинке пользователя), голова стоит на ней.
    const NECK = 0.11 * U;
    this.head.add(mesh(cached('neck', () => new THREE.CylinderGeometry(0.15 * U, 0.15 * U, NECK + 0.06, 20)), look.skin, 0, NECK / 2));
    const hy = NECK + HEAD_H / 2;
    this.head.add(mesh(cylinderHead(), look.skin, 0, hy));
    // Лицо обёрнуто по прямой части цилиндра: плоская наклейка торчала бы краями.
    const face = new THREE.Mesh(
      cached('face', () => new THREE.CylinderGeometry(HEAD_R + 0.003, HEAD_R + 0.003, HEAD_H - 2 * HEAD_FILLET + 0.08, 32, 1, true, -0.85, 1.7)),
      new THREE.MeshStandardMaterial({ map: faceTexture(look.face ?? 'smile'), transparent: true, roughness: 0.5, depthWrite: false }),
    );
    face.position.y = hy;
    this.head.add(face);
    const h = mergeGroup(hair(look.hair ?? 'none', look.hairColor ?? 0x3a2414, look.hat ?? 0xd8313a));
    h.scale.setScalar(HEAD_R / (0.62 * U));   // причёски заданы под голову 0.62 — масштабируем, а не перебиваем числа
    h.position.y = hy;
    this.head.add(h);
    if (cheapShadow) {
      this.root.traverse((o) => { o.castShadow = false; });
      const blob = new THREE.Mesh(BLOB_GEO, BLOB_MAT);
      blob.rotation.x = -Math.PI / 2;
      blob.position.y = 0.03;
      blob.renderOrder = 1;
      this.root.add(blob);
    }
    this.torso.add(this.head);
  }

  setState(s: AvatarState): void { this.state = s; }

  /** speed01 — доля от максимальной скорости: на бегу шаг размашистее. */
  update(dt: number, speed01 = 1): void {
    this.t += dt;
    const s = this.state;
    const k = 1 - Math.exp(-dt * 14);   // сглаживание, не зависящее от FPS
    const ph = this.t * 12;
    const swing = s === 'run' ? Math.sin(ph) * 1.15 * speed01 : 0;
    const tg = {
      arm: s === 'run' ? swing : s === 'idle' ? Math.sin(this.t * 2) * 0.06 : 0,
      leg: s === 'run' ? swing : s === 'jump' ? 0.7 : s === 'fall' ? Math.sin(this.t * 9) * 0.4 : 0,
      armUp: s === 'jump' ? 2.7 : s === 'fall' ? 2.3 + Math.sin(this.t * 14) * 0.45 : 0,
      bob: s === 'run' ? Math.abs(Math.cos(ph)) * 0.14 : s === 'idle' ? Math.sin(this.t * 2) * 0.015 : 0,
      lean: s === 'run' ? 0.16 * speed01 : s === 'fall' ? -0.15 : 0,
    };
    const c = this.cur;
    (Object.keys(c) as (keyof typeof c)[]).forEach((key) => { c[key] += (tg[key] - c[key]) * k; });

    this.armL.rotation.set(c.arm - c.armUp, 0, -c.armUp * 0.28);
    this.armR.rotation.set(-c.arm - c.armUp, 0, c.armUp * 0.28);
    this.legL.rotation.x = -c.leg;
    this.legR.rotation.x = s === 'jump' ? -0.35 : c.leg;
    this.body.position.y = c.bob;
    this.torso.rotation.x = c.lean;
    this.torso.rotation.y = s === 'run' ? Math.sin(ph) * 0.08 : 0;   // плечи гуляют против шага
    this.head.rotation.y = s === 'idle' ? Math.sin(this.t * 0.7) * 0.3 : 0;
  }
}
