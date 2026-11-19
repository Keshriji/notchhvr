import type { ReactNode } from 'react'
import { Icon } from './Icons'
import { cx } from '../lib/utils'

export function MenuBar({ title = 'Finder', compact = false }: { title?: string; compact?: boolean }) {
  return (
    <div className={cx('menubar', compact && 'is-compact')} aria-hidden="true">
      <div className="menubar-left">
        <span className="menubar-mark">
          <svg viewBox="0 0 24 24">
            <path d="M12 6.2c-3.6 0-6.4 2.5-6.4 6s2.8 6 6.4 6 6.4-2.5 6.4-6-2.8-6-6.4-6Z" fill="currentColor" />
            <path d="M12.6 5.6c.3-1.3 1.3-2.2 2.6-2.4-.1 1.4-1.1 2.4-2.6 2.4Z" fill="currentColor" />
          </svg>
        </span>
        <b>{title}</b>
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Go</span>
        <span>Window</span>
        <span>Help</span>
      </div>
      <div className="menubar-right">
        <Icon name="battery" size={18} />
        <Icon name="wifi" size={16} />
        <Icon name="search" size={14} />
        <span className="menubar-time">Thu 9:41</span>
      </div>
    </div>
  )
}

export function MacFrame({
  children,
  className,
  label,
}: {
  children: ReactNode
  className?: string
  label?: string
}) {
  return (
    <div className={cx('mac', className)} role={label ? 'img' : undefined} aria-label={label}>
      <div className="mac-lid">
        <div className="mac-bezel">
          <div className="mac-screen">{children}</div>
        </div>
        <span className="mac-notch" aria-hidden="true" />
        <span className="mac-shine" aria-hidden="true" />
      </div>
      <div className="mac-base" aria-hidden="true">
        <span className="mac-groove" />
        <span className="mac-foot" />
      </div>
    </div>
  )
}
