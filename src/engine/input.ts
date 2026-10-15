import { safeInsets, tapSize } from 'yg-core';

/**
 * Ввод серии: клавиатура, мышь, тач — в одно состояние `move/jump/look`.
 * Игра читает только его и не знает, чем управляют.
 *
 * ── КЛАВИШИ ──────────────────────────────────────────────────────────────
 * Только буквы, стрелки, Пробел, Shift, Enter. Системные (Ctrl, Alt, Meta,
 * Tab, Esc, F1–F12) НЕ занимаем: Яндекс отклонял игру за Ctrl (п. 1.6.2.6,
 * Ctrl+W закрывал вкладку). У Пробела и стрелок глушим прокрутку страницы.
 *
 * ── ТАЧ ──────────────────────────────────────────────────────────────────
 * Левая половина экрана — плавающий джойстик (появляется там, где коснулись),
 * правая — вращение камеры, кнопка прыжка — справа снизу. Это раскладка
 * мобильного Роблокса: дети её знают.
 */

export const ALLOWED_KEYS = new Set([
  'KeyW', 'KeyA', 'KeyS', 'KeyD', 'KeyE', 'KeyQ', 'KeyR', 'KeyF',
  'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', 'ShiftLeft', 'ShiftRight', 'Enter',
]);
const NO_SCROLL = new Set(['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']);

export interface InputState {
  /** Желаемое движение в осях камеры: x — вправо, y — вперёд, длина 0..1. */
  move: { x: number; y: number };
  /** Прыжок нажат прямо сейчас (держим — для прыжка «с разбега»). */
  jump: boolean;
  /** Накопленный поворот камеры с прошлого кадра, в пикселях. Игра обнуляет через `consumeLook`. */
  look: { x: number; y: number };
  /** Накопленный зум колесом/щипком. */
  zoom: number;
  touch: boolean;
}

export class Input {
  readonly state: InputState = { move: { x: 0, y: 0 }, jump: false, look: { x: 0, y: 0 }, zoom: 0, touch: false };
  private keys = new Set<string>();
  private touchJump = false;
  private stick: { id: number; ox: number; oy: number; x: number; y: number } | null = null;
  private lookId: number | null = null;
  private lookLast = { x: 0, y: 0 };
  private mouseDown = false;
  private ui: HTMLDivElement;
  private knob: HTMLDivElement;
  private base: HTMLDivElement;
  private jumpBtn: HTMLDivElement;

  constructor(el: HTMLElement) {
    addEventListener('keydown', (e) => {
      if (!ALLOWED_KEYS.has(e.code)) return;
      if (NO_SCROLL.has(e.code)) e.preventDefault();
      this.keys.add(e.code);
    });
    addEventListener('keyup', (e) => this.keys.delete(e.code));
    // Уход фокуса: keyup не придёт, и персонаж «залипнет» в беге.
    addEventListener('blur', () => { this.keys.clear(); this.mouseDown = false; });
    document.addEventListener('contextmenu', (e) => e.preventDefault());   // п. 1.6.2.7

    // Мышь: тянуть любой кнопкой — крутить камеру (в Роблоксе ПКМ, но ЛКМ дети жмут чаще).
    el.addEventListener('mousedown', (e) => { this.mouseDown = true; this.lookLast = { x: e.clientX, y: e.clientY }; });
    addEventListener('mouseup', () => { this.mouseDown = false; });
    addEventListener('mousemove', (e) => {
      if (!this.mouseDown) return;
      this.state.look.x += e.clientX - this.lookLast.x;
      this.state.look.y += e.clientY - this.lookLast.y;
      this.lookLast = { x: e.clientX, y: e.clientY };
    });
    el.addEventListener('wheel', (e) => { e.preventDefault(); this.state.zoom += Math.sign(e.deltaY); }, { passive: false });

    // Тач-слой: DOM поверх холста.
    this.ui = document.createElement('div');
    this.ui.className = 'touch-ui';
    this.base = div('stick-base'); this.knob = div('stick-knob'); this.base.appendChild(this.knob);
    this.jumpBtn = div('jump-btn');
    this.ui.append(this.base, this.jumpBtn);
    el.appendChild(this.ui);
    injectCss();

    el.addEventListener('touchstart', (e) => this.onTouch(e, 'start'), { passive: false });
    el.addEventListener('touchmove', (e) => this.onTouch(e, 'move'), { passive: false });
    el.addEventListener('touchend', (e) => this.onTouch(e, 'end'), { passive: false });
    el.addEventListener('touchcancel', (e) => this.onTouch(e, 'end'), { passive: false });
    this.layout();
    addEventListener('resize', () => this.layout());
  }

  /** Кнопка прыжка и джойстик — от краёв внутрь с учётом safe-area (п. 1.10.1). */
  private layout(): void {
    const ins = safeInsets();
    const s = tapSize(Math.round(Math.min(innerWidth, innerHeight) * 0.2));
    Object.assign(this.jumpBtn.style, { width: s + 'px', height: s + 'px', right: ins.right + s * 0.35 + 'px', bottom: ins.bottom + s * 0.35 + 'px' });
    const b = Math.round(s * 1.4);
    Object.assign(this.base.style, { width: b + 'px', height: b + 'px' });
    Object.assign(this.knob.style, { width: b * 0.45 + 'px', height: b * 0.45 + 'px' });
  }

  private onTouch(e: TouchEvent, phase: 'start' | 'move' | 'end'): void {
    e.preventDefault();
    if (!this.state.touch) { this.state.touch = true; this.ui.classList.add('on'); }
    const jr = this.jumpBtn.getBoundingClientRect();
    for (const t of Array.from(e.changedTouches)) {
      const inJump = t.clientX >= jr.left && t.clientX <= jr.right && t.clientY >= jr.top && t.clientY <= jr.bottom;
      if (phase === 'start') {
        if (inJump) { this.touchJump = true; this.jumpBtn.classList.add('down'); continue; }
        if (t.clientX < innerWidth * 0.45 && !this.stick) {
          this.stick = { id: t.identifier, ox: t.clientX, oy: t.clientY, x: t.clientX, y: t.clientY };
          this.base.style.left = t.clientX + 'px'; this.base.style.top = t.clientY + 'px';
          this.base.classList.add('show');
        } else if (this.lookId === null) {
          this.lookId = t.identifier; this.lookLast = { x: t.clientX, y: t.clientY };
        }
      } else if (phase === 'move') {
        if (this.stick && t.identifier === this.stick.id) { this.stick.x = t.clientX; this.stick.y = t.clientY; }
        if (t.identifier === this.lookId) {
          this.state.look.x += (t.clientX - this.lookLast.x) * 1.4;
          this.state.look.y += (t.clientY - this.lookLast.y) * 1.4;
          this.lookLast = { x: t.clientX, y: t.clientY };
        }
      } else {
        if (this.stick && t.identifier === this.stick.id) { this.stick = null; this.base.classList.remove('show'); }
        if (t.identifier === this.lookId) this.lookId = null;
        if (inJump || e.touches.length === 0) { this.touchJump = false; this.jumpBtn.classList.remove('down'); }
      }
    }
  }

  /** Раз в кадр: собрать клавиатуру и джойстик в state.move/jump. */
  update(): void {
    const k = this.keys;
    let x = (k.has('KeyD') || k.has('ArrowRight') ? 1 : 0) - (k.has('KeyA') || k.has('ArrowLeft') ? 1 : 0);
    let y = (k.has('KeyW') || k.has('ArrowUp') ? 1 : 0) - (k.has('KeyS') || k.has('ArrowDown') ? 1 : 0);
    if (this.stick) {
      const r = parseFloat(this.base.style.width) / 2;
      let dx = (this.stick.x - this.stick.ox) / r, dy = (this.stick.y - this.stick.oy) / r;
      const len = Math.hypot(dx, dy);
      if (len > 1) { dx /= len; dy /= len; }
      this.knob.style.transform = `translate(${dx * r * 0.6}px, ${dy * r * 0.6}px)`;
      x = dx; y = -dy;
    }
    const len = Math.hypot(x, y);
    if (len > 1) { x /= len; y /= len; }
    this.state.move.x = x; this.state.move.y = y;
    this.state.jump = k.has('Space') || this.touchJump;
  }

  consumeLook(): { x: number; y: number; zoom: number } {
    const r = { x: this.state.look.x, y: this.state.look.y, zoom: this.state.zoom };
    this.state.look.x = this.state.look.y = this.state.zoom = 0;
    return r;
  }
}

function div(cls: string): HTMLDivElement {
  const d = document.createElement('div');
  d.className = cls;
  return d;
}

let cssDone = false;
function injectCss(): void {
  if (cssDone) return;
  cssDone = true;
  const s = document.createElement('style');
  s.textContent = `
.touch-ui{position:absolute;inset:0;pointer-events:none;display:none;z-index:5}
.touch-ui.on{display:block}
.stick-base{position:absolute;transform:translate(-50%,-50%);border-radius:50%;background:rgba(255,255,255,.18);border:3px solid rgba(255,255,255,.55);display:none}
.stick-base.show{display:block}
.stick-knob{position:absolute;left:50%;top:50%;margin:auto;inset:0;border-radius:50%;background:rgba(255,255,255,.85);box-shadow:0 3px 8px rgba(0,0,0,.25)}
.jump-btn{position:absolute;border-radius:50%;background:rgba(255,255,255,.28);border:3px solid rgba(255,255,255,.75);box-shadow:0 4px 10px rgba(0,0,0,.2)}
.jump-btn::after{content:'';position:absolute;left:50%;top:50%;width:34%;height:34%;transform:translate(-50%,-30%) rotate(45deg);border-left:6px solid #fff;border-top:6px solid #fff}
.jump-btn.down{background:rgba(255,255,255,.55);transform:scale(.94)}
`;
  document.head.appendChild(s);
}
