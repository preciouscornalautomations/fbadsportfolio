import { Icon } from './Icon'

interface Props {
  theme: 'dark' | 'light'
  onToggle: () => void
  className?: string
}

export function ThemeButton({ theme, onToggle, className = 'round js-theme' }: Props) {
  return (
    <button
      className={className}
      type="button"
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={onToggle}
    >
      <Icon name="sun" className="i-sun" />
      <Icon name="moon" className="i-moon" />
    </button>
  )
}
