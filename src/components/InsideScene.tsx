import { useCallback, useEffect, useState, type CSSProperties } from 'react'
import { insideItems, type InsideItem, type ThumbKind } from '../content/site'
import { usePlayer } from '../lib/player'
import { Icon } from './Icons'
import { Island } from './Island'
import { MenuBar } from './MacFrame'
import { Cover, Vinyl } from './Cover'
import { LyricStage, type LyricStyle } from './screens/Lyrics'
import { DesktopScreen, LockScreen } from './screens/MacScreens'

const lyricFor: Partial<Record<ThumbKind, LyricStyle>> = {
  lyrics: 'Big words',
  aura: 'Aura',
  stars: 'Stars',
  lens: 'Lens',
  terminal: 'Terminal',
}

function Thumb({ kind }: { kind: ThumbKind }) {
  const { track } = usePlayer()
  const style = { '--c1': track.art.from, '--c2': track.art.to, '--a1': track.art.from, '--a2': track.art.to } as CSSProperties

  if (kind === 'lock') return <LockScreen />
  if (kind === 'desk') return <DesktopScreen />
  if (kind === 'island') {
    return (
      <div className="mini-stage" style={style}>
        <div className="stage-wall" />
        <MenuBar compact />
        <div className="mini-island">
          <Island look="needle" shape="notch" />
        </div>
      </div>
    )
  }
  if (lyricFor[kind]) return <LyricStage styleName={lyricFor[kind] as LyricStyle} />
  if (kind === 'sleeve') {
    return (
      <div className="sleeve-art inside-plain" style={style}>
        <span className="sleeve-case">
          <Cover art={track.art} className="sleeve-cover" />
          <span className="sleeve-text">
            <b>{track.album}</b>
            <i>{track.artist}</i>
          </span>
        </span>
        <span className="sleeve-disc">
          <Vinyl art={track.art} spinning={false} />
        </span>
      </div>
    )
  }
  if (kind === 'big') {
    return (
      <div className="big-art inside-plain">
        <Cover art={track.art} className="big-art-cover" />
        <span className="big-art-clock">9:41</span>
        <span className="big-art-title">{track.title}</span>
      </div>
    )
  }
  return (
    <div className="glow-art inside-plain">
      <span className="glow-frame">
        <span className="glow-inner">
          <b>Beat Glow</b>
          <i>a line of light, in time</i>
        </span>
      </span>
    </div>
  )
}

export function InsideScene() {
  const [open, setOpen] = useState<number | null>(null)

  const close = useCallback(() => setOpen(null), [])
  const move = useCallback((delta: number) => {
    setOpen((current) => (current === null ? null : (current + delta + insideItems.length) % insideItems.length))
  }, [])

  useEffect(() => {
    if (open === null) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowRight') move(1)
      if (event.key === 'ArrowLeft') move(-1)
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open, close, move])

  const active: InsideItem | null = open === null ? null : insideItems[open]

  return (
    <section className="inside" id="inside">
      <div className="wrap">
        <div className="inside-head">
          <h2 className="h2">
            Inside <em>the player.</em>
          </h2>
          <p className="lede">
            Eleven things Notchhvr puts on your screen. Click any of them to look closer.
          </p>
        </div>

        <div className="inside-grid">
          {insideItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className="inside-card"
              onClick={() => setOpen(index)}
              aria-haspopup="dialog"
            >
              <span className="inside-thumb">
                <Thumb kind={item.kind} />
              </span>
              <span className="inside-meta">
                <b>{item.name}</b>
                <i>{item.line}</i>
              </span>
              <span className="inside-open" aria-hidden="true">
                <Icon name="expand" size={13} />
              </span>
            </button>
          ))}
        </div>
      </div>

      {active && open !== null && (
        <div
          className="inside-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="inside-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) close()
          }}
        >
          <div className="inside-dialog-in">
            <button type="button" className="inside-close" onClick={close} aria-label="Close">
              <Icon name="close" size={18} />
            </button>
            <p className="inside-num">
              {String(open + 1).padStart(2, '0')} / {insideItems.length}
            </p>
            <h3 id="inside-title">{active.name}</h3>
            <p className="inside-line">{active.line}</p>
            <p className="inside-body">{active.body}</p>
            <ul className="inside-points">
              {active.points.map((point) => (
                <li key={point}>
                  <Icon name="check" size={13} /> {point}
                </li>
              ))}
            </ul>
            <div className="inside-nav">
              <button type="button" onClick={() => move(-1)} aria-label="Previous feature">
                <Icon name="left" size={16} />
              </button>
              <button type="button" onClick={() => move(1)} aria-label="Next feature">
                <Icon name="right" size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
