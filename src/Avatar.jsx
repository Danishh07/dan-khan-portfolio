import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { P } from './data'
import { RM } from './tint'

/* A browser-window-headed character. Three.js loads lazily after first paint, on large screens only. */
export default function Avatar() {
  const cv = useRef(null)
  useEffect(() => {
    if (RM) return
    let dead = false, cleanup = () => {}
    const boot = async () => {
      const T = await import('three')
      if (dead || !cv.current) return
      const el = cv.current
      let W = el.clientWidth, H = el.clientHeight
      const r = new T.WebGLRenderer({ canvas: el, alpha: true, antialias: true })
      r.setPixelRatio(Math.min(devicePixelRatio, 2)); r.setSize(W, H, false)
      const s = new T.Scene(), c = new T.PerspectiveCamera(30, W / H, 0.1, 50); c.position.set(0, -0.1, 8.4)
      s.add(new T.HemisphereLight(0xffffff, 0x8d8678, 3))
      const dl = new T.DirectionalLight(0xffffff, 2.6); dl.position.set(3, 4, 6); s.add(dl)
      const M = (col, ro = 0.55) => new T.MeshStandardMaterial({ color: col, roughness: ro })
      const DK = M(0x17181A, 0.4), SK = M(0xE6E1D8, 0.5), hood = M(0x3347FF, 0.8)
      const sk = document.createElement('canvas'); sk.width = sk.height = 128
      const sx = sk.getContext('2d'), gr = sx.createRadialGradient(64, 64, 0, 64, 64, 64)
      gr.addColorStop(0, 'rgba(0,0,0,.35)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); sx.fillStyle = gr; sx.fillRect(0, 0, 128, 128)
      const shd = new T.Mesh(new T.PlaneGeometry(3.6, 3.6), new T.MeshBasicMaterial({ map: new T.CanvasTexture(sk), transparent: true, depthWrite: false }))
      shd.rotation.x = -Math.PI / 2; shd.position.y = -2.25; s.add(shd)
      const g = new T.Group(); g.position.set(-0.35, -0.2, 0); s.add(g)
      const body = new T.Mesh(new T.CylinderGeometry(1, 1.3, 1.5, 40), hood); body.position.y = -1.1; g.add(body)
      const hd = new T.Group(); hd.position.y = 0.4; g.add(hd)
      const w = 1.15, h = 0.95, rd = 0.38, sh = new T.Shape()
      sh.moveTo(-w + rd, -h); sh.lineTo(w - rd, -h); sh.quadraticCurveTo(w, -h, w, -h + rd); sh.lineTo(w, h - rd); sh.quadraticCurveTo(w, h, w - rd, h)
      sh.lineTo(-w + rd, h); sh.quadraticCurveTo(-w, h, -w, h - rd); sh.lineTo(-w, -h + rd); sh.quadraticCurveTo(-w, -h, -w + rd, -h)
      const fr = new T.Mesh(new T.ExtrudeGeometry(sh, { depth: 0.7, bevelEnabled: true, bevelThickness: 0.12, bevelSize: 0.12, bevelSegments: 6, curveSegments: 16 }),
        new T.MeshPhysicalMaterial({ color: 0xE9E6DF, roughness: 0.35, clearcoat: 0.6, clearcoatRoughness: 0.3 }))
      fr.position.z = -0.35; hd.add(fr)
      const E = { x: 0, y: 0, blink: 1, happy: 0, bg: new T.Color(0x17181A), fg: new T.Color(0xEFEFEA) }
      const c2 = document.createElement('canvas'); c2.width = 516; c2.height = 384
      const cx = c2.getContext('2d'), tex = new T.CanvasTexture(c2); tex.colorSpace = T.SRGBColorSpace
      const scr = new T.Mesh(new T.PlaneGeometry(1.95, 1.45), new T.MeshBasicMaterial({ map: tex })); scr.position.z = 0.5; hd.add(scr)
      const paint = () => {
        cx.fillStyle = '#' + E.bg.getHexString(); cx.fillRect(0, 0, 516, 384)
        cx.fillStyle = cx.strokeStyle = '#' + E.fg.getHexString()
        const X = 258 + E.x * 60, Y = 170 + E.y * 34
        ;[-1, 1].forEach((k) => { cx.beginPath(); cx.ellipse(X + k * 92, Y, 30, Math.max(3, 58 * E.blink * (1 - 0.45 * E.happy)), 0, 0, 7); cx.fill() })
        cx.lineWidth = 9; cx.lineCap = 'round'; cx.beginPath(); cx.arc(X, Y + 92, 34, 0.2 * Math.PI, 0.8 * Math.PI); cx.stroke(); tex.needsUpdate = true
      }
      ;[-1, 1].forEach((k) => { const cup = new T.Mesh(new T.CylinderGeometry(0.3, 0.3, 0.24, 32), DK); cup.rotation.z = Math.PI / 2; cup.position.set(k * 1.38, 0, 0); hd.add(cup) })
      const st = new T.Mesh(new T.CylinderGeometry(0.03, 0.03, 0.4, 12), DK); st.position.y = 1.25; hd.add(st)
      const bl = new T.Mesh(new T.SphereGeometry(0.1, 20, 16), hood); bl.position.y = 1.5; hd.add(bl)
      const arm = new T.Group(); arm.position.set(1.15, -0.7, 0); g.add(arm)
      const am = new T.Mesh(new T.CylinderGeometry(0.2, 0.17, 1.1, 20), hood); am.position.y = -0.55; arm.add(am)
      const hand = new T.Mesh(new T.SphereGeometry(0.21, 24, 16), SK); hand.position.y = -1.15; arm.add(hand)

      const blink = () => gsap.to(E, { blink: 0.08, duration: 0.08, yoyo: true, repeat: 1, onComplete: () => gsap.delayedCall(2 + Math.random() * 3, blink) }); blink()
      const q = (o, pr, d) => gsap.quickTo(o, pr, { duration: d, ease: 'power3' })
      const qy = q(hd.rotation, 'y', 0.6), qx = q(hd.rotation, 'x', 0.6), qb = q(g.rotation, 'y', 0.9), ex = q(E, 'x', 0.5), ey = q(E, 'y', 0.5)
      const look = (v) => { qy(v); qb(v * 0.35); ex(v * 1.2) }
      const onMove = (e) => {
        if (document.querySelector('.arch:hover') || document.querySelector('[role=dialog]')) return
        const nx = (e.clientX / innerWidth) * 2 - 1, ny = (e.clientY / innerHeight) * 2 - 1
        qy(nx * 0.7); qx(ny * 0.35); qb(nx * 0.25); ex(nx); ey(ny)
      }
      const onTint = (e) => {
        const i = e.detail, p = i == null ? { bg: '#17181A', ink: '#EFEFEA', acc: '#3347FF' } : P[i]
        ;[['bg', p.bg], ['fg', p.ink]].forEach(([k, v]) => { const col = new T.Color(v); gsap.to(E[k], { r: col.r, g: col.g, b: col.b, duration: 0.6 }) })
        gsap.to(E, { happy: i == null ? 0 : 1, duration: 0.4 })
        const hc = new T.Color(p.acc); gsap.to(hood.color, { r: hc.r, g: hc.g, b: hc.b, duration: 0.7 })
        look(i == null ? 0 : [-0.8, -0.4, 0][i])
      }
      addEventListener('mousemove', onMove); addEventListener('tint', onTint)
      const idle = gsap.to(g.position, { y: '+=0.06', duration: 2.2, yoyo: true, repeat: -1, ease: 'sine.inOut' })
      const breathe = gsap.to(body.scale, { y: 1.03, duration: 2.2, yoyo: true, repeat: -1, ease: 'sine.inOut' })
      gsap.from(g.scale, { x: 0.001, y: 0.001, z: 0.001, duration: 0.9, ease: 'back.out(1.8)', delay: 0.4 })
      const wave = gsap.timeline({ delay: 1.3 }).to(arm.rotation, { z: 2.35, duration: 0.6, ease: 'power2.out' })
        .to(arm.rotation, { z: 2.8, duration: 0.3, yoyo: true, repeat: 5, ease: 'sine.inOut' }).to(arm.rotation, { z: 0.05, duration: 0.7, ease: 'power2.inOut' })
      const ro = new ResizeObserver(() => { W = el.clientWidth; H = el.clientHeight; r.setSize(W, H, false); c.aspect = W / H; c.updateProjectionMatrix() }); ro.observe(el)
      const tick = () => { paint(); r.render(s, c) }
      gsap.ticker.add(tick)
      cleanup = () => { gsap.ticker.remove(tick); removeEventListener('mousemove', onMove); removeEventListener('tint', onTint); ro.disconnect(); idle.kill(); breathe.kill(); wave.kill(); gsap.killTweensOf(E); r.dispose() }
    }
    const id = (window.requestIdleCallback || ((f) => setTimeout(f, 400)))(boot)
    return () => { dead = true; cleanup(); (window.cancelIdleCallback || clearTimeout)(id) }
  }, [])
  return <canvas ref={cv} aria-hidden="true" className="aspect-[3/4] w-[clamp(180px,55vw,220px)] justify-self-center lg:w-full lg:max-w-[340px] lg:justify-self-end" />
}
