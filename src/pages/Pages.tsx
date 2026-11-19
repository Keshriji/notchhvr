import { useState, type FormEvent, type ReactElement, type ReactNode } from 'react'
import { changelog } from '../content/site'
import { Icon } from '../components/Icons'

export type Theme = 'screen' | 'studio'

export type PageProps = {
  theme: Theme
  onTheme: () => void
  onBuy: () => void
  notify: (message: string) => void
}

function Nav({ onBuy }: { onBuy: () => void }) {
  return (
    <nav className="nav subnav" aria-label="Main">
      <a className="brand" href="#top">
        <span className="brand-icon" aria-hidden="true">
          <span />
        </span>
        <b>Notchhvr</b>
      </a>
      <div className="nav-links">
        <a href="#top">Overview</a>
        <a href="#inside">Inside</a>
        <a href="#studio">Make it yours</a>
        <a href="#/support">Support</a>
      </div>
      <div className="nav-actions">
        <a className="nav-page-link" href="#top">
          Back to site
        </a>
        <button type="button" className="btn btn-sm" onClick={onBuy}>
          Buy — $12.99
        </button>
      </div>
    </nav>
  )
}

function PageShell({
  kicker,
  title,
  lede,
  children,
  onBuy,
  narrow = false,
}: {
  kicker: string
  title: ReactNode
  lede: string
  children: ReactNode
  onBuy: () => void
  narrow?: boolean
}) {
  return (
    <div className="subpage">
      <Nav onBuy={onBuy} />
      <header className="subhead">
        <p className="eyebrow">{kicker}</p>
        <h1>{title}</h1>
        <p className="lede">{lede}</p>
      </header>
      <main id="submain" className={narrow ? 'submain narrow' : 'submain'}>
        {children}
      </main>
      <footer className="subfoot">
        <div>
          <a className="brand" href="#top">
            <span className="brand-icon" aria-hidden="true">
              <span />
            </span>
            <b>Notchhvr</b>
          </a>
          <p>A record player for your Mac. Made for macOS 14 and later.</p>
        </div>
        <div className="subfoot-links">
          <a href="#/download">Download</a>
          <a href="#/support">Support</a>
          <a href="#/changelog">Changelog</a>
          <a href="#/privacy">Privacy</a>
          <a href="#/terms">Terms</a>
          <a href="#/recover">Recover licence</a>
          <a href="#/affiliates">Affiliates</a>
        </div>
        <p className="subfoot-fine">© 2026 Notchhvr. A browser demo built for this exercise.</p>
      </footer>
    </div>
  )
}

export function DownloadPage({ onBuy, notify, theme, onTheme }: PageProps) {
  return (
    <PageShell
      kicker="Download"
      title={
        <>
          Download <em>Notchhvr.</em>
        </>
      }
      lede="One small app for the notch, the lock screen and the desktop. Free for three days, then a single purchase."
      onBuy={onBuy}
    >
      <section className="dl-card">
        <div className="dl-badge" aria-hidden="true">
          <span className="brand-icon big">
            <span />
          </span>
        </div>
        <div className="dl-main">
          <h2>Notchhvr 1.1.1</h2>
          <p className="dl-meta">24.8 MB · macOS 14 Sonoma or later · Apple silicon and Intel</p>
          <div className="dl-actions">
            <button
              type="button"
              className="btn"
              onClick={() => notify('This is a web demo, so there is no .dmg to install. Everything here runs in the browser.')}
            >
              <Icon name="download" size={17} /> Download for Mac
            </button>
            <button type="button" className="btn ghost" onClick={onBuy}>
              Buy a licence — $12.99
            </button>
          </div>
          <p className="dl-fine">Signed and notarised. Your licence is emailed and can be recovered at any time.</p>
        </div>
        <div className="dl-side">
          <div>
            <b>Version</b>
            <span>1.1.1</span>
          </div>
          <div>
            <b>Requires</b>
            <span>macOS 14+</span>
          </div>
          <div>
            <b>Trial</b>
            <span>3 days, full app</span>
          </div>
          <div>
            <b>Price</b>
            <span>$12.99 once</span>
          </div>
        </div>
      </section>

      <section className="sub-section">
        <h2>Three steps</h2>
        <ol className="steps">
          <li>
            <span>01</span>
            <div>
              <b>Open the disk image</b>
              <p>Double-click the .dmg and drag Notchhvr into Applications.</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <b>Launch it</b>
              <p>The island appears at the notch. On a Mac without a notch, it becomes a floating pill.</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <b>Pick your player</b>
              <p>Notchhvr follows Spotify or Apple Music automatically, whichever is playing.</p>
            </div>
          </li>
        </ol>
      </section>

      <section className="sub-section two-col">
        <div>
          <h2>Before you install</h2>
          <ul className="ticks">
            <li>
              <Icon name="check" size={13} /> macOS 14 Sonoma or later
            </li>
            <li>
              <Icon name="check" size={13} /> Spotify or Apple Music
            </li>
            <li>
              <Icon name="check" size={13} /> A connection, but only for lyrics and weather
            </li>
            <li>
              <Icon name="check" size={13} /> No account, no sign-in, no analytics
            </li>
          </ul>
        </div>
        <div className="sub-note">
          <h3>Not sure yet?</h3>
          <p>
            Try the full app for three days. When the trial ends the island keeps working for playback; lyrics,
            wallpapers and the desktop player unlock with a licence.
          </p>
          <div className="sub-note-actions">
            <button type="button" className="btn ghost btn-sm" onClick={onTheme}>
              <Icon name={theme === 'screen' ? 'moon' : 'sun'} size={15} />
              {theme === 'screen' ? 'Dark studio' : 'Light screen'}
            </button>
            <a className="link" href="#/support">
              Read support <Icon name="right" size={14} />
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  )
}

export function SupportPage({ onBuy }: PageProps) {
  return (
    <PageShell
      kicker="Support"
      title={
        <>
          Support<em>.</em>
        </>
      }
      lede="Most answers are one paragraph long. If yours isn't, write to a person."
      onBuy={onBuy}
    >
      <section className="contact-grid">
        <a className="contact-card" href="mailto:support@notchhvr.app?subject=Notchhvr%20support">
          <Icon name="sparkle" size={20} />
          <h2>Email</h2>
          <p>support@notchhvr.app</p>
          <span>Usually answered within a day.</span>
        </a>
        <div className="contact-card">
          <Icon name="keyboard" size={20} />
          <h2>Community</h2>
          <p>Discord, for tips and setups</p>
          <span>Invite links arrive with your licence email.</span>
        </div>
      </section>

      <section className="sub-section">
        <h2>Try this first</h2>
        <div className="fixes">
          <div>
            <b>The island never appears</b>
            <p>
              Open the menu bar item and choose “Show island”. If you use a docked Mac with an external display, pick
              the display you want it on — the pill shape is made for screens without a notch.
            </p>
          </div>
          <div>
            <b>No album art</b>
            <p>
              Artwork comes from your music service. Sign in to Spotify or Apple Music once and play a track; cached
              art appears after the first second.
            </p>
          </div>
          <div>
            <b>Lyrics are missing</b>
            <p>
              Lyrics are fetched from LRCLIB by title, artist and length. Instrumentals and very new releases are often
              not there yet. You can still use every other part of the app.
            </p>
          </div>
          <div>
            <b>My licence isn't recognised</b>
            <p>
              Paste the key exactly as it arrived, including the hyphens. If it still fails, use the recovery page and
              the email you bought with.
            </p>
          </div>
        </div>
      </section>

      <section className="sub-section">
        <h2>Still stuck?</h2>
        <div className="inline-links">
          <a className="btn ghost btn-sm" href="#/recover">
            Recover a licence
          </a>
          <a className="btn ghost btn-sm" href="#/changelog">
            What changed
          </a>
          <a className="btn ghost btn-sm" href="#/privacy">
            What leaves the Mac
          </a>
          <a className="btn ghost btn-sm" href="#/terms">
            Terms
          </a>
        </div>
      </section>
    </PageShell>
  )
}

export function ChangelogPage({ onBuy }: PageProps) {
  return (
    <PageShell
      kicker="Changelog"
      title={
        <>
          What's <em>new.</em>
        </>
      }
      lede="Every release, in plain language. Updates are free forever, including the next major version."
      onBuy={onBuy}
    >
      <div className="timeline">
        {changelog.map((entry) => (
          <article key={entry.version} className="release">
            <div className="release-side">
              <b>{entry.version}</b>
              <span>{entry.date}</span>
            </div>
            <ul>
              {entry.notes.map((note) => (
                <li key={note}>
                  <Icon name="check" size={13} /> {note}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="sub-note">
        <h3>Version numbers</h3>
        <p>
          The first number is a redesign, the second a feature, the third a fix. Your licence covers all of them, so
          there is nothing to renew.
        </p>
      </div>
    </PageShell>
  )
}

export function PrivacyPage({ onBuy }: PageProps) {
  return (
    <PageShell
      kicker="Privacy"
      title={
        <>
          Privacy<em>.</em>
        </>
      }
      lede="Notchhvr has no account, no analytics and no ads. This page lists everything that leaves your Mac, and nothing else does."
      onBuy={onBuy}
      narrow
    >
      <article className="prose">
        <h2 id="leaves">What leaves your Mac</h2>
        <h3>Lyrics</h3>
        <p>
          To show words with the song, Notchhvr sends the track's title, artist and length to LRCLIB, a public lyrics
          library, and receives the timed lines. Nothing about you, your library or your listening history is sent.
        </p>
        <h3>Weather</h3>
        <p>
          If you enable weather, Notchhvr sends either a city you typed or a location rounded to roughly a kilometre to
          MET Norway for the forecast. macOS turns the coordinates into a place name on your Mac. Turn weather off and
          no location is ever read.
        </p>
        <h3>Album art</h3>
        <p>
          Covers are loaded from your music service's own servers, exactly as the service would load them itself.
          Notchhvr does not proxy, copy or upload them anywhere.
        </p>
        <h3>Updates and licence checks</h3>
        <p>
          The app checks for a new version at most once a day, sending the version you run. Licence recovery sends the
          email address you type, so the key can be found and re-sent.
        </p>
        <h2 id="stays">What stays on your Mac</h2>
        <ul className="ticks">
          <li>
            <Icon name="check" size={13} /> Your listening diary, which is a local list of what you played
          </li>
          <li>
            <Icon name="check" size={13} /> Your wallpapers, layouts, palettes and lyric style
          </li>
          <li>
            <Icon name="check" size={13} /> Your licence key, in the Keychain
          </li>
          <li>
            <Icon name="check" size={13} /> Face Unlock data, if you use it, which never leaves the Secure Enclave
          </li>
        </ul>
        <h2 id="permissions">Permissions</h2>
        <p>
          None are required. Notchhvr reads what your music service is already publishing as the current track, so it
          never needs Accessibility, Screen Recording or Full Disk Access.
        </p>
        <h2 id="contact">Contact</h2>
        <p>
          Questions about any of this go to <a href="mailto:privacy@notchhvr.app">privacy@notchhvr.app</a>. There is no
          data to delete because none is collected.
        </p>
        <p className="prose-fine">Last updated November 2026. This page describes the browser demo as well as the Mac app.</p>
      </article>
    </PageShell>
  )
}

export function TermsPage({ onBuy }: PageProps) {
  return (
    <PageShell
      kicker="Terms"
      title={
        <>
          Terms<em>.</em>
        </>
      }
      lede="The agreement between you and Notchhvr. Plain language, one page."
      onBuy={onBuy}
      narrow
    >
      <article className="prose">
        <h2>1. The agreement</h2>
        <p>
          By installing or using Notchhvr you accept these terms. If you do not, do not install it, and ask for a
          refund within thirty days if you already bought a licence.
        </p>
        <h2>2. Your licence</h2>
        <p>
          A purchase gives you a personal, non-exclusive licence to run Notchhvr on Macs you own or control. One
          licence covers one person, on any number of their own Macs.
        </p>
        <h2>3. What you may not do</h2>
        <ul>
          <li>Sell, rent, sublicense or share your key.</li>
          <li>Redistribute the app or a modified build.</li>
          <li>Reverse engineer it, except where the law says you may.</li>
          <li>Remove notices of ownership from the app or its artwork.</li>
        </ul>
        <h2>4. The trial</h2>
        <p>
          The app runs fully featured for three days from first launch. Afterwards, playback, the island and the lock
          screen keep working; the desktop player, lyrics styles and wallpapers need a licence.
        </p>
        <h2>5. Payment and refunds</h2>
        <p>
          Payment is handled by our payment provider, which is the merchant of record and handles sales tax. Ask for a
          refund within thirty days by writing to support; no reason needed.
        </p>
        <h2>6. Updates</h2>
        <p>
          Updates are included, including the next major version. We may stop supporting macOS versions that Apple no
          longer updates.
        </p>
        <h2>7. Other services</h2>
        <p>
          Lyrics come from LRCLIB and weather from MET Norway. Those services are not ours, have their own terms, and
          can be unavailable. Spotify and Apple Music are trademarks of their owners; Notchhvr is not affiliated with
          either.
        </p>
        <h2>8. Ownership</h2>
        <p>
          Notchhvr, its name, its icon, its wallpapers and its code remain ours. Your music, artwork and listening
          history remain yours.
        </p>
        <h2>9. No warranty</h2>
        <p>
          The app is provided as is. It is a small app from a small studio, and it may contain mistakes.
        </p>
        <h2>10. Limitation of liability</h2>
        <p>
          To the extent the law allows, our total liability is what you paid for the licence. We are not liable for
          lost data, lost listening history or missed songs.
        </p>
        <h2>11. Your rights</h2>
        <p>
          Nothing here limits rights you have as a consumer under the law where you live.
        </p>
        <p className="prose-fine">Last updated November 2026. This is a demo document for the Notchhvr project.</p>
      </article>
    </PageShell>
  )
}

export function RecoverPage({ onBuy, notify }: PageProps) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function submit(event: FormEvent) {
    event.preventDefault()
    if (!email.includes('@') || email.length < 5) {
      setError('Enter the email address you bought with.')
      return
    }
    setError(null)
    setSent(true)
    notify('Demo only: no email was sent, but this is the flow the real page uses.')
  }

  return (
    <PageShell
      kicker="Recover"
      title={
        <>
          Recover your <em>licence.</em>
        </>
      }
      lede="Lost the email? Enter the address you bought with and the key is sent again."
      onBuy={onBuy}
      narrow
    >
      <div className="form-card">
        {sent ? (
          <div className="form-done">
            <span className="form-tick" aria-hidden="true">
              <Icon name="check" size={20} />
            </span>
            <h2>Check your inbox</h2>
            <p>
              If {email} has a licence, its key is on the way. Nothing arrived after ten minutes? Look in spam, then
              write to support.
            </p>
            <button type="button" className="btn ghost btn-sm" onClick={() => setSent(false)}>
              Use another address
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <label htmlFor="recover-email">Email address</label>
            <input
              id="recover-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
            />
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <button type="submit" className="btn">
              Send my key
            </button>
            <p className="form-fine">
              We only use this address to find a licence. Nothing is stored by this demo.
            </p>
          </form>
        )}
      </div>
      <div className="sub-note">
        <h3>Still stuck?</h3>
        <p>
          Bought with a different address, or a work email you no longer have? Write to{' '}
          <a href="mailto:support@notchhvr.app">support@notchhvr.app</a> with the approximate date of purchase and the
          last four characters of the key.
        </p>
      </div>
    </PageShell>
  )
}

export function AffiliatesPage({ onBuy, notify }: PageProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [where, setWhere] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function submit(event: FormEvent) {
    event.preventDefault()
    if (!name.trim() || !email.includes('@') || !where.trim()) {
      setError('Fill in your name, a valid email and where you would share it.')
      return
    }
    setError(null)
    setSent(true)
    notify('Demo only: the application stayed in this browser.')
  }

  return (
    <PageShell
      kicker="Affiliates"
      title={
        <>
          Earn 30% <em>per sale.</em>
        </>
      }
      lede="Write about Notchhvr, share a link, and keep 30% of every licence sold through it. No minimum, no exclusivity."
      onBuy={onBuy}
    >
      <section className="affirm-grid">
        <div className="affirm-stat">
          <b>30%</b>
          <span>of every licence, paid monthly</span>
        </div>
        <div className="affirm-stat">
          <b>90</b>
          <span>days of cookie-free attribution</span>
        </div>
        <div className="affirm-stat">
          <b>$0</b>
          <span>to join, and no minimum sales</span>
        </div>
      </section>

      <section className="sub-section">
        <h2>How it works</h2>
        <ol className="steps">
          <li>
            <span>01</span>
            <div>
              <b>Apply</b>
              <p>Tell us who you are and where you would share it. Most applications are answered in two days.</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <b>Get your link</b>
              <p>A short link and a dashboard with clicks, trials and sales. There is no minimum audience.</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <b>Get paid</b>
              <p>30% of each sale, paid monthly once you pass $20. Refunded orders are removed.</p>
            </div>
          </li>
        </ol>
      </section>

      <section className="sub-section two-col">
        <div>
          <h2>The rules, in short</h2>
          <ul className="ticks">
            <li>
              <Icon name="check" size={13} /> Say you are an affiliate, and don't pretend to be us.
            </li>
            <li>
              <Icon name="check" size={13} /> No bidding on our name in search ads.
            </li>
            <li>
              <Icon name="check" size={13} /> No coupon or key generators, no “free download” bait.
            </li>
            <li>
              <Icon name="check" size={13} /> Reviews must be your own words.
            </li>
          </ul>
        </div>
        <div className="form-card compact">
          {sent ? (
            <div className="form-done">
              <span className="form-tick" aria-hidden="true">
                <Icon name="check" size={20} />
              </span>
              <h3>You're in the queue</h3>
              <p>Thanks, {name.split(' ')[0] || 'friend'}. In the real product this would reach an inbox.</p>
              <button type="button" className="btn ghost btn-sm" onClick={() => setSent(false)}>
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <h3>Apply</h3>
              <label htmlFor="aff-name">Name</label>
              <input id="aff-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" />
              <label htmlFor="aff-email">Email</label>
              <input
                id="aff-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
              />
              <label htmlFor="aff-where">Where would you share it?</label>
              <input
                id="aff-where"
                value={where}
                onChange={(event) => setWhere(event.target.value)}
                placeholder="A newsletter, a channel, a blog…"
              />
              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}
              <button type="submit" className="btn">
                Apply
              </button>
            </form>
          )}
        </div>
      </section>
    </PageShell>
  )
}

export function NotFoundPage({ onBuy }: PageProps) {
  return (
    <PageShell
      kicker="404"
      title={
        <>
          That page isn't <em>here.</em>
        </>
      }
      lede="The link may be old, or the page may have moved. Everything else is one click away."
      onBuy={onBuy}
    >
      <div className="inline-links">
        <a className="btn ghost btn-sm" href="#top">
          Overview
        </a>
        <a className="btn ghost btn-sm" href="#/download">
          Download
        </a>
        <a className="btn ghost btn-sm" href="#/support">
          Support
        </a>
        <a className="btn ghost btn-sm" href="#/changelog">
          Changelog
        </a>
      </div>
    </PageShell>
  )
}

export const pageRoutes: Record<string, { title: string; render: (props: PageProps) => ReactElement }> = {
  download: { title: 'Download', render: (props) => <DownloadPage {...props} /> },
  support: { title: 'Support', render: (props) => <SupportPage {...props} /> },
  changelog: { title: 'Changelog', render: (props) => <ChangelogPage {...props} /> },
  privacy: { title: 'Privacy', render: (props) => <PrivacyPage {...props} /> },
  terms: { title: 'Terms', render: (props) => <TermsPage {...props} /> },
  recover: { title: 'Recover', render: (props) => <RecoverPage {...props} /> },
  affiliates: { title: 'Affiliates', render: (props) => <AffiliatesPage {...props} /> },
}

export function SiteLinks() {
  return (
    <section className="site-links">
      <div className="wrap">
        <div className="site-links-in">
          <div>
            <b>Everything else</b>
            <p>The pages that usually live in a footer, in one place.</p>
          </div>
          <div className="site-links-grid">
            <a href="#/download">
              <b>Download</b>
              <span>Version, requirements, trial</span>
            </a>
            <a href="#/support">
              <b>Support</b>
              <span>Quick fixes and contact</span>
            </a>
            <a href="#/changelog">
              <b>Changelog</b>
              <span>Every release</span>
            </a>
            <a href="#/privacy">
              <b>Privacy</b>
              <span>What leaves the Mac</span>
            </a>
            <a href="#/terms">
              <b>Terms</b>
              <span>The licence, in plain words</span>
            </a>
            <a href="#/recover">
              <b>Recover</b>
              <span>Find a lost licence</span>
            </a>
            <a href="#/affiliates">
              <b>Affiliates</b>
              <span>30% per sale</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
