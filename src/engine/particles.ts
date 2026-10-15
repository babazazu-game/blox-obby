import * as THREE from 'three';

/**
 * Частицы серии — пыль, конфетти, искры. Кубики (стиль Роблокса), не спрайты.
 *
 * ── ПОЧЕМУ БЕЗ ЛАГОВ ─────────────────────────────────────────────────────
 *  - Один InstancedMesh на ВСЕ частицы = 1 вызов отрисовки, сколько бы их ни было.
 *  - Пул фиксированный (MAX). Во время игры не создаётся НИ ОДНОГО объекта:
 *    массивы чисел выделены заранее, новая частица занимает самый старый слот.
 *    Нет мусора — нет пауз сборщика мусора (именно они дают «рывки»).
 *  - Тени частицы не отбрасывают: это ещё один проход ради мелочи.
 */
const MAX = 256;

export type Burst = 'dust' | 'confetti' | 'coin' | 'wood' | 'lava' | 'poof' | 'trail';

const PRESET: Record<Burst, { n: number; colors: number[]; speed: [number, number]; up: [number, number]; size: [number, number]; life: [number, number]; grav: number; spread: number }> = {
  dust:     { n: 10, colors: [0xffffff, 0xe8e8e8, 0xd6d0c4], speed: [1.5, 3], up: [0.5, 1.5], size: [0.12, 0.22], life: [0.35, 0.6], grav: 4, spread: 1 },
  confetti: { n: 40, colors: [0xe8403a, 0xf7c41c, 0x2fb04a, 0x2a74e8, 0x9b59d0, 0xff6fb5], speed: [2, 6], up: [6, 11], size: [0.12, 0.2], life: [1.2, 1.8], grav: 14, spread: 1 },
  coin:     { n: 10, colors: [0xffd23a, 0xfff3a0, 0xffb800], speed: [1.5, 3.5], up: [2, 4], size: [0.08, 0.14], life: [0.35, 0.55], grav: 6, spread: 1 },
  wood:     { n: 8, colors: [0xc8874a, 0xe0a86a, 0x8a5528], speed: [1, 2.5], up: [1, 2.5], size: [0.1, 0.18], life: [0.3, 0.5], grav: 10, spread: 1 },
  lava:     { n: 16, colors: [0xff5a1f, 0xffc23a, 0x7a1a08], speed: [1.5, 4], up: [3, 7], size: [0.12, 0.22], life: [0.5, 0.9], grav: 12, spread: 1 },
  trail:    { n: 2, colors: [0xffffff], speed: [0.2, 0.6], up: [0.3, 0.9], size: [0.12, 0.2], life: [0.45, 0.7], grav: 0, spread: 1 },
  poof:     { n: 14, colors: [0xffffff, 0xdfeaff], speed: [1, 2.2], up: [0.5, 2], size: [0.2, 0.35], life: [0.4, 0.7], grav: -1, spread: 1 },
};

export class Particles {
  private mesh: THREE.InstancedMesh;
  private p = new Float32Array(MAX * 3);
  private v = new Float32Array(MAX * 3);
  private life = new Float32Array(MAX);
  private max = new Float32Array(MAX);
  private size = new Float32Array(MAX);
  private grav = new Float32Array(MAX);
  private spin = new Float32Array(MAX);
  private next = 0;
  private m = new THREE.Matrix4();
  private q = new THREE.Quaternion();
  private e = new THREE.Euler();
  private s = new THREE.Vector3();
  private t = new THREE.Vector3();
  private c = new THREE.Color();

  constructor(scene: THREE.Scene) {
    this.mesh = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshLambertMaterial({ color: 0xffffff }), MAX);
    this.mesh.frustumCulled = false;
    this.mesh.castShadow = false;
    this.mesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(MAX * 3).fill(1), 3);
    for (let i = 0; i < MAX; i++) { this.mesh.setMatrixAt(i, this.m.makeScale(0, 0, 0)); }
    scene.add(this.mesh);
  }

  /** colors — свои цвета вместо пресета (след из лавки: радуга, огонь…). */
  emit(kind: Burst, at: THREE.Vector3, scale = 1, colors?: number[]): void {
    const P = colors?.length ? { ...PRESET[kind], colors } : PRESET[kind];
    const n = Math.round(P.n * scale);
    const R = (a: [number, number]) => a[0] + Math.random() * (a[1] - a[0]);
    for (let k = 0; k < n; k++) {
      const i = this.next; this.next = (this.next + 1) % MAX;
      const ang = Math.random() * Math.PI * 2, sp = R(P.speed);
      this.p[i * 3] = at.x; this.p[i * 3 + 1] = at.y; this.p[i * 3 + 2] = at.z;
      this.v[i * 3] = Math.cos(ang) * sp; this.v[i * 3 + 1] = R(P.up); this.v[i * 3 + 2] = Math.sin(ang) * sp;
      this.life[i] = this.max[i] = R(P.life);
      this.size[i] = R(P.size);
      this.grav[i] = P.grav;
      this.spin[i] = (Math.random() - 0.5) * 12;
      this.mesh.setColorAt(i, this.c.setHex(P.colors[(Math.random() * P.colors.length) | 0]));
    }
    if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true;
  }

  update(dt: number): void {
    let any = false;
    for (let i = 0; i < MAX; i++) {
      if (this.life[i] <= 0) continue;
      any = true;
      this.life[i] -= dt;
      const j = i * 3;
      this.v[j + 1] -= this.grav[i] * dt;
      // лёгкое сопротивление воздуха: разлёт быстро гаснет, как пыль
      const drag = 1 - Math.min(1, dt * 2.5);
      this.v[j] *= drag; this.v[j + 2] *= drag;
      this.p[j] += this.v[j] * dt; this.p[j + 1] += this.v[j + 1] * dt; this.p[j + 2] += this.v[j + 2] * dt;
      const k = Math.max(0, this.life[i] / this.max[i]);
      const sz = this.life[i] > 0 ? this.size[i] * (0.3 + 0.7 * k) : 0;
      const a = (this.max[i] - this.life[i]) * this.spin[i];
      this.q.setFromEuler(this.e.set(a, a * 0.7, 0));
      this.mesh.setMatrixAt(i, this.m.compose(this.t.set(this.p[j], this.p[j + 1], this.p[j + 2]), this.q, this.s.setScalar(sz)));
    }
    if (any) this.mesh.instanceMatrix.needsUpdate = true;
  }
}
