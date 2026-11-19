# Notchhvr

A record player for your Mac — **landing page and interactive UI demo**, rebuilt from scratch after a
reverse-engineering study of [needlemac.com](https://needlemac.com/).

![stack](https://img.shields.io/badge/React-19-0b0b0c) ![stack](https://img.shields.io/badge/TypeScript-5.9-0b0b0c) ![stack](https://img.shields.io/badge/Vite-7-0b0b0c) ![deps](https://img.shields.io/badge/runtime%20deps-2-0b0b0c)

## What's in it

- A painted-sky hero with a floating MacBook and four live screen mocks (island, lock screen, desktop, lyrics).
- A **playable notch island**: hover to peek, click to open, swipe to weather, expand into widgets, in two looks
  (Needle / Mirror) and two shapes (Notch / Pill).
- Five timed lyric treatments — Big words, Lens, Stars, Terminal, Aura.
- An auto-advancing highlights reel with dots, pause and a live lyric-style cross-fade.
- A key-sound synthesiser with a WPM counter (Office / Retro / Off), built on WebAudio.
- Feature matrix, Face Unlock privacy cards, 10-question accordion, purchase dialog with a demo licence, and a
  light/dark theme with keyboard shortcuts.

Everything is vector: album art, vinyl, the MacBook, wallpapers and icons are CSS/SVG. There are no image files and
no animation libraries.

## Run it

```bash
npm install
npm run dev        # http://localhost:5180
npm run build      # typecheck + production build
npm run preview    # preview the build
```

Requires Node 20+.

## Shortcuts

| Key | Action |
| --- | --- |
| `Space` | Play / pause |
| `T` | Toggle light / dark |
| `Esc` | Close the island or the buy dialog |

## Project layout

```
src/
  App.tsx              page shell, theme, shortcuts, toast, dialog
  data.ts              tracks, lyrics, weather, facts, features, FAQ
  lib/                 playback store, WebAudio keys, formatting
  components/          hero, island, Mac frame, reel, keys, sections
    screens/           the four Mac screens + five lyric styles
  styles/              tokens, base, island, screens, sections
DESIGN.md              full reverse-engineering + design system write-up
```

## Notes

- This is a **front-end reconstruction for study**, not a copy. No code, media, fonts or copy from the reference
  site are included, and no pixel-for-pixel equality is claimed. See §13 of [DESIGN.md](./DESIGN.md).
- The purchase flow is a demo: it generates a licence string locally and takes no payment.
- The macOS app itself is out of scope — this repository is the website plus an interactive simulation of the
  product UI. A native build would need `NSWindow` notch overlays, MediaRemote/Spotify integration,
  ScreenCaptureKit and a login item.

MIT licensed.
