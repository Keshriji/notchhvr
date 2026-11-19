import type { CSSProperties } from 'react'
import { usePlayer } from '../../lib/player'
import { cx } from '../../lib/utils'
import { Cover } from '../Cover'

export type LyricStyle = 'Big words' | 'Lens' | 'Stars' | 'Terminal' | 'Aura'

const STAR_POINTS = [
  [12, 26],
  [30, 14],
  [49, 30],
  [67, 18],
  [86, 34],
  [22, 62],
  [44, 58],
  [66, 72],
  [84, 60],
]

export function LyricStage({
  styleName,
  className,
  full = false,
}: {
  styleName: LyricStyle
  className?: string
  full?: boolean
}) {
  const { track, progress } = usePlayer()
  const lines = track.lyrics
  const per = 6
  const activeIndex = Math.floor(progress / per) % lines.length
  const line = lines[activeIndex]
  const words = line.text.split(' ')
  const spoken = Math.min(words.length, Math.floor(((progress % per) / per) * (words.length + 1)))

  const style = {
    '--c1': track.art.from,
    '--c2': track.art.to,
    '--accent': track.art.accent,
  } as CSSProperties

  return (
    <div className={cx('lyric-stage', `lyric-${styleName.toLowerCase().replace(' ', '-')}`, full && 'is-full', className)} style={style}>
      <span className="lyric-wash" aria-hidden="true" />

      {styleName === 'Big words' && (
        <div className="lyric-big">
          <p className="lb-line lb-prev">{lines[(activeIndex - 1 + lines.length) % lines.length].text}</p>
          <p className="lb-line lb-now">
            {words.map((word, index) => (
              <span key={`${word}-${index}`} className={cx(index < spoken && 'sung')}>
                {word}{' '}
              </span>
            ))}
          </p>
          <p className="lb-line lb-next">{lines[(activeIndex + 1) % lines.length].text}</p>
        </div>
      )}

      {styleName === 'Lens' && (
        <div className="lyric-lens">
          <div className="ll-row ll-before" aria-hidden="true">
            {lines[(activeIndex + 1) % lines.length].text}
          </div>
          <div className="ll-row">
            {words.map((word, index) => (
              <span key={`${word}-${index}`} className={cx('ll-word', index === spoken % words.length && 'focus')}>
                {word}
              </span>
            ))}
          </div>
          <div className="ll-row ll-after" aria-hidden="true">
            {lines[(activeIndex + 2) % lines.length].text}
          </div>
        </div>
      )}

      {styleName === 'Stars' && (
        <div className="lyric-stars">
          <svg viewBox="0 0 100 84" preserveAspectRatio="none" aria-hidden="true">
            {STAR_POINTS.map(([x, y], index) => {
              const next = STAR_POINTS[index + 1]
              return next ? (
                <line key={`l-${index}`} x1={x} y1={y} x2={next[0]} y2={next[1]} />
              ) : null
            })}
            {STAR_POINTS.map(([x, y], index) => (
              <circle key={`c-${index}`} cx={x} cy={y} r={index === activeIndex % STAR_POINTS.length ? 1.5 : 0.9} className={index === activeIndex % STAR_POINTS.length ? 'lit' : ''} />
            ))}
          </svg>
          <div className="ls-words">
            {words.map((word, index) => (
              <span key={`${word}-${index}`} className={cx(index < spoken && 'lit')}>
                {word}
              </span>
            ))}
          </div>
        </div>
      )}

      {styleName === 'Terminal' && (
        <div className="lyric-terminal">
          <div className="lt-bar">
            <i />
            <i />
            <i />
            <span>lyrics — {track.title.toLowerCase().replaceAll(' ', '-')}.lrc</span>
          </div>
          <div className="lt-body">
            {lines.slice(Math.max(0, activeIndex - 3), activeIndex + 1).map((entry, index, list) => (
              <p key={entry.t} className={cx(index === list.length - 1 && 'now')}>
                <em>{String(entry.t).padStart(3, '0')}&nbsp;</em>
                <span>{entry.text}</span>
                {index === list.length - 1 && <b className="lt-caret" />}
              </p>
            ))}
          </div>
        </div>
      )}

      {styleName === 'Aura' && (
        <div className="lyric-aura">
          <div className="la-left">
            <Cover art={track.art} className="la-cover" />
            <b>{track.title}</b>
            <i>{track.artist}</i>
            <span className="la-line">
              <span style={{ width: `${(progress / track.duration) * 100}%` }} />
            </span>
          </div>
          <div className="la-right">
            {lines.slice(activeIndex, activeIndex + 4).map((entry, index) => (
              <p key={entry.t} className={cx(index === 0 && 'now')}>
                {entry.text}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function LyricsScreen() {
  return (
    <div className="scr scr-lyrics">
      <LyricStage styleName="Big words" full />
    </div>
  )
}
