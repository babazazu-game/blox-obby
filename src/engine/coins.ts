import * as THREE from 'three';
import type { BuiltStage } from './level.ts';
import { coinImage } from './textures.ts';

/**
 * Монеты на трассе — общий механизм серии.
 *
 * Одна монета над серединой каждой опоры этапа (кроме чекпоинтов), плюс
 * «рискованные» над пропастями — за ними надо прыгнуть или достроить мост.
 * Все монеты — ОДИН InstancedMesh: сотня монет = один вызов отрисовки.
 * Собранная монета прячется масштабом 0, на новом забеге возвращается.
 */
const R = 0.55;
const PICK = 1.3;

export class Coins {
  private mesh: THREE.InstancedMesh;
  private pos: THREE.Vector3[] = [];
  private taken: boolean[] = [];
  private t = 0;
  private m = new THREE.Matrix4();
  private q = new THREE.Quaternion();
  private s = new THREE.Vector3();
  private up = new THREE.Vector3(0, 1, 0);
  private at = new THREE.Vector3();

  constructor(scene: THREE.Scene, stages: BuiltStage[], extra: THREE.Vector3[] = []) {
    for (const st of stages) {
      const chain = st.chain;
      for (let i = 1; i < chain.length - 1; i++) {
        const b = chain[i];
        if (st.noCoin.includes(b)) continue;
        this.pos.push(new THREE.Vector3((b.min.x + b.max.x) / 2, b.max.y + 1.1, (b.min.z + b.max.z) / 2));
      }
      // над серединой пропасти между опорами — монета «за смелость»
      for (let i = 0; i < chain.length - 1; i++) {
        const a = chain[i], b = chain[i + 1];
        if (st.noCoin.includes(a) || st.noCoin.includes(b)) continue;
        // разрыв по любой оси (трасса поворачивает): монета посередине над пропастью
        const gx = Math.max(0, b.min.x - a.max.x, a.min.x - b.max.x), gz = Math.max(0, b.min.z - a.max.z, a.min.z - b.max.z);
        if (Math.max(gx, gz) > 3) {
          const ca = a.getCenter(new THREE.Vector3()), cb = b.getCenter(new THREE.Vector3());
          this.pos.push(new THREE.Vector3((ca.x + cb.x) / 2, Math.max(a.max.y, b.max.y) + 1.6, (ca.z + cb.z) / 2));
        }
      }
    }
    this.pos.push(...extra);
    const geo = new THREE.CylinderGeometry(R, R, 0.12, 20);
    geo.rotateX(Math.PI / 2);   // ребром к игроку, крутится вокруг вертикали
    // Ребро — гладкое золото, обе «решки» — та же монета с портретом героя, что в HUD.
    const edge = new THREE.MeshStandardMaterial({ color: 0xf2a900, emissive: 0x9a6200, emissiveIntensity: 0.3, metalness: 0.5, roughness: 0.35 });
    const tex = new THREE.CanvasTexture(coinImage());
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    const face = new THREE.MeshStandardMaterial({ map: tex, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.25, metalness: 0.3, roughness: 0.4 });
    this.mesh = new THREE.InstancedMesh(geo, [edge, face, face], this.pos.length);
    this.mesh.castShadow = true;
    scene.add(this.mesh);
    this.reset();
    // Границы для отсечения — по ВСЕМ монетам (computeBoundingSphere по экземплярам),
    // иначе монеты всех миров рисовались всегда — даже в хабе за километр (×3 материала, ×тени).
    this.mesh.computeBoundingSphere();
    this.mesh.boundingSphere!.radius += 2;
  }

  get total(): number { return this.pos.length; }

  reset(): void {
    this.taken = this.pos.map(() => false);
    this.update(0, null);
  }

  /** Радиус подбора: улучшение «Магнит» его увеличивает. */
  pick = PICK;

  /** Возвращает, сколько монет собрано в этом кадре. */
  update(dt: number, player: THREE.Vector3 | null): number {
    const R = this.pick;
    this.t += dt;
    let got = 0;
    this.q.setFromAxisAngle(this.up, this.t * 3);
    for (let i = 0; i < this.pos.length; i++) {
      const p = this.pos[i];
      if (!this.taken[i] && player && Math.abs(player.x - p.x) < R && Math.abs(player.z - p.z) < R && player.y + 1.3 > p.y - R && player.y + 1.3 < p.y + R) {
        this.taken[i] = true; got++;
      }
      this.s.setScalar(this.taken[i] ? 0 : 1);
      const bob = Math.sin(this.t * 2.5 + i) * 0.12;
      this.m.compose(this.at.set(p.x, p.y + bob, p.z), this.q, this.s);
      this.mesh.setMatrixAt(i, this.m);
    }
    this.mesh.instanceMatrix.needsUpdate = true;
    return got;
  }
}
