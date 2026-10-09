import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { P } from './data'
import { D, tint } from './tint'
import Specimen from './Specimen'
import { Btn } from './ui'

export default function CaseStudy({ i, from, getRect, onClose }) {
  const p = P[i]
  const root = useRef(), ghost = useRef(), scr = useRef(), back = useRef(), tx = useRef(), ifr = useRef(), busy = useRef(false)
  const [loaded, setLoaded] = useState(false)

  useLayoutEffect(() => {
    document.body.style.overflow = 'hidden'
    const t = scr.current.getBoundingClientRect()
    gsap.set(ghost.current, { left: from.left, top: from.top, width: from.width, height: from.height, borderTopLeftRadius: from.width / 2, borderTopRightRadius: from.width / 2, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, opacity: 1 })
    gsap.to(root.current, { opacity: 1, duration: D(0.4) })
    gsap.to(ghost.current, { left: t.left, top: t.top, width: t.width, height: t.height, borderRadius: 0, duration: D(0.95), ease: 'power3.inOut',
      onComplete: () => { gsap.set(back.current, { opacity: 1 }); gsap.set(ghost.current, { opacity: 0 }) } })
    gsap.fromTo(tx.current.children, { y: 26, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.07, delay: D(0.4), duration: D(0.7), ease: 'power3.out' })
    return () => { document.body.style.overflow = '' }
  }, [])

  const close = () => {
    if (busy.current) return
    busy.current = true
    const t = scr.current.getBoundingClientRect(), f = getRect()
    gsap.set(ghost.current, { left: t.left, top: t.top, width: t.width, height: t.height, borderRadius: 0, opacity: 1 })
    gsap.set([back.current, ifr.current], { opacity: 0 })
    gsap.to(ghost.current, { left: f.left, top: f.top, width: f.width, height: f.height, borderTopLeftRadius: f.width / 2, borderTopRightRadius: f.width / 2, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, duration: D(0.8), ease: 'power3.inOut' })
    gsap.to(root.current, { opacity: 0, duration: D(0.45), delay: D(0.35), onComplete: () => { tint(null); onClose() } })
  }
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && close()
    addEventListener('keydown', k)
    return () => removeEventListener('keydown', k)
  }, [])

  return (
    <section ref={root} role="dialog" aria-modal="true" aria-label={`${p.n} case study`} className="fixed inset-0 z-50 grid gap-8 overflow-auto bg-bg px-5 pb-10 pt-[92px] opacity-0 md:px-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16 lg:px-16" style={{ opacity: 0 }}>
      <button onClick={close} className="fixed right-5 top-[18px] z-[55] rounded-full border border-ink px-5 py-2.5 md:right-10 lg:right-16">Close</button>
      <div ref={tx}>
        <h2 className="mb-3.5 text-[clamp(40px,5vw,72px)] leading-[.98]">{p.n}</h2>
        <p className="mb-6 text-mute">{p.m}. Concept project.</p>
        <p className="max-w-[44ch]">{p.sum}</p>
        {p.pr && <dl className="my-7 grid grid-cols-[90px_1fr] gap-x-5 gap-y-3 border-t border-line pt-6"><dt className="text-[15px] text-mute">Problem</dt><dd>{p.pr}</dd><dt className="text-[15px] text-mute">Built</dt><dd>{p.bu}</dd><dt className="text-[15px] text-mute">Stack</dt><dd>{p.st}</dd></dl>}
        {p.proof && <p className="mb-7 max-w-[44ch] text-mute">{p.proof}</p>}
        <div className="mt-7"><Btn p href={p.live} target="_blank" rel="noopener noreferrer">Open live site</Btn></div>
      </div>
      <div className="flex h-[min(72vh,640px)] min-h-[420px] flex-col overflow-hidden rounded-[14px] border border-line bg-white">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3 text-sm text-mute"><i className="size-2.5 rounded-full bg-line" /><i className="size-2.5 rounded-full bg-line" /><i className="size-2.5 rounded-full bg-line" /><span className="ml-3 truncate">{p.live.replace('https://', '')}</span></div>
        <div ref={scr} className="relative min-h-0 flex-1">
          <div ref={back} className="absolute inset-0 opacity-0"><Specimen p={p} full /></div>
          <iframe ref={ifr} src={p.live} title={`${p.n} live demo`} onLoad={() => setLoaded(true)} sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            className={`absolute inset-0 size-full border-0 bg-white transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`} />
        </div>
      </div>
      <div ref={ghost} className="pointer-events-none fixed z-[52] overflow-hidden" style={{ opacity: 0 }}><Specimen p={p} full /></div>
    </section>
  )
}
