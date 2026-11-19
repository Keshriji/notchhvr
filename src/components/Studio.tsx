import { useState, type CSSProperties } from 'react'
import { diary, wallpapers } from '../content/site'
import { usePlayer } from '../lib/player'
import { cx } from '../lib/utils'
import { Icon } from './Icons'
import { Cover } from './Cover'

export function Studio() {
  const { track, playing, volume, setVolume, toggle } = usePlayer()
  const [wall, setWall] = useState(0)
  const [pods, setPods] = useState(true)
  const [glow, setGlow] = useState(true)
  const [brightness, setBrightness] = useState(72)

  const wallpaper = wallpapers[wall]

  return (
    <section className="studio" id="studio">
      <div className="wrap">
        <div className="studio-head">
          <h2 className="h2">
            Make it <em>yours.</em>
          </h2>
          <p className="lede">
            The island, the lock screen, the desktop, the lyrics and the sounds. Every part is yours to set.
          </p>
        </div>

        <div className="studio-grid">
          <div className="studio-preview">
            <div
              className="studio-screen"
              style={{
                background: `radial-gradient(120% 120% at 20% 0%, ${wallpaper.from}, ${wallpaper.to} 70%)`,
                filter: `brightness(${0.75 + brightness / 220})`,
              }}
            >
              <div className="studio-menubar">
                <span />
                <b>Finder</b>
                <i>Thu 9:41</i>
              </div>
              <span className="studio-notch" />
              <div className="studio-island">
                <Cover art={track.art} className="studio-cover" />
                <span className="studio-meta">
                  <b>{track.title}</b>
                  <i>{track.artist}</i>
                </span>
                <span className={cx('eq', playing && 'on')} aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
              </div>
              <div className="studio-lock">
                <span>9:41</span>
                <div className="studio-player">
                  <Cover art={track.art} className="studio-player-cover" />
                  <div>
                    <b>{track.title}</b>
                    <i>{track.artist}</i>
                    <span className="studio-line">
                      <span style={{ width: '38%' }} />
                    </span>
                  </div>
                  <button type="button" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>
                    <Icon name={playing ? 'pause' : 'play'} size={16} />
                  </button>
                </div>
              </div>
              {glow && <span className="studio-glow" aria-hidden="true" />}
            </div>
            <div className="studio-controls">
              <div className="seg">
                <span className="seg-label">Wallpaper</span>
                <div className="seg-track">
                  <button type="button" className={wall === 0 ? 'on' : ''} onClick={() => setWall(0)}>
                    Low Sun
                  </button>
                  <button type="button" className={wall === 2 ? 'on' : ''} onClick={() => setWall(2)}>
                    Night Mail
                  </button>
                  <button type="button" className={wall === 9 ? 'on' : ''} onClick={() => setWall(9)}>
                    Tide
                  </button>
                </div>
              </div>
              <div className="studio-sliders">
                <label>
                  <Icon name="volume" size={15} />
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={Math.round(volume * 100)}
                    onChange={(event) => setVolume(Number(event.target.value) / 100)}
                    aria-label="Volume"
                    style={{ '--pct': `${volume * 100}%` } as CSSProperties}
                  />
                </label>
                <label>
                  <Icon name="sun" size={15} />
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={brightness}
                    onChange={(event) => setBrightness(Number(event.target.value))}
                    aria-label="Brightness"
                    style={{ '--pct': `${brightness}%` } as CSSProperties}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="studio-side">
            <div className="studio-panel">
              <h3>Painted wallpapers</h3>
              <p>Ninety paintings, sized for your display. Twelve of them:</p>
              <div className="wall-grid">
                {wallpapers.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    aria-label={item.name}
                    aria-pressed={wall === index}
                    className={cx('wall', wall === index && 'on')}
                    style={{ background: `linear-gradient(150deg, ${item.from}, ${item.to})` }}
                    onClick={() => setWall(index)}
                  />
                ))}
              </div>
            </div>

            <div className="studio-panel">
              <h3>Small things</h3>
              <div className="studio-toggle-row">
                <div>
                  <b>AirPods in the island</b>
                  <i>Connect, then show their battery</i>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={pods}
                  className={cx('switch', pods && 'on')}
                  onClick={() => setPods(!pods)}
                >
                  <i />
                </button>
              </div>
              <div className="studio-toggle-row">
                <div>
                  <b>Beat Glow</b>
                  <i>A line of light, in time with the song</i>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={glow}
                  className={cx('switch', glow && 'on')}
                  onClick={() => setGlow(!glow)}
                >
                  <i />
                </button>
              </div>
              {pods && (
                <div className="studio-pods">
                  <Icon name="airpods" size={18} />
                  <span>
                    <b>AirPods Pro</b>
                    <i>Connected</i>
                  </span>
                  <span className="studio-batt">
                    <i style={{ width: '86%' }} />
                  </span>
                  <b className="studio-pct">86%</b>
                </div>
              )}
            </div>

            <div className="studio-panel">
              <h3>Listening diary</h3>
              <p>What you played, kept on this Mac.</p>
              <ul className="diary">
                {diary.map((entry) => (
                  <li key={`${entry.day}-${entry.title}`}>
                    <span>{entry.day}</span>
                    <b>{entry.title}</b>
                    <i>{entry.artist}</i>
                    <em>{entry.plays}×</em>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
