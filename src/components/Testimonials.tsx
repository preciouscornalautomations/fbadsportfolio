import { useState } from 'react'
import { clients, testimonials, type Testimonial } from '../content/testimonials'
import { asset } from '../lib/assets'

function Avatar({ t }: { t: Testimonial }) {
  const [failed, setFailed] = useState(false)
  if (!t.avatar || failed) return null
  return <img className="quote__avatar" src={asset(t.avatar)} alt="" loading="lazy" onError={() => setFailed(true)} />
}

/** Hidden until real, approved client quotes are added in src/content/testimonials.ts. */
export function Testimonials() {
  if (testimonials.length === 0) return null
  return (
    <section className="sec" id="testimonials" aria-labelledby="h-testimonials">
      <p className="eyebrow">Testimonials</p>
      <h2 id="h-testimonials">What clients say.</h2>

      <div className="quotes">
        {testimonials.map((t, i) => (
          <figure className="quote" key={i}>
            <blockquote>{t.quote}</blockquote>
            <figcaption>
              <div className="quote__who">
                <Avatar t={t} />
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      {clients.length > 0 && (
        <ul className="clients" aria-label="Companies I have worked with">
          {clients.map((c) => (
            <li key={c.name}>
              <img src={asset(c.logo)} alt={c.name} loading="lazy" />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
