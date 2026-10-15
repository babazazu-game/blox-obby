import * as THREE from 'three';

/**
 * Камера от третьего лица, как в Роблоксе: орбита вокруг головы игрока.
 * yaw/pitch крутит игрок (мышь, правая половина экрана), дистанция — колесом.
 *
 * Камера сама НЕ поворачивается за спину при беге — в Роблоксе так же:
 * дети бегут «на камеру» и вбок, и автоповорот их бы сбивал.
 */
export class FollowCamera {
  readonly camera: THREE.PerspectiveCamera;
  yaw = 0;
  pitch = 0.35;
  dist = 11;
  private focus = new THREE.Vector3();
  private first = true;
  private shakeT = 0;
  private shakeA = 0;

  /** Тряска (удар, лава): затухает сама за ~0.35 с. */
  shake(amount = 0.25): void { this.shakeA = amount; this.shakeT = 0.35; }

  constructor() {
    this.camera = new THREE.PerspectiveCamera(65, 1, 0.1, 500);
  }

  /** Плавно развернуть камеру за спину (трасса повернула, респаун). Игрок может перебить мышью. */
  private yawGoal: number | null = null;
  turnTo(yaw: number): void { this.yawGoal = yaw; }

  /** dx/dy — пиксели поворота, zoom — щелчки колеса. */
  rotate(dx: number, dy: number, zoom: number): void {
    if (dx || dy) this.yawGoal = null;
    this.yaw -= dx * 0.006;
    this.pitch = THREE.MathUtils.clamp(this.pitch + dy * 0.005, -0.25, 1.3);
    this.dist = THREE.MathUtils.clamp(this.dist * (1 + zoom * 0.1), 5, 24);
  }

  /** Направление «вперёд» для движения — горизонтальная проекция взгляда камеры. */
  forward(out: THREE.Vector3): THREE.Vector3 {
    return out.set(-Math.sin(this.yaw), 0, -Math.cos(this.yaw));
  }

  update(dt: number, target: THREE.Vector3): void {
    if (this.yawGoal !== null) {
      let d = this.yawGoal - this.yaw; d = Math.atan2(Math.sin(d), Math.cos(d));
      this.yaw += d * (1 - Math.exp(-dt * 3.5));
      if (Math.abs(d) < 0.01) this.yawGoal = null;
    }
    const goal = new THREE.Vector3(target.x, target.y + 2.2, target.z);
    // Фокус догоняет игрока мягко по вертикали (прыжок не трясёт кадр) и жёстко по горизонтали.
    if (this.first) { this.focus.copy(goal); this.first = false; }
    this.focus.x = goal.x; this.focus.z = goal.z;
    this.focus.y += (goal.y - this.focus.y) * (1 - Math.exp(-dt * 8));
    const cp = Math.cos(this.pitch);
    this.camera.position.set(
      this.focus.x + Math.sin(this.yaw) * cp * this.dist,
      this.focus.y + Math.sin(this.pitch) * this.dist,
      this.focus.z + Math.cos(this.yaw) * cp * this.dist,
    );
    this.camera.lookAt(this.focus);
    if (this.shakeT > 0) {
      this.shakeT -= dt;
      const a = this.shakeA * Math.max(0, this.shakeT / 0.35);
      this.camera.position.x += (Math.random() - 0.5) * a;
      this.camera.position.y += (Math.random() - 0.5) * a;
    }
  }

  resize(w: number, h: number): void {
    this.camera.aspect = w / h;
    // В портрете кадр узкий — расширяем угол, иначе по бокам не видно платформ.
    this.camera.fov = w < h ? 80 : 65;
    this.camera.updateProjectionMatrix();
  }
}
