import { useState, type CSSProperties } from 'react'
import { usePlayer } from '../lib/player'
import { Icon } from './Icons'
import { MacFrame } from './MacFrame'
import { Island } from './Island'
import { DesktopScreen, IslandScreen, LockScreen } from './screens/MacScreens'
import { LyricsScreen } from './screens/Lyrics'
import { cx } from '../lib/utils'

export type ScreenName = 'island' | 'lock' | 'desktop' | 'lyrics'

export const screenNames: { value: ScreenName; label: string }[] = [
  { value: 'island', label: 'Island' },
  { value: 'lock', label: 'Lock Screen' },
  { value: 'desktop', label: 'Desktop' },
  { value: 'lyrics', label: 'Lyrics' },
]

export function ScreenBody({ screen }: { screen: ScreenName }) {
  if (screen === 'lock') return <LockScreen />
  if (screen === 'desktop') return <DesktopScreen />
  if (screen === 'lyrics') return <LyricsScreen />
  return <IslandScreen />
}

export function ScreenSwitch({
  value,
  onChange,
  id,
}: {
  value: ScreenName
  onChange: (value: ScreenName) => void
  id?: string
}) {
  return (
    <div className="screen-switch" role="radiogroup" aria-label="What the screen shows" id={id}>
      {screenNames.map((item) => (
        <button
          key={item.value}
          type="button"
          role="radio"
          aria-checked={value === item.value}
          className={cx(value === item.value && 'on')}
          onClick={() => onChange(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}

export function Hero({ theme, onTheme, onBuy }: { theme: 'screen' | 'studio'; onTheme: () => void; onBuy: () => void }) {
  const [screen, setScreen] = useState<ScreenName>('island')
  const { track, playing, toggle, next } = usePlayer()

  return (
    <header className="hero" id="top">
      <div className="sky" aria-hidden="true">
        <span className="sky-sun" />
        <span className="sky-cloud c1" />
        <span className="sky-cloud c2" />
        <span className="sky-cloud c3" />
        <span className="sky-haze" />
        <svg className="sky-ridge" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path d="M0 246c120-30 208-14 300 8 94 23 168 10 250-22 88-34 154-52 246-30 96 24 154 52 254 34 104-19 148-36 240-18 52 10 100 24 150 34v68H0z" />
          <path d="M0 276c140-18 214 2 330 16 118 14 202-6 300-20 104-14 190 2 300 18 110 16 230 10 330-4 62-9 122-8 180 0v34H0z" opacity=".55" />
        </svg>
        <span className="sky-grain" />
      </div>

      <nav className="nav" aria-label="Main">
        <a className="brand" href="#top">
          <span className="brand-icon" aria-hidden="true">
            <span />
          </span>
          <b>Notchhvr</b>
        </a>
        <div className="nav-links">
          <a href="#meet">Overview</a>
          <a href="#island">Island</a>
          <a href="#highlights">Highlights</a>
          <a href="#everything">Everything</a>
          <a href="#faq">Questions</a>
        </div>
        <div className="nav-actions">
          <button type="button" className="icon-btn" onClick={onTheme} aria-label={theme === 'screen' ? 'Switch to the dark studio theme' : 'Switch to the light screen theme'}>
            <Icon name={theme === 'screen' ? 'moon' : 'sun'} size={17} />
          </button>
          <button type="button" className="btn btn-sm" onClick={onBuy}>
            Buy — $12.99
          </button>
        </div>
      </nav>

      <div className="hero-grid">
        <div className="hero-copy">
          <p className="hero-eyebrow">
            <span className="dot" /> Notchhvr 1.1 for macOS
          </p>
          <h1>
            A record player
            <br />
            <em>for your Mac.</em>
          </h1>
          <p className="hero-lede">
            Your music in the notch, on the lock screen and on the desktop. For Spotify and Apple Music.
          </p>
          <div className="hero-cta">
            <a className="btn" href="#get">
              <Icon name="download" size={17} /> Download for Mac
            </a>
            <button type="button" className="btn ghost" onClick={onBuy}>
              Buy Notchhvr
            </button>
          </div>
          <p className="hero-fine">Free for 3 days. One-time purchase, no subscription.</p>

          <div className="hero-now" aria-live="polite">
            <button type="button" className="hero-now-play" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>
              <Icon name={playing ? 'pause' : 'play'} size={14} />
            </button>
            <span className="hero-now-meta">
              <b>{track.title}</b>
              <i>{track.artist}</i>
            </span>
            <button type="button" className="hero-now-next" onClick={next} aria-label="Next song">
              <Icon name="next" size={14} />
            </button>
          </div>
        </div>

        <div className="hero-stage">
          <MacFrame className="hero-mac" label="A MacBook floating above a painted sky, with Notchhvr's island open in the notch.">
            <ScreenBody screen={screen} />
          </MacFrame>
          <div className="hero-stage-shadow" aria-hidden="true" />
        </div>
      </div>

      <div className="hero-bottom">
        <ScreenSwitch value={screen} onChange={setScreen} />
        <a className="scroll-cue" href="#meet">
          <span>Scroll</span>
          <i />
        </a>
      </div>
    </header>
  )
}

export function IslandPlayground() {
  const [look, setLook] = useState<'needle' | 'mirror'>('needle')
  const [shape, setShape] = useState<'notch' | 'pill'>('notch')
  const { track } = usePlayer()

  return (
    <section className="playground" id="island" data-name="Notch Island">
      <div className="wrap">
        <div className="playground-head">
          <div>
            <h2 className="h2">
              The notch, <em>put to use.</em>
            </h2>
            <p className="lede">
              The notch becomes a compact player for whatever is playing. Hover to preview, click to open, swipe for
              the weather, or expand it into the full view.
            </p>
          </div>
          <div className="playground-controls">
            <div className="seg">
              <span className="seg-label">Look</span>
              <div className="seg-track">
                <button type="button" className={cx(look === 'needle' && 'on')} onClick={() => setLook('needle')}>
                  Needle
                </button>
                <button type="button" className={cx(look === 'mirror' && 'on')} onClick={() => setLook('mirror')}>
                  Mirror
                </button>
              </div>
            </div>
            <div className="seg">
              <span className="seg-label">Shape</span>
              <div className="seg-track">
                <button type="button" className={cx(shape === 'notch' && 'on')} onClick={() => setShape('notch')}>
                  Notch
                </button>
                <button type="button" className={cx(shape === 'pill' && 'on')} onClick={() => setShape('pill')}>
                  Pill
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={`stage look-${look} shape-${shape}`}>
          <div className="stage-screen">
            <div
              className="stage-wall"
              style={{ '--c1': track.art.from, '--c2': track.art.to } as CSSProperties}
            />
            <div className="stage-menubar" aria-hidden="true">
              <span className="stage-mark" />
              <b>Finder</b>
              <span>File</span>
              <span>Edit</span>
              <span>View</span>
              <span>Go</span>
              <span>Window</span>
              <span className="stage-menu-right">Thu 9:41</span>
            </div>
            <span className="stage-notch" aria-hidden="true" />
            <div className="stage-island">
              <Island look={look} shape={shape} />
            </div>
            <div className="stage-hint" aria-hidden="true">
              <span>Hover to peek</span>
              <i />
              <span>Click to open</span>
              <i />
              <span>Swipe for weather</span>
            </div>
            <div className="stage-dock" aria-hidden="true">
              {['#f0b06a', '#7fb3d5', '#8f6fd8', '#e0e0e6', '#30d158'].map((color) => (
                <span key={color} style={{ background: color }} />
              ))}
            </div>
          </div>
        </div>

        <div className="playground-notes">
          <article>
            <h3>Two looks</h3>
            <p>Needle is dark glass over the album. Mirror is frosted light, for a brighter desktop.</p>
          </article>
          <article>
            <h3>Two shapes</h3>
            <p>Notch hugs the cutout. Pill floats free, so it works on Macs without one.</p>
          </article>
          <article>
            <h3>One gesture</h3>
            <p>Drag the open island sideways to move between the song and the next six hours.</p>
          </article>
        </div>
      </div>
    </section>
  )
}
