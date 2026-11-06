import { useEffect, useState } from 'react'

/** Returns the id of the section currently in the middle of the viewport. */
export function useScrollSpy(ids: string[]) {
  const [current, setCurrent] = useState(ids[0] ?? '')

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setCurrent(e.target.id)
        })
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join('|')])

  return current
}
