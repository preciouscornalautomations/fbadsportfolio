import { useState, type FormEvent } from 'react'
import { faqs } from '../content/faqs'
import { site } from '../content/site'
import { canSendForm, submitLead } from '../lib/submitLead'
import { Icon } from './Icon'

type Status = { text: string; kind: '' | 'ok' | 'error' }
type FieldName = 'name' | 'email' | 'message'

export function Contact() {
  const [status, setStatus] = useState<Status>({ text: '', kind: '' })
  const [sending, setSending] = useState(false)
  const [invalid, setInvalid] = useState<Partial<Record<FieldName, boolean>>>({})

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    if (data.get('website')) return // honeypot filled: a bot

    const value = (k: FieldName) => String(data.get(k) ?? '').trim()
    const lead = { name: value('name'), email: value('email'), message: value('message') }

    const missing = (Object.keys(lead) as FieldName[]).filter((k) => !lead[k])
    const emailInput = form.elements.namedItem('email') as HTMLInputElement
    const emailBad = !missing.includes('email') && !emailInput.checkValidity()

    setInvalid({
      name: missing.includes('name'),
      email: missing.includes('email') || emailBad,
      message: missing.includes('message'),
    })

    if (missing.length) {
      setStatus({ text: 'Fill in your name, email, and message.', kind: 'error' })
      ;(form.elements.namedItem(missing[0]) as HTMLElement | null)?.focus()
      return
    }
    if (emailBad) {
      setStatus({ text: 'Enter a valid email address.', kind: 'error' })
      ;(form.elements.namedItem('email') as HTMLElement | null)?.focus()
      return
    }

    setSending(true)
    setStatus({ text: '', kind: '' })
    const result = await submitLead(lead)
    setSending(false)

    if (!result.ok) {
      setStatus({
        text: site.email
          ? `Message not sent. Check your connection and try again, or email ${site.email}.`
          : 'Message not sent. Check your connection and try again, or message me on LinkedIn.',
        kind: 'error',
      })
      return
    }
    if (result.mode === 'mailto') {
      setStatus({ text: 'Opening your email app.', kind: 'ok' })
      return
    }
    form.reset()
    setStatus({ text: site.contact.successMessage, kind: 'ok' })
  }

  const { contact } = site

  return (
    <section className="sec" id="contact" aria-labelledby="h-contact">
      <p className="eyebrow">FAQs and contact</p>
      <h2 id="h-contact">{contact.title}</h2>
      <p className="sub">{contact.sub}</p>

      <div className="contact">
        <div className="faq">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}

          <ul className="links">
            {site.email && (
              <li>
                <a href={`mailto:${site.email}`}>
                  <Icon name="mail" />
                  {site.email}
                </a>
              </li>
            )}
            {site.bookingUrl && (
              <li>
                <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
                  <Icon name="calendar" />
                  {contact.bookingLabel}
                </a>
              </li>
            )}
            <li>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                <Icon name="linkedin" />
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        {!canSendForm && (
          <div className="form reach">
            <span className="reach__icon">
              <Icon name="linkedin" />
            </span>
            <h3>Let's talk about your ads</h3>
            <p>
              Send me a message on LinkedIn with three things: what you sell, your monthly ad budget, and the result you
              want (leads, bookings or sales). I'll reply within one business day with a few first ideas.
            </p>
            <ul className="ticks">
              <li>
                <Icon name="check" />
                Free 20-minute call to look at your current ads
              </li>
              <li>
                <Icon name="check" />
                A clear plan before any budget is spent
              </li>
              <li>
                <Icon name="check" />
                Weekly reports in plain English
              </li>
            </ul>
            <a className="btn" href={site.linkedin} target="_blank" rel="noopener noreferrer">
              {contact.linkedinLabel}
            </a>
          </div>
        )}

        {canSendForm && (
        <form className="form" onSubmit={onSubmit} noValidate>
          <div className="field">
            <label htmlFor="f-name">Your name</label>
            <input id="f-name" name="name" type="text" autoComplete="name" required aria-invalid={invalid.name || undefined} />
          </div>
          <div className="field">
            <label htmlFor="f-email">Email</label>
            <input id="f-email" name="email" type="email" autoComplete="email" required aria-invalid={invalid.email || undefined} />
          </div>
          <div className="field">
            <label htmlFor="f-msg">{contact.messageLabel}</label>
            <textarea id="f-msg" name="message" rows={5} required aria-invalid={invalid.message || undefined} />
          </div>
          <div className="hp" aria-hidden="true">
            <label htmlFor="f-site">Leave this field empty</label>
            <input id="f-site" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <button className="btn" type="submit" disabled={sending}>
            {sending ? 'Sending' : 'Send message'}
          </button>
          <p className={`form__status${status.kind ? ` is-${status.kind}` : ''}`} role="status" aria-live="polite">
            {status.text}
          </p>
        </form>
        )}
      </div>

      <p className="foot">
        &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
      </p>
    </section>
  )
}
