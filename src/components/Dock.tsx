import { dockTabs } from '../content/nav'
import { Icon } from './Icon'

/** Bottom navigation bar shown on phones and tablets. */
export function Dock({ current }: { current: string }) {
  const [home, work, services, about] = dockTabs
  const tab = (t: (typeof dockTabs)[number]) => (
    <a key={t.id} href={`#${t.id}`} aria-current={t.covers.includes(current) ? 'location' : undefined}>
      <Icon name={t.icon} />
      <span>{t.label}</span>
    </a>
  )

  return (
    <nav className="dock" aria-label="Quick navigation">
      {tab(home)}
      {tab(work)}
      <a className="dock__fab" href="#contact" aria-label="Contact me">
        <Icon name="mail" />
      </a>
      {tab(services)}
      {tab(about)}
    </nav>
  )
}
