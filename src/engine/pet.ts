import * as THREE from 'three';
import { block } from './world.ts';

/**
 * Питомец серии: блочный зверёк, бежит за игроком чуть сзади-сбоку и подпрыгивает.
 * Физики у него нет — он «догоняет» точку за спиной: ни застрять, ни упасть
 * с трассы не может, а значит, никогда не раздражает.
 */
export type PetKind = 'cat' | 'dog' | 'dragon';
export interface PetLook { kind: PetKind; body: number; accent: number }

export function makePet(look: PetLook): THREE.Group {
  const g = new THREE.Group();
  const add = (sx: number, sy: number, sz: number, c: number, x: number, y: number, z: number, rz = 0) => {
    const m = block({ x: sx, y: sy, z: sz }, c); m.position.set(x, y, z); m.rotation.z = rz; m.castShadow = true; g.add(m); return m;
  };
  add(0.9, 0.6, 1.1, look.body, 0, 0.5, 0);              // туловище
  add(0.75, 0.65, 0.7, look.body, 0, 0.95, 0.55);        // голова
  for (const x of [-0.3, 0.3]) for (const z of [-0.35, 0.35]) add(0.22, 0.3, 0.22, look.accent, x, 0.15, z);   // лапы
  // глаза
  for (const x of [-0.17, 0.17]) add(0.1, 0.14, 0.04, 0x151515, x, 1.02, 0.91);
  if (look.kind === 'cat') {
    for (const x of [-0.22, 0.22]) add(0.18, 0.25, 0.12, look.accent, x, 1.35, 0.55, x > 0 ? -0.3 : 0.3);
    add(0.15, 0.15, 0.6, look.accent, 0, 0.75, -0.75);   // хвост
  } else if (look.kind === 'dog') {
    for (const x of [-0.42, 0.42]) add(0.12, 0.4, 0.3, look.accent, x, 0.95, 0.5);   // висячие уши
    add(0.3, 0.22, 0.2, look.accent, 0, 0.85, 0.95);       // нос-морда
    add(0.12, 0.12, 0.4, look.accent, 0, 0.8, -0.7);
  } else {
    for (const x of [-0.6, 0.6]) add(0.6, 0.08, 0.5, look.accent, x, 0.85, -0.05, x > 0 ? -0.5 : 0.5);   // крылья
    for (const x of [-0.18, 0.18]) add(0.1, 0.3, 0.1, 0xfff3a0, x, 1.35, 0.5);                           // рожки
    add(0.2, 0.2, 0.7, look.body, 0, 0.55, -0.8);
  }
  g.scale.setScalar(0.85);
  return g;
}

export class Pet {
  readonly group: THREE.Group;
  private t = 0;
  private yaw = 0;

  constructor(scene: THREE.Scene, look: PetLook) {
    this.group = makePet(look);
    scene.add(this.group);
  }

  /** target — позиция игрока, yaw — куда он смотрит. Питомец держится сзади-слева. */
  update(dt: number, target: THREE.Vector3, yaw: number, moving: boolean): void {
    this.t += dt;
    const back = new THREE.Vector3(-Math.sin(yaw) * 1.6 + Math.cos(yaw) * 1.1, 0, -Math.cos(yaw) * 1.6 - Math.sin(yaw) * 1.1);
    const goal = target.clone().add(back);
    const k = 1 - Math.exp(-dt * 6);
    // далеко отстал (телепорт, респаун) — сразу рядом, а не «летит» через полкарты
    if (this.group.position.distanceTo(goal) > 12) this.group.position.copy(goal);
    this.group.position.x += (goal.x - this.group.position.x) * k;
    this.group.position.z += (goal.z - this.group.position.z) * k;
    const hop = moving ? Math.abs(Math.sin(this.t * 10)) * 0.35 : Math.abs(Math.sin(this.t * 3)) * 0.08;
    this.group.position.y += (goal.y + hop - this.group.position.y) * Math.min(1, k * 2);
    let d = yaw - this.yaw; d = Math.atan2(Math.sin(d), Math.cos(d));
    this.yaw += d * k;
    this.group.rotation.y = this.yaw;
  }

  dispose(scene: THREE.Scene): void { scene.remove(this.group); }
}
