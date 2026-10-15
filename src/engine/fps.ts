import { debugFlag, pixelRatio } from 'yg-core';

/**
 * Счётчик кадров игры: FPS, самый долгий кадр за 2 с и число РЫВКОВ (кадров
 * дольше 50 мс) с начала игры — именно рывки, а не средний FPS, видны игроку
 * как «фризы». Стоит под полосой прогресса, не налезая на HUD.
 *
 * Виден всегда при разработке; в сборке для площадки — только с ?fps=1
 * (замер на живом телефоне), иначе модерация увидит отладочный текст.
 */
export class FpsMeter {
  private box: HTMLDivElement | null = null;
  private frames = 0;
  private acc = 0;
  private worst = 0;
  private hitches = 0;
  private worstAge = 0;

  constructor(parent: HTMLElement, private extra?: () => string) {
    if (!import.meta.env.DEV && !debugFlag('fps')) return;
    const b = document.createElement('div');
    b.style.cssText = 'position:absolute;left:calc(env(safe-area-inset-left) + 14px);top:calc(env(safe-area-inset-top) + 15.5vh);z-index:8;'
      + 'padding:3px 8px;border-radius:8px;background:rgba(0,0,0,.55);color:#fff;font:700 12px/1.35 monospace;pointer-events:none;white-space:pre';
    parent.appendChild(b);
    this.box = b;
  }

  /** Вызывать раз в кадр с НАСТОЯЩИМ временем кадра (до обрезки dt). */
  frame(realDt: number): void {
    if (!this.box) return;
    this.frames++;
    this.acc += realDt;
    this.worst = Math.max(this.worst, realDt);
    if (realDt > 0.05) this.hitches++;
    if (this.acc >= 0.5) {
      const fps = this.frames / this.acc;
      const color = fps >= 50 ? '#7cf08f' : fps >= 30 ? '#ffe14d' : '#ff6b6b';
      this.box.innerHTML = `<span style="color:${color}">FPS ${fps.toFixed(0)}</span>  кадр макс ${(this.worst * 1000).toFixed(0)} мс\n`
        + `рывков ${this.hitches}  DPR ${pixelRatio()}${this.extra ? '  ' + this.extra() : ''}`;
      this.frames = 0; this.acc = 0;
      // максимум держим ~2 с, иначе один старый рывок висит вечно
      this.worstAge += 0.5;
      if (this.worstAge >= 2) { this.worst = 0; this.worstAge = 0; }
    }
  }
}
