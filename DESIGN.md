# DESIGN.md — Notchhvr

A reverse-engineered, from-scratch rebuild of the **needlemac.com** landing page: a marketing site for a macOS
notch music player. This document records what was analysed, what the design system is, how each interaction was
specified, and how it was implemented here.

> **Provenance note.** This project is an independent front-end reconstruction for study. No source code, images,
> video, audio, fonts or copy from the reference site are bundled or redistributed. All UI is hand-built with React
> and CSS, all artwork is generated in the browser with gradients and SVG, and all copy was rewritten. See
> [Differences from the reference](#13-differences-from-the-reference).

---

## 1. Reverse-engineering method

| Step | Tool | What it produced |
| --- | --- | --- |
| 1. Capture | `curl` with a desktop UA | 42 KB `index.html`, 95 KB of CSS (`next.css`, `c.css`, `d.css`), 133 KB of JS across 7 ES modules |
| 2. Inventory | `rea analyze-javascript-application` (rea-agents 6.9.0) | Projected module graph for the 8 captured sources, static import facts, per-file parse/semantic passes |
| 3. Read the design | CSS token extraction (`:root`, `font-family`, colour histogram) | Exact palette, type stacks, easing curves, grid constants |
| 4. Read the structure | DOM section/heading extraction + full HTML read | Section order, copy hierarchy, component anatomy, ARIA labels |
| 5. Read the behaviour | Module source review (`in.js`, `d.js`, `keys.js`, `buy.js`) | State machine for the notch island, screen switcher, highlights reel, synth keys, buy dialog |
| 6. Rebuild | React 19 + TypeScript + Vite, hand-written CSS | This repository |

### What the original turned out to be

- **No framework.** Plain `<script type="module">` files, an import map for `three@0.186` on jsDelivr, and a
  `<canvas>` "film" layer in the hero. So the site is a bespoke, hand-written front end rather than a Next.js app
  (despite the `next.css` / `next.js` filenames — those are a scene name, not the framework).
- **Media-heavy storytelling.** Four looping videos inside a CSS MacBook, an 11-panel `inside` scene, a
  WebGL/canvas sky, and a scroll-driven zoom from a still to the desktop screen.
- **A real product behind it.** Needle v1.1.1, a one-time-purchase macOS 14+ app that turns the notch, lock screen
  and desktop into a record player for Spotify and Apple Music.
- **A deliberate Apple-adjacent visual language.** SF Pro for UI, Instrument Serif italic for display accents,
  `#0b0b0c` / `#f5f5f7` as the ink/paper pair, `cubic-bezier(0.16, 1, 0.3, 1)` for nearly every transition.

### Fidelity strategy

The rebuild keeps the **information architecture, design language, component anatomy and interaction model**, and
replaces everything that cannot be copied ethically: raster art, video, audio, fonts and prose. Where the original
used video to show the product, this build uses live, interactive mock UI — which is arguably a better demo, since
the island is genuinely playable rather than a 6-second loop.

---

## 2. Information architecture

Single page, ten sections, sticky-free navigation with anchor jumps.

| # | Section | id | Purpose |
| --- | --- | --- | --- |
| 0 | Hero | `#top` | Full-viewport painted sky, floating MacBook, headline, download/buy, screen switcher |
| 1 | Meet | `#meet` | Product lockup: icon, giant wordmark, tagline, price, three proof points |
| 2 | Facts | `#facts` | Four compatibility/trust facts in a divided strip |
| 3 | Notch Island playground | `#island` | Playable notch: 2 looks × 2 shapes × 5 states |
| 4 | Highlights | `#highlights` | 11-card horizontal reel with auto-advance, dots, pause |
| 5 | Everything | `#everything` | 3-column feature matrix, 12 entries |
| 6 | Face Unlock | (inside `#everything`) | Beta callout + 3 privacy cards |
| 7 | FAQ | `#faq` | Sticky heading + 10-question accordion |
| 8 | Get | `#get` | Purchase panel, price, download, fine print |
| 9 | Footer | — | Wordmark, page links, legal line |

Narrative arc: **promise → product → proof → play → breadth → trust → answers → close**.

---

## 3. Design tokens

### 3.1 Colour

| Token | Light (`screen`) | Dark (`studio`) | Use |
| --- | --- | --- | --- |
| `--page` | `#fbfbfd` | `#0a0a0b` | Page background |
| `--panel` | `#f5f5f7` | `#161618` | Cards, insets, segmented tracks |
| `--ink` | `#0b0b0c` | `#f5f5f7` | Primary text |
| `--soft` | `#5b5b62` | `#b6b6bc` | Body copy |
| `--faint` | `#86868b` | `#8e8e96` | Fine print, meta |
| `--line` | `rgba(0,0,0,.09)` | `rgba(255,255,255,.12)` | Hairlines |
| `--btn` / `--btn-ink` | ink / white | white / ink | Filled buttons |
| `--accent` | `#d98a4a` | `#e0a262` | Warm accent (icon label, glow) |

Fixed colours that never theme-switch:

- **Sky** `#86aed6 → #b7d2e8 → #e4e2da → #f4ece1` (hero gradient).
- **Dark feature band** `#0b0b0c` with `#dfa062` accent.
- **Signal green** `#30d158` (live dot, battery), **error red** `#d7373f`, **link blue** `#6ea3e0`.
- **Album art** is data-driven: each track supplies `from`, `to`, `accent` and a gradient angle.

### 3.2 Type

| Role | Stack | Size | Tracking |
| --- | --- | --- | --- |
| UI / body | SF Pro Display → Inter → Helvetica Neue | 13–17 px | -0.01em |
| Display | same | `clamp(50px, 6.6vw, 94px)` | -0.05em |
| Section H2 | same | `clamp(36px, 4.8vw, 64px)` | -0.042em |
| Serif accent | Instrument Serif italic → New York → Georgia | 1.04× parent | -0.005em |
| Mono | SF Mono → JetBrains Mono | 9–15 px | 0.08em for codes |

Rules: display weight 600, line-height 0.95–1.03, `<em>` is always serif italic and never bold. Numerals in clocks
and timers are `tabular-nums`.

### 3.3 Space & shape

- Gutter: `clamp(20px, 5vw, 72px)`; content max `1200px`; hero max `1400px`.
- Section rhythm: `clamp(64px, 10vw, 132px)` block padding.
- Radii: 13 (controls), 20 (cards), 26–34 (panels/dialog), 999 (pills).
- Shadows are soft and long: `0 30px 80px rgba(20,25,35,.16)` for staged panels, plus 1px inset hairlines instead
  of borders wherever possible.

### 3.4 Motion

| Token | Value | Applied to |
| --- | --- | --- |
| `--ease` | `cubic-bezier(.16,1,.3,1)` | Reveals, island morph, dialogs |
| `--ease-soft` | `cubic-bezier(.4,0,.2,1)` | Opacity/colour cross-fades |
| Reveal | 0.8s, 20px rise, 0.12 threshold | Every section child |
| Island morph | 0.6s width/height | Notch state machine |
| Hover lift | 1px, 0.35s | Buttons and rail arrows |
| Ambient | 7–9s loops | Floating Mac, clouds, pills, EQ |

All animation is disabled under `prefers-reduced-motion: reduce`.

---

## 4. Page composition

### 4.1 Hero

- Three parallax sky layers (sun, three blurred cloud fields, two ridge silhouettes) + film grain at 5 % overlay.
- Two-column grid: copy left (`0.92fr`), Mac right (`1.08fr`), centred, max 1400 px.
- Mac is `perspective(2400px) rotateX(4deg) rotateY(-5deg)` with a 9 s float; the shadow is a blurred ellipse.
- Screen switcher pill sits under the fold line with the scroll cue; it drives the live mock screen.
- The hero scopes its own tokens so it stays legible in the dark theme.

### 4.2 Meet

Giant `Notchhvr` wordmark with a vertical ink→transparent gradient clip, serif italic tagline, and a 340 px vinyl
with the app icon locked in its centre. Three floating glass pills orbit it (weather, lyric style, AirPods).

### 4.3 Facts

Four columns separated by hairlines; icons are 24 px stroked SVGs, 1.7–1.8 stroke, rounded caps. Collapses to
2×2 at 860 px and 1 column at 620 px.

### 4.4 Notch Island playground

The centrepiece. A 16:8.4 stage with a simulated dark desktop, a fake menu bar, a physical notch cutout, a dock and
a hint pill. The island lives at top-centre.

### 4.5 Highlights

Horizontal `scroll-snap` reel. Cards are 74 vw / 448 px, 26 px radius, `--panel` fill. Auto-advance 5.2 s, paused by
button, dots reflect the nearest card via a scroll listener. The lyrics card cross-fades its five styles every
4.2 s. Inner screens are real components, not screenshots.

### 4.6 Everything / Face Unlock

Full-bleed dark band (`#0b0b0c`) that ignores the theme. Three columns of `<dl>` rows, then a beta callout and three
translucent privacy cards with amber icons.

### 4.7 FAQ

Sticky heading column at `top: 96px`, accordion using a `0fr → 1fr` grid-row transition (no JS measuring). Plus
icons rotate 45° into a close cross when open.

### 4.8 Get / Footer

A dark radial panel with an amber bloom, the app icon, the closing line and two CTAs. Footer mirrors the nav with a
14 %-opacity wordmark and a split legal row.

---

## 5. The island: interaction specification

### 5.1 State machine

```
idle ──hover──────────────► peek
idle ──click──────────────► open
open ──click bar/close────► idle
open ──weather button─────► weather
open ──expand button──────► expanded
open ◄──drag right────────► weather
weather ──back button─────► open
any ──Escape──────────────► idle
any ──drag >36px──────────► adjacent mode (open ↔ weather)
```

| State | Size (W×H) | Contents |
| --- | --- | --- |
| `idle` | 204×30 | notch pill, cover chip, EQ, hairline progress |
| `peek` / hover | 302×52 | cover, title/artist, progress, play glyph |
| `open` | 348×196 | 46 px cover, title, scrubber with ±times, transport, weather/expand/close |
| `weather` | 348×170 | 28 px temperature, condition, city, 6 hourly columns |
| `expanded` | 442×332 | 4-widget grid: now playing, weather, AirPods battery, volume/brightness |

### 5.2 Looks and shapes

- **Needle** — near-black glass (`#07070a → #15151a`), white type, inner 0.5 px white hairline.
- **Mirror** — frosted light (`rgba(252,252,254,.94)`), dark type, 24 px backdrop blur, saturate 1.4.
- **Notch** — attached to the top edge, bottom-only 18 px radius, sits over the cutout.
- **Pill** — detached 999 px radius with 7 px top offset, for Macs with no notch.

### 5.3 Micro-behaviour

- Width/height transitions use a single `--ease` curve so the island appears to "breathe" from the notch.
- Title collapses to `max-width: 0` when idle, so the closed island is just a dark strip.
- EQ bars are four 2 px bars with staggered 0.16 s delays and a 0.9 s loop, only animating while playing.
- Sliders use a `linear-gradient` track driven by `--pct`, with a thumb that only appears on hover/focus.
- Dragging is pointer-based with a 36 px threshold and `touch-action: pan-y` so vertical scroll still works.
- Inside a Mac screen the island is `transform: scale(.6)` from the top centre; clicking it toggles playback
  instead of opening, so it never covers the mock desktop.

### 5.4 Keyboard & shortcut layer

| Key | Action |
| --- | --- |
| `Space` | Play/pause (ignored while typing or when the buy dialog is open) |
| `T` | Toggle screen/studio theme |
| `Tab` / `Shift+Tab` | Full focus order; closed island panel is `inert` |
| `Escape` | Closes the island; closes the native dialog |

---

## 6. Screens (the Mac mock UI)

All four screens live inside `.mac-screen`, a container-query context, so every measurement is in `cqw` and the mock
scales perfectly from a 300 px card to a 680 px hero.

1. **Island** — soft album-tinted wallpaper, menu bar, island at the notch, a floating "now playing" chip.
2. **Lock Screen** — full-bleed album gradient, 9:41 clock at 15.5 cqw, glass transport card with cover, scrubber,
   and play/prev/next. Hint: "Click the cover for the artwork".
3. **Desktop** — dark wallpaper, 18 cqw sleeve + 26 cqw spinning vinyl + tonearm, readout, five-icon dock.
4. **Lyrics** — one of five treatments:
   - *Big words* — serif italic trio, sung words ramp from 26 % to 100 % opacity.
   - *Lens* — surrounding words blurred, the current word sharp and scaled.
   - *Stars* — nine nodes joined by hairlines, words fading in as they're sung.
   - *Terminal* — monospace console with timestamps and a blinking caret.
   - *Aura* — cover + player on the left, lyric ladder on the right.

---

## 7. Content model

```ts
type Track = {
  title: string; artist: string; album: string;
  duration: number;                        // seconds, simulated
  art: { from: string; to: string; accent: string; angle: number };
  lyrics: { t: number; text: string }[];
};
```

- Three original tracks: *Slow Static* (Juniper Vale), *Paper Moons* (Cassette Sunday), *Midnight Postcard*
  (The Lantern Club).
- Playback is simulated at 4 ticks/second; reaching the duration advances to the next track.
- Weather is a fixture (Berlin, 14°, rain at 20:00, six hours) shared by the island and the weather widget.
- Product facts: macOS 14+, Apple silicon, 3-day trial, one-time $12.99, two Macs, no account, LRCLIB lyrics.

---

## 8. Accessibility

- Semantic landmarks: `header`, `main`, `nav`, `section` with `aria-label`s, `footer`.
- A skip link appears on first focus.
- The island bar is a real `<button>` with `aria-expanded`; the closed panel is `inert` and `aria-hidden`.
- Weather/expand/close are icon buttons with explicit `aria-label`s; the screen switcher uses
  `role="radiogroup"` + `aria-checked`.
- Accordion buttons carry `aria-expanded`; answers remain in the DOM for find-in-page.
- Visible `:focus-visible` ring (2 px `#6ea3e0`, 3 px offset) on every interactive element.
- Contrast: body copy ≥ 4.5:1 in both themes; the hero scopes darker ink over the sky.
- Motion respects `prefers-reduced-motion`; the ambient float and EQ stop entirely.
- Touch targets: 38–48 px for nav, 26–32 px for in-island controls (desktop-first surface).

---

## 9. Responsive behaviour

| Breakpoint | Change |
| --- | --- |
| ≤ 1120 px | Nav links hidden; hero stacks and centres; meet becomes one column; playground header stacks; everything → 2 columns; FAQ → 1 column |
| ≤ 860 px | Facts → 2×2; face cards and playground notes → 1 column; reel cards widen |
| ≤ 620 px | Mobile nav (theme + buy only); 4:3 stage with the island scaled to 72 %; stage hints hidden; facts → 1 column; 88 vw cards; toast becomes a rounded sheet |

The Mac mock is fluid at every width because of container queries; the only fixed pixel dimension is the island,
which is scaled by transform inside screens and stages.

---

## 10. Performance notes

- Zero runtime dependencies beyond React; no animation library, no icon package, no WebGL.
- Album art is CSS gradients + SVG noise (data URI), so there are no image requests at all.
- Single CSS bundle (~64 KB, 14 KB gzipped) and one JS bundle (~281 KB, 85 KB gzipped).
- Reveals use one `IntersectionObserver` per block and disconnect after firing.
- The reel scroll handler is `requestAnimationFrame`-throttled; the progress bar is the only global scroll listener.
- Fonts: one Google Fonts request (Instrument Serif, OFL) with `preconnect`; the UI stack is system SF Pro.

---

## 11. Implementation map

```
src/
  App.tsx                     page shell, theme, keyboard, toast, dialog
  data.ts                     tracks, lyrics, weather, facts, features, FAQ
  lib/player.tsx              playback context (track, progress, volume)
  lib/audio.ts                WebAudio key-click synthesis
  lib/utils.ts                time formatting, class merge
  components/
    Hero.tsx                  sky scene, nav, CTA, Mac stage, screen switch
    Island.tsx                5-state island, 2 looks, 2 shapes
    MacFrame.tsx              lid, bezel, notch, base, menu bar
    Icons.tsx                 36 stroked SVG icons
    Cover.tsx                 vector album art + vinyl
    Highlights.tsx            auto-advancing reel
    KeysDemo.tsx              typing synth + WPM counter
    BuyDialog.tsx             native <dialog> demo checkout
    Sections.tsx              meet, facts, everything, FAQ, get, footer
    screens/MacScreens.tsx    island / lock / desktop screens
    screens/Lyrics.tsx        five lyric treatments
  styles/                     tokens, base, island, screens, sections
```

---

## 12. Rebuild checklist

- [x] Sky hero with parallax layers and floating MacBook
- [x] Four live screen mocks driven by one transport
- [x] Interactive notch: hover, click, weather swipe, expanded widgets
- [x] Two looks, two shapes
- [x] Five lyric styles with word-level timing
- [x] Wheel-of-highlights reel with autoplay + dots + pause
- [x] Key-sound synth with WPM counter (Office / Retro / Off)
- [x] Feature matrix, Face Unlock privacy cards
- [x] Accordion FAQ
- [x] Purchase dialog with demo licence
- [x] Theme switching + keyboard shortcuts + reduced motion
- [x] Responsive down to 360 px

---

## 13. Differences from the reference

These are deliberate, and mostly required:

1. **Name and identity** — the product here is *Notchhvr*, not *Needle*; icon, wordmark and vocals are original.
2. **No copied media** — the reference's photographs, product videos, painted wallpapers, font files and audio are
   not included. Album art, vinyl, MacBook, lock screen and wallpapers are drawn with CSS/SVG; key sounds are
   synthesised with WebAudio.
3. **Copy rewritten** — the same claims and structure, in new sentences.
4. **Interaction instead of video** — where the reference autoplays MP4s of the product, this build renders live UI
   you can operate. The reel's lyric and island cards are functioning components.
5. **Simplified hero scroll** — the reference's scroll-driven canvas film (frames + Three.js) is replaced by a static
   painted sky with parallax and a floating Mac. This keeps the bundle at ~85 KB gzipped and avoids shipping a
   frame sequence.
6. **Checkout is a demo** — no payment provider is wired up; submitting the form generates a local licence string.
7. **No native app** — this repository is the marketing site and interactive UI demo, not an Xcode project. A real
   notch app needs `NSWindow` overlays, MediaRemote/Spotify APIs, ScreenCaptureKit and login-item plumbing.

Pixel-for-pixel equality is not claimed or possible without the original assets; the layout system, tokens,
hierarchy and behaviour are matched instead.
