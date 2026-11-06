import { toolGroups } from '../content/tools'
import { Icon } from './Icon'

export function Tools() {
  return (
    <section className="sec" id="tools" aria-labelledby="h-tools">
      <p className="eyebrow">Tools</p>
      <h2 id="h-tools">The tools I work with.</h2>
      <p className="sub">
        Meta's own tools for running and tracking ads, plus simple design and reporting tools that keep things clear for you.
      </p>

      <div className="panel">
        <div className="stack">
          {toolGroups.map((g) => (
            <div className="stack__group" key={g.title}>
              <h3>
                <Icon name={g.icon} />
                {g.title}
              </h3>
              <ul className="chips">
                {g.items.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
