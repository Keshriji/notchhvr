import type { CSSProperties } from 'react'
import { usePlayer } from '../../lib/player'
import { Island } from '../Island'
import { MenuBar } from '../MacFrame'
import { Icon } from '../Icons'
import { fmt } from '../../lib/utils'

export function IslandScreen() {
  const { track, progress } = usePlayer()
  return (
    <div
      className="scr scr-island"
      style={{ '--c1': track.art.from, '--c2': track.art.to, '--accent': track.art.accent } as CSSProperties}
    >
      <div className="scr-wall" />
      <div className="scr-glow" />
      <MenuBar />
      <div className="scr-notch-slot">
        <Island compact />
      </div>
      <div className="scr-now">
        <span className="scr-now-dot" />
        <span>
          <b>{track.title}</b>
          <i>{track.artist}</i>
        </span>
        <span className="scr-now-time">{fmt(progress)}</span>
      </div>
    </div>
  )
}

export function LockScreen() {
  const { track, progress, playing, toggle, next, prev } = usePlayer()
  return (
    <div
      className="scr scr-lock"
      style={{ '--c1': track.art.from, '--c2': track.art.to, '--accent': track.art.accent } as CSSProperties}
    >
      <div className="lock-bg" />
      <div className="lock-blob" />
      <div className="lock-status">
        <Icon name="lock" size={13} />
        <span>Thursday, 30 October</span>
        <span className="lock-batt">
          <Icon name="battery" size={16} />
        </span>
      </div>
      <div className="lock-clock">9:41</div>
      <div className="lock-card">
        <div className="lock-cover-wrap">
          <span className="lock-cover" style={{ background: `linear-gradient(140deg, ${track.art.from}, ${track.art.to})` }}>
            <span className="lock-cover-orb" style={{ background: track.art.accent }} />
          </span>
        </div>
        <div className="lock-meta">
          <b>{track.title}</b>
          <i>{track.artist}</i>
          <span className="lock-line">
            <span style={{ width: `${(progress / track.duration) * 100}%` }} />
          </span>
          <span className="lock-times">
            <em>{fmt(progress)}</em>
            <em>-{fmt(track.duration - progress)}</em>
          </span>
        </div>
        <div className="lock-controls">
          <button type="button" aria-label="Previous" onClick={prev}>
            <Icon name="prev" size={17} />
          </button>
          <button type="button" className="lock-play" aria-label={playing ? 'Pause' : 'Play'} onClick={toggle}>
            <Icon name={playing ? 'pause' : 'play'} size={20} />
          </button>
          <button type="button" aria-label="Next" onClick={next}>
            <Icon name="next" size={17} />
          </button>
        </div>
      </div>
      <p className="lock-hint">Click the cover for the artwork</p>
    </div>
  )
}

export function DesktopScreen() {
  const { track, progress, playing } = usePlayer()
  return (
    <div
      className="scr scr-desk"
      style={{ '--c1': track.art.from, '--c2': track.art.to, '--accent': track.art.accent } as CSSProperties}
    >
      <div className="desk-wall" />
      <MenuBar compact />
      <div className="desk-player">
        <div className="desk-sleeve">
          <span className="desk-sleeve-art" />
          <span className="desk-sleeve-text">
            <b>{track.album}</b>
            <i>{track.artist}</i>
          </span>
        </div>
        <div className="desk-disc">
          <span className={`desk-vinyl ${playing ? 'spinning' : ''}`}>
            <span className="desk-label" style={{ background: `linear-gradient(140deg, ${track.art.from}, ${track.art.to})` }} />
            <span className="desk-hole" />
          </span>
          <span className="desk-arm">
            <i />
            <b />
          </span>
        </div>
      </div>
      <div className="desk-readout">
        <b>{track.title}</b>
        <span>{track.artist}</span>
        <span className="desk-progress">
          <i style={{ width: `${(progress / track.duration) * 100}%` }} />
        </span>
      </div>
      <div className="desk-dock" aria-hidden="true">
        {['#f0b06a', '#7fb3d5', '#8f6fd8', '#e0e0e6', '#30d158'].map((color) => (
          <span key={color} style={{ background: color }} />
        ))}
      </div>
    </div>
  )
}
