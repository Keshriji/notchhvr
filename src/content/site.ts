export type ThumbKind =
  | 'island'
  | 'lock'
  | 'desk'
  | 'lyrics'
  | 'aura'
  | 'stars'
  | 'lens'
  | 'terminal'
  | 'sleeve'
  | 'big'
  | 'glow'

export type InsideItem = {
  id: string
  name: string
  line: string
  body: string
  points: string[]
  kind: ThumbKind
}

export const insideItems: InsideItem[] = [
  {
    id: 'island',
    name: 'The island',
    line: 'Your notch becomes the player.',
    body: 'A compact player that lives where the camera is. Nothing floats over your work until you ask for it.',
    points: [
      'Hover for the song, click for the full player.',
      'Two looks and two shapes, including a free-floating pill.',
      'AirPods appear as they connect, with their battery.',
    ],
    kind: 'island',
  },
  {
    id: 'lock',
    name: 'Lock Screen',
    line: 'Controls before you sign in.',
    body: 'The transport sits under the clock in glass, so you can skip a song without unlocking the Mac.',
    points: [
      'Play, pause, previous and next while locked.',
      'The cover sits beside the track and its times.',
      'No permission prompts, no overlay on your desktop.',
    ],
    kind: 'lock',
  },
  {
    id: 'desk',
    name: 'Turntable',
    line: 'A record player behind your windows.',
    body: 'The album turns on a platter at the centre of the desktop, sleeve beside it, tonearm down.',
    points: [
      'The record spins only while music plays.',
      'Three desktop styles: Turntable, Sleeve and Aura.',
      'Everything sits behind icons and windows.',
    ],
    kind: 'desk',
  },
  {
    id: 'lyrics',
    name: 'Lyrics, word by word',
    line: 'Every word, right on time.',
    body: 'Timed lyrics fill the lock screen or the desktop, one word at a time, in the album\u2019s colours.',
    points: [
      'Five styles: Big words, Lens, Stars, Terminal and Aura.',
      'Album colours by default, or a palette of your own.',
      'Works on the lock screen and on the desktop.',
    ],
    kind: 'lyrics',
  },
  {
    id: 'aura',
    name: 'Aura',
    line: 'Cover, player and words, side by side.',
    body: 'A soft bloom of the album\u2019s own colours holds the cover, the transport and the lyric ladder.',
    points: ['The whole screen takes the album\u2019s palette.', 'The line being sung stands out from the rest.'],
    kind: 'aura',
  },
  {
    id: 'stars',
    name: 'Stars',
    line: 'Lyrics drawn as constellations.',
    body: 'Words become points of light, joined by hairlines, brightening as the singer reaches them.',
    points: ['Constellations rebuild for every song.', 'In the album\u2019s colours or yours.'],
    kind: 'stars',
  },
  {
    id: 'lens',
    name: 'Lens',
    line: 'Each word comes into focus.',
    body: 'Surrounding lines blur back while the current word sharpens and lifts away from the page.',
    points: ['Depth of field built from type, not video.', 'Reads well on a bright or a dark cover.'],
    kind: 'lens',
  },
  {
    id: 'terminal',
    name: 'Terminal',
    line: 'Lyrics typed out, line by line.',
    body: 'A monospace console prints the song with timestamps and a caret that keeps time.',
    points: ['Monospaced, timestamped, scrollback included.', 'A quiet look for a dark desktop.'],
    kind: 'terminal',
  },
  {
    id: 'sleeve',
    name: 'Sleeve',
    line: 'The record slides out of its cover.',
    body: 'The sleeve rests on the desktop with the record easing out of it as the song plays.',
    points: ['Album, artist and progress under the cover.', 'One of the three desktop styles.'],
    kind: 'sleeve',
  },
  {
    id: 'big',
    name: 'Big cover',
    line: 'Album art, full size.',
    body: 'Click the cover on the lock screen and it fills the display, in its own colours, under the clock.',
    points: ['The clock stays readable over any artwork.', 'Click again for the lyrics.'],
    kind: 'big',
  },
  {
    id: 'glow',
    name: 'And there\u2019s more',
    line: 'Small things, every day.',
    body: 'Beat Glow traces the edge of the display in time with the music. The rest arrives in free updates.',
    points: [
      'Beat Glow, AirPods battery, volume and brightness.',
      'Ninety painted wallpapers, sized for your display.',
      'A listening diary that never leaves the Mac.',
    ],
    kind: 'glow',
  },
]

export type Wallpaper = { name: string; from: string; to: string; accent: string }

export const wallpapers: Wallpaper[] = [
  { name: 'Low Sun', from: '#f0b06a', to: '#b7472f', accent: '#ffd9a8' },
  { name: 'Cold Front', from: '#7fb3d5', to: '#2c4a6e', accent: '#d9ecff' },
  { name: 'Night Mail', from: '#8f6fd8', to: '#2a1b4d', accent: '#ffb3d1' },
  { name: 'Moss', from: '#8fc6a6', to: '#234a3c', accent: '#dff5e8' },
  { name: 'Ember', from: '#e06a4a', to: '#3a1410', accent: '#ffc2a8' },
  { name: 'Paper', from: '#e8e2d6', to: '#9a8f7c', accent: '#fffaf0' },
  { name: 'Ink', from: '#3a3f52', to: '#0a0b12', accent: '#9fb4de' },
  { name: 'Orchard', from: '#d8c05c', to: '#5b4a14', accent: '#fff1b8' },
  { name: 'Marble', from: '#c9c6d6', to: '#5a5570', accent: '#f4f2ff' },
  { name: 'Tide', from: '#5ec2c6', to: '#123c4a', accent: '#c8fbff' },
  { name: 'Rosewood', from: '#c98a86', to: '#4a1f22', accent: '#ffe0dc' },
  { name: 'Dusk', from: '#6f7bb8', to: '#1a1b33', accent: '#c9d2ff' },
]

export const diary = [
  { day: 'Today', title: 'Slow Static', artist: 'Juniper Vale', plays: 6 },
  { day: 'Today', title: 'Paper Moons', artist: 'Cassette Sunday', plays: 3 },
  { day: 'Yesterday', title: 'Midnight Postcard', artist: 'The Lantern Club', plays: 4 },
  { day: 'Yesterday', title: 'Neon Orchard (Reprise)', artist: 'Juniper Vale', plays: 1 },
  { day: 'Monday', title: 'Low Ceilings', artist: 'Cassette Sunday', plays: 2 },
  { day: 'Sunday', title: 'Night Mail', artist: 'The Lantern Club', plays: 5 },
]

export const changelog = [
  {
    version: '1.1.1',
    date: 'November 2026',
    notes: [
      'The island remembers its shape per display, so a docked Mac keeps its pill.',
      'Lyric timing is corrected for songs with long instrumental intros.',
      'Beat Glow no longer samples the display when the screen is asleep.',
    ],
  },
  {
    version: '1.1.0',
    date: 'October 2026',
    notes: [
      'Face Unlock arrives in beta, kept entirely in the Keychain.',
      'Stars and Terminal join the lyric styles, bringing the set to five.',
      'AirPods now show their battery inside the expanded island.',
    ],
  },
  {
    version: '1.0.2',
    date: 'September 2026',
    notes: [
      'Weather now follows the display you are on, not just the main one.',
      'The lock screen player no longer dims the wallpaper behind it.',
      'Fixed a crash when the album had no artwork.',
    ],
  },
  {
    version: '1.0.0',
    date: 'August 2026',
    notes: ['First release: the island, the lock screen, the desktop and lyrics.', 'Ninety painted wallpapers included.'],
  },
]
