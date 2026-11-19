import type { CSSProperties } from 'react'
import type { Art } from '../data'
import { cx } from '../lib/utils'

/** Vector album art: layered gradients + grain, no raster assets. */
export function Cover({
  art,
  title,
  className,
  style,
}: {
  art: Art
  title?: string
  className?: string
  style?: CSSProperties
}) {
  return (
    <span
      className={cx('cover', className)}
      style={
        {
          '--c1': art.from,
          '--c2': art.to,
          '--accent': art.accent,
          '--ang': `${art.angle}deg`,
          ...style,
        } as CSSProperties
      }
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      aria-label={title ? `${title} album art` : undefined}
    >
      <span className="cover-orb" />
      <span className="cover-ring" />
      <span className="cover-grain" />
    </span>
  )
}

export function Vinyl({
  art,
  className,
  spinning = true,
}: {
  art: Art
  className?: string
  spinning?: boolean
}) {
  return (
    <span
      className={cx('vinyl', spinning && 'spinning', className)}
      style={{ '--c1': art.from, '--c2': art.to, '--accent': art.accent } as CSSProperties}
      aria-hidden="true"
    >
      <span className="vinyl-label" />
      <span className="vinyl-hole" />
    </span>
  )
}
