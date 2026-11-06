import { useEffect, useRef, useState } from 'react'
import type { Project } from '../content/projects'
import { asset } from '../lib/assets'
import { Icon } from './Icon'

interface Props {
  project: Project | null
  onClose: () => void
}

function Img({ src, alt, className, w, h }: { src: string; alt: string; className: string; w?: number; h?: number }) {
  const [failed, setFailed] = useState(false)
  if (failed) return null
  return <img className={className} src={asset(src)} alt={alt} width={w} height={h} loading="lazy" onError={() => setFailed(true)} />
}

export function ProjectDialog({ project, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dlg = ref.current
    if (!dlg) return
    if (project && !dlg.open) {
      document.documentElement.classList.add('lock')
      dlg.showModal()
      dlg.scrollTop = 0
    }
  }, [project])

  return (
    <dialog
      className="dlg dlg--wide"
      id="dlg"
      ref={ref}
      aria-labelledby="dlgTitle"
      onClose={() => {
        document.documentElement.classList.remove('lock')
        onClose()
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) e.currentTarget.close() // click on the backdrop
      }}
    >
      <div className="dlg__in">
        <button className="round dlg__close" type="button" aria-label="Close" onClick={() => ref.current?.close()}>
          <Icon name="close" />
        </button>

        {project && (
          <>
            <p className="eyebrow eyebrow--sm">{project.kind}</p>
            <h3 id="dlgTitle">{project.title}</h3>
            <p className="dlg__note">Sample campaign · {project.brand} · illustrative figures</p>

            {project.image && (
              <Img key={project.image} className="dlg__cover" src={project.image} alt={`${project.title}: sample report`} w={1600} h={900} />
            )}

            <dl className="kpis kpis--lg">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <dt>{m.label}</dt>
                  <dd>{m.value}</dd>
                </div>
              ))}
            </dl>

            <dl className="dlg__list">
              <div>
                <dt>The brief</dt>
                <dd>{project.problem}</dd>
              </div>
              <div>
                <dt>What I did</dt>
                <dd>{project.built}</dd>
              </div>
              <div>
                <dt>Campaign setup</dt>
                <dd>
                  <ul className="ticks">
                    {project.setup.map((s) => (
                      <li key={s}>
                        <Icon name="check" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div className="dlg__result">
                <dt>Result</dt>
                <dd>{project.result}</dd>
              </div>
            </dl>

            {project.creatives && project.creatives.length > 0 && (
              <div className="dlg__ads">
                <p className="dlg__label">
                  {project.creativeLabels ? 'Ads in this test' : project.creatives.length > 1 ? 'Ads used (A/B test)' : 'Ad used'}
                </p>
                <div className={`dlg__adgrid${project.creatives.length > 1 ? ' is-two' : ''}`}>
                  {project.creatives.map((c, i) => (
                    <figure key={c}>
                      <Img className="dlg__ad" src={c} alt={`Sample ad ${i + 1} for ${project.brand}`} w={1080} h={1554} />
                      {project.creatives!.length > 1 && (
                        <figcaption>{project.creativeLabels?.[i] ?? `Version ${String.fromCharCode(65 + i)}`}</figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </div>
            )}

            <ul className="chips">
              {project.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </dialog>
  )
}
