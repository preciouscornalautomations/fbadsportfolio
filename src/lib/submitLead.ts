import { site } from '../content/site'

export interface Lead {
  name: string
  email: string
  message: string
}

export type SubmitResult = { ok: true; mode: 'endpoint' | 'mailto' } | { ok: false }

const endpoint = (import.meta.env.VITE_LEAD_ENDPOINT ?? '').trim()
const token = (import.meta.env.VITE_LEAD_TOKEN ?? '').trim()

/** True when the form can deliver a message: a lead endpoint, or an email for the mail-app fallback. */
export const canSendForm = Boolean(endpoint || site.email)

/**
 * Sends a lead to your Google Apps Script endpoint (see apps-script/Code.gs), which emails it to your Gmail.
 * With no endpoint configured, it falls back to opening the visitor's email app.
 *
 * The request uses mode "no-cors" with a text/plain body, which Apps Script accepts without
 * a preflight. The browser can't read the reply, so a request that doesn't throw counts as sent.
 */
export async function submitLead(lead: Lead): Promise<SubmitResult> {
  if (!endpoint) {
    const subject = encodeURIComponent(`Project enquiry from ${lead.name}`)
    const body = encodeURIComponent(`${lead.message}\n\n${lead.name}\n${lead.email}`)
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
    return { ok: true, mode: 'mailto' }
  }

  try {
    await fetch(endpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        ...lead,
        token,
        page: window.location.href,
        sentAt: new Date().toISOString(),
      }),
    })
    return { ok: true, mode: 'endpoint' }
  } catch {
    return { ok: false }
  }
}
