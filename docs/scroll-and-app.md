# Scroll site and native app

Notes on the second build pass: the scroll-driven hero, the sub-pages, the inside scene, the
personalisation studio and the SwiftUI app in `mac/`.

## Scroll hero

`src/components/ScrollHero.tsx` renders a 340vh track with a `position: sticky` stage inside it. A
passive scroll listener measures `-rect.top / (offsetHeight - innerHeight)` inside one
`requestAnimationFrame`, stores it in state and derives everything from that single 0–1 value:

| Progress | Stage | Screen | What moves |
| --- | --- | --- | --- |
| 0–0.24 | 0 | island | Copy and floating Mac; sun and clouds drift |
| 0.24–0.42 | 1 | island | Mac scales up and slides toward centre |
| 0.42–0.58 | 2 | lock | Copy has faded out; caption cross-fades |
| 0.58–0.74 | 3 | desktop | Caption cross-fades, Mac keeps scaling |
| 0.74–1 | 4 | lyrics | Final card fades in with the download CTA |

Scale is `0.84 + min(p, 0.86) * 0.46`, translation is `-p * 12vw`, and the 3D tilt relaxes from
`rotateX(4deg) rotateY(-5deg)` to nearly flat as progress grows. The progress rail is a single
`scaleX`, the dots mark the five stages, and the whole listener is skipped when
`prefers-reduced-motion: reduce` is set — the component then renders a static `island` stage at
progress 0.34.

The sky is pure CSS/SVG: gradient, two ridge paths, three blurred cloud blobs on long linear
animations and a 3px dot grain with `mix-blend-mode: multiply`. No images.

## Routing

Hash routing without a dependency. In `src/App.tsx`, `readRoute()` returns the part after `#/`
(exactly one slash), so `#meet`, `#island` and `#studio` stay in-page anchors while `#/download`
switches to a sub-page. `hashchange` re-reads the route, `document.title` is updated and the window
scrolls to the top. Unknown `#/` paths render `NotFoundPage`. `pageRoutes` in `src/pages/Pages.tsx`
maps each slug to a title and a render function that receives `{ theme, onTheme, onBuy, notify }`, so
the buy dialog and the toast stay app-level.

## Sub-pages

Seven pages, all original copy, sharing `PageShell` (sticky glass nav, eyebrow + serif-italic title,
prose column, footer with the full link list):

- **Download** — version card, three install steps, requirements, trial note
- **Support** — email and community cards, four quick fixes, links to recover/changelog/privacy/terms
- **Changelog** — four releases from `src/content/site.ts`
- **Privacy** — what leaves the Mac (lyrics, weather, artwork, updates), what stays, permissions
- **Terms** — eleven plain-language sections
- **Recover** — email form with validation and a success state
- **Affiliates** — 30% pitch, three steps, rules, application form with validation

Both forms are client-side only; they validate, show an error or a success state, and raise the toast
saying no request was sent.

## Inside scene

`src/components/InsideScene.tsx` renders eleven cards from `src/content/site.ts`. Each card contains a
real mini screen, not a screenshot: the island card hosts an actual `<Island>`, two cards host the
lock screen and desktop mocks, five host `LyricStage` in its five styles, and the rest are sleeve,
big-cover and glow compositions. Thumbnails are `container-type: inline-size`, so the existing
`cqw`-based screen CSS scales them without extra rules.

Clicking a card opens a modal (`role="dialog"`, `aria-modal`, labelled title) with the description,
bullets, a counter and previous/next arrows. Escape closes it, arrow keys move between features, the
backdrop closes it, and body scrolling is locked while it is open.

## Personalisation studio

`src/components/Studio.tsx` puts a live preview next to three panels:

- twelve painted wallpapers (CSS gradients) that repaint the preview and its brightness
- volume and brightness sliders bound to the player and to a preview filter
- AirPods and Beat Glow switches; the AirPods row appears only when that switch is on
- a listening diary from `src/content/site.ts`

## Native app

`mac/` is a separate SwiftPM executable, macOS 14+, no dependencies. `App.swift` declares
`@main` with `MenuBarExtra` and an `NSApplicationDelegateAdaptor`; the delegate creates
`IslandPanel`, a borderless non-activating `NSPanel` at `.statusBar` level that joins all Spaces.
The panel is 244×40 collapsed and 392×196 expanded, resized through `NSAnimationContext` with the
same `cubic-bezier(.16,1,.3,1)` easing as the site.

`PlayerModel.swift` holds the queue, a 0.25 s `Timer.publish` tick, play state, progress and the
hover/pin logic (0.35 s collapse grace). `IslandView.swift` draws the compact strip and the expanded
player with vector `Artwork`, an `Equalizer` and a progress bar. Playback, weather, AirPods battery
and lyrics are simulated; see `mac/README.md` for what would be needed to make them real.

Verified with `swift build` and `bash build-app.sh`.
