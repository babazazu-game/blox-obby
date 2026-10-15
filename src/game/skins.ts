import type { AvatarLook } from '../engine/avatar.ts';
import { NOOB } from '../engine/avatar.ts';

/**
 * Скины магазина «Обби: Блок за блоком». Только данные.
 * Цены под экономику: монета на трассе — 1, чекпоинт — 5, финиш — 50.
 * Один забег ≈ 14×5 + 50 + ~40 монет ≈ 160: первые скины покупаются после
 * первого прохождения, дорогие — за 4–6 забегов.
 */
export interface Skin { id: string; name: string; price: number; look: AvatarLook }

export const SKINS: Skin[] = [
  { id: 'noob', name: 'Нуб', price: 0, look: NOOB },
  { id: 'red', name: 'Ёжик', price: 30, look: { skin: 0xf1c7a0, shirt: 0xe8403a, pants: 0x1d1d22, shoes: 0xffffff, sleeve: 0.3, hair: 'spiky', hairColor: 0x161210, face: 'happy' } },
  { id: 'cap', name: 'Кепка', price: 50, look: { skin: 0x8d5a3b, shirt: 0xf7c41c, pants: 0x2a74e8, shoes: 0x222222, sleeve: 0.35, hair: 'cap', hat: 0x2fb04a, face: 'cool' } },
  { id: 'girl', name: 'Настя', price: 60, look: { skin: 0xf1c7a0, shirt: 0xff6fb5, pants: 0x9b59d0, shoes: 0xffffff, sleeve: 1, hair: 'long', hairColor: 0xe8c25a, face: 'smile' } },
  { id: 'winter', name: 'Зима', price: 80, look: { skin: 0xffdbb5, shirt: 0x2a74e8, pants: 0x1d1d22, shoes: 0xffffff, sleeve: 1, hair: 'beanie', hat: 0xe8403a, face: 'grin' } },
  { id: 'ginger', name: 'Рыжик', price: 100, look: { skin: 0xf1c7a0, shirt: 0x161616, pants: 0x2b2b33, shoes: 0xeeeeee, sleeve: 0.4, hair: 'short', hairColor: 0xc4561c, face: 'grin' } },
  { id: 'lime', name: 'Лайм', price: 140, look: { skin: 0x9be15d, shirt: 0x16a3a3, pants: 0x0f5f5f, shoes: 0xf7c41c, sleeve: 0, hair: 'none', face: 'happy' } },
  { id: 'ninja', name: 'Ниндзя', price: 200, look: { skin: 0x5a5f6b, shirt: 0x161616, pants: 0x161616, shoes: 0xe8403a, sleeve: 1, hair: 'beanie', hat: 0x161616, face: 'cool' } },
  { id: 'gold', name: 'Золотой', price: 400, look: { skin: 0xffd23a, shirt: 0xffb800, pants: 0xffd23a, shoes: 0xffb800, sleeve: 0, hair: 'none', face: 'cool' } },
];
