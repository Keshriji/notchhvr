import { useEffect, useState } from 'react'
import { PlayerProvider, usePlayer } from './lib/player'
import { Hero, IslandPlayground } from './components/Hero'
import { Everything, Facts, Faq, Footer, Get, Meet } from './components/Sections'
import { Highlights } from './components/Highlights'
import { BuyDialog } from './components/BuyDialog'
import { Icon } from './components/Icons'
import { cx } from './lib/utils'

type Theme = 'screen' | 'studio'

function readTheme(): Theme {
  if (typeof window === 'undefined') return 'screen'
  const stored = window.localStorage.getItem('notchhvr-theme')
  if (stored === 'screen' || stored === 'studio') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'studio' : 'screen'
}

function Page() {
  const [theme, setTheme] = useState<Theme>(readTheme)
  const [buyOpen, setBuyOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [scroll, setScroll] = useState(0)
  const player = usePlayer()

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('notchhvr-theme', theme)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'studio' ? '#0b0b0c' : '#c6d9ea')
  }, [theme])

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
      const typing =
        target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable || buyOpen
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
  }, [player, buyOpen])

  return (
    <>
      <a className="skip" href="#meet">
        Skip to content
      </a>
      <div className="page-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${scroll})` }} />
      </div>

      <Hero theme={theme} onTheme={() => setTheme(theme === 'screen' ? 'studio' : 'screen')} onBuy={() => setBuyOpen(true)} />
      <main>
        <Meet onBuy={() => setBuyOpen(true)} />
        <Facts />
        <IslandPlayground />
        <Highlights />
        <Everything />
        <Faq />
        <Get onBuy={() => setBuyOpen(true)} onDownload={() => setToast('The Mac build is not part of this web demo — everything you see here runs in the browser.')} />
      </main>
      <Footer onBuy={() => setBuyOpen(true)} />

      <div className={cx('toast', toast && 'on')} role="status" aria-live="polite">
        <Icon name="sparkle" size={16} />
        <span>{toast}</span>
      </div>

      <div className="shortcut-hint" aria-hidden="true">
        <kbd>Space</kbd> play <kbd>T</kbd> theme
      </div>

      <BuyDialog open={buyOpen} onClose={() => setBuyOpen(false)} />
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
