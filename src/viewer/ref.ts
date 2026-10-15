// Служебный просмотр эталонов Roblox (art/ref/roblox) — только для снятия пропорций, в сборку не идёт.
import * as THREE from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { Avatar, NOOB } from '../engine/avatar.ts';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const r = new THREE.WebGLRenderer({ antialias: true });
r.setSize(innerWidth, innerHeight); r.setPixelRatio(devicePixelRatio);
document.body.appendChild(r.domElement);
const scene = new THREE.Scene(); scene.background = new THREE.Color(0x8cc4ff);
scene.add(new THREE.HemisphereLight(0xffffff, 0x667788, 2.2));
const sun = new THREE.DirectionalLight(0xffffff, 2); sun.position.set(3, 5, 4); scene.add(sun);
const cam = new THREE.PerspectiveCamera(35, innerWidth / innerHeight, 0.01, 1000);
const ctl = new OrbitControls(cam, r.domElement);
const out: Record<string, unknown> = {};
(window as any).__ref = out;

const files = ['ClassicMannequin.fbx', 'BlockyCharacter.fbx'];
const ours = new Avatar(NOOB); ours.root.position.x = 3.75; scene.add(ours.root);
let x = 0.6;
for (const f of files) {
  const obj = await new FBXLoader().loadAsync('./art/ref/roblox/' + f);
  const box = new THREE.Box3().setFromObject(obj);
  const s = 2.6 / (box.max.y - box.min.y);   // приводим к росту 2.6, как у нашего аватара
  obj.scale.multiplyScalar(s);
  obj.updateMatrixWorld(true);
  const b2 = new THREE.Box3().setFromObject(obj);
  obj.position.set(x - (b2.min.x + b2.max.x) / 2, -b2.min.y, 0);
  obj.updateMatrixWorld(true);
  const parts: Record<string, number[]> = {};
  obj.traverse((o: any) => {
    if (o.isMesh && !/Geo$/.test(o.name)) o.visible = false;   // клетки одежды и точки крепления
    if (o.isMesh && o.visible) {
      o.material = new THREE.MeshStandardMaterial({ color: 0xd8d8d8, roughness: 0.5 });
      const bb = new THREE.Box3().setFromObject(o);
      const sz = bb.getSize(new THREE.Vector3()), c = bb.getCenter(new THREE.Vector3());
      parts[o.name] = [sz.x, sz.y, sz.z, c.x - x, c.y, c.z].map((v) => +v.toFixed(3));
    }
  });
  out[f] = parts;
  scene.add(obj);
  x += 2.2;
}
cam.position.set(2.2, 1.5, 10.5); ctl.target.set(2.2, 1.3, 0); ctl.update();
(window as any).__boxes = () => scene.children.filter((o) => o.type === 'Group' || o.type === 'Object3D').map((o) => { const b = new THREE.Box3().setFromObject(o, true); return [o.name, b.min.toArray().map((v) => +v.toFixed(2)), b.max.toArray().map((v) => +v.toFixed(2))]; });
r.setAnimationLoop(() => r.render(scene, cam));
(window as any).__view = (az: number) => { cam.position.set(2.2 + Math.sin(az) * 10.5, 1.5, Math.cos(az) * 10.5); ctl.update(); };
(window as any).__heads = (az: number) => { const tx = 3.3; cam.position.set(tx + Math.sin(az) * 3.2, 2.35, Math.cos(az) * 3.2); ctl.target.set(tx, 2.2, 0); ctl.update(); };
