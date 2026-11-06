import { site } from '../content/site'

export function About() {
  const { about } = site
  return (
    <section className="sec" id="about" aria-labelledby="h-about">
      <p className="eyebrow">About</p>
      <h2 id="h-about">{about.title}</h2>

      <div className="about">
        <div className="about__text">
          {about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <dl className="facts">
          {about.facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
