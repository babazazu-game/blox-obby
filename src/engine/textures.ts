import * as THREE from 'three';

/**
 * Процедурные текстуры особых блоков: рисуются на canvas при запуске.
 *
 * Почему кодом, а не картинками: (1) картинки рисует Codex, а у него бывает
 * исчерпан лимит — игра не должна от этого зависеть; (2) ноль загрузки и ноль
 * килобайт в архиве; (3) бесшовность гарантирована математикой (шум считается
 * по тору), а у сгенерированной картинки швы приходится ловить глазами.
 * Когда появятся картинки от Codex — их можно подставить в `TEX` вместо функций.
 *
 * Правило серии: всё, что ведёт себя не как обычная платформа (лава, батут,
 * исчезайка, лёд…), ОБЯЗАНО выглядеть иначе — ребёнок читает опасность по виду.
 */

const S = 256;

function canvas(draw: (g: CanvasRenderingContext2D) => void, size = S): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  draw(c.getContext('2d')!);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 4;
  return t;
}

/** Детерминированный шум по тору (бесшовный): сумма синусов с целыми частотами. */
function torusNoise(seed: number): (x: number, y: number) => number {
  const waves: { fx: number; fy: number; ph: number; a: number }[] = [];
  let r = seed;
  const rnd = () => ((r = (r * 16807) % 2147483647) / 2147483647);
  for (let o = 0; o < 4; o++) {
    for (let i = 0; i < 5; i++) {
      const f = 1 << o;
      waves.push({ fx: Math.round((rnd() * 2 - 1) * 3 * f), fy: Math.round((rnd() * 2 - 1) * 3 * f), ph: rnd() * Math.PI * 2, a: 1 / f });
    }
  }
  const norm = waves.reduce((s, w) => s + w.a, 0);
  return (x, y) => {
    let v = 0;
    for (const w of waves) v += w.a * Math.sin((w.fx * x + w.fy * y) * Math.PI * 2 + w.ph);
    return 0.5 + 0.5 * (v / norm) * 1.8;
  };
}

function lerpColor(stops: [number, [number, number, number]][], v: number): [number, number, number] {
  v = Math.min(1, Math.max(0, v));
  for (let i = 1; i < stops.length; i++) {
    if (v <= stops[i][0]) {
      const [a, ca] = stops[i - 1], [b, cb] = stops[i];
      const k = (v - a) / (b - a);
      return [0, 1, 2].map((j) => ca[j] + (cb[j] - ca[j]) * k) as [number, number, number];
    }
  }
  return stops[stops.length - 1][1];
}

function fieldTexture(seed: number, stops: [number, [number, number, number]][]): THREE.CanvasTexture {
  const n = torusNoise(seed);
  return canvas((g) => {
    const img = g.createImageData(S, S);
    for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
      const [r, gg, b] = lerpColor(stops, n(x / S, y / S));
      const i = (y * S + x) * 4;
      img.data[i] = r; img.data[i + 1] = gg; img.data[i + 2] = b; img.data[i + 3] = 255;
    }
    g.putImageData(img, 0, 0);
  });
}

/**
 * Лава «ячейками» (шум Ворлея по тору): тёмные куски остывшей корки, между ними
 * светящиеся жёлтые трещины. Первая версия на синусах выглядела полосатой тканью.
 * Идёт и в emissiveMap — трещины светятся сами, корка нет.
 */
export const lavaTexture = (): THREE.CanvasTexture => {
  let r = 42;
  const rnd = () => ((r = (r * 16807) % 2147483647) / 2147483647);
  const pts = Array.from({ length: 22 }, () => [rnd(), rnd()]);
  const n = torusNoise(9);
  return canvas((g) => {
    const img = g.createImageData(S, S);
    for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
      const u = x / S, v = y / S;
      let f1 = 9, f2 = 9;
      for (const [px, py] of pts) {
        // расстояние по тору — текстура бесшовна по краям
        const dx = Math.min(Math.abs(u - px), 1 - Math.abs(u - px)), dy = Math.min(Math.abs(v - py), 1 - Math.abs(v - py));
        const d = Math.hypot(dx, dy);
        if (d < f1) { f2 = f1; f1 = d; } else if (d < f2) f2 = d;
      }
      const edge = (f2 - f1) * 14 + (n(u, v) - 0.5) * 0.35;   // 0 — на трещине
      const [cr, cg, cb] = lerpColor([
        [0.0, [255, 250, 190]], [0.12, [255, 205, 60]], [0.3, [255, 120, 20]], [0.5, [200, 55, 15]], [0.75, [110, 28, 12]], [1.0, [70, 18, 10]],
      ], edge);
      const i = (y * S + x) * 4;
      img.data[i] = cr; img.data[i + 1] = cg; img.data[i + 2] = cb; img.data[i + 3] = 255;
    }
    g.putImageData(img, 0, 0);
  });
};

/** Вода: на будущее (обби с водой) — голубые переливы. */
export const waterTexture = (): THREE.CanvasTexture => fieldTexture(11, [
  [0.0, [20, 90, 190]], [0.45, [40, 140, 230]], [0.7, [90, 190, 250]], [0.85, [200, 240, 255]], [1.0, [255, 255, 255]],
]);

/** Деревянный блок моста: три доски, волокна, по два гвоздя. */
export const woodTexture = (): THREE.CanvasTexture => canvas((g) => {
  const n = torusNoise(3);
  const H = S / 3;
  for (let p = 0; p < 3; p++) {
    const tone = [0, 10, -8][p];
    for (let y = 0; y < H; y++) for (let x = 0; x < S; x++) {
      const grain = Math.sin((y / H) * 18 + n(x / S, (p * H + y) / S) * 9) * 0.5 + 0.5;
      const v = 180 + tone + grain * 28;
      g.fillStyle = `rgb(${v + 30},${v - 25},${v - 95})`;
      g.fillRect(x, p * H + y, 1, 1);
    }
    // щель между досками и светлая фаска сверху
    g.fillStyle = 'rgba(90,45,15,.85)'; g.fillRect(0, p * H, S, 4);
    g.fillStyle = 'rgba(255,230,180,.35)'; g.fillRect(0, p * H + 4, S, 3);
    for (const x of [26, S - 26]) {
      g.fillStyle = '#6d6d72'; g.beginPath(); g.arc(x, p * H + H / 2, 6, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#b8b8c0'; g.beginPath(); g.arc(x - 2, p * H + H / 2 - 2, 2.5, 0, Math.PI * 2); g.fill();
    }
  }
  g.strokeStyle = 'rgba(80,40,12,.9)'; g.lineWidth = 8; g.strokeRect(4, 4, S - 8, S - 8);
});

/** Лёд/стекло для исчезаек: светло-голубой, изморозь по диагонали, тонкие трещины, светлая рамка. */
export const iceTexture = (): THREE.CanvasTexture => {
  const t = fieldTexture(5, [[0, [170, 215, 245]], [0.6, [205, 235, 252]], [1, [245, 252, 255]]]);
  const g = (t.image as HTMLCanvasElement).getContext('2d')!;
  g.strokeStyle = 'rgba(255,255,255,.7)'; g.lineWidth = 3;
  for (let i = 0; i < 6; i++) { g.beginPath(); g.moveTo(i * 50 - 40, 0); g.lineTo(i * 50 + 60, S); g.stroke(); }
  g.strokeStyle = 'rgba(80,140,190,.6)'; g.lineWidth = 1.5;
  g.beginPath(); g.moveTo(40, 60); g.lineTo(95, 110); g.lineTo(88, 160); g.moveTo(95, 110); g.lineTo(150, 128); g.stroke();
  g.strokeStyle = 'rgba(255,255,255,.95)'; g.lineWidth = 10; g.strokeRect(5, 5, S - 10, S - 10);
  t.needsUpdate = true;
  return t;
};

/** Батут: розовая резина с выпуклыми точками и белой каймой. */
export const bounceTexture = (): THREE.CanvasTexture => canvas((g) => {
  g.fillStyle = '#ff5fae'; g.fillRect(0, 0, S, S);
  for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) {
    const cx = x * 32 + 16, cy = y * 32 + 16;
    g.fillStyle = '#ff9bd0'; g.beginPath(); g.arc(cx, cy, 8, 0, Math.PI * 2); g.fill();
    g.fillStyle = 'rgba(255,255,255,.75)'; g.beginPath(); g.arc(cx - 2.5, cy - 2.5, 3, 0, Math.PI * 2); g.fill();
  }
  g.strokeStyle = '#ffffff'; g.lineWidth = 14; g.strokeRect(7, 7, S - 14, S - 14);
});

/** Крутилка: красно-белые полосы, как шлагбаум — «опасно» без слов. */
export const stripeTexture = (): THREE.CanvasTexture => canvas((g) => {
  g.fillStyle = '#ffffff'; g.fillRect(0, 0, S, S);
  g.fillStyle = '#e8303a';
  for (let i = -S; i < S * 2; i += 64) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i + 32, 0); g.lineTo(i + 32 + S, S); g.lineTo(i + S, S); g.fill(); }
});

/** Подобрать повтор текстуры под размер блока: одна плитка ≈ 2 м, как клетка сетки. */
export function sized(tex: THREE.Texture, w: number, h: number, cell = 2): THREE.Texture {
  const t = tex.clone();
  t.repeat.set(Math.max(1, Math.round(w / cell)), Math.max(1, Math.round(h / cell)));
  t.needsUpdate = true;
  return t;
}

/**
 * Монета серии с выбитым портретом героя (голова-«таблетка» и плечи нуба).
 * Одна картинка на всё: иконка в HUD/магазине и «чеканка» на 3D-монетах —
 * игрок видит одну и ту же монету везде. Рисуется на canvas, файлов нет.
 */
let coinCanvas: HTMLCanvasElement | null = null;
export function coinImage(): HTMLCanvasElement {
  if (coinCanvas) return coinCanvas;
  const N = 128, c = document.createElement('canvas');
  c.width = c.height = N;
  const g = c.getContext('2d')!;
  const cx = N / 2, cy = N / 2;
  // диск: тёплое золото, светлее сверху-слева
  let gr = g.createRadialGradient(cx - 18, cy - 22, 6, cx, cy, 64);
  gr.addColorStop(0, '#fff3a0'); gr.addColorStop(0.45, '#ffcf2e'); gr.addColorStop(1, '#d98a00');
  g.fillStyle = gr; g.beginPath(); g.arc(cx, cy, 62, 0, Math.PI * 2); g.fill();
  // ободок: тёмное кольцо + светлый блик
  g.lineWidth = 7; g.strokeStyle = '#b86f00'; g.beginPath(); g.arc(cx, cy, 57, 0, Math.PI * 2); g.stroke();
  g.lineWidth = 2.5; g.strokeStyle = 'rgba(255,248,200,.9)'; g.beginPath(); g.arc(cx, cy, 52, Math.PI * 0.9, Math.PI * 1.7); g.stroke();
  // чеканка: силуэт сначала тенью вниз-вправо, потом светлым — выглядит выпуклым
  const bust = (dx: number, dy: number, fill: string) => {
    g.fillStyle = fill;
    g.beginPath(); g.roundRect(cx - 32 + dx, cy + 14 + dy, 64, 30, [14, 14, 4, 4]); g.fill();   // плечи
    g.beginPath(); g.roundRect(cx - 7 + dx, cy + 4 + dy, 14, 12, 3); g.fill();                    // шея
    g.beginPath(); g.roundRect(cx - 21 + dx, cy - 32 + dy, 42, 40, 13); g.fill();                 // голова
  };
  g.save(); g.beginPath(); g.arc(cx, cy, 50, 0, Math.PI * 2); g.clip();
  bust(2.5, 2.5, '#a86200');
  gr = g.createLinearGradient(0, cy - 32, 0, cy + 44);
  gr.addColorStop(0, '#ffe680'); gr.addColorStop(1, '#f0a800');
  bust(0, 0, gr as unknown as string);
  g.restore();
  // лицо гравировкой: два глаза и улыбка
  g.fillStyle = '#9a5600';
  g.beginPath(); g.ellipse(cx - 8, cy - 15, 3, 4.5, 0, 0, Math.PI * 2); g.fill();
  g.beginPath(); g.ellipse(cx + 8, cy - 15, 3, 4.5, 0, 0, Math.PI * 2); g.fill();
  g.strokeStyle = '#9a5600'; g.lineWidth = 3; g.lineCap = 'round';
  g.beginPath(); g.arc(cx, cy - 9, 9, 0.2 * Math.PI, 0.8 * Math.PI); g.stroke();
  coinCanvas = c;
  return c;
}

/** Иконка монеты для DOM (HUD, магазин). */
export const coinIconUrl = (): string => coinImage().toDataURL('image/png');

/** Конвейер: тёмная лента с жёлтыми стрелками «вниз по текстуре» (направление задаёт поворот/сдвиг). */
export const conveyorTexture = (): THREE.CanvasTexture => canvas((g) => {
  g.fillStyle = '#3a3f4a'; g.fillRect(0, 0, S, S);
  g.fillStyle = '#2c3038'; for (let y = 0; y < S; y += 32) g.fillRect(0, y, S, 4);
  g.fillStyle = '#ffd23a';
  for (const cx of [S / 4, (3 * S) / 4]) for (const cy of [S / 4, (3 * S) / 4]) {
    g.beginPath(); g.moveTo(cx - 30, cy - 18); g.lineTo(cx, cy + 18); g.lineTo(cx + 30, cy - 18); g.lineTo(cx + 16, cy - 18); g.lineTo(cx, cy + 2); g.lineTo(cx - 16, cy - 18); g.closePath(); g.fill();
  }
  g.strokeStyle = '#ffd23a'; g.lineWidth = 8; g.strokeRect(4, 4, S - 8, S - 8);
});

/** Дверь (стена дверей): цветная панель, рамка, ручка, «?» — какая ложная, по виду не понять. */
export const doorTexture = (color: number): THREE.CanvasTexture => canvas((g) => {
  const col = '#' + color.toString(16).padStart(6, '0');
  g.fillStyle = col; g.fillRect(0, 0, S, S);
  g.fillStyle = 'rgba(255,255,255,.18)'; g.fillRect(28, 24, S - 56, 92); g.fillRect(28, 136, S - 56, 96);
  g.strokeStyle = 'rgba(0,0,0,.25)'; g.lineWidth = 6; g.strokeRect(28, 24, S - 56, 92); g.strokeRect(28, 136, S - 56, 96);
  g.fillStyle = '#ffe14d'; g.beginPath(); g.arc(S - 52, 132, 12, 0, Math.PI * 2); g.fill();
  g.fillStyle = 'rgba(255,255,255,.9)'; g.font = '900 64px Rubik, Arial'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.lineJoin = 'round'; g.lineWidth = 8; g.strokeStyle = 'rgba(0,0,0,.35)'; g.strokeText('?', S / 2, 72); g.fillText('?', S / 2, 72);
  g.strokeStyle = '#ffffff'; g.lineWidth = 10; g.strokeRect(5, 5, S - 10, S - 10);
});

/** Плита тайной тропы: все одинаковые (настоящие и ложные) — жёлто-розовая клетка, как в Fall Guys.
 *  Голубая была похожа на лёд-исчезайку — путали две разные механики. */
export const tileTexture = (): THREE.CanvasTexture => canvas((g) => {
  for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) { g.fillStyle = (x + y) % 2 ? '#ff6fb5' : '#ffd23a'; g.fillRect(x * 64, y * 64, 64, 64); }
  g.strokeStyle = '#ffffff'; g.lineWidth = 16; g.strokeRect(8, 8, S - 16, S - 16);
});

/** Поток ветра: белые полосы на прозрачном (бегут по направлению потока). */
export const fanTexture = (): THREE.CanvasTexture => canvas((g) => {
  g.clearRect(0, 0, S, S);
  g.strokeStyle = 'rgba(255,255,255,.9)'; g.lineWidth = 6; g.lineCap = 'round';
  for (let i = 0; i < 9; i++) { const x = 14 + i * 28; g.beginPath(); g.moveTo(x, (i * 37) % S); g.lineTo(x, ((i * 37) % S) + 60); g.stroke(); }
});
