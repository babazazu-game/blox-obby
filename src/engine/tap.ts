/**
 * Надёжное нажатие кнопок интерфейса на телефоне.
 *
 * В index.html touchmove гасится на всём документе (иначе страница ездит под пальцем).
 * Побочный эффект: если палец при нажатии чуть сдвинулся, браузер НЕ рождает click —
 * крестик магазина, стрелки, «В ХАБ» нажимались через раз (жалоба пользователя).
 *
 * Поэтому кнопку жмём по pointerup (это ещё и «жест пользователя» для звука),
 * а родной click, если он всё же придёт следом, глушим — иначе покупка прошла бы дважды.
 */
const SEL = 'button';
let lastBtn: Element | null = null, lastT = 0;

export function installTap(): void {
  if ((window as unknown as { __tapOn?: boolean }).__tapOn) return;
  (window as unknown as { __tapOn?: boolean }).__tapOn = true;
  addEventListener('pointerup', (e) => {
    if (e.pointerType === 'mouse') return;               // мышь: обычный click работает
    const b = (e.target as Element | null)?.closest?.(SEL) as HTMLButtonElement | null;
    if (!b || b.disabled) return;
    lastBtn = b; lastT = performance.now();
    b.click();                                           // синтетический click — обработчики те же
  }, true);
  addEventListener('click', (e) => {
    if (!e.isTrusted) return;                            // наш синтетический — пропускаем
    const b = (e.target as Element | null)?.closest?.(SEL);
    if (b && b === lastBtn && performance.now() - lastT < 800) { e.stopImmediatePropagation(); e.preventDefault(); }
  }, true);
}
