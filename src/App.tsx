import { About } from './components/About'
import { Creatives } from './components/Creatives'
import { Strategy } from './components/Strategy'
import { Contact } from './components/Contact'
import { Dock } from './components/Dock'
import { Hero } from './components/Hero'
import { ParticleBackground } from './components/ParticleBackground'
import { ProfileBar } from './components/ProfileBar'
import { Projects } from './components/Projects'
import { Services } from './components/Services'
import { Sidebar } from './components/Sidebar'
import { Testimonials } from './components/Testimonials'
import { ThemeButton } from './components/ThemeButton'
import { Tools } from './components/Tools'
import { navItems } from './content/nav'
import { usePageViews } from './hooks/usePageViews'
import { useScrollSpy } from './hooks/useScrollSpy'
import { useTheme } from './hooks/useTheme'

const sectionIds = navItems.map((n) => n.id)

export default function App() {
  const { theme, toggle } = useTheme()
  const current = useScrollSpy(sectionIds)
  const views = usePageViews()

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <ParticleBackground />

      <div className="app">
        <Sidebar current={current} theme={theme} onToggleTheme={toggle} views={views} />
        <main className="main" id="main">
          <ProfileBar views={views} />
          <Hero />
          <Projects />
          <Creatives />
          <Strategy />
          <Services />
          <Tools />
          <Testimonials />
          <About />
          <Contact />
        </main>
      </div>

      {/* Mobile: floating theme toggle + bottom dock */}
      <ThemeButton theme={theme} onToggle={toggle} className="round round--float js-theme" />
      <Dock current={current} />
    </>
  )
}
