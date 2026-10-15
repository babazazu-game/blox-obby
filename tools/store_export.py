"""Картинки для витрин из art/store (фон Codex + логотип + кадры игры).

  python tools/store_export.py

Яндекс (ru и en): иконка 512×512, обложка 800×470, скриншоты 1920×1080 и 1080×1920.
Y8 (только en): скриншоты 760×570 и 1280×720 (до 6), промо 1920×1080, 1080×1920,
карточка 760×570. Всё JPG (лимиты Y8 — 2–5 МБ), иконка — PNG.
"""
import glob
import os
from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), '..')
ART = os.path.join(ROOT, 'art')
STORE = os.path.join(ART, 'store')
SHOTS = os.path.join(STORE, 'shots')


def cover(src, w, h):
    """Обрезка по центру под пропорции w×h и масштаб."""
    im = Image.open(src).convert('RGB') if isinstance(src, str) else src.convert('RGB')
    r = w / h
    if im.width / im.height > r:
        nw = int(im.height * r); x = (im.width - nw) // 2; im = im.crop((x, 0, x + nw, im.height))
    else:
        nh = int(im.width / r); y = (im.height - nh) // 2; im = im.crop((0, y, im.width, y + nh))
    return im.resize((w, h), Image.LANCZOS)


def with_logo(bg, logo_path, width_frac, top_frac, left_frac=None):
    """Логотип поверх фона: ширина — доля кадра; по умолчанию по центру."""
    bg = bg.copy()
    logo = Image.open(logo_path).convert('RGBA')
    logo = logo.crop(logo.getbbox())
    lw = int(bg.width * width_frac); lh = int(logo.height * lw / logo.width)
    logo = logo.resize((lw, lh), Image.LANCZOS)
    x = int(bg.width * left_frac) if left_frac is not None else (bg.width - lw) // 2
    bg.paste(logo, (x, int(bg.height * top_frac)), logo)
    return bg


def save(im, path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    if path.endswith('.png'):
        im.save(path)
    else:
        im.convert('RGB').save(path, 'JPEG', quality=90, optimize=True)
    print(os.path.relpath(path, ROOT))


land_bg = os.path.join(STORE, 'cover_bg.png')
port_bg = os.path.join(STORE, 'cover_bg_portrait.png')
logos = {'ru': os.path.join(ART, 'logo', 'logo.png'), 'en': os.path.join(ART, 'logo', 'logo_en.png')}

# ── Яндекс ────────────────────────────────────────────────────────────
for lang in ('ru', 'en'):
    out = os.path.join(STORE, 'yandex', lang)
    save(Image.open(os.path.join(ART, 'logo', 'icon512.png')), os.path.join(out, 'icon_512x512.png'))
    save(with_logo(cover(land_bg, 800, 470), logos[lang], 0.5, 0.04, 0.03), os.path.join(out, 'cover_800x470.jpg'))
    for f in sorted(glob.glob(os.path.join(SHOTS, f'{lang}_*.png'))):
        name = os.path.basename(f)[3:-4]
        w, h = map(int, name.rsplit('_', 1)[1].split('x'))
        save(cover(f, w, h), os.path.join(out, 'screenshots', name + '.jpg'))

# ── Y8 (только английский) ──────────────────────────────────────────
out = os.path.join(STORE, 'y8')
for f in sorted(glob.glob(os.path.join(SHOTS, 'en_*_1920x1080.png'))):
    n = os.path.basename(f).split('_')[1]
    save(cover(f, 1280, 720), os.path.join(out, 'screenshot_1280x720', f'{n}.jpg'))
    save(cover(f, 760, 570), os.path.join(out, 'screenshot_760x570', f'{n}.jpg'))
save(with_logo(cover(land_bg, 1920, 1080), logos['en'], 0.5, 0.04, 0.03), os.path.join(out, 'promo_landscape_1920x1080.jpg'))
if os.path.exists(port_bg):
    save(with_logo(cover(port_bg, 1080, 1920), logos['en'], 0.86, 0.04), os.path.join(out, 'promo_portrait_1080x1920.jpg'))
save(with_logo(cover(land_bg, 760, 570), logos['en'], 0.5, 0.03, 0.02), os.path.join(out, 'card_760x570.jpg'))
