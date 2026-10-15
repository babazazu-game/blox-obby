import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Avatar, type AvatarLook } from './avatar.ts';
import { coinHtml, uiUnit } from './hud.ts';

/**
 * Магазин скинов серии: сетка карточек с портретом аватара, ценой и кнопкой.
 *
 * Портреты рисуются ОДИН раз при первом открытии отдельным маленьким
 * рендерером в картинки (dataURL), потом рендерер уничтожается. Держать
 * в магазине живые 3D-превью — это ещё 9 сцен в кадре ради витрины.
 *
 * Деньги и владение решает игра (колбэки): магазин о сохранении не знает.
 */
/**
 * Товар. Картинка — одно из: `look` (аватар), `make` (любая 3D-модель: питомец),
 * `icon` (эмодзи). `prices` вместо `price` — товар с уровнями (улучшение):
 * каждая покупка поднимает уровень, цена — следующего уровня.
 */
export interface ShopItem {
  id: string; name: string; price?: number; prices?: number[];
  look?: AvatarLook; make?: () => THREE.Object3D; icon?: string; colors?: number[];
  /** Подпись под названием (для улучшений — что даёт текущий уровень). */
  desc?: (level: number) => string;
}
export interface ShopState { coins: number; owned?: string[]; selected?: string; levels?: Record<string, number> }


const previews = new Map<string, string>();

/** Картинка из эмодзи или полос цвета (след) — 3D тут не нужно. */
function flatPreview(it: ShopItem): string {
  const c = document.createElement('canvas'); c.width = 180; c.height = 220;
  const g = c.getContext('2d')!;
  if (it.colors?.length) {
    it.colors.forEach((col, i) => { g.fillStyle = '#' + col.toString(16).padStart(6, '0'); g.beginPath(); g.arc(40 + i * 22, 150 - i * 16, 14, 0, Math.PI * 2); g.fill(); });
  } else {
    g.font = '110px "Segoe UI Emoji", "Apple Color Emoji", sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(it.icon ?? '❔', 90, 115);
  }
  return c.toDataURL('image/png');
}

function renderPreviews(items: ShopItem[]): void {
  const todo = items.filter((it) => !previews.has(it.id));
  for (const it of todo) if (!it.look && !it.make) previews.set(it.id, flatPreview(it));
  if (!todo.some((it) => it.look || it.make)) return;
  const W = 180, H = 220;
  const r = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
  r.setSize(W, H);
  r.outputColorSpace = THREE.SRGBColorSpace;
  r.toneMapping = THREE.NeutralToneMapping;
  const scene = new THREE.Scene();
  const pm = new THREE.PMREMGenerator(r);
  scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.5;
  scene.add(new THREE.HemisphereLight(0xffffff, 0xbfd3ff, 1.6));
  const sun = new THREE.DirectionalLight(0xffffff, 2); sun.position.set(2, 4, 5); scene.add(sun);
  const cam = new THREE.PerspectiveCamera(30, W / H, 0.1, 50);
  cam.position.set(1.6, 2.2, 6.4); cam.lookAt(0, 1.45, 0);
  for (const it of todo) {
    if (!it.look && !it.make) continue;
    let obj: THREE.Object3D;
    if (it.look) { const a = new Avatar(it.look); a.update(0.016); obj = a.root; }
    else { obj = it.make!(); obj.scale.multiplyScalar(2.2); obj.position.y = 0.4; }
    obj.rotation.y = 0.35;
    scene.add(obj);
    r.render(scene, cam);
    previews.set(it.id, r.domElement.toDataURL('image/png'));
    scene.remove(obj);
  }
  pm.dispose();
  r.dispose();
  r.forceContextLoss();   // контекст WebGL на странице ограничен — отдаём сразу
}

export class Shop {
  private el: HTMLDivElement;

  constructor(parent: HTMLElement, private items: ShopItem[], private state: () => ShopState,
    private onBuy: (id: string) => boolean, private onSelect: (id: string) => void, private onClose: () => void,
    private t: { title: string; buy: string; wear: string; worn: string; close: string; max?: string }) {
    injectCss();
    this.el = document.createElement('div');
    this.el.className = 'shop';
    parent.appendChild(this.el);
  }

  open(): void {
    renderPreviews(this.items);
    this.render();
    this.el.classList.add('on');
  }

  close(): void { this.el.classList.remove('on'); this.onClose(); }

  private render(): void {
    const s = this.state();
    this.el.innerHTML = '';
    const box = document.createElement('div');
    box.className = 'shop-box';
    box.style.setProperty('--u', uiUnit().toFixed(3) + 'px');
    // БЕЗ прокрутки: сетка подбирается под экран — в ландшафте 5 в ряд, в портрете 3,
    // строки делят высоту поровну, портрет в карточке сжимается. Прокрутка в игре
    // недопустима (правило пользователя): на телефоне её путают с поворотом камеры.
    const cols = innerWidth >= innerHeight ? Math.min(5, this.items.length) : 3;
    const rows = Math.ceil(this.items.length / cols);
    box.style.setProperty('--cols', String(cols));
    box.style.setProperty('--rows', String(rows));
    box.innerHTML = `<div class="shop-head"><span class="shop-title">${this.t.title}</span><span class="shop-coins">${coinHtml()}${s.coins}</span></div>`;
    const x = document.createElement('button');
    x.className = 'shop-x'; x.textContent = '✕'; x.title = this.t.close;
    x.addEventListener('click', () => this.close());
    box.appendChild(x);
    const grid = document.createElement('div');
    grid.className = 'shop-grid';
    for (const it of this.items) {
      const card = document.createElement('div');
      const b = document.createElement('button');
      if (it.prices) {
        // товар с уровнями: точки уровней, цена следующего или «МАКС»
        const lvl = s.levels?.[it.id] ?? 0, max = it.prices.length;
        const pips = Array.from({ length: max }, (_, i) => `<i class="pip${i < lvl ? ' on' : ''}"></i>`).join('');
        card.className = 'shop-card';
        card.innerHTML = `<img src="${previews.get(it.id)}" alt=""><div class="shop-name">${it.name}</div><div class="shop-pips">${pips}</div><div class="shop-desc">${it.desc?.(Math.max(1, lvl)) ?? ''}</div>`;
        if (lvl >= max) { b.textContent = this.t.max ?? 'MAX'; b.className = 'shop-btn worn'; b.disabled = true; }
        else {
          const price = it.prices[lvl];
          b.innerHTML = `${coinHtml()}${price}`;
          b.className = 'shop-btn buy' + (s.coins < price ? ' poor' : '');
          b.addEventListener('click', () => { this.onBuy(it.id); this.render(); });
        }
        card.appendChild(b);
        grid.appendChild(card);
        continue;
      }
      const owned = s.owned?.includes(it.id) ?? false, worn = s.selected === it.id;
      card.className = 'shop-card' + (worn ? ' worn' : '');
      card.innerHTML = `<img src="${previews.get(it.id)}" alt=""><div class="shop-name">${it.name}</div>`;
      if (worn) { b.textContent = this.t.worn; b.className = 'shop-btn worn'; b.disabled = true; }
      else if (owned) { b.textContent = this.t.wear; b.className = 'shop-btn wear'; b.addEventListener('click', () => { this.onSelect(it.id); this.render(); }); }
      else {
        b.innerHTML = `${coinHtml()}${it.price ?? 0}`;
        b.className = 'shop-btn buy' + (s.coins < (it.price ?? 0) ? ' poor' : '');
        b.addEventListener('click', () => { if (this.onBuy(it.id)) { this.onSelect(it.id); } this.render(); });
      }
      card.appendChild(b);
      grid.appendChild(card);
    }
    box.appendChild(grid);
    this.el.appendChild(box);
  }
}

let cssDone = false;
function injectCss(): void {
  if (cssDone) return;
  cssDone = true;
  const s = document.createElement('style');
  s.textContent = `
.shop{position:absolute;inset:0;z-index:30;display:none;align-items:center;justify-content:center;background:rgba(10,20,40,.55);font-family:Rubik,Arial,sans-serif}
.shop.on{display:flex}
.shop-box{position:relative;width:min(80vw,calc(var(--u)*600));height:min(72vh,calc(var(--u)*370));display:flex;flex-direction:column;padding:calc(var(--u)*16);border-radius:calc(var(--u)*24);background:#fff;box-shadow:0 calc(var(--u)*8) 0 #c9d3e3}
.shop-head{display:flex;align-items:center;justify-content:space-between;padding:0 calc(var(--u)*56) calc(var(--u)*10) calc(var(--u)*6)}
.shop-title{font-weight:900;font-size:max(18px,min(calc(var(--u)*26),6vw));color:#ff7a2f;text-shadow:0 3px 0 #c55a00}
.shop-coins,.shop-btn.buy{display:inline-flex;align-items:center;gap:6px;font-weight:900}
.shop-coins{font-size:max(16px,calc(var(--u)*24));color:#1b2433}
.shop i{font-style:normal;color:#ffb800}
.shop-x{position:absolute;right:calc(var(--u)*12);top:calc(var(--u)*12);width:max(44px,calc(var(--u)*46));height:max(44px,calc(var(--u)*46));border:0;border-radius:50%;background:#e8403a;color:#fff;font:900 max(18px,calc(var(--u)*22)) Rubik,Arial;cursor:pointer;box-shadow:0 4px 0 #a82a22}
.shop-grid{flex:1;min-height:0;overflow:hidden;display:grid;grid-template-columns:repeat(var(--cols),minmax(0,1fr));grid-template-rows:repeat(var(--rows),minmax(0,1fr));gap:calc(var(--u)*10);padding:calc(var(--u)*4)}
.shop-card{min-height:0;display:flex;flex-direction:column;align-items:center;gap:calc(var(--u)*3);padding:calc(var(--u)*6);border-radius:calc(var(--u)*16);background:linear-gradient(#e9f3ff,#cfe3ff);border:3px solid transparent}
.shop-card.worn{border-color:#3ad15a;background:linear-gradient(#eafff0,#c9f5d6)}
.shop-card>img{flex:1;min-height:0;width:100%;object-fit:contain}
.shop-name{font-weight:900;font-size:max(11px,min(calc(var(--u)*13),2.4vw));white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;color:#1b2433}
.shop-btn{width:100%;flex:none;min-height:max(32px,min(calc(var(--u)*32),9vw));border:0;border-radius:calc(var(--u)*10);color:#fff;font:900 max(11px,min(calc(var(--u)*14),2.6vw)) Rubik,Arial;white-space:nowrap;overflow:hidden;padding:0 4px;cursor:pointer;justify-content:center}
.shop-btn.buy{background:#ff9a1f;box-shadow:0 4px 0 #c55a00}.shop-btn.buy i{color:#fff3a8}
.shop-btn.buy.poor{background:#b9c2cf;box-shadow:0 4px 0 #8b94a1}
.shop-btn.wear{background:#2a74e8;box-shadow:0 4px 0 #17469a}
.shop-pips{display:flex;gap:4px}.shop-pips .pip{width:max(8px,calc(var(--u)*12));height:max(8px,calc(var(--u)*12));border-radius:50%;background:#c9d3e3}.shop-pips .pip.on{background:#3ad15a}
.shop-desc{font:700 max(11px,min(calc(var(--u)*12),3vw)) Rubik,Arial;color:#55627a;text-align:center;line-height:1.15;min-height:2.3em}
.shop-btn.worn{background:#3ad15a;box-shadow:0 4px 0 #23913b;cursor:default}
`;
  document.head.appendChild(s);
}
