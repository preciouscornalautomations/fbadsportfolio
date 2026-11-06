import type { CSSProperties } from 'react'
import { site } from '../content/site'
import { FlowDiagram } from './FlowDiagram'
import { Icon, type IconName } from './Icon'

const rise = (i: number) => ({ '--i': i }) as CSSProperties

export function Hero() {
  const { hero } = site
  return (
    <section className="sec sec--hero" id="home" aria-labelledby="h-home">
      <p className="eyebrow rise" style={rise(0)}>
        {site.eyebrow}
      </p>
      <h1 id="h-home" className="rise" style={rise(1)}>
        {hero.title}
      </h1>
      <p className="lead rise" style={rise(2)}>
        {hero.lead}
      </p>
      <div className="actions rise" style={rise(3)}>
        <a className="btn" href="#contact">
          {hero.primaryCta}
        </a>
        <a className="btn btn--ghost" href="#projects">
          {hero.secondaryCta}
        </a>
      </div>

      <div className="live rise" style={rise(4)}>
        <p className="live__title">{hero.flowTitle}</p>
        <ul className="pills" aria-label="What the example uses">
          {hero.pills.map((p) => (
            <li key={p.label}>
              <Icon name={p.icon as IconName} />
              {p.label}
            </li>
          ))}
        </ul>
        <FlowDiagram />
      </div>
    </section>
  )
}
