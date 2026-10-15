import type { PetLook } from '../engine/pet.ts';
import { L } from '../i18n.ts';

/**
 * На что тратить монеты (лавки хаба). Только данные.
 *
 * Улучшения НАРОЧНО не трогают прыжок и скорость: головоломки моста посчитаны
 * под точную дальность прыжка (levels.ts) — +10% к прыжку сломали бы их все.
 * Поэтому улучшения про монеты и про «прощение ошибок».
 */
export interface Upgrade { id: string; name: string; icon: string; desc: (lvl: number) => string; prices: number[] }

export const UPGRADES: Upgrade[] = [
  { id: 'magnet', name: L('Магнит', 'Magnet'), icon: '🧲', prices: [60, 150, 300], desc: (l) => L(`Монеты тянутся к тебе: радиус ${(1.3 + l).toFixed(1)} м`, `Pulls coins to you: radius ${(1.3 + l).toFixed(1)} m`) },
  { id: 'piggy', name: L('Копилка', 'Piggy bank'), icon: '🐷', prices: [100, 250, 500], desc: (l) => L(`Монета на трассе стоит ${1 + l}`, `Each track coin is worth ${1 + l}`) },
  { id: 'chute', name: L('Парашют', 'Parachute'), icon: '🪂', prices: [80, 200, 400], desc: (l) => L(`Упал — вернёшься туда, где стоял, а не на чекпоинт. ${l} раз за забег`, `Fell? Return to where you stood, not the checkpoint. ${l}× per run`) },
  { id: 'spare', name: L('Запасной блок', 'Spare block'), icon: '🧱', prices: [350], desc: () => L('+1 блок на каждом этапе с мостом', '+1 block on every bridge stage') },
];

export interface PetItem { id: string; name: string; price: number; bonus: number; look: PetLook }
export const PETS: PetItem[] = [
  { id: 'none', name: L('Без питомца', 'No pet'), price: 0, bonus: 0, look: { kind: 'cat', body: 0xffffff, accent: 0xffffff } },
  { id: 'cat', name: L('Котокуб +10%', 'Cat cube +10%'), price: 150, bonus: 0.1, look: { kind: 'cat', body: 0xff9a3a, accent: 0xffffff } },
  { id: 'dog', name: L('Пёс-блок +20%', 'Dog block +20%'), price: 300, bonus: 0.2, look: { kind: 'dog', body: 0xc8874a, accent: 0x5a3a20 } },
  { id: 'dragon', name: L('Дракоша +35%', 'Dragon +35%'), price: 700, bonus: 0.35, look: { kind: 'dragon', body: 0x3ad15a, accent: 0xb98cff } },
];

export interface TrailItem { id: string; name: string; price: number; colors: number[] }
export const TRAILS: TrailItem[] = [
  { id: 'none', name: L('Без следа', 'No trail'), price: 0, colors: [] },
  { id: 'rainbow', name: L('Радуга', 'Rainbow'), price: 200, colors: [0xe8403a, 0xff9a1f, 0xf7c41c, 0x2fb04a, 0x2a74e8, 0x9b59d0] },
  { id: 'fire', name: L('Огонь', 'Fire'), price: 250, colors: [0xff3a1a, 0xff9a1f, 0xffe14d] },
  { id: 'stars', name: L('Звёзды', 'Stars'), price: 300, colors: [0xffffff, 0xfff3a0, 0x8fd8ff] },
];
