import type { AvatarLook } from '../engine/avatar.ts';
import { NOOB } from '../engine/avatar.ts';
import { L } from '../i18n.ts';

/**
 * Скины магазина «Обби: Блок за блоком». Только данные.
 * Цены под экономику: монета на трассе — 1, чекпоинт — 5, финиш — 50.
 * Один забег ≈ 14×5 + 50 + ~40 монет ≈ 160: первые скины покупаются после
 * первого прохождения, дорогие — за 4–6 забегов.
 */
export interface Skin { id: string; name: string; price: number; look: AvatarLook }

export const SKINS: Skin[] = ([
  { id: 'noob', name: L('Нуб', 'Noob'), price: 0, look: NOOB },
  { id: 'red', name: L('Ёжик', 'Spike'), price: 30, look: { skin: 0xf1c7a0, shirt: 0xe8403a, pants: 0x1d1d22, shoes: 0xffffff, sleeve: 0.3, hair: 'spiky', hairColor: 0x161210, face: 'happy' } },
  { id: 'cap', name: L('Кепка', 'Cap'), price: 50, look: { skin: 0x8d5a3b, shirt: 0xf7c41c, pants: 0x2a74e8, shoes: 0x222222, sleeve: 0.35, hair: 'cap', hat: 0x2fb04a, face: 'cool' } },
  { id: 'girl', name: L('Настя', 'Nastya'), price: 60, look: { skin: 0xf1c7a0, shirt: 0xff6fb5, pants: 0x9b59d0, shoes: 0xffffff, sleeve: 1, hair: 'long', hairColor: 0xe8c25a, face: 'smile' } },
  { id: 'winter', name: L('Зима', 'Winter'), price: 80, look: { skin: 0xffdbb5, shirt: 0x2a74e8, pants: 0x1d1d22, shoes: 0xffffff, sleeve: 1, hair: 'beanie', hat: 0xe8403a, face: 'grin' } },
  { id: 'ginger', name: L('Рыжик', 'Ginger'), price: 100, look: { skin: 0xf1c7a0, shirt: 0x161616, pants: 0x2b2b33, shoes: 0xeeeeee, sleeve: 0.4, hair: 'short', hairColor: 0xc4561c, face: 'grin' } },
  { id: 'lime', name: L('Лайм', 'Lime'), price: 140, look: { skin: 0x9be15d, shirt: 0x16a3a3, pants: 0x0f5f5f, shoes: 0xf7c41c, sleeve: 0, hair: 'none', face: 'happy' } },
  { id: 'ninja', name: L('Ниндзя', 'Ninja'), price: 200, look: { skin: 0x5a5f6b, shirt: 0x161616, pants: 0x161616, shoes: 0xe8403a, sleeve: 1, hair: 'beanie', hat: 0x161616, face: 'cool' } },
  // девочки (просьба пользователя: скинов вдвое больше, девочек — больше)
  { id: 'masha', name: L('Маша', 'Masha'), price: 40, look: { skin: 0xffdbb5, shirt: 0x9b59d0, pants: 0x2a74e8, shoes: 0xffffff, sleeve: 0.35, hair: 'ponytail', hairColor: 0x6b3a1e, hat: 0xff6fb5, face: 'smile' } },
  { id: 'lisa', name: L('Лиса', 'Foxy'), price: 70, look: { skin: 0xf1c7a0, shirt: 0xff8a2a, pants: 0xffffff, shoes: 0xff8a2a, sleeve: 0.35, hair: 'pigtails', hairColor: 0xc4561c, hat: 0x3ad15a, face: 'happy' } },
  { id: 'ballet', name: L('Балет', 'Ballet'), price: 90, look: { skin: 0xffdbb5, shirt: 0xffc2dd, pants: 0xffc2dd, shoes: 0xffffff, sleeve: 0, hair: 'bun', hairColor: 0xe8c25a, hat: 0xff6fb5, face: 'smile' } },
  { id: 'kpop', name: L('Звезда', 'Star'), price: 120, look: { skin: 0xffe0c4, shirt: 0x161616, pants: 0xff6fb5, shoes: 0x161616, sleeve: 1, hair: 'bob', hairColor: 0x161210, face: 'cool' } },
  { id: 'princess', name: L('Белла', 'Bella'), price: 160, look: { skin: 0xffdbb5, shirt: 0xff6fb5, pants: 0xff6fb5, shoes: 0xffd23a, sleeve: 0.35, hair: 'bow', hairColor: 0xf3d77a, hat: 0xffd23a, face: 'happy' } },
  { id: 'mint', name: L('Мятка', 'Minty'), price: 180, look: { skin: 0xf1c7a0, shirt: 0x6fe0c4, pants: 0x3d8cf0, shoes: 0xffffff, sleeve: 1, hair: 'pigtails', hairColor: 0x7bd8ff, hat: 0xffffff, face: 'grin' } },
  { id: 'unicorn', name: L('Пони', 'Pony'), price: 250, look: { skin: 0xffffff, shirt: 0xc79bff, pants: 0x7bd8ff, shoes: 0xff6fb5, sleeve: 0.35, hair: 'ponytail', hairColor: 0xff6fb5, hat: 0xffd23a, face: 'happy' } },
  { id: 'emo', name: L('Готка', 'Goth'), price: 300, look: { skin: 0xfff0e6, shirt: 0x5a2a7a, pants: 0x161616, shoes: 0x161616, sleeve: 1, hair: 'bob', hairColor: 0x2a1240, face: 'cool' } },
  // мальчики
  { id: 'surfer', name: L('Сёрфер', 'Surfer'), price: 110, look: { skin: 0xd99b6c, shirt: 0x16a3a3, pants: 0xffd23a, shoes: 0xffffff, sleeve: 0, hair: 'spiky', hairColor: 0xf3d77a, face: 'grin' } },
  { id: 'gold', name: L('Золотой', 'Golden'), price: 400, look: { skin: 0xffd23a, shirt: 0xffb800, pants: 0xffd23a, shoes: 0xffb800, sleeve: 0, hair: 'none', face: 'cool' } },
] as Skin[]).sort((a, b) => a.price - b.price);   // в магазине — от дешёвых к дорогим
