"""Сборка роликов из кадров tools/film.js — только геймплей, до 28 с, без заставок.

  python tools/film_make.py

Из каждой сцены записи (см. порядок в film.js) берём лучший кусок, склеиваем,
кладём музыку игры с затуханием. Результат: art/store/video/<lang>_<WxH>.mp4
"""
import os
import shutil
import subprocess

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
FILM = os.path.join(ROOT, 'art', 'store', 'film')
OUT = os.path.join(ROOT, 'art', 'store', 'video')
MUSIC = os.path.join(ROOT, 'art', 'music_src', 'music1.mp3')
FPS = 30
SIZE = {'land': (1920, 1080), 'port': (1080, 1920)}

# Куски (секунды записи, от–до). Запись: хаб 0–4, ЛУГ 4–9, КОНФЕТЫ 9–13, ЛАВА 13–18,
# ШОУ 18–23, ФАБРИКА 23–27, БАШНЯ (бот) 27–31, БАШНЯ (облёт) 31–36. Сумма = 28 с.
CUTS = [(1, 4), (4, 8.5), (9, 12.5), (13, 17), (18.5, 22.5), (23, 26), (27.5, 30.5), (32, 35)]

os.makedirs(OUT, exist_ok=True)
for lang in ('ru', 'en'):
    for tag in ('land', 'port'):
        src = os.path.join(FILM, f'{lang}_{tag}')
        if not os.path.isdir(src):
            continue
        tmp = os.path.join(FILM, '_cut'); shutil.rmtree(tmp, ignore_errors=True); os.makedirs(tmp)
        k = 0
        for a, b in CUTS:
            for i in range(int(a * FPS), int(b * FPS)):
                f = os.path.join(src, f'{i:05d}.jpg')
                if os.path.exists(f):
                    shutil.copy(f, os.path.join(tmp, f'{k:05d}.jpg')); k += 1
        dur = k / FPS
        w, h = SIZE[tag]
        out = os.path.join(OUT, f'{lang}_{w}x{h}.mp4')
        subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y',
                        '-framerate', str(FPS), '-i', os.path.join(tmp, '%05d.jpg'), '-i', MUSIC,
                        '-filter_complex', f'[1:a]atrim=0:{dur:.2f},afade=t=in:st=0:d=0.4,afade=t=out:st={dur - 1.2:.2f}:d=1.2,volume=0.8[au]',
                        '-map', '0:v', '-map', '[au]', '-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-pix_fmt', 'yuv420p',
                        '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', '-shortest', out], check=True)
        shutil.rmtree(tmp)
        print(os.path.relpath(out, ROOT), f'{dur:.1f} c')
