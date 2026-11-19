import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { usePlayer } from '../lib/player'
import { Icon } from './Icons'
import { Island } from './Island'
import { MenuBar } from './MacFrame'
import { LyricStage, type LyricStyle } from './screens/Lyrics'
import { DesktopScreen, LockScreen } from './screens/MacScreens'
import { Cover, Vinyl } from './Cover'
import { KeysDemo } from './KeysDemo'
import { useNow } from './Reveal'

const lyricStyles: LyricStyle[] = ['Big words', 'Lens', 'Stars', 'Terminal', 'Aura']

export function Highlights() {
  const scroller = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [lyricStyle, setLyricStyle] = useState<LyricStyle>('Big words')
  const { track, progress } = usePlayer()
  const now = useNow(1200)

  const cards = 11

  useEffect(() => {
    if (paused) return
    const id = window.setInterval(() => {
      setIndex((current) => {
        const next = (current + 1) % cards
        const node = scroller.current
        const child = node?.children[next] as HTMLElement | undefined
        if (node && child) node.scrollTo({ left: child.offsetLeft - 24, behavior: 'smooth' })
        return next
      })
    }, 5200)
    return () => window.clearInterval(id)
  }, [paused])

  useEffect(() => {
    if (paused) return
    const id = window.setInterval(() => {
      setLyricStyle((current) => lyricStyles[(lyricStyles.indexOf(current) + 1) % lyricStyles.length])
    }, 4200)
    return () => window.clearInterval(id)
  }, [paused])

  useEffect(() => {
    const node = scroller.current
    if (!node) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const children = Array.from(node.children) as HTMLElement[]
        const middle = node.scrollLeft + node.clientWidth / 2
        let closest = 0
        let distance = Number.POSITIVE_INFINITY
        children.forEach((child, i) => {
          const center = child.offsetLeft + child.clientWidth / 2
          const delta = Math.abs(center - middle)
          if (delta < distance) {
            distance = delta
            closest = i
          }
        })
        setIndex(closest)
      })
    }
    node.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      node.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  function goTo(i: number) {
    const node = scroller.current
    const child = node?.children[i] as HTMLElement | undefined
    if (node && child) node.scrollTo({ left: child.offsetLeft - 24, behavior: 'smooth' })
    setIndex(i)
  }

  return (
    <section className="highlights" id="highlights">
      <div className="wrap io">
        <div className="highlights-head">
          <h2 className="h2">
            The <em>highlights.</em>
          </h2>
          <div className="reel-nav">
            <button type="button" onClick={() => goTo((index - 1 + cards) % cards)} aria-label="Previous highlight">
              <Icon name="left" size={17} />
            </button>
            <button type="button" onClick={() => goTo((index + 1) % cards)} aria-label="Next highlight">
              <Icon name="right" size={17} />
            </button>
          </div>
        </div>
      </div>

      <div className="reel" ref={scroller} tabIndex={0} aria-label="Feature highlights">
        <article className="card card-island">
          <p>
            <b>The island.</b> Your notch becomes the player: the song, the controls, the weather.
          </p>
          <div className="card-screen">
            <div className="mini-stage">
              <div className="stage-wall" style={{ '--c1': track.art.from, '--c2': track.art.to } as CSSProperties} />
              <MenuBar compact />
              <div className="mini-island">
                <Island look="needle" shape="notch" />
              </div>
            </div>
          </div>
        </article>

        <article className="card">
          <p>
            <b>Every word, on time.</b> Lyrics word by word, in five styles.
          </p>
          <div className="card-screen">
            <LyricStage styleName={lyricStyle} />
            <div className="card-chip">{lyricStyle}</div>
          </div>
        </article>

        <article className="card">
          <p>
            <b>Lock screen.</b> Play, pause and skip before you sign in, under a clock in glass.
          </p>
          <div className="card-screen card-lock">
            <LockScreen />
          </div>
        </article>

        <article className="card">
          <p>
            <b>A record on your desktop.</b> A turntable behind your windows, turning with the song.
          </p>
          <div className="card-screen card-desk">
            <DesktopScreen />
          </div>
        </article>

        <article className="card card-aura" style={{ '--a1': track.art.from, '--a2': track.art.to } as CSSProperties}>
          <p>
            <b>Aura.</b> The cover in a glow of its own colours, the player under it, the words beside it.
          </p>
          <div className="aura-art" aria-hidden="true">
            <span className="aura-bloom" />
            <Cover art={track.art} className="aura-cover" />
            <Vinyl art={track.art} className="aura-vinyl" />
            <span className="aura-words">
              <i>slow static</i>
              <b>{track.lyrics[0].text}</b>
            </span>
          </div>
        </article>

        <article className="card">
          <p>
            <b>Stars.</b> The words of the song, drawn as constellations in the album's colours.
          </p>
          <div className="card-screen">
            <LyricStage styleName="Stars" />
          </div>
        </article>

        <article className="card" style={{ '--a1': track.art.from, '--a2': track.art.to } as CSSProperties}>
          <p>
            <b>Sleeve.</b> The cover on your desktop, the record sliding out of it.
          </p>
          <div className="sleeve-art" aria-hidden="true">
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
        </article>

        <article className="card" style={{ '--a1': track.art.from, '--a2': track.art.to } as CSSProperties}>
          <p>
            <b>The art, full size.</b> Click the cover and it fills the lock screen, in its own colours.
          </p>
          <div className="big-art">
            <Cover art={track.art} className="big-art-cover" />
            <span className="big-art-clock">9:41</span>
            <span className="big-art-title">{track.title}</span>
          </div>
        </article>

        <article className="card card-keys">
          <p>
            <b>Hear every key.</b> Click the box and type. Each key sounds like a real keyboard, and Michael counts
            how fast you type.
          </p>
          <KeysDemo />
        </article>

        <article className="card">
          <p>
            <b>Make it yours.</b> Every part of Notchhvr, your way: the island, the lock screen, the desktop, the
            lyrics and the sounds.
          </p>
          <div className="custom-art" aria-hidden="true">
            <div className="custom-row">
              <span>Look</span>
              <div className="swatches">
                {['#f0b06a', '#7fb3d5', '#8f6fd8', '#30d158', '#0b0b0c', '#f5f5f7'].map((color) => (
                  <i key={color} style={{ background: color }} />
                ))}
              </div>
            </div>
            <div className="custom-row">
              <span>Lyrics</span>
              <div className="custom-pills">
                <b>Big</b>
                <b>Lens</b>
                <b className="on">Stars</b>
              </div>
            </div>
            <div className="custom-row">
              <span>Desktop</span>
              <div className="custom-toggle">
                <i className="on" />
                <em>Turntable</em>
              </div>
            </div>
          </div>
        </article>

        <article className="card card-glow">
          <p>
            <b>And there's more.</b> Beat Glow, AirPods in the island, painted wallpapers, and free updates every
            few days.
          </p>
          <div className="glow-art" aria-hidden="true">
            <span className="glow-frame">
              <span className="glow-inner">
                <b>Beat Glow</b>
                <i>a line of light, in time</i>
              </span>
            </span>
            <span className="glow-pods">
              <Icon name="airpods" size={18} />
              <span>
                <b>AirPods Pro</b>
                <i>86%</i>
              </span>
            </span>
          </div>
        </article>
      </div>

      <div className="wrap reel-foot">
        <div className="dots">
          {Array.from({ length: cards }, (_, i) => (
            <button key={i} type="button" aria-label={`Highlight ${i + 1}`} aria-current={index === i} onClick={() => goTo(i)}>
              <i />
            </button>
          ))}
        </div>
        <button type="button" className="reel-pause" onClick={() => setPaused((p) => !p)} aria-label={paused ? 'Play the highlights' : 'Pause the highlights'}>
          <Icon name={paused ? 'play' : 'pause'} size={14} />
          <span>{paused ? 'Play' : 'Pause'}</span>
        </button>
        <span className="reel-count">
          {String(index + 1).padStart(2, '0')} / {cards}
        </span>
      </div>
      <div className="reel-progress" aria-hidden="true">
        <span style={{ width: `${((progress + (now % 1000)) / track.duration) * 100}%` }} />
      </div>
    </section>
  )
}
