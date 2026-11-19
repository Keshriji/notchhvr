import { useState } from 'react'
import { facts, featureGroups, faqs } from '../data'
import { usePlayer } from '../lib/player'
import { cx } from '../lib/utils'
import { Icon, type IconName } from './Icons'
import { Vinyl } from './Cover'
import { Reveal } from './Reveal'

export function AppIcon({ size = 44, className }: { size?: number; className?: string }) {
  return (
    <span className={cx('app-icon', className)} style={{ width: size, height: size }} aria-hidden="true">
      <span className="app-icon-ring r1" />
      <span className="app-icon-ring r2" />
      <span className="app-icon-label" />
    </span>
  )
}

export function Meet({ onBuy }: { onBuy: () => void }) {
  const { track } = usePlayer()
  return (
    <section className="meet" id="meet">
      <div className="wrap meet-grid">
        <Reveal className="meet-copy">
          <p className="brandline">
            <AppIcon size={38} />
            <span>Notchhvr</span>
            <b>v1.1.1</b>
          </p>
          <h2 className="wordmark">Notchhvr</h2>
          <p className="tagline">
            A record player, <em>for your Mac.</em>
          </p>
          <p className="lede">
            Your music in the notch, on the lock screen and on the desktop. For Spotify and Apple Music.
          </p>
          <div className="buy-row">
            <a className="btn" href="#get">
              <Icon name="download" size={17} /> Download for Mac
            </a>
            <button type="button" className="buy-price" onClick={onBuy}>
              <span>Purchase</span>
              <b>$12.99</b>
            </button>
          </div>
          <p className="fine">Free for 3 days. No card needed.</p>
          <ul className="meet-points">
            {['Notch, lock screen and desktop', 'Spotify and Apple Music', 'Pay once, updates free'].map((point) => (
              <li key={point}>
                <Icon name="check" size={14} /> {point}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="meet-visual" delay={120}>
          <div className="meet-disc">
            <Vinyl art={track.art} className="meet-vinyl" />
            <AppIcon size={104} className="meet-app-icon" />
          </div>
          <span className="float-pill p1">
            <Icon name="cloud" size={15} /> 14° in Berlin
          </span>
          <span className="float-pill p2">
            <Icon name="star" size={15} /> Stars
          </span>
          <span className="float-pill p3">
            <Icon name="airpods" size={15} /> AirPods 86%
          </span>
          <span className="meet-glow" aria-hidden="true" />
        </Reveal>
      </div>
    </section>
  )
}

export function Facts() {
  return (
    <section className="facts" id="facts" aria-label="Good to know">
      <div className="wrap">
        <Reveal>
          <h2 className="h3">Good to know.</h2>
        </Reveal>
        <ul className="fact-list">
          {facts.map((fact, index) => (
            <Reveal as="li" key={fact.title} delay={index * 60}>
              <Icon name={fact.icon as IconName} size={26} />
              <p>
                <b>{fact.title}</b> {fact.text}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

const faceCards = [
  {
    title: 'Kept in your Keychain.',
    text: 'The picture of your face that Notchhvr remembers, and your Mac password, stay in the Keychain.',
    icon: 'lock' as IconName,
  },
  {
    title: 'Nothing is saved.',
    text: 'Camera frames are never written to disk, never uploaded, never used to train anything.',
    icon: 'display' as IconName,
  },
  {
    title: 'Your call.',
    text: 'macOS asks before Notchhvr can use the camera, and you can switch it off at any time.',
    icon: 'sliders' as IconName,
  },
]

export function Everything() {
  return (
    <section className="everything" id="everything">
      <div className="wrap">
        <Reveal>
          <h2 className="h2 on-dark">
            Everything <em>Notchhvr does.</em>
          </h2>
        </Reveal>
        <div className="cols">
          {featureGroups.map((group, index) => (
            <Reveal key={group.group} delay={index * 80}>
              <h3>{group.group}</h3>
              <dl>
                {group.items.map((item) => (
                  <div key={item.name}>
                    <dt>{item.name}</dt>
                    <dd>{item.text}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="wrap face">
        <Reveal className="face-head">
          <span className="face-badge">
            <Icon name="sparkle" size={14} /> In beta
          </span>
          <h2 className="h2 on-dark">
            Face Unlock, <em>in beta.</em>
            <br />
            <em>Your face stays</em> on your Mac.
          </h2>
        </Reveal>
        <ul className="face-cards">
          {faceCards.map((card, index) => (
            <Reveal as="li" key={card.title} delay={index * 80}>
              <Icon name={card.icon} size={22} />
              <b>{card.title}</b>
              <p>{card.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="faq" id="faq">
      <div className="wrap faq-grid">
        <Reveal className="faq-head">
          <h2 className="h2">
            Questions &amp;
            <br />
            <em>answers.</em>
          </h2>
          <p className="lede">Still wondering about something? Write to us and a real person answers, usually the same day.</p>
          <div className="faq-actions">
            <a className="btn" href="#get">
              Get Notchhvr
            </a>
            <a className="btn ghost" href="#everything">
              See every feature
            </a>
          </div>
        </Reveal>

        <div className="faq-list">
          {faqs.map((item, index) => (
            <Reveal key={item.q} delay={Math.min(index, 4) * 40}>
              <div className={cx('faq-item', open === index && 'open')}>
                <button
                  type="button"
                  className="faq-q"
                  aria-expanded={open === index}
                  onClick={() => setOpen((current) => (current === index ? null : index))}
                >
                  <span>{item.q}</span>
                  <i className="faq-x">
                    <Icon name="plus" size={17} />
                  </i>
                </button>
                <div className="faq-a">
                  <div>
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Get({ onBuy, onDownload }: { onBuy: () => void; onDownload: () => void }) {
  return (
    <section className="get" id="get">
      <div className="wrap">
        <Reveal className="get-box">
          <span className="get-glow" aria-hidden="true" />
          <AppIcon size={92} className="get-icon" />
          <h2 className="h2">
            Every song, <em>as a record.</em>
          </h2>
          <p className="lede">Pay once and keep it. Every update is free.</p>
          <div className="buy-row centered">
            <button type="button" className="btn" onClick={onDownload}>
              <Icon name="download" size={17} /> Download for Mac
            </button>
            <button type="button" className="buy-price light" onClick={onBuy}>
              <span>Buy</span>
              <b>$12.99</b>
            </button>
          </div>
          <p className="fine">For any Mac with Apple silicon, notch or no notch, and macOS 14 or later.</p>
        </Reveal>
      </div>
    </section>
  )
}

export function Footer({ onBuy }: { onBuy: () => void }) {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-top">
          <a className="brand" href="#top">
            <AppIcon size={30} />
            <b>Notchhvr</b>
          </a>
          <nav className="foot-links" aria-label="Pages">
            <a href="#meet">Overview</a>
            <a href="#island">Island</a>
            <a href="#highlights">Highlights</a>
            <a href="#everything">Everything</a>
            <a href="#faq">Questions</a>
            <button type="button" onClick={onBuy}>
              Buy
            </button>
          </nav>
        </div>
        <div className="foot-mark" aria-hidden="true">
          Notchhvr
        </div>
        <div className="foot-bottom">
          <p>© 2026 Notchhvr. A front-end study, built from scratch.</p>
          <p>
            Made for the notch. <span className="foot-dot" /> No trackers, no account.
          </p>
        </div>
      </div>
    </footer>
  )
}

export function HighlightMacFramePlaceholder() {
  return null
}
