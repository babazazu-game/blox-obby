import * as THREE from 'three';
import type { Avatar } from './avatar.ts';
import type { MoveResult, Solid } from './physics.ts';

/**
 * Движение персонажа: скорость, разгон, прыжок, гравитация, поворот лицом
 * по ходу. Числа подобраны под ощущение Роблокса: WalkSpeed 16 стад/с и
 * JumpPower 50 в наших метрах (1 стад = 0.5 м) → бег 8 м/с, прыжок ~3.6 м.
 *
 * Столкновения сюда НЕ входят — их даёт `collide` из физики.
 */

export const MOVE = {
  speed: 8,
  accel: 60,          // почти мгновенный разгон — так в Роблоксе
  airControl: 0.7,
  jumpV: 13,
  gravity: 34,
  turn: 14,
};

/** Перемещение со столкновениями (сам и интегрирует позицию). Даёт физика. */
export type Collide = (pos: THREE.Vector3, vel: THREE.Vector3, dt: number) => MoveResult;

/** Поблажки платформера: без них прыжок с самого края «не срабатывает», и дети злятся. */
const COYOTE = 0.12;   // можно прыгнуть ещё столько секунд после схода с края
const BUFFER = 0.14;   // нажатие прыжка чуть до приземления не теряется

export class Controller {
  readonly pos = new THREE.Vector3();
  readonly vel = new THREE.Vector3();
  grounded = true;
  private facing = 0;
  private jumpHeld = false;
  private sinceGround = 0;
  private sinceJumpPress = 99;
  /** На чём стоим сейчас — игра проверяет лаву/чекпоинт. */
  ground: Solid | null = null;
  /** Чего коснулись за последний шаг (стены лавы и т. п.). */
  touched: Solid[] = [];
  readonly spawn = new THREE.Vector3();
  /** События для звука и эффектов: игра подписывается, контроллер о звуке не знает. */
  onJump?: () => void;
  onLand?: (speed: number) => void;
  private spawnYaw = 0;

  constructor(private avatar: Avatar, public collide: Collide) {}

  /** Сменить внешность (скин из магазина): новая модель встаёт туда же. */
  setAvatar(a: Avatar): void { this.avatar = a; a.root.position.copy(this.pos); a.root.rotation.y = this.facing; }

  /** Вернуть на точку возрождения (падение, лава). */
  respawn(): void {
    this.pos.copy(this.spawn);
    this.vel.set(0, 0, 0);
    this.facing = this.spawnYaw;
    this.sinceGround = 99;
    // забыть, на чём стояли: иначе «стою на лаве» доживало до следующего кадра,
    // и упавший в лаву бот погибал снова и снова прямо на точке возрождения
    this.ground = null;
    this.touched = [];
    this.grounded = false;
  }

  /** Куда смотрит персонаж (рад, 0 = +Z). */
  get yaw(): number { return this.facing; }

  setSpawn(p: THREE.Vector3, yaw = this.facing): void { this.spawn.copy(p); this.spawnYaw = yaw; }

  /** move — в осях камеры (x вправо, y вперёд), fwd — «вперёд» камеры по земле. */
  update(dt: number, move: { x: number; y: number }, jump: boolean, fwd: THREE.Vector3): void {
    const right = new THREE.Vector3(-fwd.z, 0, fwd.x);
    const want = new THREE.Vector3().addScaledVector(fwd, move.y).addScaledVector(right, move.x).multiplyScalar(MOVE.speed);
    const a = MOVE.accel * (this.grounded ? 1 : MOVE.airControl) * dt;
    const dvx = want.x - this.vel.x, dvz = want.z - this.vel.z;
    const dl = Math.hypot(dvx, dvz);
    if (dl > 0) { const k = Math.min(1, a / dl); this.vel.x += dvx * k; this.vel.z += dvz * k; }

    // Прыжок по нажатию, а не по удержанию: держа пробел, нельзя «прыгать кроликом» бесконечно.
    if (jump && !this.jumpHeld) this.sinceJumpPress = 0;
    this.jumpHeld = jump;
    this.sinceJumpPress += dt;
    this.sinceGround = this.grounded ? 0 : this.sinceGround + dt;
    if (this.sinceJumpPress <= BUFFER && this.sinceGround <= COYOTE && this.vel.y <= 0.01) {
      this.vel.y = MOVE.jumpV;
      this.grounded = false;
      this.onJump?.();
      this.sinceGround = 99;
      this.sinceJumpPress = 99;
    }

    this.vel.y = Math.max(this.vel.y - MOVE.gravity * dt, -45);
    const wasGrounded = this.grounded, fallV = this.vel.y;
    const r = this.collide(this.pos, this.vel, dt);
    this.grounded = r.grounded;
    if (!wasGrounded && r.grounded && fallV < -4) this.onLand?.(-fallV);
    this.ground = r.ground;
    this.touched = r.touched;

    const hs = Math.hypot(this.vel.x, this.vel.z);
    if (hs > 0.5) {
      const target = Math.atan2(this.vel.x, this.vel.z);
      let d = target - this.facing;
      d = Math.atan2(Math.sin(d), Math.cos(d));
      this.facing += d * (1 - Math.exp(-dt * MOVE.turn));
    }
    const av = this.avatar;
    av.root.position.copy(this.pos);
    av.root.rotation.y = this.facing;
    av.setState(!this.grounded ? (this.vel.y > 0 ? 'jump' : 'fall') : hs > 0.5 ? 'run' : 'idle');
    av.update(dt, Math.min(1, hs / MOVE.speed));
  }
}
