import { useEffect, useState } from 'react'
import { site } from '../content/site'
import { fetchViews, viewsEnabled } from '../lib/views'

/**
 * Total visits for the profile header and sidebar.
 * - With a configured endpoint: the live count from Apps Script plus `viewsStart`
 *   (null until it loads, and null if it can't be reached, so a wrong number is never shown).
 * - Without one: `viewsStart`, which is 0 on a fresh site.
 */
export function usePageViews(): number | null {
  const [live, setLive] = useState<number | null>(null)
  useEffect(() => {
    if (!site.showViews || !viewsEnabled) return
    let alive = true
    fetchViews().then((n) => {
      if (alive && n !== null) setLive(n)
    })
    return () => {
      alive = false
    }
  }, [])
  if (!site.showViews) return null // counter hidden
  if (!viewsEnabled) return site.viewsStart
  return live === null ? null : live + site.viewsStart
}
