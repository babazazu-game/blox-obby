import * as THREE from 'three';

/**
 * Физика серии: персонаж — вертикальный ящик (AABB), мир — набор ящиков.
 * Без физического движка: для обби нужны только «стоять, упереться, прыгнуть»,
 * а Rapier/Cannon весят сотни килобайт и дают «скользкое» мыльное ощущение.
 *
 * Движение разбито по осям: сначала X, потом Z, потом Y, и после каждой
 * оси пересечения выталкиваются по ЭТОЙ же оси. Так персонаж скользит вдоль
 * стены, а не застревает в углу, и не проваливается сквозь тонкую плиту на
 * низком FPS (шаг тоже режем — см. SUBSTEP).
 *
 * Ящики могут двигаться (платформы-лифты): тогда у них есть `delta` — сдвиг
 * за кадр, и стоящий на них игрок едет вместе с ними.
 */

export interface Solid {
  box: THREE.Box3;
  /** Сдвиг ящика за последний кадр — чтобы возить стоящего сверху. */
  delta?: THREE.Vector3;
  /** Что за поверхность: игра решает, что с ней делать (лава, батут…). */
  kind?: string;
}

/** Размер коллайдера персонажа: чуть уже плеч, чтобы руки не цеплялись за края. */
export const BODY = { halfW: 0.42, height: 2.6 };
/** Ступенька, на которую персонаж забегает без прыжка (как HipHeight в Роблоксе). */
const STEP = 0.35;
/** Максимальный шаг интегрирования: при 20 FPS скорость падения ~40 м/с прошила бы плиту в 1 м. */
const SUBSTEP = 1 / 120;

export interface MoveResult {
  grounded: boolean;
  /** На чём стоим — игре нужно знать про лаву/батут/чекпоинт. */
  ground: Solid | null;
  /** Чего коснулись за шаг (стены, потолок, пол). */
  touched: Solid[];
}

export class Physics {
  readonly solids: Solid[] = [];
  /** На чём стоял каждый «ходок» в прошлый кадр (ключ — его вектор позиции):
   *  игрок и боты ходят через одну физику, общая переменная путала их платформы. */
  private lastGround = new WeakMap<THREE.Vector3, Solid | null>();
  /** Твёрдые тела текущего вызова move: мир + личные блоки бота. */
  private cur: Solid[] = [];
  private near = new THREE.Box3();

  add(s: Solid): Solid { this.solids.push(s); return s; }
  remove(s: Solid): void { const i = this.solids.indexOf(s); if (i >= 0) this.solids.splice(i, 1); }

  /** Добавить меш-блок как статичное тело (его текущие габариты). */
  addMesh(m: THREE.Object3D, kind?: string): Solid {
    m.updateMatrixWorld(true);
    return this.add({ box: new THREE.Box3().setFromObject(m), kind });
  }

  /** extra — тела, твёрдые только для этого ходока (блоки, которые поставил бот). */
  move(pos: THREE.Vector3, vel: THREE.Vector3, dt: number, extra?: Solid[]): MoveResult {
    // Широкая фаза: только тела рядом с ходоком (запас — путь за кадр + 4 м).
    // С твёрдым декором тел стало сотни; перебирать все на каждом под-шаге
    // для игрока и шести ботов — лишние десятки тысяч проверок за кадр.
    const reach = Math.hypot(vel.x, vel.y, vel.z) * dt + 4;
    this.near.min.set(pos.x - reach, pos.y - reach, pos.z - reach);
    this.near.max.set(pos.x + reach, pos.y + BODY.height + reach, pos.z + reach);
    this.cur = [];
    for (const s of this.solids) if (s.box.intersectsBox(this.near)) this.cur.push(s);
    if (extra) for (const s of extra) if (s.box.intersectsBox(this.near)) this.cur.push(s);
    const res: MoveResult = { grounded: false, ground: null, touched: [] };
    // Платформа, на которой стояли, сдвинулась за кадр — едем с ней ДО своего хода.
    const lg = this.lastGround.get(pos);
    if (lg?.delta && this.cur.includes(lg)) pos.add(lg.delta);
    const steps = Math.max(1, Math.ceil(dt / SUBSTEP));
    const h = dt / steps;
    for (let i = 0; i < steps; i++) this.step(pos, vel, h, res);
    this.lastGround.set(pos, res.ground);
    return res;
  }

  private body = new THREE.Box3();
  private bodyAt(p: THREE.Vector3): THREE.Box3 {
    return this.body.set(
      new THREE.Vector3(p.x - BODY.halfW, p.y, p.z - BODY.halfW),
      new THREE.Vector3(p.x + BODY.halfW, p.y + BODY.height, p.z + BODY.halfW),
    );
  }

  private step(pos: THREE.Vector3, vel: THREE.Vector3, h: number, res: MoveResult): void {
    for (const axis of ['x', 'z'] as const) {
      pos[axis] += vel[axis] * h;
      for (const s of this.cur) {
        const b = this.bodyAt(pos);
        if (!hits(b, s.box)) continue;
        // Низкий уступ — забегаем на него, а не упираемся.
        const rise = s.box.max.y - pos.y;
        if (rise > 0 && rise <= STEP && vel.y <= 0 && this.free(pos, rise + 0.001)) { pos.y += rise + 0.001; continue; }
        pos[axis] = vel[axis] > 0 ? s.box.min[axis] - BODY.halfW - 1e-4 : vel[axis] < 0 ? s.box.max[axis] + BODY.halfW + 1e-4 : pos[axis];
        vel[axis] = 0;
        res.touched.push(s);
      }
    }

    pos.y += vel.y * h;
    for (const s of this.cur) {
      const b = this.bodyAt(pos);
      if (!hits(b, s.box)) continue;
      if (vel.y <= 0) {
        pos.y = s.box.max.y;
        res.grounded = true; res.ground = s;
      } else {
        pos.y = s.box.min.y - BODY.height - 1e-4;   // ударились головой
      }
      vel.y = 0;
      res.touched.push(s);
    }
    // Стоим ровно на поверхности (vel.y = 0 после прошлого шага) — пересечения нет,
    // поэтому опору проверяем отдельным «щупом» на сантиметр ниже ног.
    if (!res.grounded && vel.y <= 0) {
      const probe = this.bodyAt(pos).clone(); probe.min.y -= 0.02; probe.max.y = pos.y + 0.01;
      for (const s of this.cur) if (probe.intersectsBox(s.box) && s.box.max.y <= pos.y + 0.01) { res.grounded = true; res.ground = s; break; }
    }
  }

  private free(pos: THREE.Vector3, up: number): boolean {
    const b = this.bodyAt(pos.clone().setY(pos.y + up));
    return !this.cur.some((s) => hits(b, s.box));
  }
}

/** Настоящее пересечение объёмов. Касание гранью (стоим на полу) — НЕ пересечение:
 *  иначе пол считался бы стеной и персонаж не мог бы по нему бежать. */
function hits(a: THREE.Box3, b: THREE.Box3): boolean {
  return overlap(a, b, 'x') > 1e-6 && overlap(a, b, 'y') > 1e-6 && overlap(a, b, 'z') > 1e-6;
}

function overlap(a: THREE.Box3, b: THREE.Box3, axis: 'x' | 'y' | 'z'): number {
  return Math.min(a.max[axis], b.max[axis]) - Math.max(a.min[axis], b.min[axis]);
}
