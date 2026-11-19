#!/usr/bin/env bash
# Build Notchhvr and wrap it in a minimal .app bundle.
set -euo pipefail
cd "$(dirname "$0")"

swift build -c release

APP="build/Notchhvr.app"
rm -rf "$APP"
mkdir -p "$APP/Contents/MacOS" "$APP/Contents/Resources"
cp .build/release/Notchhvr "$APP/Contents/MacOS/Notchhvr"
cp Resources/Info.plist "$APP/Contents/Info.plist"

# Ad-hoc signature so macOS will run the local build.
codesign --force --sign - "$APP" >/dev/null 2>&1 || \
  echo "note: ad-hoc signing skipped"

echo "Built $APP"
echo "Open it with: open \"$APP\""
