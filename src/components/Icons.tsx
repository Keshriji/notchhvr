import type { ReactNode, SVGProps } from 'react'

export type IconName =
  | 'play'
  | 'pause'
  | 'next'
  | 'prev'
  | 'cloud'
  | 'rain'
  | 'sun'
  | 'moon'
  | 'down'
  | 'up'
  | 'left'
  | 'right'
  | 'volume'
  | 'expand'
  | 'collapse'
  | 'download'
  | 'lock'
  | 'chip'
  | 'display'
  | 'card'
  | 'close'
  | 'plus'
  | 'battery'
  | 'wifi'
  | 'search'
  | 'sliders'
  | 'airpods'
  | 'check'
  | 'sparkle'
  | 'shuffle'
  | 'repeat'
  | 'star'
  | 'keyboard'

const paths: Record<IconName, ReactNode> = {
  play: <path d="M7 4.8v14.4c0 .9 1 1.4 1.7.9l10.6-7.2a1 1 0 0 0 0-1.7L8.7 3.9c-.7-.5-1.7 0-1.7.9Z" fill="currentColor" stroke="none" />,
  pause: (
    <>
      <rect x="6.4" y="4" width="3.8" height="16" rx="1.4" fill="currentColor" stroke="none" />
      <rect x="13.8" y="4" width="3.8" height="16" rx="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  next: (
    <>
      <path d="M5 5.4v13.2c0 .8.9 1.3 1.6.8l9.2-6.6a1 1 0 0 0 0-1.6L6.6 4.6c-.7-.5-1.6 0-1.6.8Z" fill="currentColor" stroke="none" />
      <rect x="17.4" y="4.6" width="2.4" height="14.8" rx="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  prev: (
    <>
      <path d="M19 5.4v13.2c0 .8-.9 1.3-1.6.8L8.2 12.8a1 1 0 0 1 0-1.6l9.2-6.6c.7-.5 1.6 0 1.6.8Z" fill="currentColor" stroke="none" />
      <rect x="4.2" y="4.6" width="2.4" height="14.8" rx="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  cloud: <path d="M7.4 18.5h9.9a3.6 3.6 0 0 0 .3-7.2 5.3 5.3 0 0 0-10.1-1.2 4.2 4.2 0 0 0-.1 8.4Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />,
  rain: (
    <>
      <path d="M7.4 15.4h9.9a3.5 3.5 0 0 0 .3-7 5.2 5.2 0 0 0-9.9-1.2 4.1 4.1 0 0 0-.3 8.2Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8.6 18.2l-1 2.4M12 18.2l-1 2.4M15.4 18.2l-1 2.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4L17 7M7 17l-1.6 1.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  moon: <path d="M20 14.4A8.4 8.4 0 0 1 9.6 4a8.4 8.4 0 1 0 10.4 10.4Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />,
  down: <path d="M6 9.5l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />,
  up: <path d="M6 14.5l6-6 6 6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />,
  left: <path d="M14.5 5.5l-6 6.5 6 6.5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />,
  right: <path d="M9.5 5.5l6 6.5-6 6.5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />,
  volume: (
    <>
      <path d="M4 9.5h3.2L12 5.6v12.8L7.2 14.5H4z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M15.4 9.2a4 4 0 0 1 0 5.6M18 6.6a7.6 7.6 0 0 1 0 10.8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  expand: <path d="M9 4.5H4.5V9M15 4.5h4.5V9M20 15v4.5h-4.5M4.5 15v4.5H9" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
  collapse: <path d="M4.5 9H9V4.5M19.5 9H15V4.5M15 19.5V15h4.5M9 19.5V15H4.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
  download: (
    <>
      <path d="M12 3.8v10.4M7.7 10.4l4.3 4.3 4.3-4.3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.6 16.4v2.2a1.8 1.8 0 0 0 1.8 1.8h11.2a1.8 1.8 0 0 0 1.8-1.8v-2.2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  lock: (
    <>
      <rect x="4.6" y="10.4" width="14.8" height="10.4" rx="3" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 10.4V8a4 4 0 0 1 8 0v2.4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="12" cy="15.6" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  chip: (
    <>
      <rect x="6.4" y="6.4" width="11.2" height="11.2" rx="2.4" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <rect x="9.8" y="9.8" width="4.4" height="4.4" rx="1" fill="currentColor" stroke="none" />
      <path d="M9.4 3.4v3M12 3.4v3M14.6 3.4v3M9.4 17.6v3M12 17.6v3M14.6 17.6v3M3.4 9.4h3M3.4 12h3M3.4 14.6h3M17.6 9.4h3M17.6 12h3M17.6 14.6h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  display: (
    <>
      <path d="M4.4 5.2h15.2v11.2H4.4z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M2.6 16.4h18.8M12 16.4v3.4M8.8 20.2h6.4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </>
  ),
  card: (
    <>
      <rect x="2.8" y="5.2" width="18.4" height="13.6" rx="3" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M2.8 9.4h18.4" stroke="currentColor" strokeWidth="2.4" />
      <path d="M6.4 14.6h4.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </>
  ),
  close: <path d="M6.4 6.4l11.2 11.2M17.6 6.4L6.4 17.6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />,
  plus: <path d="M12 5.2v13.6M5.2 12h13.6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />,
  battery: (
    <>
      <rect x="2.6" y="7.6" width="16.4" height="8.8" rx="2.6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="4.6" y="9.6" width="11" height="4.8" rx="1.4" fill="currentColor" stroke="none" />
      <path d="M20.6 10.4v3.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  wifi: <path d="M2.8 8.8a13 13 0 0 1 18.4 0M6.1 12.1a8.3 8.3 0 0 1 11.8 0M9.4 15.4a3.7 3.7 0 0 1 5.2 0" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />,
  search: (
    <>
      <circle cx="10.8" cy="10.8" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M15.4 15.4l4.4 4.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </>
  ),
  sliders: (
    <>
      <path d="M4 7.4h16M4 16.6h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="9" cy="7.4" r="2.4" fill="var(--panel, #fff)" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="15.4" cy="16.6" r="2.4" fill="var(--panel, #fff)" stroke="currentColor" strokeWidth="1.7" />
    </>
  ),
  airpods: (
    <>
      <path d="M8.2 4.4c1.7 0 2.6 1.3 2.6 3v5.2c0 1-.7 1.7-1.6 1.7s-1.6-.8-1.6-1.7V8.9c-.9-.3-1.4-1-1.4-2.1 0-1.4.7-2.4 2-2.4ZM15.8 4.4c-1.7 0-2.6 1.3-2.6 3v5.2c0 1 .7 1.7 1.6 1.7s1.6-.8 1.6-1.7V8.9c.9-.3 1.4-1 1.4-2.1 0-1.4-.7-2.4-2-2.4Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9.2 14.6v3.2a1.6 1.6 0 0 0 3.2 0M14.8 14.6v3.2a1.6 1.6 0 0 0 3.2 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  check: <path d="M5 12.6l4.4 4.4L19 6.6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  sparkle: <path d="M12 3.2l1.9 5.3 5.3 1.9-5.3 1.9L12 17.6l-1.9-5.3L4.8 10.4l5.3-1.9z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />,
  shuffle: <path d="M3.6 7.2h3.1c1.2 0 2.3.6 3 1.6l3.8 5.6c.7 1 1.8 1.6 3 1.6h3.9M17.6 4.8l3 2.4-3 2.4M3.6 16.8h3.1c1.2 0 2.3-.6 3-1.6M17.6 14.8l3 2.4-3 2.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  repeat: <path d="M4.4 11.2V9.6a3 3 0 0 1 3-3h11.2M16.8 4.4l2.6 2.2-2.6 2.2M19.6 12.8v1.6a3 3 0 0 1-3 3H5.4M7.2 19.6l-2.6-2.2 2.6-2.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  star: <path d="M12 3.8l2.5 5.4 5.9.7-4.4 4 1.2 5.8-5.2-2.9-5.2 2.9L7.9 13.9l-4.3-4 5.9-.7z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />,
  keyboard: (
    <>
      <rect x="2.4" y="6" width="19.2" height="12" rx="2.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6 9.6h.01M9.4 9.6h.01M12.8 9.6h.01M16.2 9.6h.01M19 9.6h.01M6 12.8h.01M9.4 12.8h.01M12.8 12.8h.01M16.2 12.8h.01M19 12.8h.01M8 15.8h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
}

export function Icon({
  name,
  size = 20,
  ...rest
}: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false" {...rest}>
      {paths[name]}
    </svg>
  )
}
