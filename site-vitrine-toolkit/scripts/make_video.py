from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

root = Path('/Users/clement/Jarvis/site-vitrine-toolkit')
public = root / 'public'
frames = public / 'frames_vektor'
frames.mkdir(parents=True, exist_ok=True)
W, H = 1280, 720

for i in range(120):
    t = i / 120
    y = np.linspace(0, 1, H)[:, None]
    x = np.linspace(0, 1, W)[None, :]
    r = 6 + 12 * y + 10 * np.sin(2 * np.pi * (x * 0.7 + t))
    g = 8 + 16 * y + 22 * np.sin(2 * np.pi * (x * 1.2 + y * .5 + t * .6))
    b = 18 + 50 * y + 92 * np.sin(2 * np.pi * (x * .45 - y * .3 + t * .35)) ** 2
    arr = np.dstack([np.clip(r, 0, 255), np.clip(g, 0, 255), np.clip(b, 0, 255)]).astype('uint8')
    img = Image.fromarray(arr, 'RGB').filter(ImageFilter.GaussianBlur(2))

    overlay = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay, 'RGBA')
    blobs = [((73, 165, 255), 95), ((255, 255, 255), 34), ((118, 43, 255), 46), ((12, 245, 214), 50)]
    for k, (col, alpha) in enumerate(blobs):
        cx = int(W * (0.18 + 0.68 * ((np.sin(t * 2 * np.pi * (0.7 + k * .13) + k) * .5 + .5))))
        cy = int(H * (0.15 + 0.7 * ((np.cos(t * 2 * np.pi * (0.55 + k * .17) + k * 1.7) * .5 + .5))))
        rx = int(240 + 110 * np.sin(t * 2 * np.pi + k) ** 2)
        ry = int(120 + 90 * np.cos(t * 2 * np.pi * .8 + k) ** 2)
        d.ellipse((cx - rx, cy - ry, cx + rx, cy + ry), fill=(*col, alpha))
    overlay = overlay.filter(ImageFilter.GaussianBlur(55))
    img = Image.alpha_composite(img.convert('RGBA'), overlay)

    d = ImageDraw.Draw(img, 'RGBA')
    for s in range(6):
        yy = int(H * (0.08 + s * .17) + 45 * np.sin(t * 2 * np.pi + s))
        d.line([(0, yy), (W, yy + int(150 * np.sin(t * 2 * np.pi + s * .8)))], fill=(210, 235, 255, 24), width=2 + s)
    img = img.filter(ImageFilter.GaussianBlur(0.45)).convert('RGB')
    img.save(frames / f'frame_{i:04d}.jpg', quality=88)

print(frames)
