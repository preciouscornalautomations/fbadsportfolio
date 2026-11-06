import { navItems } from '../content/nav'
import { site } from '../content/site'
import { visitsLabel } from '../lib/views'
import { Icon } from './Icon'
import { ProfilePhoto } from './ProfilePhoto'
import { ThemeButton } from './ThemeButton'
import { VerifiedBadge } from './VerifiedBadge'

interface Props {
  current: string
  theme: 'dark' | 'light'
  onToggleTheme: () => void
  views: number | null
}

export function Sidebar({ current, theme, onToggleTheme, views }: Props) {
  return (
    <aside className="side" aria-label="Profile and navigation">
      <div className="side__top">
        <ProfilePhoto className="avatar" size={148} />
        <p className="side__name">
          <span>{site.name}</span>
          {site.verified && <VerifiedBadge />}
        </p>
        <p className="side__role">
          <span className="nb">{site.handle}</span> <span aria-hidden="true">&middot;</span> <span className="nb">{site.role}</span>
        </p>
        {views !== null && <p className="side__views">{visitsLabel(views)}</p>}

        <div className="social">
          <a className="round" href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Icon name="linkedin" />
          </a>
          {site.email && (
            <a className="round" href={`mailto:${site.email}`} aria-label="Email">
              <Icon name="mail" />
            </a>
          )}
          {site.bookingUrl && (
            <a className="round" href={site.bookingUrl} target="_blank" rel="noopener noreferrer" aria-label="Book a call">
              <Icon name="calendar" />
            </a>
          )}
          <ThemeButton theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>

      <nav className="side__nav" aria-label="Sections">
        {navItems.map((item) => (
          <a key={item.id} href={`#${item.id}`} aria-current={current === item.id ? 'location' : undefined}>
            <Icon name={item.icon} />
            {item.label}
          </a>
        ))}
      </nav>

      <p className="side__foot">
        &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
      </p>
    </aside>
  )
}
