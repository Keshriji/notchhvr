import { useEffect, useRef, useState } from 'react'
import { usePlayer } from '../lib/player'
import { cx } from '../lib/utils'
import { Icon } from './Icons'
import { MacFrame } from './MacFrame'
import { ScreenBody, type ScreenName } from './Hero'

const captions = [
  { key: 'In the notch.', value: 'Hover to peek. Click to open. Swipe for the weather.' },
  { key: 'On the lock screen.', value: 'Play, pause and skip without unlocking your Mac.' },
  { key: 'On the desktop.', value: 'A record turns behind everything else.' },
  { key: 'Word by word.', value: 'Timed lyrics in five styles, on any screen.' },
]

export function ScrollHero({
  theme,
  onTheme,
  onBuy,
}: {
  theme: 'screen' | 'studio'
  onTheme: () => void
  onBuy: () => void
}) {
  const section = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  const [reduced, setReduced] = useState(false)
  const { track, playing, toggle } = usePlayer()

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (reduced) {
      setProgress(0.34)
      return
    }
    let frame = 0
    const measure = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const el = section.current
        if (!el) return
        const total = el.offsetHeight - window.innerHeight
        const top = el.getBoundingClientRect().top
        setProgress(total > 0 ? Math.min(1, Math.max(0, -top / total)) : 0)
      })
    }
    measure()
    window.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
      cancelAnimationFrame(frame)
    }
  }, [reduced])

  const p = progress
  const stage = p < 0.24 ? 0 : p < 0.42 ? 1 : p < 0.58 ? 2 : p < 0.74 ? 3 : 4
  const screen: ScreenName = stage <= 1 ? 'island' : stage === 2 ? 'lock' : stage === 3 ? 'desktop' : 'lyrics'
  const zoom = 0.84 + Math.min(p, 0.86) * 0.46
  const captionIndex = Math.max(0, stage - 2)
  const copyFade = Math.max(0, 1 - p * 3.6)
  const finalFade = p < 0.82 ? 0 : Math.min(1, (p - 0.82) * 5)

  return (
    <section className={cx('sh', reduced && 'sh-reduced')} ref={section} id="top">
      <div className="sh-sticky">
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
            <a href="#inside">Inside</a>
            <a href="#studio">Make it yours</a>
            <a href="#everything">Everything</a>
          </div>
          <div className="nav-actions">
            <button
              type="button"
              className="icon-btn"
              onClick={onTheme}
              aria-label={theme === 'screen' ? 'Switch to the dark studio theme' : 'Switch to the light screen theme'}
            >
              <Icon name={theme === 'screen' ? 'moon' : 'sun'} size={17} />
            </button>
            <a className="nav-page-link" href="#/download">
              Download
            </a>
            <button type="button" className="btn btn-sm" onClick={onBuy}>
              Buy — $12.99
            </button>
          </div>
        </nav>

        <div
          className="sh-copy"
          style={{ opacity: copyFade, transform: `translate3d(0, ${-p * 56}px, 0)` }}
        >
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
            <span className="hero-now-tag">Now playing</span>
          </div>
        </div>

        <div
          className="sh-mac"
          style={{
            transform: `translate3d(${-p * 12}vw, -50%, 0) scale(${zoom}) rotateX(${4 - p * 3}deg) rotateY(${-5 + p * 4}deg)`,
          }}
        >
          <MacFrame
            className="sh-mac-frame"
            label="A MacBook in a painted sky. As you scroll, its screen moves from the notch player to the lock screen, the desktop and lyrics."
          >
            <ScreenBody screen={reduced ? 'island' : screen} />
          </MacFrame>
          <div className="hero-stage-shadow" aria-hidden="true" />
        </div>

        <div className={cx('sh-caption', stage >= 2 && 'on')} aria-live="polite">
          <span className="sh-step">
            {String(Math.min(stage - 1, 4)).padStart(2, '0')} / 04
          </span>
          <h2>{captions[captionIndex].key}</h2>
          <p>{captions[captionIndex].value}</p>
        </div>

        <div className="sh-final" style={{ opacity: finalFade, pointerEvents: finalFade > 0.6 ? 'auto' : 'none' }}>
          <p className="sh-final-kicker">Notchhvr for macOS</p>
          <h2>
            Every song, <em>as a record.</em>
          </h2>
          <div className="hero-cta">
            <a className="btn" href="#get">
              <Icon name="download" size={17} /> Download for Mac
            </a>
            <a className="btn ghost" href="#inside">
              See what's inside
            </a>
          </div>
        </div>

        <div className="sh-rail" aria-hidden="true">
          <span style={{ transform: `scaleX(${Math.max(0.02, p)})` }} />
        </div>

        <div className="sh-dots" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((dot) => (
            <i key={dot} className={cx(stage === dot && 'on')} />
          ))}
        </div>

        <div className="sh-bottom">
          <a className="scroll-cue" href="#meet">
            <span>{p < 0.04 ? 'Scroll' : 'Keep scrolling'}</span>
            <i />
          </a>
        </div>
      </div>
    </section>
  )
}
