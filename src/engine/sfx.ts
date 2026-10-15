import { core } from '../core.ts';

/**
 * Звуковые эффекты серии — только Web Audio (AudioContext + AudioBufferSourceNode).
 *
 * НЕ <audio>: тег поднимает системный медиаплеер браузера (значок ноты,
 * панель в уведомлениях телефона) — это нарушение п. 1.6.1.6/1.6.2.5.
 *
 * Тишину решает каркас (`core.audio`): уход со вкладки, потеря фокуса, реклама
 * (пп. 1.3, 4.7) и кнопка звука в игре. Здесь только «как» — общий узел
 * громкости, который каркас опускает в ноль и поднимает обратно.
 *
 * Звуки: Kenney (CC0) + сгенерированные ElevenLabs, см. assets/sfx/SOURCES.md.
 */

export type SfxName = 'jump' | 'land' | 'click' | 'denied' | 'place' | 'remove' | 'bounce' | 'lava' | 'checkpoint' | 'coin' | 'finish' | 'respawn';
const NAMES: SfxName[] = ['jump', 'land', 'click', 'denied', 'place', 'remove', 'bounce', 'lava', 'checkpoint', 'coin', 'finish', 'respawn'];
const VOLUME: Partial<Record<SfxName, number>> = { land: 0.45, jump: 0.55, click: 0.6, finish: 0.8, coin: 0.5 };   // монета — вдвое тише (просьба пользователя)

/** Музыка — только Opus 48k (6 треков ≈ 6 МБ). Запасные mp3 удвоили бы архив (+11 МБ);
 *  браузер без Opus (Safari старше 18.4) играет без музыки — звуки остаются. */
const MUSIC_OK = (() => {
  try { return !!document.createElement('audio').canPlayType('audio/ogg; codecs=opus'); } catch { return false; }
})();

class Sfx {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private buffers = new Map<SfxName, AudioBuffer>();
  private last = new Map<SfxName, number>();

  /** Загрузить все звуки. Ошибка одного файла не должна валить игру (п. 1.14). */
  async load(): Promise<void> {
    try {
      this.ctx = new AudioContext();
      this.master = this.ctx.createGain();
      this.master.connect(this.ctx.destination);
      // свой регулятор у звуков и у музыки (настройки игры); master — общий «тишина» каркаса
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = this.sfxVol;
      this.sfxGain.connect(this.master);
    } catch { return; }   // браузер без Web Audio — играем без звука
    core.audio.setHandlers({
      // не только тишина, но и остановка контекста: площадка проверяет, что AudioContext не «running»
      onSuspend: () => { if (this.master) this.master.gain.value = 0; void this.ctx?.suspend(); },
      onResume: () => { if (this.master) this.master.gain.value = 1; void this.ctx?.resume(); },
    });
    // Браузер не даёт звучать до первого касания: будим контекст на первом жесте.
    const unlock = () => { void this.ctx?.resume(); };
    addEventListener('pointerdown', unlock, { once: false, passive: true });
    addEventListener('keydown', unlock, { passive: true });
    await Promise.all(NAMES.map(async (n) => {
      try {
        const res = await fetch(`./assets/sfx/${n}.mp3`);
        const buf = await this.ctx!.decodeAudioData(await res.arrayBuffer());
        this.buffers.set(n, buf);
      } catch { /* нет файла — просто молчим этот звук */ }
    }));
  }

  /**
   * Проиграть. pitch — небольшой разброс высоты: один и тот же звук подряд
   * (шаги, монеты) с ним не звучит «пулемётом».
   */
  /** vol — множитель громкости этого звука (вход в мир — вдвое тише остальных). */
  play(n: SfxName, pitch = 0.06, vol = 1): void {
    const ctx = this.ctx, buf = this.buffers.get(n);
    if (!ctx || !buf || !this.master || ctx.state !== 'running') return;
    // один и тот же звук чаще 60 мс — склеивается в треск, пропускаем
    const now = ctx.currentTime;
    if (now - (this.last.get(n) ?? -1) < 0.06) return;
    this.last.set(n, now);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.playbackRate.value = 1 + (Math.random() * 2 - 1) * pitch;
    const g = ctx.createGain();
    g.gain.value = (VOLUME[n] ?? 1) * vol;
    src.connect(g).connect(this.sfxGain ?? this.master);
    src.start();
  }

  setMuted(m: boolean): void { core.audio.setMuted(m); }

  /*
   * Фоновая музыка: треки assets/music/music1..N.mp3 в СЛУЧАЙНОМ порядке
   * (следующий — не тот же, что только что играл), старт со случайного.
   * Тоже Web Audio: <audio> поднял бы системный медиаплеер (нарушение площадки).
   * Трек декодируется перед игрой и выбрасывается после — в памяти один-два.
   * Нет файлов — тихо, без ошибок.
   */
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  /** Громкости из настроек (0..1). Музыка ещё × базовые 0.256: треки — фон, не главное. */
  private sfxVol = 1;
  private musicVol = 1;
  private static readonly MUSIC_BASE = 0.256;

  setSfxVolume(v: number): void { this.sfxVol = v; if (this.sfxGain) this.sfxGain.gain.value = v; }
  setMusicVolume(v: number): void { this.musicVol = v; if (this.musicGain) this.musicGain.gain.value = v * Sfx.MUSIC_BASE; }
  private lastTrack = -1;
  private musicOn = false;

  // 6 треков (по 2 на каждый промпт); база 0.256 = 0.32 − 20% (просьба пользователя)
  async startMusic(count = 6): Promise<void> {
    if (!this.ctx || !this.master || this.musicOn || !MUSIC_OK) return;
    this.musicOn = true;
    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.value = this.musicVol * Sfx.MUSIC_BASE;
    this.musicGain.connect(this.master);
    void this.nextTrack(count);
  }

  private async nextTrack(count: number): Promise<void> {
    const ctx = this.ctx!;
    let i = Math.floor(Math.random() * count);
    if (count > 1 && i === this.lastTrack) i = (i + 1) % count;
    this.lastTrack = i;
    try {
      const res = await fetch(`./assets/music/music${i + 1}.ogg`);
      if (!res.ok) throw new Error('нет трека');
      const buf = await ctx.decodeAudioData(await res.arrayBuffer());
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.connect(this.musicGain!);
      src.onended = () => void this.nextTrack(count);
      src.start();
    } catch {
      // трека нет — пробуем другой не чаще раза в 30 с (вдруг файлов просто меньше)
      if (count > 1) setTimeout(() => void this.nextTrack(count), 30000);
    }
  }
}

export const sfx = new Sfx();
