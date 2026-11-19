import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { tracks, type Track } from '../data'

type Player = {
  track: Track
  index: number
  playing: boolean
  progress: number
  volume: number
  toggle: () => void
  play: () => void
  pause: () => void
  next: () => void
  prev: () => void
  seek: (value: number) => void
  setVolume: (value: number) => void
  select: (index: number) => void
}

const PlayerContext = createContext<Player | null>(null)

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(72)
  const [volume, setVolume] = useState(0.65)

  const track = tracks[index]

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % tracks.length)
    setProgress(0)
  }, [])

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + tracks.length) % tracks.length)
    setProgress(0)
  }, [])

  useEffect(() => {
    if (!playing) return
    const id = window.setInterval(() => {
      setProgress((p) => {
        if (p + 0.25 >= track.duration) {
          setIndex((i) => (i + 1) % tracks.length)
          return 0
        }
        return p + 0.25
      })
    }, 250)
    return () => window.clearInterval(id)
  }, [playing, track.duration])

  const value = useMemo<Player>(
    () => ({
      track,
      index,
      playing,
      progress,
      volume,
      toggle: () => setPlaying((p) => !p),
      play: () => setPlaying(true),
      pause: () => setPlaying(false),
      next,
      prev,
      seek: (value: number) => setProgress(Math.min(track.duration, Math.max(0, value))),
      setVolume: (value: number) => setVolume(Math.min(1, Math.max(0, value))),
      select: (i: number) => {
        setIndex(i)
        setProgress(0)
        setPlaying(true)
      },
    }),
    [track, index, playing, progress, volume, next, prev],
  )

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}

export function usePlayer(): Player {
  const context = useContext(PlayerContext)
  if (!context) throw new Error('usePlayer must be used inside PlayerProvider')
  return context
}
