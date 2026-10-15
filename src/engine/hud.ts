import '@fontsource/rubik/700.css';
import '@fontsource/rubik/900.css';
import { safeInsets } from 'yg-core';
import { coinIconUrl } from './textures.ts';
import { L } from '../i18n.ts';

let coinUrl = '';

/**
 * Единица интерфейса: от ВЫСОТЫ экрана (правило заготовки), но не шире, чем позволяет
 * ширина. В портрете телефона высота большая, и «от высоты» всё раздувалось:
 * монеты налезали на плашку этапа, подсказка занимала полэкрана.
 */
export const uiUnit = (): number => Math.min(innerHeight / 540, innerWidth / 400);
/** Монета с портретом героя как инлайн-иконка для любого текста интерфейса. */
export const coinHtml = (): string => `<img class="coin-ico" src="${coinUrl ||= coinIconUrl()}" alt="">`;

/**
 * Интерфейс серии (DOM поверх холста) по утверждённому макету art/mockup/hud.html:
 * плашка этапа + полоса прогресса, монеты, настройки, всплывашка «ЧЕКПОИНТ!»,
 * подсказка, главное меню и экран финиша.
 *
 * Размер — от ВЫСОТЫ экрана (`--u` = высота / 540), как требуют правила проекта:
 * ландшафтные экраны различаются по ширине втрое, по высоте — нет. Кегль не ниже
 * 13 px (требование площадки) — через max() в CSS.
 * Отступы от краёв — с учётом safe-area (вырез, закруглённые углы): п. 1.10.1.
 * Тексты приходят готовыми строками — локализацию делает игра.
 */

export interface MenuOpts {
  title1: string;
  title2: string;
  play: string;
  /** «Продолжить с этапа N» — пусто, если начинаем с начала. */
  sub?: string;
  /** Кнопки второго ряда (магазин, скины…) — появятся, когда будут их этапы. */
  extra?: { label: string; color: string; onClick: () => void }[];
}

export interface FinishStats {
  title: string;
  stars: number;
  line: string;
  next: string;
  /** Кнопка награды за ролик (×2 монеты): onClick → true, если награда выдана. */
  bonus?: { label: string; onClick: () => Promise<boolean> };
}

export class Hud {
  private root: HTMLDivElement;
  private stageEl: HTMLDivElement;
  private barFill: HTMLElement;
  private coinsEl: HTMLDivElement;
  private toastEl: HTMLDivElement;
  private hintEl: HTMLDivElement;
  private overlay: HTMLDivElement;
  private toastTimer = 0;
  muted = false;
  onMuteChange?: (muted: boolean) => void;
  /** Кнопка «домой» (в хаб) — видна только в забеге. */
  onHome?: () => void;
  private homeBtn: HTMLButtonElement;

  constructor(parent: HTMLElement) {
    injectCss();
    this.root = el('div', 'hud');
    this.stageEl = el('div', 'hud-pill hud-stage');
    const bar = el('div', 'hud-bar');
    this.barFill = el('i', '');
    bar.appendChild(this.barFill);
    this.coinsEl = el('div', 'hud-pill hud-coins');
    this.coinsEl.style.display = 'none';
    const gear = el('button', 'hud-gear');
    // Настройки: громкость звуков и музыки ползунками (вместо одной кнопки «звук вкл/выкл»)
    gear.textContent = '⚙️';
    gear.addEventListener('pointerdown', (e) => { e.stopPropagation(); this.openSettings(); });
    this.settings = el('div', 'hud-settings');
    this.homeBtn = el('button', 'hud-gear hud-home');
    this.homeBtn.textContent = '🏠';
    this.homeBtn.style.display = 'none';
    this.homeBtn.addEventListener('pointerdown', (e) => { e.stopPropagation(); this.onHome?.(); });
    this.toastEl = el('div', 'hud-toast');
    this.hintEl = el('div', 'hud-hint');
    this.overlay = el('div', 'hud-overlay');
    this.root.append(this.stageEl, bar, this.coinsEl, gear, this.homeBtn, this.toastEl, this.hintEl);
    parent.append(this.root, this.overlay, this.settings);
    const lay = () => {
      const ins = safeInsets();
      const s = this.root.style;
      s.setProperty('--u', uiUnit().toFixed(3) + 'px');
      s.setProperty('--t', ins.top + 'px'); s.setProperty('--l', ins.left + 'px'); s.setProperty('--r', ins.right + 'px'); s.setProperty('--b', ins.bottom + 'px');
      this.overlay.style.setProperty('--u', uiUnit().toFixed(3) + 'px');
    };
    lay();
    addEventListener('resize', lay);
  }

  setStage(text: string, progress01: number): void {
    this.stageEl.innerHTML = `<span class="hud-ico hud-flag">🚩</span>${text}`;
    this.barFill.style.width = Math.round(progress01 * 100) + '%';
  }

  setCoins(n: number | null): void {
    this.coinsEl.style.display = n === null ? 'none' : '';
    if (n !== null) this.coinsEl.innerHTML = `<img class="hud-coinimg" src="${coinUrl ||= coinIconUrl()}" alt="">${n}`;
  }

  /** Крупная надпись на секунду: «ЧЕКПОИНТ!», «ФИНИШ!». */
  toast(text: string, ms = 1100): void {
    this.toastEl.textContent = text;
    this.toastEl.classList.remove('show');
    void this.toastEl.offsetWidth;   // перезапуск CSS-анимации
    this.toastEl.classList.add('show');
    clearTimeout(this.toastTimer);
    this.toastTimer = window.setTimeout(() => this.toastEl.classList.remove('show'), ms);
  }

  hint(text: string | null): void {
    this.hintEl.textContent = text ?? '';
    this.hintEl.classList.toggle('show', !!text);
  }

  showHomeButton(on: boolean): void { this.homeBtn.style.display = on ? '' : 'none'; }

  /** Виден ли игровой HUD (в меню прячем). */
  showHud(on: boolean): void { this.root.style.display = on ? '' : 'none'; }

  private skipBtn: HTMLButtonElement | null = null;
  /** Кнопка «пропустить этап за ролик»: label = null — спрятать. */
  showSkip(label: string | null, onClick?: () => void): void {
    if (!label) { this.skipBtn?.remove(); this.skipBtn = null; return; }
    if (this.skipBtn) return;
    const b = el('button', 'hud-skip') as HTMLButtonElement;
    b.textContent = label;
    b.addEventListener('pointerdown', (e) => { e.stopPropagation(); onClick?.(); });
    this.root.appendChild(b);
    this.skipBtn = b;
  }

  showMenu(o: MenuOpts, onPlay: () => void): void {
    this.overlay.style.visibility = '';
    this.overlay.innerHTML = '';
    const box = el('div', 'hud-menu');
    // логотип — картинка (нарисована Codex); не загрузилась — остаётся текстовый заголовок
    box.innerHTML = `<div class="hud-logo"><img src="${L('./assets/logo.webp', './assets/logo_en.webp')}" alt="" onerror="this.remove()"><div class="l1">${o.title1}</div><div class="l2">${o.title2}</div></div>`;
    box.querySelector('img')!.addEventListener('load', (e) => (e.target as HTMLElement).parentElement!.classList.add('img'));
    const play = el('button', 'hud-play');
    play.textContent = o.play;
    play.addEventListener('click', () => { this.overlay.classList.remove('on'); onPlay(); });
    box.appendChild(play);
    if (o.extra?.length) {
      const row = el('div', 'hud-row');
      for (const b of o.extra) {
        const x = el('button', 'hud-sb');
        x.textContent = b.label; x.style.background = b.color;
        x.addEventListener('click', b.onClick);
        row.appendChild(x);
      }
      box.appendChild(row);
    }
    if (o.sub) { const s = el('div', 'hud-sub'); s.innerHTML = o.sub; box.appendChild(s); }
    this.overlay.appendChild(box);
    this.overlay.classList.add('on');
  }

  showFinish(f: FinishStats, onNext: () => void): void {
    this.overlay.innerHTML = '';
    const card = el('div', 'hud-card');
    card.innerHTML = `<h2>${f.title}</h2><div class="stars">${'⭐'.repeat(f.stars)}${'<span class="off">⭐</span>'.repeat(3 - f.stars)}</div><div class="line">${f.line}</div>`;
    const next = el('button', 'hud-play');
    next.textContent = f.next;
    next.addEventListener('click', () => { this.overlay.classList.remove('on'); onNext(); });
    if (f.bonus) {
      const bonus = f.bonus;
      const b = el('button', 'hud-play hud-ad');
      b.textContent = bonus.label;
      b.addEventListener('click', async () => {
        b.disabled = true;
        if (await bonus.onClick()) b.remove(); else b.disabled = false;
      });
      card.appendChild(b);
    }
    card.appendChild(next);
    this.overlay.appendChild(card);
    this.overlay.classList.add('on');
  }

  /** Спрятать меню, не начиная игру (поверх откроется магазин). menuOpen остаётся true. */
  hideMenu(): void { this.overlay.style.visibility = 'hidden'; }

  get menuOpen(): boolean { return this.overlay.classList.contains('on') || this.settings.classList.contains('on'); }

  /** Громкость из настроек: kind — 'sfx' | 'music', v — 0..1. */
  onVolume?: (kind: 'sfx' | 'music', v: number) => void;
  private settings!: HTMLDivElement;
  private vols = { sfx: 1, music: 1 };
  setVolumes(sfx: number, music: number): void { this.vols = { sfx, music }; }

  private openSettings(): void {
    const s = this.settings;
    s.style.setProperty('--u', uiUnit().toFixed(3) + 'px');
    s.innerHTML = '';
    const card = el('div', 'hud-set-card');
    card.innerHTML = `<h3>${L('НАСТРОЙКИ', 'SETTINGS')}</h3>`;
    for (const [kind, label] of [['sfx', L('🔊 Звуки', '🔊 Sounds')], ['music', L('🎵 Музыка', '🎵 Music')]] as const) {
      const row = el('label', 'hud-set-row');
      const name = el('span', ''); name.textContent = label;
      const val = el('b', ''); val.textContent = Math.round(this.vols[kind] * 100) + '%';
      const range = el('input', '');
      range.type = 'range'; range.min = '0'; range.max = '100'; range.value = String(Math.round(this.vols[kind] * 100));
      range.addEventListener('input', () => {
        const v = +range.value / 100;
        this.vols[kind] = v; val.textContent = range.value + '%';
        this.onVolume?.(kind, v);
      });
      row.append(name, range, val);
      card.appendChild(row);
    }
    const ok = el('button', 'hud-play hud-set-ok'); ok.textContent = L('ГОТОВО', 'DONE');
    ok.addEventListener('click', () => s.classList.remove('on'));
    card.appendChild(ok);
    s.appendChild(card);
    s.classList.add('on');
  }
}

function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls: string): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  return e;
}

let cssDone = false;
function injectCss(): void {
  if (cssDone) return;
  cssDone = true;
  const s = document.createElement('style');
  s.textContent = `
.hud,.hud-overlay{font-family:Rubik,Arial,sans-serif;color:#fff;-webkit-user-select:none;user-select:none}
.hud{position:absolute;inset:0;pointer-events:none;z-index:7}
.hud-pill{position:absolute;display:flex;align-items:center;gap:calc(var(--u)*8);padding:calc(var(--u)*6) calc(var(--u)*14) calc(var(--u)*6) calc(var(--u)*8);border-radius:calc(var(--u)*14);background:rgba(20,28,40,.72);font-weight:900;font-size:max(13px,min(calc(var(--u)*22),4.4vw));text-shadow:0 2px 0 #0d1520;white-space:nowrap;max-width:calc(100vw - var(--u)*160);overflow:hidden;text-overflow:ellipsis}
.hud-ico{width:calc(var(--u)*34);height:calc(var(--u)*34);border-radius:calc(var(--u)*10);display:grid;place-items:center;font-size:max(13px,calc(var(--u)*20))}
.hud-flag{background:#3ad15a}
.hud-coinimg{width:calc(var(--u)*36);height:calc(var(--u)*36);filter:drop-shadow(0 2px 0 rgba(0,0,0,.35))}
.coin-ico{height:1.15em;width:1.15em;vertical-align:-0.22em;margin:0 .12em}
.hud-stage{left:calc(var(--l) + var(--u)*14);top:calc(var(--t) + var(--u)*12)}
.hud-bar{position:absolute;left:calc(var(--l) + var(--u)*14);top:calc(var(--t) + var(--u)*62);width:calc(var(--u)*230);height:calc(var(--u)*11);border-radius:8px;background:rgba(20,28,40,.6);overflow:hidden;border:2px solid rgba(255,255,255,.65)}
.hud-bar i{display:block;height:100%;width:0;background:linear-gradient(#7cf08f,#2fb04a);transition:width .5s}
.hud-home{top:calc(var(--t) + var(--u)*68) !important}
.hud-coins{right:calc(var(--r) + var(--u)*76);top:calc(var(--t) + var(--u)*12)}
.hud-gear{position:absolute;right:calc(var(--r) + var(--u)*14);top:calc(var(--t) + var(--u)*12);width:max(44px,calc(var(--u)*48));height:max(44px,calc(var(--u)*48));border:0;border-radius:calc(var(--u)*14);background:rgba(20,28,40,.72);font-size:max(16px,calc(var(--u)*24));pointer-events:auto;cursor:pointer}
.hud-toast{position:absolute;left:50%;top:22%;transform:translate(-50%,0) scale(.4) rotate(-3deg);opacity:0;font-weight:900;font-size:max(18px,min(calc(var(--u)*46),7vw));color:#ffe14d;text-shadow:0 calc(var(--u)*4) 0 #b05a00,0 0 18px rgba(0,0,0,.35);white-space:nowrap}
.hud-toast.show{animation:hudPop 1.1s ease-out forwards}
@keyframes hudPop{0%{opacity:0;transform:translate(-50%,0) scale(.4) rotate(-3deg)}15%{opacity:1;transform:translate(-50%,0) scale(1.15) rotate(-3deg)}25%{transform:translate(-50%,0) scale(1) rotate(-3deg)}80%{opacity:1}100%{opacity:0;transform:translate(-50%,-30%) scale(1) rotate(-3deg)}}
.hud-hint{position:absolute;left:50%;bottom:calc(var(--b) + var(--u)*22);transform:translateX(-50%);max-width:70%;text-align:center;padding:calc(var(--u)*10) calc(var(--u)*20);border-radius:calc(var(--u)*14);background:rgba(20,28,40,.72);font-weight:700;font-size:max(13px,calc(var(--u)*18));opacity:0;visibility:hidden;transition:opacity .4s,visibility 0s .4s}
.hud-hint.show{opacity:1;visibility:visible;transition:opacity .4s}
.hud-settings{position:absolute;inset:0;z-index:25;display:none;align-items:center;justify-content:center;background:rgba(10,20,40,.45);font-family:Rubik,Arial,sans-serif}
.hud-settings.on{display:flex}
.hud-set-card{width:min(86vw,calc(var(--u)*380));padding:calc(var(--u)*18);border-radius:calc(var(--u)*22);background:#fff;color:#1b2433;box-shadow:0 calc(var(--u)*8) 0 #c9d3e3;display:flex;flex-direction:column;gap:calc(var(--u)*14);align-items:stretch}
.hud-set-card h3{margin:0;text-align:center;font-weight:900;font-size:max(18px,calc(var(--u)*26));color:#2a74e8}
.hud-set-row{display:grid;grid-template-columns:auto 1fr auto;gap:calc(var(--u)*10);align-items:center;font-weight:900;font-size:max(14px,calc(var(--u)*17))}
.hud-set-row b{min-width:3.2em;text-align:right}
.hud-set-row input{width:100%;height:max(28px,calc(var(--u)*30));accent-color:#3ad15a;cursor:pointer}
.hud-set-ok{min-width:0 !important;align-self:center;font-size:max(16px,calc(var(--u)*22)) !important;min-height:max(44px,calc(var(--u)*52)) !important}
.hud-overlay{position:absolute;inset:0;z-index:20;display:none;align-items:center;justify-content:center;background:linear-gradient(rgba(30,90,200,.35),rgba(10,20,40,.55))}
.hud-overlay.on{display:flex}
.hud-menu{display:flex;flex-direction:column;align-items:center;gap:calc(var(--u)*18)}
.hud-logo{text-align:center;transform:rotate(-2deg);margin-bottom:calc(var(--u)*10)}
.hud-logo img{display:block;width:min(calc(var(--u)*620),86vw);max-height:38vh;object-fit:contain;filter:drop-shadow(0 calc(var(--u)*8) calc(var(--u)*10) rgba(0,0,0,.35))}.hud-logo:not(.img) img,.hud-logo.img .l1,.hud-logo.img .l2{display:none}
.hud-logo .l1{font-weight:900;font-size:max(18px,min(calc(var(--u)*40),7vw));text-shadow:0 calc(var(--u)*4) 0 #1b3a7a}
.hud-logo .l2{font-weight:900;font-size:max(26px,min(calc(var(--u)*68),11vw));line-height:1;color:#ffd23a;text-shadow:0 calc(var(--u)*6) 0 #b0520a,0 10px 20px rgba(0,0,0,.35)}
.hud-play{min-width:calc(var(--u)*280);min-height:max(48px,calc(var(--u)*80));padding:0 calc(var(--u)*28);border-radius:calc(var(--u)*22);background:linear-gradient(#5ff07a,#22b043);box-shadow:0 calc(var(--u)*8) 0 #137a2c;border:calc(var(--u)*4) solid #fff;color:#fff;font:900 max(20px,calc(var(--u)*40)) Rubik,Arial,sans-serif;text-shadow:0 3px 0 #137a2c;cursor:pointer}
.hud-ad{display:block;margin:calc(var(--u)*6) auto calc(var(--u)*14);background:linear-gradient(#ffd23a,#ff9a1f);box-shadow:0 calc(var(--u)*8) 0 #b0520a;text-shadow:0 3px 0 #b0520a;font-size:max(16px,calc(var(--u)*30))}
.hud-skip{position:absolute;left:50%;top:calc(var(--u)*120 + env(safe-area-inset-top));transform:translateX(-50%);pointer-events:auto;padding:calc(var(--u)*10) calc(var(--u)*22);min-height:44px;border:calc(var(--u)*3) solid #fff;border-radius:calc(var(--u)*16);background:linear-gradient(#ffd23a,#ff9a1f);box-shadow:0 calc(var(--u)*5) 0 #b0520a;color:#fff;font:900 max(15px,calc(var(--u)*22)) Rubik,Arial,sans-serif;text-shadow:0 2px 0 #b0520a;cursor:pointer;white-space:nowrap}
.hud-play:active{transform:translateY(calc(var(--u)*4));box-shadow:0 calc(var(--u)*4) 0 #137a2c}
.hud-row{display:flex;align-items:stretch;gap:calc(var(--u)*14);flex-wrap:wrap;justify-content:center}
.hud-sb{display:inline-flex;align-items:center;justify-content:center;gap:calc(var(--u)*8);line-height:1;min-width:calc(var(--u)*150);height:max(44px,calc(var(--u)*60));padding:calc(var(--u)*12) calc(var(--u)*20);border-radius:calc(var(--u)*18);border:3px solid #fff;color:#fff;font:900 max(14px,calc(var(--u)*20)) Rubik,Arial,sans-serif;box-shadow:0 calc(var(--u)*6) 0 rgba(0,0,0,.3);cursor:pointer}
.hud-sub{font-weight:700;font-size:max(13px,calc(var(--u)*18))}
.hud-card{width:min(92vw,calc(var(--u)*440));padding:calc(var(--u)*24);border-radius:calc(var(--u)*26);background:#fff;color:#1b2433;text-align:center;box-shadow:0 calc(var(--u)*10) 0 #c9d3e3,0 20px 40px rgba(0,0,0,.35);display:flex;flex-direction:column;align-items:center;gap:calc(var(--u)*10)}
.hud-card h2{font-weight:900;font-size:max(20px,min(calc(var(--u)*40),8vw));color:#ff9a1f;text-shadow:0 3px 0 #c55a00}
.hud-card .stars{font-size:max(26px,calc(var(--u)*46))}
.hud-card .stars .off{filter:grayscale(1) opacity(.35)}
.hud-card .line{font-weight:700;font-size:max(13px,calc(var(--u)*18))}
`;
  document.head.appendChild(s);
}
