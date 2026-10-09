import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { P } from './data'
import { tint, RM } from './tint'
import { Btn, Wrap } from './ui'
import Specimen from './Specimen'
import Avatar from './Avatar'

export default function Hero({ archRefs, open, onOpen }) {
  const root = useRef(null)
  useEffect(() => {
    if (RM) return
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power4.out' } })
        .from('.hl', { yPercent: 110, duration: 1.1, stagger: 0.12 }, 0.1)
        .from('.hsub', { y: 24, opacity: 0, duration: 0.9, stagger: 0.1 }, 0.55)
        .from('.arch', { y: 90, opacity: 0, duration: 1.1, stagger: 0.14 }, 0.6)
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section id="top" ref={root} className="pb-16 pt-10 md:pb-24 md:pt-16">
      <Wrap>
        <div className="grid items-end gap-6 lg:grid-cols-[1.5fr_.5fr]">
          <div>
            <h1 className="text-[clamp(42px,7.6vw,120px)] leading-[.94]">
              {['Websites that', 'look like your', 'business.'].map((l) => <span key={l} className="block overflow-hidden pb-[.06em]"><span className="hl block">{l}</span></span>)}
            </h1>
            <p className="hsub mb-7 mt-7 max-w-[40ch] text-[clamp(18px,1.9vw,21px)] text-mute">I design and build fast, mobile-first websites for restaurants, salons and dental practices, made to look like your business and easy to book from.</p>
            <div className="hsub flex flex-wrap gap-3"><Btn p href="#work">See the work</Btn><Btn href="#contact">Start a project</Btn></div>
          </div>
          <Avatar />
        </div>
        <div id="work" role="list" className="mt-14 grid gap-4 max-md:mx-auto max-md:max-w-[420px] md:mt-[72px] md:grid-cols-3 md:gap-7">
          {P.map((p, i) => (
            <button key={p.n} role="listitem" data-arch className="arch group text-left" ref={(el) => (archRefs.current[i] = el)}
              aria-label={`${p.n}, ${p.m}. Open case study`}
              onMouseEnter={() => tint(i)} onMouseLeave={() => open == null && tint(null)} onFocus={() => tint(i)} onBlur={() => open == null && tint(null)}
              onClick={() => onOpen(i, archRefs.current[i].firstElementChild.getBoundingClientRect())}>
              <div className="aspect-[3/4.1] overflow-hidden rounded-[999px_999px_8px_8px] transition-transform duration-500 group-hover:-translate-y-2.5 group-focus-visible:-translate-y-2.5" style={{ opacity: open === i ? 0 : 1 }}>
                <Specimen p={p} />
              </div>
            </button>
          ))}
        </div>
        <p className="mt-8 text-[15px] text-mute">Demo projects are concept work for fictional businesses. Hover one, then open it.</p>
      </Wrap>
    </section>
  )
}
