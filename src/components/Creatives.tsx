import { useEffect, useRef, useState } from 'react'
import { creatives, type Creative } from '../content/creatives'
import { asset } from '../lib/assets'
import { Icon } from './Icon'

export function Creatives() {
  const [open, setOpen] = useState<Creative | null>(null)
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dlg = ref.current
    if (open && dlg && !dlg.open) {
      document.documentElement.classList.add('lock')
      dlg.showModal()
    }
  }, [open])

  return (
    <section className="sec" id="creatives" aria-labelledby="h-creatives">
      <p className="eyebrow">Ad creatives</p>
      <h2 id="h-creatives">Ads made to stop the scroll.</h2>
      <p className="sub">
        Sample ads I designed and wrote for fictional brands: one clear message, a strong hook and an obvious next
        step. Tap any ad to see it larger.
      </p>

      <div className="gallery">
        {creatives.map((c) => (
          <figure className="shot" key={c.image}>
            <button type="button" className="shot__btn" onClick={() => setOpen(c)} aria-label={`View larger: ${c.brand}, ${c.angle}`}>
              <img
                src={asset(c.image)}
                alt={`Sample Facebook ad for ${c.brand}: ${c.angle}`}
                width={1080}
                height={1554}
                loading="lazy"
              />
            </button>
            <figcaption>
              <span className="shot__fmt">{c.format}</span>
              <strong>{c.angle}</strong>
              <span>{c.brand}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <dialog
        className="dlg dlg--img"
        ref={ref}
        aria-label={open ? `${open.brand} ad` : 'Ad preview'}
        onClose={() => {
          document.documentElement.classList.remove('lock')
          setOpen(null)
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close()
        }}
      >
        <button className="round dlg__close" type="button" aria-label="Close" onClick={() => ref.current?.close()}>
          <Icon name="close" />
        </button>
        {open && <img src={asset(open.image)} alt={`Sample Facebook ad for ${open.brand}: ${open.angle}`} />}
      </dialog>
    </section>
  )
}
