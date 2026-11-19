# Notchhvr

A record player for your Mac — **landing page, interactive UI demo and a native notch app**,
rebuilt from scratch after a reverse-engineering study of [needlemac.com](https://needlemac.com/).

![stack](https://img.shields.io/badge/React-19-0b0b0c) ![stack](https://img.shields.io/badge/TypeScript-5.9-0b0b0c) ![stack](https://img.shields.io/badge/Vite-7-0b0b0c) ![stack](https://img.shields.io/badge/SwiftUI-macOS%2014-0b0b0c)

## What's in it

### The site

- A **scroll-driven hero**: a 340vh sticky sequence that zooms the MacBook and moves its screen from the notch
  player to the lock screen, the desktop and lyrics, ending on the download card.
- A **playable notch island**: hover to peek, click to open, swipe to weather, expand into widgets, in two looks
  (Needle / Mirror) and two shapes (Notch / Pill).
- Eleven timed lyric treatments and screens, five of which animate word by word — Big words, Lens, Stars,
  Terminal, Aura.
- An **inside scene** of eleven features, each a live mini screen, each opening a keyboard-navigable dialog.
- A **personalisation studio**: twelve painted wallpapers, brightness and volume, AirPods and Beat Glow switches,
  and a listening diary.
- **Seven sub-pages** behind hash routes: download, support, changelog, privacy, terms, licence recovery and
  affiliates, with validating forms.
- An auto-advancing highlights reel, a key-sound synthesiser with a WPM counter, the feature matrix, Face Unlock
  cards, a 10-question accordion, a purchase dialog with a demo licence, and light/dark themes with shortcuts.

Everything is vector: album art, vinyl, the MacBook, wallpapers and icons are CSS/SVG. There are no image files and
no animation libraries.

### The app

`mac/` is a working SwiftUI/AppKit app, not a mock: a borderless non-activating `NSPanel` at the notch, a compact
island that expands on hover, a real transport and progress, and a menu bar item. Playback, weather and AirPods
battery are simulated — see [mac/README.md](./mac/README.md) for exactly what is real and what would be needed to
read the system Now Playing session.

## Run it

```bash
npm install
npm run dev        # http://localhost:5180
npm run build      # typecheck + production build
```

```bash
cd mac
swift run          # the notch app
bash build-app.sh  # or wrap it in build/Notchhvr.app
```

Requires Node 20+ for the site, macOS 14+ with Xcode command line tools for the app.

## Shortcuts

| Key | Action |
| --- | --- |
| `Space` | Play / pause |
| `T` | Toggle light / dark |
| `Esc` | Close the island, the inside dialog or the buy dialog |
| `←` `→` | Move between features in the inside dialog |

## Routes

`#meet`, `#island`, `#inside`, `#studio`, `#everything`, `#get` are anchors. These switch pages:

`#/download` · `#/support` · `#/changelog` · `#/privacy` · `#/terms` · `#/recover` · `#/affiliates`

## Project layout

```
src/
  App.tsx              shell, hash routing, theme, shortcuts, toast, dialog
  data.ts              tracks, lyrics, weather, facts, features, FAQ
  content/site.ts      inside features, wallpapers, diary, changelog
  lib/                 playback store, WebAudio keys, formatting
  pages/Pages.tsx      the seven sub-pages, PageShell, SiteLinks
  components/          scroll hero, island, Mac frame, inside scene, studio, reel, keys, sections
    screens/           the four Mac screens + five lyric styles
  styles/              tokens, base, island, screens, sections, pages
mac/                   SwiftPM app: notch panel, player model, island UI
DESIGN.md              reverse-engineering + design system write-up
```

## Notes

- This is a **reconstruction for study**, not a copy. No code, media, fonts or copy from the reference site are
  included, and no pixel-for-pixel equality is claimed. See §13 of [DESIGN.md](./DESIGN.md).
- The purchase flow is a demo: it generates a licence string locally and takes no payment.
- The Mac app is a scaffold. It draws and controls a local queue; wiring it to Spotify or Apple Music needs
  MediaRemote/Apple Events access, a signed bundle and the user's automation consent.

MIT licensed.
