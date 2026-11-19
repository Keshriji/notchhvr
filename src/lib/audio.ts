export type KeySound = 'office' | 'retro' | 'off'

let context: AudioContext | null = null

function audio(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!context) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctor) return null
    context = new Ctor()
  }
  if (context.state === 'suspended') void context.resume()
  return context
}

/** A short synthesised keyboard click — no audio files needed. */
export function keyClick(kind: KeySound): void {
  if (kind === 'off') return
  const ctx = audio()
  if (!ctx) return

  const now = ctx.currentTime
  const length = kind === 'retro' ? 0.09 : 0.045
  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0.0001, now)
  gain.gain.exponentialRampToValueAtTime(kind === 'retro' ? 0.16 : 0.1, now + 0.004)
  gain.gain.exponentialRampToValueAtTime(0.0001, now + length)
  gain.connect(ctx.destination)

  const click = ctx.createOscillator()
  click.type = kind === 'retro' ? 'triangle' : 'square'
  const base = kind === 'retro' ? 150 + Math.random() * 40 : 1900 + Math.random() * 900
  click.frequency.setValueAtTime(base, now)
  click.frequency.exponentialRampToValueAtTime(base * (kind === 'retro' ? 0.55 : 0.7), now + length)
  click.connect(gain)
  click.start(now)
  click.stop(now + length + 0.01)

  if (kind === 'retro') {
    const body = ctx.createOscillator()
    body.type = 'sine'
    body.frequency.setValueAtTime(92, now)
    body.frequency.exponentialRampToValueAtTime(58, now + 0.12)
    const bodyGain = ctx.createGain()
    bodyGain.gain.setValueAtTime(0.09, now)
    bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.13)
    body.connect(bodyGain).connect(ctx.destination)
    body.start(now)
    body.stop(now + 0.14)
  }
}
