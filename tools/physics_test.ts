// Прогон физики без графики: бег, ступеньки, пропасти, потолок, падение.
// npx tsx tools/physics_test.ts
import * as THREE from 'three';
import { Physics } from '../src/engine/physics.ts';
import { Controller } from '../src/engine/controller.ts';

const stub = { root: new THREE.Object3D(), setState() {}, update() {} } as any;
const ph = new Physics();
const box = (sx: number, sy: number, sz: number, x: number, y: number, z: number) =>
  ph.add({ box: new THREE.Box3(new THREE.Vector3(x - sx / 2, y - sy / 2, z - sz / 2), new THREE.Vector3(x + sx / 2, y + sy / 2, z + sz / 2)) });

function run(name: string, setup: () => void, spawn: THREE.Vector3, script: (t: number) => { x: number; y: number; jump: boolean }, secs: number, check: (c: Controller) => boolean) {
  ph.solids.length = 0; setup();
  const c = new Controller(stub, (p, v, dt) => ph.move(p, v, dt));
  c.setSpawn(spawn, Math.PI); c.respawn();
  const fwd = new THREE.Vector3(0, 0, -1);
  let maxY = -1e9;
  for (let t = 0; t < secs; t += 1 / 60) { const s = script(t); c.update(1 / 60, { x: s.x, y: s.y }, s.jump, fwd); maxY = Math.max(maxY, c.pos.y); }
  const ok = check(c);
  console.log(ok ? 'OK  ' : 'FAIL', name.padEnd(36), 'pos', c.pos.toArray().map((v) => v.toFixed(2)).join(','), 'maxY', maxY.toFixed(2), 'grounded', c.grounded);
  return ok;
}
const floor = () => box(40, 2, 40, 0, -1, 0);
let all = true;
all = run('бег по полу 1с ≈ 8 м', floor, new THREE.Vector3(0, 0, 10), () => ({ x: 0, y: 1, jump: false }), 1, (c) => Math.abs(c.pos.z - 2.5) < 1 && c.grounded) && all;
all = run('высота прыжка ≈ 2.5', floor, new THREE.Vector3(0, 0, 0), (t) => ({ x: 0, y: 0, jump: t < 0.1 }), 1.2, (c) => c.grounded) && all;
all = run('ступенька 0.3 без прыжка', () => { floor(); box(3, 0.3, 3, 0, 0.15, -3); }, new THREE.Vector3(0, 0, 0), () => ({ x: 0, y: 1, jump: false }), 0.6, (c) => Math.abs(c.pos.y - 0.3) < 0.02) && all;
all = run('стена 1 м без прыжка — упор', () => { floor(); box(3, 1, 3, 0, 0.5, -3); }, new THREE.Vector3(0, 0, 0), () => ({ x: 0, y: 1, jump: false }), 1, (c) => c.pos.y < 0.05 && c.pos.z > -1.5) && all;
all = run('стена 2 м с прыжком — залез', () => { floor(); box(3, 2, 3, 0, 1, -3); }, new THREE.Vector3(0, 0, 0), (t) => ({ x: 0, y: t < 0.45 ? 1 : 0, jump: t > 0.05 && t < 0.15 }), 1.5, (c) => Math.abs(c.pos.y - 2) < 0.05) && all;
all = run('пропасть 5 м перепрыгнута', () => { box(3, 1, 6, 0, -0.5, 0); box(3, 1, 3, 0, -0.5, -9); }, new THREE.Vector3(0, 0, 2), (t) => ({ x: 0, y: t < 1.3 ? 1 : 0, jump: t > 0.55 && t < 0.65 }), 2, (c) => c.grounded && c.pos.z < -7) && all;
all = run('койот: прыжок 0.08с после края', () => { box(3, 1, 6, 0, -0.5, 0); box(3, 1, 3, 0, -0.5, -8); }, new THREE.Vector3(0, 0, 2), (t) => ({ x: 0, y: t < 1.3 ? 1 : 0, jump: t > 0.68 && t < 0.75 }), 2, (c) => c.grounded && c.pos.z < -6) && all;
all = run('удар головой о потолок', () => { floor(); box(4, 0.4, 4, 0, 3.4, 0); }, new THREE.Vector3(0, 0, 0), (t) => ({ x: 0, y: 0, jump: t < 0.1 }), 0.3, (c) => c.pos.y + 2.6 <= 3.2 + 1e-3) && all;
all = run('падение в пропасть уходит вниз', () => { box(3, 1, 3, 0, -0.5, 0); }, new THREE.Vector3(0, 0, 0), () => ({ x: 0, y: 1, jump: false }), 2, (c) => c.pos.y < -20) && all;
all = run('скольжение вдоль стены', () => { floor(); box(0.6, 4, 10, 1, 2, -3); }, new THREE.Vector3(0, 0, 0), () => ({ x: 0.7, y: 0.7, jump: false }), 1, (c) => c.pos.z < -3 && c.pos.x < 0.7) && all;
console.log(all ? '\nВСЕ ПРОЙДЕНЫ' : '\nЕСТЬ ПАДЕНИЯ');
process.exit(all ? 0 : 1);
