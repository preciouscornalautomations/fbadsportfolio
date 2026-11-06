import { Fragment, useEffect, useState } from 'react'
import { flowSteps } from '../content/flow'
import { site } from '../content/site'
import { Icon } from './Icon'

type LinkState = 'idle' | 'run' | 'done'

const NODE_MS = 650
const LINK_MS = 800
const HOLD_MS = 2800

const count = flowSteps.length

/**
 * The animated hero workflow: a lead moves from node to node, then the loop restarts.
 * The layout adapts to its own width in CSS (container queries in global.css), so it
 * always fits: full size when wide, smaller nodes when narrower, a vertical timeline on phones.
 */
export function FlowDiagram() {
  const [on, setOn] = useState<boolean[]>(() => Array(count).fill(false))
  const [now, setNow] = useState(-1)
  const [links, setLinks] = useState<LinkState[]>(() => Array(count - 1).fill('idle'))

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOn(Array(count).fill(true))
      setNow(count - 1)
      setLinks(Array(count - 1).fill('done'))
      return
    }

    const timers: number[] = []
    const later = (fn: () => void, ms: number) => {
      timers.push(window.setTimeout(fn, ms))
    }

    const seq: ({ node: number } | { link: number })[] = []
    for (let k = 0; k < count; k++) {
      seq.push({ node: k })
      if (k < count - 1) seq.push({ link: k })
    }

    let i = 0
    const reset = () => {
      setOn(Array(count).fill(false))
      setNow(-1)
      setLinks(Array(count - 1).fill('idle'))
      i = 0
      later(step, 700)
    }
    const step = () => {
      const s = seq[i]
      let wait: number
      if ('node' in s) {
        setNow(s.node)
        setOn((prev) => prev.map((v, k) => v || k === s.node))
        wait = NODE_MS
      } else {
        const idx = s.link
        setLinks((prev) => prev.map((v, j) => (j === idx ? 'run' : v)))
        later(() => setLinks((prev) => prev.map((v, j) => (j === idx ? 'done' : v))), LINK_MS)
        wait = LINK_MS
      }
      i++
      if (i >= seq.length) later(reset, HOLD_MS)
      else later(step, wait)
    }

    later(step, 1200)
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div
      className="win"
      role="group"
      aria-label="Example workflow: a form submission becomes a booked call, a proposal, and a won deal"
    >
      <div className="win__bar">
        <span className="dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="win__title">{site.hero.flowWindowTitle}</span>
      </div>

      <div className="win__body">
        <ol className="nodes">
          {flowSteps.map((s, k) => (
            <Fragment key={s.title}>
              <li
                className={['node', k === count - 1 && 'node--win', on[k] && 'is-on', now === k && 'is-now']
                  .filter(Boolean)
                  .join(' ')}
              >
                <span className="node__icon">
                  <Icon name={s.icon} />
                </span>
                <strong>{s.title}</strong>
                <small>{s.caption}</small>
              </li>
              {k < count - 1 && (
                <li
                  className={['link', links[k] === 'run' && 'is-run', links[k] === 'done' && 'is-done']
                    .filter(Boolean)
                    .join(' ')}
                  aria-hidden="true"
                >
                  <span className="dot" />
                </li>
              )}
            </Fragment>
          ))}
        </ol>
      </div>
    </div>
  )
}
