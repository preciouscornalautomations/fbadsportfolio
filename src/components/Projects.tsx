import { useState } from 'react'
import { filters, projects, type Category, type Project } from '../content/projects'
import { asset } from '../lib/assets'
import { Icon } from './Icon'
import { ProjectDialog } from './ProjectDialog'

function Cover({ p }: { p: Project }) {
  const [failed, setFailed] = useState(false)
  if (!p.image || failed) return null
  return (
    <img
      className="wcard__img"
      src={asset(p.image)}
      alt={`${p.title}: ad preview and sample results`}
      width={1600}
      height={900}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

export function Projects() {
  const [filter, setFilter] = useState<'all' | Category>('all')
  const [open, setOpen] = useState<Project | null>(null)

  const visible = projects.filter((p) => filter === 'all' || p.category === filter)

  return (
    <section className="sec" id="projects" aria-labelledby="h-projects">
      <p className="eyebrow">Sample work</p>
      <h2 id="h-projects">Campaigns, and the numbers behind them.</h2>
      <p className="sub">
        Sample campaigns built on fictional brands with illustrative figures, to show how I plan, run and report
        Facebook and Instagram ads. Open a card for the full breakdown.
      </p>

      <div className="tabs" role="group" aria-label="Filter sample work">
        {filters.map((f) => (
          <button
            key={f.id}
            className="tab"
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="panel">
        <div className="wcards">
          {visible.map((p) => (
            <article className="wcard" key={p.id}>
              <Cover p={p} />
              <div className="wcard__body">
                <p className="eyebrow eyebrow--sm">
                  <Icon name={p.icon} />
                  {p.kind}
                </p>
                <h3>{p.title}</h3>
                <p className="wcard__sum">{p.summary}</p>
                <dl className="kpis">
                  {p.metrics.map((m) => (
                    <div key={m.label}>
                      <dt>{m.label}</dt>
                      <dd>{m.value}</dd>
                    </div>
                  ))}
                </dl>
                <button
                  className="wcard__btn"
                  type="button"
                  aria-label={`See the full breakdown: ${p.title}`}
                  onClick={() => setOpen(p)}
                >
                  See the breakdown
                  <Icon name="arrow" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <ProjectDialog project={open} onClose={() => setOpen(null)} />
    </section>
  )
}
