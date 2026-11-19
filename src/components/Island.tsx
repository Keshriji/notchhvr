import { useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react'
import { weather } from '../data'
import { usePlayer } from '../lib/player'
import { cx, fmt } from '../lib/utils'
import { Cover } from './Cover'
import { Icon } from './Icons'

export type IslandLook = 'needle' | 'mirror'
export type IslandShape = 'notch' | 'pill'
type Mode = 'idle' | 'peek' | 'open' | 'weather' | 'expanded'

const weatherIcon = { rain: 'rain', cloud: 'cloud', sun: 'sun', moon: 'moon' } as const

function Eq({ active }: { active: boolean }) {
  return (
    <span className={cx('eq', active && 'on')} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  )
}

export function Island({
  look = 'needle',
  shape = 'notch',
  compact = false,
  className,
}: {
  look?: IslandLook
  shape?: IslandShape
  compact?: boolean
  className?: string
}) {
  const player = usePlayer()
  const [mode, setMode] = useState<Mode>('idle')
  const dragX = useRef<number | null>(null)
  const { track, playing, progress, volume } = player

  const open = mode === 'open' || mode === 'weather' || mode === 'expanded'

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    dragX.current = event.clientX
  }

  function onPointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (dragX.current === null) return
    const delta = event.clientX - dragX.current
    dragX.current = null
    if (Math.abs(delta) < 36 || compact) return
    setMode((current) => {
      if (current === 'weather') return delta > 0 ? 'open' : 'weather'
      if (current === 'open') return delta < 0 ? 'weather' : 'open'
      return current
    })
  }

  return (
    <div
      className={cx(
        'island',
        `mode-${mode}`,
        `look-${look}`,
        `shape-${shape}`,
        compact && 'is-compact',
        open && 'is-open',
        playing && 'is-playing',
        className,
      )}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onKeyDown={(event) => {
        if (event.key === 'Escape') setMode('idle')
      }}
    >
      <div className="island-bar-wrap">
        <button
          type="button"
          className="island-bar"
          aria-expanded={open}
          aria-label={open ? 'Close Notchhvr player' : 'Open Notchhvr player'}
          onClick={() => {
            if (compact) {
              player.toggle()
              return
            }
            setMode(open ? 'idle' : 'open')
          }}
        >
          <Cover art={track.art} className="island-cover" />
          <span className="island-meta">
            <b>{track.title}</b>
            <i>{track.artist}</i>
          </span>
          <span className="island-side">
            {!compact && (
              <span className="island-progress" aria-hidden="true">
                <span style={{ width: `${(progress / track.duration) * 100}%` }} />
              </span>
            )}
            <Eq active={playing} />
            <span className="island-play">
              <Icon name={playing ? 'pause' : 'play'} size={13} />
            </span>
          </span>
        </button>
      </div>

      <div className="island-panel" aria-hidden={!open} inert={!open}>
        {mode === 'weather' ? (
          <div className="island-weather">
            <div className="iw-head">
              <span className="iw-temp">{weather.temp}°</span>
              <span className="iw-place">
                <b>{weather.condition}</b>
                <i>
                  ↑{weather.hi}° ↓{weather.lo}° · {weather.city}
                </i>
              </span>
              <button type="button" className="island-icon-btn" aria-label="Back to the song" onClick={() => setMode('open')}>
                <Icon name="left" size={16} />
              </button>
            </div>
            <div className="iw-hours">
              {weather.hours.map((hour) => (
                <span key={hour.time} className="iw-hour">
                  <i>{hour.time}</i>
                  <Icon name={weatherIcon[hour.kind]} size={16} />
                  <b>{hour.temp}°</b>
                </span>
              ))}
            </div>
          </div>
        ) : mode === 'expanded' ? (
          <div className="island-expanded">
            <div className="ix-widget ix-now">
              <Cover art={track.art} className="ix-cover" />
              <div className="ix-meta">
                <b>{track.title}</b>
                <i>{track.artist}</i>
              </div>
              <Eq active={playing} />
              <div className="ix-line">
                <span style={{ width: `${(progress / track.duration) * 100}%` }} />
              </div>
              <div className="ix-controls">
                <button type="button" aria-label="Previous" onClick={player.prev}>
                  <Icon name="prev" size={15} />
                </button>
                <button type="button" className="ix-play" aria-label={playing ? 'Pause' : 'Play'} onClick={player.toggle}>
                  <Icon name={playing ? 'pause' : 'play'} size={16} />
                </button>
                <button type="button" aria-label="Next" onClick={player.next}>
                  <Icon name="next" size={15} />
                </button>
              </div>
            </div>

            <div className="ix-widget ix-weather">
              <span className="ix-label">Berlin</span>
              <b className="ix-temp">{weather.temp}°</b>
              <span className="ix-cond">{weather.condition}</span>
              <div className="ix-hours">
                {weather.hours.slice(0, 4).map((hour) => (
                  <span key={hour.time}>
                    <i>{hour.time}</i>
                    <Icon name={weatherIcon[hour.kind]} size={13} />
                  </span>
                ))}
              </div>
            </div>

            <div className="ix-widget ix-pods">
              <Icon name="airpods" size={22} />
              <div>
                <b>AirPods Pro</b>
                <i>Connected</i>
              </div>
              <span className="ix-batt">
                <i style={{ width: '86%' }} />
              </span>
              <b className="ix-pct">86%</b>
            </div>

            <div className="ix-widget ix-sliders">
              <label>
                <Icon name="volume" size={16} />
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={Math.round(volume * 100)}
                  onChange={(event) => player.setVolume(Number(event.target.value) / 100)}
                  aria-label="Volume"
                />
              </label>
              <label>
                <Icon name="sun" size={16} />
                <input type="range" min={0} max={100} defaultValue={62} aria-label="Brightness" />
              </label>
            </div>
          </div>
        ) : (
          <div className="island-open">
            <div className="io-head">
              <Cover art={track.art} className="io-cover" />
              <div className="io-meta">
                <b>{track.title}</b>
                <i>{track.artist}</i>
              </div>
              <Eq active={playing} />
            </div>
            <div className="io-scrub">
              <input
                type="range"
                min={0}
                max={track.duration}
                step={1}
                value={Math.round(progress)}
                onChange={(event) => player.seek(Number(event.target.value))}
                aria-label="Playback position"
                style={{ '--pct': `${(progress / track.duration) * 100}%` } as CSSProperties}
              />
              <span className="io-times">
                <b>{fmt(progress)}</b>
                <b>-{fmt(track.duration - progress)}</b>
              </span>
            </div>
            <div className="io-row">
              <div className="io-controls">
                <button type="button" aria-label="Previous song" onClick={player.prev}>
                  <Icon name="prev" size={16} />
                </button>
                <button
                  type="button"
                  className="io-play"
                  aria-label={playing ? 'Pause' : 'Play'}
                  onClick={player.toggle}
                >
                  <Icon name={playing ? 'pause' : 'play'} size={18} />
                </button>
                <button type="button" aria-label="Next song" onClick={player.next}>
                  <Icon name="next" size={16} />
                </button>
              </div>
              <div className="io-tools">
                <button type="button" aria-label="Weather" onClick={() => setMode('weather')}>
                  <Icon name="cloud" size={17} />
                </button>
                <button type="button" aria-label="Expand" onClick={() => setMode('expanded')}>
                  <Icon name="expand" size={16} />
                </button>
                <button type="button" aria-label="Close" onClick={() => setMode('idle')}>
                  <Icon name="up" size={17} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
