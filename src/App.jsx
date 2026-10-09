import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from './Header'
import Hero from './Hero'
import CaseStudy from './CaseStudy'
import { Services, Process, About, Pricing, Faq, Contact, Footer } from './Sections'
import { D, RM, tint } from './tint'

function Cursor({ hide }) {
  const el = useRef(null), on = useRef(false), hideRef = useRef(hide)
  hideRef.current = hide
  useEffect(() => { if (hide) { on.current = false; gsap.to(el.current, { scale: 0, duration: 0.2, overwrite: 'auto' }) } }, [hide])
  useEffect(() => {
    if (RM || !matchMedia('(hover:hover)').matches) return
    const c = el.current, qx = gsap.quickTo(c, 'x', { duration: 0.35, ease: 'power3' }), qy = gsap.quickTo(c, 'y', { duration: 0.35, ease: 'power3' })
    const mv = (e) => {
      qx(e.clientX); qy(e.clientY)
      const now = !hideRef.current && !!e.target.closest?.('[data-arch]')
      if (now !== on.current) { on.current = now; gsap.to(c, { scale: now ? 1 : 0, duration: 0.3, ease: now ? 'back.out(2)' : 'power2.out', overwrite: 'auto' }) }
    }
    addEventListener('mousemove', mv)
    return () => removeEventListener('mousemove', mv)
  }, [])
  return <div ref={el} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[60] -ml-[42px] -mt-[42px] grid size-[84px] scale-0 place-items-center rounded-full bg-acc text-[15px] font-medium text-white max-lg:hidden">Open</div>
}

export default function App() {
  const archRefs = useRef([])
  const [cs, setCs] = useState(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch('.rv', { start: 'top 90%', once: true, onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, duration: D(0.9), stagger: 0.1, ease: 'power3.out' }) })
      gsap.to('.pf', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.steps', start: 'top 75%', end: 'bottom 55%', scrub: 0.6 } })
      gsap.utils.toArray('.st').forEach((e) => ScrollTrigger.create({ trigger: e, start: 'top 72%', toggleClass: { targets: e, className: 'on' } }))
    })
    return () => ctx.revert()
  }, [])
  const onOpen = (i, r) => { tint(i); setCs({ i, from: { left: r.left, top: r.top, width: r.width, height: r.height } }) }
  return (
    <>
      <Header />
      <main><Hero archRefs={archRefs} open={cs?.i} onOpen={onOpen} /><Services /><Process /><About /><Pricing /><Faq /><Contact /></main>
      <Footer />
      <Cursor hide={!!cs} />
      {cs && <CaseStudy key={cs.i} i={cs.i} from={cs.from} getRect={() => archRefs.current[cs.i].firstElementChild.getBoundingClientRect()} onClose={() => setCs(null)} />}
    </>
  )
}
