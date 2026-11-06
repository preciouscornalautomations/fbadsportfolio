import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  ex: number
  ey: number
  r: number
}

/**
 * Animated particle network. Dots drift, connect to neighbours with fading lines,
 * and link to the cursor in amber. Colors come from the CSS variables --p-* so
 * the light/dark themes restyle it.
 */
export function ParticleBackground() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const c = canvas.getContext('2d')
    if (!c) return
    const ctx: CanvasRenderingContext2D = c
    const cvs: HTMLCanvasElement = canvas

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const CFG = {
      density: 1 / 12000,
      densitySmall: 1 / 17000,
      min: 36,
      max: 120,
      speed: 0.32,
      radius: [0.8, 2] as const,
      linkDist: 140,
      linkDistSmall: 105,
      mouseDist: 180,
      repelDist: 90,
      dot: '141,179,255',
      mouseColor: '255,122,26',
      dotAlpha: 0.7,
      lineAlpha: 0.3,
    }

    function readTheme() {
      const cs = getComputedStyle(document.documentElement)
      const rgb = cs.getPropertyValue('--p-rgb').trim()
      const acc = cs.getPropertyValue('--p-accent').trim()
      const dot = parseFloat(cs.getPropertyValue('--p-dot'))
      const line = parseFloat(cs.getPropertyValue('--p-line'))
      if (rgb) CFG.dot = rgb.replace(/\s+/g, '')
      if (acc) CFG.mouseColor = acc.replace(/\s+/g, '')
      if (dot) CFG.dotAlpha = dot
      if (line) CFG.lineAlpha = line
    }
    readTheme()

    let w = 0
    let h = 0
    let linkDist = CFG.linkDist
    const parts: Particle[] = []
    const mouse = { x: -1e4, y: -1e4 }
    let raf = 0
    let last = 0
    let resizeTimer = 0

    const rand = (a: number, b: number) => a + Math.random() * (b - a)

    function make(): Particle {
      const a = Math.random() * Math.PI * 2
      const s = rand(0.35, 1) * CFG.speed
      return { x: rand(0, w), y: rand(0, h), vx: Math.cos(a) * s, vy: Math.sin(a) * s, ex: 0, ey: 0, r: rand(CFG.radius[0], CFG.radius[1]) }
    }

    function resize() {
      const nw = cvs.clientWidth
      const nh = cvs.clientHeight
      if (nw === w && nh === h && parts.length) return
      w = nw
      h = nh
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      cvs.width = Math.round(w * dpr)
      cvs.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const small = w < 640
      linkDist = small ? CFG.linkDistSmall : CFG.linkDist
      let target = Math.round(w * h * (small ? CFG.densitySmall : CFG.density))
      target = Math.max(CFG.min, Math.min(CFG.max, target))
      while (parts.length < target) parts.push(make())
      if (parts.length > target) parts.length = target
      if (reduceMotion) draw()
    }

    function update(k: number) {
      const rep2 = CFG.repelDist * CFG.repelDist
      for (const p of parts) {
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const d2 = dx * dx + dy * dy
        if (d2 < rep2 && d2 > 1) {
          const d = Math.sqrt(d2)
          const f = (1 - d / CFG.repelDist) * 0.06
          p.ex += (dx / d) * f
          p.ey += (dy / d) * f
        }
        p.x += (p.vx + p.ex) * k
        p.y += (p.vy + p.ey) * k
        p.ex *= 0.94
        p.ey *= 0.94
        if (p.x < -10) p.x = w + 10
        else if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        else if (p.y > h + 10) p.y = -10
      }
    }

    function draw() {
      const ld2 = linkDist * linkDist
      const md2 = CFG.mouseDist * CFG.mouseDist
      ctx.clearRect(0, 0, w, h)
      ctx.lineWidth = 1

      for (let i = 0; i < parts.length; i++) {
        const p = parts[i]
        for (let j = i + 1; j < parts.length; j++) {
          const q = parts[j]
          const dx = p.x - q.x
          if (dx > linkDist || dx < -linkDist) continue
          const dy = p.y - q.y
          const d2 = dx * dx + dy * dy
          if (d2 < ld2) {
            const a = (1 - Math.sqrt(d2) / linkDist) * CFG.lineAlpha
            ctx.strokeStyle = `rgba(${CFG.dot},${a.toFixed(3)})`
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        }
        const mx = p.x - mouse.x
        const my = p.y - mouse.y
        const md = mx * mx + my * my
        if (md < md2) {
          const a = (1 - Math.sqrt(md) / CFG.mouseDist) * 0.6
          ctx.strokeStyle = `rgba(${CFG.mouseColor},${a.toFixed(3)})`
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
      }

      ctx.fillStyle = `rgba(${CFG.dot},${CFG.dotAlpha})`
      ctx.beginPath()
      for (const p of parts) {
        ctx.moveTo(p.x + p.r, p.y)
        ctx.arc(p.x, p.y, p.r, 0, 6.2832)
      }
      ctx.fill()
    }

    function frame(t: number) {
      const k = Math.min((t - last) / 16.667, 3) // normalise to 60fps
      last = t
      update(k)
      draw()
      raf = requestAnimationFrame(frame)
    }

    function start() {
      if (reduceMotion || raf) return
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }
    function stop() {
      cancelAnimationFrame(raf)
      raf = 0
    }

    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(resize, 120)
    }
    const onVisibility = () => (document.hidden ? stop() : start())
    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onUp = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') mouse.x = mouse.y = -1e4
    }
    const onLeave = () => {
      mouse.x = mouse.y = -1e4
    }

    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerup', onUp)
    document.documentElement.addEventListener('mouseleave', onLeave)

    const mo = new MutationObserver(() => {
      readTheme()
      if (reduceMotion) draw()
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    resize()
    start()

    return () => {
      stop()
      clearTimeout(resizeTimer)
      mo.disconnect()
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return <canvas id="bg" ref={ref} aria-hidden="true" />
}
