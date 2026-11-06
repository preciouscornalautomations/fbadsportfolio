import type { SyntheticEvent } from 'react'
import { site } from '../content/site'
import { asset } from '../lib/assets'

/** Your photo, with a placeholder if the file is missing. Used by the sidebar and the mobile profile card. */
export function ProfilePhoto({ className, size }: { className: string; size: number }) {
  const onError = (e: SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    if (img.dataset.fallback) return // the fallback itself failed: stop, don't loop
    img.dataset.fallback = '1'
    img.src = asset(site.photoFallback)
  }
  return (
    <img
      className={className}
      src={asset(site.photo)}
      onError={onError}
      alt={`Portrait of ${site.name}`}
      width={size}
      height={size}
    />
  )
}
