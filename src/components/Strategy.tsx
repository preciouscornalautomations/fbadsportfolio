import { hooks, pillars, testPlan, visuals } from '../content/strategy'
import { asset } from '../lib/assets'
import { Icon } from './Icon'

export function Strategy() {
  const { storyboard, report } = visuals
  return (
    <section className="sec" id="strategy" aria-labelledby="h-strategy">
      <p className="eyebrow">Creative strategy</p>
      <h2 id="h-strategy">Creative decisions, backed by the numbers.</h2>
      <p className="sub">
        How I come up with concepts, hooks and angles, decide what to test, and spot tired ads before they cost you.
        Examples use a fictional dog treat brand.
      </p>

      <div className="panel">
        <div className="pillars">
          {pillars.map((p) => (
            <article className="svc" key={p.title}>
              <span className="svc__icon">
                <Icon name={p.icon} />
              </span>
              <h4>{p.title}</h4>
              <p>{p.text}</p>
              <ul className="ticks">
                {p.points.map((pt) => (
                  <li key={pt}>
                    <Icon name="check" />
                    {pt}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="svc-head">
          <h3>Testing roadmap</h3>
          <p>Biggest levers first. One variable at a time.</p>
        </div>
        <div className="tplan" role="table" aria-label="Creative testing roadmap">
          <div className="tplan__row tplan__head" role="row">
            <span role="columnheader">#</span>
            <span role="columnheader">What I test</span>
            <span role="columnheader">Example</span>
            <span role="columnheader">I measure</span>
            <span role="columnheader">How a winner is picked</span>
          </div>
          {testPlan.map((t) => (
            <div className="tplan__row" role="row" key={t.stage}>
              <span className="tplan__n" role="cell">{t.stage}</span>
              <strong role="cell">{t.variable}</strong>
              <span role="cell" data-label="Example">{t.example}</span>
              <span role="cell" data-label="Measure" className="tplan__m">{t.measure}</span>
              <span role="cell" data-label="Winner">{t.rule}</span>
            </div>
          ))}
        </div>

        <div className="svc-head">
          <h3>Hook bank</h3>
          <p>Opening lines grouped by angle, ready to test on a winning concept.</p>
        </div>
        <div className="hooks">
          {hooks.map((h) => (
            <div className="hook" key={h.angle}>
              <p className="eyebrow eyebrow--sm">{h.angle}</p>
              <ul>
                {h.lines.map((l) => (
                  <li key={l}>&ldquo;{l}&rdquo;</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {[storyboard, report].map((v) => (
          <figure className="visual" key={v.image}>
            <div className="svc-head">
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
            <a href={asset(v.image)} target="_blank" rel="noopener noreferrer" aria-label={`Open full size: ${v.title}`}>
              <img src={asset(v.image)} alt={`Sample ${v.title.toLowerCase()}`} width={v.width} height={v.height} loading="lazy" />
            </a>
          </figure>
        ))}
      </div>
    </section>
  )
}
