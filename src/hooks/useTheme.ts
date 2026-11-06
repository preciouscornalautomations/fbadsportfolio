import { useCallback, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

const read = (): Theme => (document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark')

/** Dark by default; the choice is remembered. index.html applies it before first paint. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(read)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#070b14' : '#f3f3ec')
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((t) => {
      const next: Theme = t === 'light' ? 'dark' : 'light'
      try {
        localStorage.setItem('theme', next)
      } catch {
        /* storage blocked: the theme still changes for this visit */
      }
      return next
    })
  }, [])

  return { theme, toggle }
}
