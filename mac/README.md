# Notchhvr for macOS

A working SwiftUI/AppKit scaffold of the notch player: a borderless panel pinned to the top of the
main display, a compact island that opens on hover, a real transport, progress and a menu bar item.

This is original code written for this project. It is not extracted from any shipping app.

## Run it

```bash
cd mac
swift run              # debug build, runs the panel directly
```

Or build a double-clickable bundle:

```bash
cd mac
bash build-app.sh      # ./build-app.sh also works after chmod +x
open build/Notchhvr.app
```

Requires macOS 14+ and Xcode command line tools (`swift --version`). No other dependencies.

## What works

| Part | State |
| --- | --- |
| Notch panel, always on all Spaces, never steals focus | Working |
| Compact strip: cover, title, artist, EQ, elapsed | Working |
| Hover to expand, click to pin open, auto-collapse after 0.35 s | Working |
| Transport: play/pause, previous, next | Working (local queue) |
| Progress bar and remaining time | Working |
| Menu bar window with the same controls and Quit | Working |
| Lyrics, weather and AirPods battery | Drawn, static values |

## What is simulated, and why

- **Playback** is a local three-track queue with a 0.25 s timer. The shipping product reads the system
  Now Playing session (`MediaRemote`) and controls Spotify/Apple Music through Apple Events. That
  needs a signed bundle, `NSAppleEventsUsageDescription` and the user's automation consent, none of
  which belong in a demo repo.
- **Weather** is a fixed 18°/rain value instead of a MET Norway request.
- **AirPods** show a fixed 86% instead of reading `IOBluetooth` battery reports.
- **Lyrics** are not fetched from LRCLIB.

## Files

```
Package.swift                 SwiftPM manifest, macOS 14+
Sources/Notchhvr/App.swift    @main, AppDelegate, IslandPanel, menu bar content
Sources/Notchhvr/PlayerModel.swift  queue, timer, hover/pin logic, vector artwork
Sources/Notchhvr/IslandView.swift   compact and expanded island UI
Resources/Info.plist          bundle metadata (LSUIElement, macOS 14)
build-app.sh                  release build + .app wrapper + ad-hoc signature
```

## Notes on the panel

`IslandPanel` is an `NSPanel` with `[.borderless, .nonactivatingPanel]`, level `.statusBar`, and
`collectionBehavior` of all Spaces, full-screen auxiliary and stationary. It overrides
`canBecomeKey` so buttons work while another app is frontmost, and the hosting view returns `true`
from `acceptsFirstMouse` so the first click is not swallowed. The panel resizes between 244×40 and
392×196, anchored to the top centre of `NSScreen.main`.

On a Mac without a notch the same panel floats at the top edge; the shipping app switches to its
pill shape there, which this scaffold does not implement.
