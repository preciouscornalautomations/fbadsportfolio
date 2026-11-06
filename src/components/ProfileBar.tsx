import { site } from '../content/site'
import { visitsLabel } from '../lib/views'
import { ProfilePhoto } from './ProfilePhoto'
import { VerifiedBadge } from './VerifiedBadge'

/**
 * Profile header for phones and tablets (the sidebar carries the profile from 1024px up, see responsive.css).
 * Photo, name with verified tick, @handle and role, and the visit count.
 */
export function ProfileBar({ views }: { views: number | null }) {
  return (
    <header className="pbar" aria-label="Profile">
      <ProfilePhoto className="pbar__avatar" size={64} />
      <div className="pbar__text">
        <p className="pbar__name">
          <span>{site.name}</span>
          {site.verified && <VerifiedBadge />}
        </p>
        <p className="pbar__meta">
          <span className="nb">{site.handle}</span> <span aria-hidden="true">&middot;</span> <span className="nb">{site.role}</span>
        </p>
        {views !== null && (
          <p className="pbar__views" aria-live="polite">
            {visitsLabel(views)}
          </p>
        )}
      </div>
    </header>
  )
}
