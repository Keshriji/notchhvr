import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icons'
import { AppIcon } from './Sections'

const includes = ['The island', 'Lock screen', 'Desktop record', 'Live lyrics', 'Beat Glow & more', 'Free updates']

function makeCode(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const chunk = () =>
    Array.from({ length: 4 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('')
  return `NTHV-${chunk()}-${chunk()}`
}

export function BuyDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState<string | null>(null)
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  // Escape closes the native dialog without going through React, which would
  // otherwise leave `open` true and swallow the Space/T shortcuts.
  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    const handleClose = () => closeRef.current()
    dialog.addEventListener('close', handleClose)
    return () => dialog.removeEventListener('close', handleClose)
  }, [])

  useEffect(() => {
    if (!open) {
      setCode(null)
      setEmail('')
    }
  }, [open])

  return (
    <dialog
      ref={ref}
      className="buy-dialog"
      aria-labelledby="buy-title"
      onClick={(event) => {
        if (event.target === ref.current) onClose()
      }}
    >
      <div className="buy-in">
        <button type="button" className="buy-close" onClick={onClose} aria-label="Close">
          <Icon name="close" size={18} />
        </button>

        <div className="buy-head">
          <span className="buy-rings" aria-hidden="true" />
          <AppIcon size={78} className="buy-icon" />
          <h2 id="buy-title">Notchhvr</h2>
          <p className="buy-sub">
            A record player, <span>for your Mac.</span>
          </p>
        </div>

        {code ? (
          <div className="buy-done">
            <span className="buy-done-ic">
              <Icon name="check" size={24} />
            </span>
            <h3>You&apos;re in.</h3>
            <p>A demo licence is ready. Real checkout would email this to you.</p>
            <code>{code}</code>
            <button type="button" className="btn" onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <form
            className="buy-body"
            noValidate
            onSubmit={(event) => {
              event.preventDefault()
              if (!email.trim()) return
              setCode(makeCode())
            }}
          >
            <p className="buy-price">
              <b>$12.99</b>
            </p>
            <p className="buy-once">One-time purchase. No subscription.</p>
            <ul className="buy-gets">
              {includes.map((item) => (
                <li key={item}>
                  <i>
                    <Icon name="check" size={12} />
                  </i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <label className="buy-label" htmlFor="buy-email">
              Email for your code
            </label>
            <input
              id="buy-email"
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
            <button className="btn buy-submit" type="submit">
              <span>Buy Notchhvr</span>
              <Icon name="right" size={17} />
            </button>
            <p className="buy-note">
              This is a front-end demo: no payment is taken and no card details are requested.
            </p>
          </form>
        )}

        <p className="buy-foot">
          On up to two of your Macs. <a href="#get" onClick={onClose}>Try it free for 3 days</a> first.
        </p>
      </div>
    </dialog>
  )
}
