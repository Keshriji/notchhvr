import { useEffect, useState } from 'react'
import { PlayerProvider, usePlayer } from './lib/player'
import { IslandPlayground } from './components/Hero'
import { ScrollHero } from './components/ScrollHero'
import { InsideScene } from './components/InsideScene'
import { Studio } from './components/Studio'
import { Everything, Facts, Faq, Footer, Get, Meet } from './components/Sections'
import { Highlights } from './components/Highlights'
import { BuyDialog } from './components/BuyDialog'
import { Icon } from './components/Icons'
import { NotFoundPage, SiteLinks, pageRoutes, type PageProps } from './pages/Pages'
import { cx } from './lib/utils'

type Theme = 'screen' | 'studio'

const HOME_TITLE = 'Notchhvr — a record player for your Mac'

function readTheme(): Theme {
  if (typeof window === 'undefined') return 'screen'
  const stored = window.localStorage.getItem('notchhvr-theme')
  if (stored === 'screen' || stored === 'studio') return stored
  return 'screen'
}

function readRoute(): string {
  const hash = window.location.hash
  return hash.startsWith('#/') ? hash.slice(2).replace(/\/+$/, '') : ''
}

function Page() {
  const [theme, setTheme] = useState<Theme>(readTheme)
  const [buyOpen, setBuyOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [scroll, setScroll] = useState(0)
  const [route, setRoute] = useState(readRoute)
  const player = usePlayer()

  const toggleTheme = () => setTheme((current) => (current === 'screen' ? 'studio' : 'screen'))

  useEffect(() => {
    const onHash = () => setRoute(readRoute())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('notchhvr-theme', theme)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'studio' ? '#0b0b0c' : '#c6d9ea')
  }, [theme])

  useEffect(() => {
    if (!route) {
      document.title = HOME_TITLE
      return
    }
    const page = pageRoutes[route]
    document.title = page ? `${page.title} — Notchhvr` : 'Not found — Notchhvr'
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [route])

  useEffect(() => {
    if (!toast) return
    const id = window.setTimeout(() => setToast(null), 4200)
    return () => window.clearTimeout(id)
  }, [toast])

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const height = document.documentElement.scrollHeight - window.innerHeight
        setScroll(height > 0 ? Math.min(1, window.scrollY / height) : 0)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const modalOpen = document.querySelector('dialog[open]') !== null
      const typing =
        target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable || modalOpen
      if (event.key === ' ' && !typing) {
        event.preventDefault()
        player.toggle()
      }
      if ((event.key === 't' || event.key === 'T') && !typing) {
        setTheme((current) => (current === 'screen' ? 'studio' : 'screen'))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [player])

  const pageProps: PageProps = {
    theme,
    onTheme: toggleTheme,
    onBuy: () => setBuyOpen(true),
    notify: (message: string) => setToast(message),
  }

  const overlays = (
    <>
      <div className={cx('toast', toast && 'on')} role="status" aria-live="polite">
        <Icon name="sparkle" size={16} />
        <span>{toast}</span>
      </div>
      <BuyDialog open={buyOpen} onClose={() => setBuyOpen(false)} />
    </>
  )

  if (route) {
    const page = pageRoutes[route]
    return (
      <>
        <a className="skip" href="#submain">
          Skip to content
        </a>
        {page ? page.render(pageProps) : <NotFoundPage {...pageProps} />}
        {overlays}
      </>
    )
  }

  return (
    <>
      <a className="skip" href="#meet">
        Skip to content
      </a>
      <div className="page-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${scroll})` }} />
      </div>

      <ScrollHero theme={theme} onTheme={toggleTheme} onBuy={() => setBuyOpen(true)} />
      <main>
        <Meet onBuy={() => setBuyOpen(true)} />
        <Facts />
        <IslandPlayground />
        <InsideScene />
        <Studio />
        <Highlights />
        <Everything />
        <Faq />
        <Get
          onBuy={() => setBuyOpen(true)}
          onDownload={() =>
            setToast('The Mac build lives in the mac/ folder of the repo — this button is the website demo.')
          }
        />
      </main>
      <SiteLinks />
      <Footer onBuy={() => setBuyOpen(true)} />

      {overlays}

      <div className="shortcut-hint" aria-hidden="true">
        <kbd>Space</kbd> play <kbd>T</kbd> theme
      </div>
    </>
  )
}

export default function App() {
  return (
    <PlayerProvider>
      <Page />
    </PlayerProvider>
  )
}
