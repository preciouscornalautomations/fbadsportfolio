import { method, services } from '../content/services'
import { Icon } from './Icon'

export function Services() {
  return (
    <section className="sec" id="services" aria-labelledby="h-services">
      <p className="eyebrow">Services</p>
      <h2 id="h-services">Facebook and Instagram ads, managed end to end.</h2>
      <p className="sub">What I offer, how I work, and what you get each week.</p>

      <div className="panel">
        <div className="method">
          <div className="method__intro">
            <p className="eyebrow eyebrow--sm">{method.eyebrow}</p>
            <h3>
              {method.titleMain}
              <br />
              <span>{method.titleSub}</span>
            </h3>
            <p>{method.note}</p>
          </div>

          <ol className="method__steps">
            {method.steps.map((s, i) => (
              <li className="mini" key={s.title}>
                <span className="mini__n" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="mini__icon">
                  <Icon name={s.icon} />
                </span>
                <h4>{s.title}</h4>
                <p>{s.text}</p>
                <ul className="chips">
                  {s.chips.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>

        <div className="svc-head">
          <h3>What I can do for you</h3>
          <p>Pick one, or combine a few.</p>
        </div>

        <div className="svcs">
          {services.map((s) => (
            <article className="svc" key={s.title}>
              <span className="svc__icon">
                <Icon name={s.icon} />
              </span>
              <h4>{s.title}</h4>
              <p>{s.text}</p>
              <span className="badge">{s.badge}</span>
              <ul className="ticks">
                {s.points.map((pt) => (
                  <li key={pt}>
                    <Icon name="check" />
                    {pt}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
