export type Art = { from: string; to: string; accent: string; angle: number }

export type Line = { t: number; text: string }

export type Track = {
  title: string
  artist: string
  album: string
  duration: number
  art: Art
  lyrics: Line[]
}

export const tracks: Track[] = [
  {
    title: 'Slow Static',
    artist: 'Juniper Vale',
    album: 'Neon Orchard',
    duration: 214,
    art: { from: '#f0b06a', to: '#b7472f', accent: '#ffd9a8', angle: 145 },
    lyrics: [
      { t: 0, text: 'Radio hum on an empty street' },
      { t: 6, text: 'Streetlight blooming in the heat' },
      { t: 12, text: 'I keep the dial on the quiet band' },
      { t: 18, text: 'Your hand in mine and the night in hand' },
      { t: 24, text: 'Slow static, slow static' },
      { t: 30, text: 'Everything soft, everything true' },
      { t: 36, text: 'Slow static, slow static' },
      { t: 42, text: 'The whole long summer tunes to you' },
    ],
  },
  {
    title: 'Paper Moons',
    artist: 'Cassette Sunday',
    album: 'Low Ceilings',
    duration: 187,
    art: { from: '#7fb3d5', to: '#2c4a6e', accent: '#d9ecff', angle: 195 },
    lyrics: [
      { t: 0, text: 'Cut out the sky with a kitchen knife' },
      { t: 6, text: 'Hang it up above the light' },
      { t: 12, text: 'Paper moons on a bedroom wall' },
      { t: 18, text: 'Nothing heavy, nothing tall' },
      { t: 24, text: 'And if the morning takes it down' },
      { t: 30, text: 'We will fold another town' },
    ],
  },
  {
    title: 'Midnight Postcard',
    artist: 'The Lantern Club',
    album: 'Night Mail',
    duration: 241,
    art: { from: '#8f6fd8', to: '#2a1b4d', accent: '#ffb3d1', angle: 120 },
    lyrics: [
      { t: 0, text: 'Wrote you a postcard at a quarter to three' },
      { t: 6, text: 'Stamps on the table, a cup of cold tea' },
      { t: 12, text: 'Said I am fine here, said I am alright' },
      { t: 18, text: 'Said I still hear you through the wall of the night' },
      { t: 24, text: 'Send it by moonlight, send it by hand' },
      { t: 30, text: 'Send it the long way across the land' },
    ],
  },
]

export const lyricStyles = ['Big words', 'Lens', 'Stars', 'Terminal', 'Aura'] as const

export type Hour = { time: string; temp: number; kind: 'rain' | 'cloud' | 'sun' | 'moon' }

export const weather = {
  city: 'Berlin',
  temp: 14,
  condition: 'Rain at 20:00',
  hi: 15,
  lo: 8,
  hours: [
    { time: '18', temp: 15, kind: 'cloud' },
    { time: '19', temp: 15, kind: 'cloud' },
    { time: '20', temp: 13, kind: 'rain' },
    { time: '21', temp: 12, kind: 'rain' },
    { time: '22', temp: 12, kind: 'rain' },
    { time: '23', temp: 11, kind: 'moon' },
  ] as Hour[],
}

export const facts = [
  {
    title: 'Apple silicon.',
    text: 'Any Mac from 2020 on, running macOS 14 or later.',
    icon: 'chip',
  },
  {
    title: 'Notch or no notch.',
    text: 'Without a notch, the island floats just under the top edge.',
    icon: 'display',
  },
  {
    title: 'Pay once.',
    text: 'Free for three days, then yours to keep. Updates are free.',
    icon: 'card',
  },
  {
    title: 'Private.',
    text: 'No account, no analytics, no tracking. Nothing to sign up for.',
    icon: 'lock',
  },
]

export const featureGroups = [
  {
    group: 'Music',
    items: [
      { name: 'Now playing', text: 'Spotify and Apple Music, picked up by themselves.' },
      { name: 'Lyrics', text: 'Word by word, in five styles, on the lock screen or the desktop.' },
      { name: 'Lock screen player', text: 'Transport controls before you sign in, and the cover full size.' },
      { name: 'Desktop', text: 'A turntable, a sleeve or an aura behind your windows.' },
    ],
  },
  {
    group: 'Your Mac',
    items: [
      { name: 'AirPods', text: 'They appear in the island as they connect, with their battery.' },
      { name: 'Volume and brightness', text: 'A slider for each at the edge of the screen.' },
      { name: 'Weather', text: 'The next six hours, one swipe away from the song.' },
      { name: 'Beat Glow', text: 'A line of light around your screen, in time with the music.' },
    ],
  },
  {
    group: 'Extras',
    items: [
      { name: 'Face Unlock', text: 'In beta: look at your Mac to get in.' },
      { name: 'Michael', text: 'A keycap with a face that counts how fast you type.' },
      { name: 'Painted wallpapers', text: 'More than ninety oil paintings, sized for your display.' },
      { name: 'Listening diary', text: 'What you played, kept on your Mac and nowhere else.' },
    ],
  },
]

export const faqs = [
  {
    q: 'Which music apps does it work with?',
    a: 'Spotify and Apple Music, the apps on your Mac. Notchhvr listens for what is already playing, so you never sign in to anything.',
  },
  {
    q: 'Which Macs does it run on?',
    a: 'Any Mac with Apple silicon, from 2020 on, running macOS 14 or later. On a Mac without a notch the island floats just under the top edge of the screen.',
  },
  {
    q: 'How does the free trial work?',
    a: 'Every Mac gets three free days with everything switched on, and no card is needed. The only thing held back is the wallpaper gallery: five paintings to try, all of them once Notchhvr is yours.',
  },
  {
    q: 'What happens when the free days are over?',
    a: 'Notchhvr pauses and asks for a licence code. Your settings stay exactly as they were, so the moment you enter a code everything comes back.',
  },
  {
    q: 'Is it a subscription?',
    a: 'No. You pay once and keep it, and every update is free. The price shown is the one for your region.',
  },
  {
    q: 'How many Macs can I use it on?',
    a: 'Two of your own. To move it, switch it off on the old Mac in Settings, then enter your code on the new one.',
  },
  {
    q: 'I lost my code.',
    a: 'Enter the email you bought with and we send the code to it again. There is a link in the footer called Recover a licence.',
  },
  {
    q: 'Can I get a refund?',
    a: 'If Notchhvr does not work on your Mac, write to us within fourteen days of buying and we refund you in full.',
  },
  {
    q: 'Does it collect my data?',
    a: 'No account, no analytics, no tracking. What you listen to stays on your Mac. The privacy page says exactly what leaves it, and why.',
  },
  {
    q: 'Where do the lyrics come from?',
    a: 'From LRCLIB, a public library of timed lyrics. Plenty of songs have them; when a song has none, Notchhvr says so.',
  },
]
