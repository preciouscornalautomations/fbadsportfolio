const endpoint = (import.meta.env.VITE_LEAD_ENDPOINT ?? '').trim()
const KEY = 'viewCounted'

/** True when a Google Apps Script endpoint is configured, so visits can be counted. */
export const viewsEnabled = endpoint !== ''

let pending: Promise<number | null> | null = null

async function load(): Promise<number | null> {
  let counted = false
  try {
    counted = sessionStorage.getItem(KEY) === '1'
  } catch {
    /* storage blocked: treat as not counted yet */
  }

  try {
    const res = await fetch(`${endpoint}${endpoint.includes('?') ? '&' : '?'}action=${counted ? 'views' : 'hit'}`, {
      cache: 'no-store',
    })
    const data = (await res.json()) as { ok?: boolean; views?: number }
    if (!data.ok || typeof data.views !== 'number') return null
    try {
      sessionStorage.setItem(KEY, '1')
    } catch {
      /* ignore */
    }
    return data.views
  } catch {
    return null
  }
}

/**
 * Returns the live visit count from the Apps Script endpoint, or null if it can't be reached.
 * A visitor is counted once per browser session (reloads don't add to it).
 * The request is made once per page load and shared by everything that shows the count.
 */
export function fetchViews(): Promise<number | null> {
  if (!endpoint) return Promise.resolve(null)
  if (!pending) pending = load()
  return pending
}

export const formatViews = (n: number) => new Intl.NumberFormat('en-US').format(n)

/** "0 visits", "1 visit", "1,204 visits" */
export const visitsLabel = (n: number) => `${formatViews(n)} ${n === 1 ? 'visit' : 'visits'}`
