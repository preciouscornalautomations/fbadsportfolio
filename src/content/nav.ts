import type { IconName } from '../components/Icon'

export const navItems: { id: string; label: string; icon: IconName }[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'projects', label: 'Sample work', icon: 'folder' },
  { id: 'creatives', label: 'Ad creatives', icon: 'image' },
  { id: 'strategy', label: 'Creative strategy', icon: 'bulb' },
  { id: 'services', label: 'Services', icon: 'layers' },
  { id: 'tools', label: 'Tools', icon: 'toolbox' },
  { id: 'about', label: 'About', icon: 'user' },
  { id: 'contact', label: 'FAQs and contact', icon: 'chat' },
]

/** Which mobile dock tab lights up for each section. */
export const dockTabs: { id: string; label: string; icon: IconName; covers: string[] }[] = [
  { id: 'home', label: 'Home', icon: 'home', covers: ['home'] },
  { id: 'projects', label: 'Work', icon: 'folder', covers: ['projects', 'creatives', 'strategy'] },
  { id: 'services', label: 'Services', icon: 'layers', covers: ['services', 'tools'] },
  { id: 'about', label: 'About', icon: 'user', covers: ['about', 'contact'] },
]
