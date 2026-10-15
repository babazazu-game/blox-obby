import { Save } from 'yg-core';
import { core } from './core.ts';

/**
 * Прогресс игрока — ЕДИНСТВЕННАЯ точка доступа к сохранению (правило заготовки).
 * localStorage сразу, облако Яндекса — с дебаунсом (лимиты setData, см. yg-core/save).
 *
 * Чекпоинт внутри забега НЕ храним: обби проходят за один заход, а продолжение
 * с середины после перезагрузки ломало бы честность звёзд за забег. Храним
 * то, что копится между забегами: монеты, скины, лучший результат.
 */
export interface ProgressData extends Record<string, unknown> {
  coins: number;
  owned: string[];
  skin: string;
  muted: boolean;
  /** Лучшее время по мирам, с (нет ключа — ещё не проходил). */
  best: Record<string, number>;
  runs: number;
  /** Сколько миров открыто (1 — только первый). */
  unlocked: number;
  upgrades: Record<string, number>;
  pets: string[];
  pet: string;
  trails: string[];
  trail: string;
  /** Дата последнего сундука дня, YYYY-MM-DD. */
  chest: string;
  /** Громкость из настроек, 0..1. */
  sfxVol: number;
  musicVol: number;
}

// v2: прогресс по мирам и лавки хаба (v1 был до хаба — несовместим по полю best)
export const progress = new Save<ProgressData>('blox-obby-v2', {
  coins: 0, owned: ['noob'], skin: 'noob', muted: false, best: {}, runs: 0,
  unlocked: 1, upgrades: {}, pets: ['none'], pet: 'none', trails: ['none'], trail: 'none', chest: '', sfxVol: 1, musicVol: 1,
});

/** Облако подключаем, когда SDK готов и игрок известен; без площадки — только локально. */
void core.ready.then(() => {
  const p = core.currentPlayer;
  if (p) void progress.attachCloud(p);
}).catch(() => undefined);
