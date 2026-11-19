import { useRef, useState } from 'react'
import { keyClick, type KeySound } from '../lib/audio'
import { cx } from '../lib/utils'
import { Icon } from './Icons'

export function KeysDemo() {
  const [text, setText] = useState('')
  const [sound, setSound] = useState<KeySound>('office')
  const [wpm, setWpm] = useState(0)
  const [typing, setTyping] = useState(false)
  const start = useRef<number | null>(null)
  const timer = useRef<number | null>(null)

  function register() {
    const now = performance.now()
    if (start.current === null) start.current = now
    const minutes = Math.max(1 / 60, (now - start.current) / 60000)
    if (timer.current) window.clearTimeout(timer.current)
    setTyping(true)
    timer.current = window.setTimeout(() => setTyping(false), 420)
    setText((current) => {
      const words = current.trim() ? current.trim().split(/\s+/).length : 0
      setWpm(Math.min(180, Math.round(words / minutes)))
      return current
    })
  }

  return (
    <div className="keys" data-typing={typing}>
      <div className="keys-top">
        <span className="michael" aria-hidden="true">
          <span className="michael-face">
            <i />
            <i />
            <b />
          </span>
          <span className="michael-cap" />
        </span>
        <div className="keys-speed">
          <b>{wpm}</b>
          <span>words a minute</span>
        </div>
        <span className="keys-badge">
          <Icon name="keyboard" size={15} />
          Michael
        </span>
      </div>

      <label className="keys-label" htmlFor="key-demo">
        Type here to hear the keys
      </label>
      <textarea
        id="key-demo"
        className="keys-input"
        rows={3}
        value={text}
        placeholder="Click here and type something…"
        spellCheck={false}
        autoComplete="off"
        autoCapitalize="off"
        onChange={(event) => {
          setText(event.target.value)
          register()
          keyClick(sound)
        }}
      />

      <div className="keys-sounds" role="radiogroup" aria-label="Key sound">
        {(['office', 'retro', 'off'] as KeySound[]).map((kind) => (
          <button
            key={kind}
            type="button"
            role="radio"
            aria-checked={sound === kind}
            className={cx(sound === kind && 'on')}
            onClick={() => setSound(kind)}
          >
            {kind === 'office' ? 'Office' : kind === 'retro' ? 'Retro' : 'Off'}
          </button>
        ))}
      </div>
    </div>
  )
}
