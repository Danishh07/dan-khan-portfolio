import { useState } from 'react'
import { Btn, H2, Wrap } from './ui'
import { EMAIL, FACEBOOK, services, steps, packages, faq } from './data'

export const Services = () => (
  <section id="services" className="py-16 md:py-28"><Wrap>
    <H2>What I build for local businesses.</H2>
    <div className="border-t border-ink">
      {services.map(([h, d, t]) => (
        <div key={h} className="rv group relative isolate grid gap-2 overflow-hidden border-b border-line py-7 md:grid-cols-[1fr_1.3fr_.6fr] md:items-baseline md:gap-6">
          <span className="absolute inset-0 -z-10 origin-left scale-x-0 bg-acc/10 transition-transform duration-500 group-hover:scale-x-100" />
          <h3 className="text-[clamp(26px,3vw,40px)] leading-none">{h}</h3>
          <p className="max-w-[44ch] text-mute">{d}</p>
          <span className="text-[15px] text-mute md:text-right">{t}</span>
        </div>
      ))}
    </div>
  </Wrap></section>
)

export const Process = () => (
  <section id="process" className="pb-16 md:pb-28"><Wrap>
    <H2>How a project runs.</H2>
    <div className="steps relative grid gap-9 md:grid-cols-4 md:gap-7">
      <div className="absolute left-0 right-0 top-[19px] hidden h-0.5 bg-line md:block"><div className="pf h-full origin-left scale-x-0 bg-acc" /></div>
      {steps.map(([h, d], i) => (
        <div key={h} className="st rv">
          <div className="n relative z-10 mb-5 grid size-10 place-items-center rounded-full border border-ink bg-bg font-medium transition-colors duration-500">{i + 1}</div>
          <h3 className="mb-2 text-[28px]">{h}</h3><p className="max-w-[30ch] text-mute">{d}</p>
        </div>
      ))}
    </div>
  </Wrap></section>
)

export const About = () => (
  <section id="about" className="border-t border-line py-16 md:py-28"><Wrap>
    <div className="grid gap-10 md:grid-cols-2 md:gap-20">
      <div>
        <H2>Hi, I'm Dan.</H2>
        <p className="rv mb-4 max-w-[48ch]">I'm a web designer and developer helping restaurants, salons and dental practices build a stronger presence online. I create thoughtful, mobile-first websites that reflect each business, make information easy to find and guide visitors towards bookings and enquiries.</p>
        <p className="rv mb-4 max-w-[48ch]">I combine clean design with modern frontend development to build responsive, accessible experiences with purposeful motion not effects for the sake of it.</p>
        <p className="rv mb-4 max-w-[48ch]">I work remotely with businesses in the US, UK and Canada, taking projects from the initial brief through design, development and launch.</p>
        <p className="rv text-[15px] text-mute">B.Tech in Information Technology. Frontend internship on an EdTech platform.</p>
      </div>
      <dl className="rv self-end border-t border-ink">
        {[['React and Tailwind', 'Fast pages that are easy to extend later.'], ['GSAP and Framer Motion', 'Motion that guides attention and never gets in the way.'], ['Performance and accessibility', 'Built with responsive layouts, semantic HTML and accessibility in mind, with performance considered throughout development.']].map(([k, v]) => (
          <div key={k} className="border-b border-line py-5"><dt className="font-display text-2xl font-semibold tracking-[-0.03em]">{k}</dt><dd className="mt-1 max-w-[44ch] text-mute">{v}</dd></div>
        ))}
      </dl>
    </div>
  </Wrap></section>
)

export const Pricing = () => (
  <section id="pricing" className="border-t border-line py-16 md:py-28"><Wrap>
    <H2>Packages.</H2>
    <div className="grid gap-5 md:grid-cols-3">
      {packages.map((k) => (
        <div key={k.n} className={`rv flex flex-col gap-3 p-7 ${k.dark ? 'bg-ink text-bg' : 'border border-line'}`}>
          <h3 className="text-[34px]">{k.n}</h3>
          <p className="font-display text-[clamp(36px,3.6vw,52px)] font-semibold leading-none tracking-[-0.04em]">From {k.price}</p>
          <p className={k.dark ? 'opacity-70' : 'text-mute'}>{k.t}</p>
          <ul className="mb-4 mt-2">{k.li.map((x) => <li key={x} className="border-t border-current/15 py-2.5">{x}</li>)}</ul>
          <Btn p={k.dark} href={`mailto:${EMAIL}?subject=${encodeURIComponent(k.n + ' package enquiry')}`} className={`mt-auto w-fit ${k.dark ? '!border-bg' : ''}`}>Ask about this</Btn>
        </div>
      ))}
    </div>
    <p className="rv mt-6 text-[15px] text-mute">Prices are in USD. You get a final quote after a short brief.</p>
  </Wrap></section>
)

export function Faq() {
  const [o, setO] = useState(0)
  return (
    <section id="faq" className="border-t border-line py-16 md:py-28"><Wrap>
      <div className="grid gap-10 md:grid-cols-[.8fr_1.2fr] md:gap-20">
        <H2>Good questions.</H2>
        <div className="rv border-t border-ink">
          {faq.map(([q, a], i) => (
            <div key={q} className="border-b border-line">
              <button className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-[clamp(20px,2vw,24px)] font-medium tracking-[-0.02em]" aria-expanded={o === i} onClick={() => setO(o === i ? -1 : i)}>
                {q}<span className={`text-acc transition-transform duration-300 ${o === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              <div className={`grid transition-[grid-template-rows] duration-300 ${o === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden"><p className="max-w-[56ch] pb-6 text-mute">{a}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Wrap></section>
  )
}

export function Contact() {
  const [s, setS] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (loading) return
    const f = new FormData(e.target), n = f.get('name').trim(), m = f.get('email').trim()
    if (!n || !/^\S+@\S+\.\S+$/.test(m)) return setS('Please add your name and a valid email.')
    
    setLoading(true)
    setS('Sending message...')
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          name: n,
          email: m,
          business_type: f.get('biz'),
          message: f.get('msg'),
          botcheck: f.get('botcheck') ? true : false,
          subject: 'New Portfolio Enquiry — Dan Khan'
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setS('Message sent successfully! I will get back to you soon.')
        e.target.reset()
      } else {
        setS(data.message || 'Failed to send message. Please try again.')
      }
    } catch (err) {
      setS('An error occurred. Please try again later.')
    } finally {
      setLoading(false)
    }
  }
  
  const fld = 'w-full rounded-xl border border-bg/25 bg-bg/10 px-4 py-3.5 text-[17px] text-bg placeholder:text-bg/50 disabled:opacity-50'
  return (
    <section id="contact" className="bg-ink py-16 text-bg md:py-28"><Wrap>
      <div className="grid gap-12 md:grid-cols-2 md:gap-20">
        <div>
          <H2 className="max-w-[10ch]">Let's make yours.</H2>
          <p className="rv mb-4 max-w-[40ch] text-bg/70">Tell me about your business and what the site needs to do. I'll reply by email.</p>
          <p className="rv"><a className="underline underline-offset-4" href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
          <p className="rv mt-2"><a className="underline underline-offset-4" href={FACEBOOK} target="_blank" rel="noopener noreferrer">Find me on Facebook</a></p>
        </div>
        <form onSubmit={submit} noValidate className="rv grid content-start gap-4">
          <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
          <label className="grid gap-1.5 text-[15px]">Name<input name="name" autoComplete="name" className={fld} disabled={loading} /></label>
          <label className="grid gap-1.5 text-[15px]">Email<input name="email" type="email" autoComplete="email" className={fld} disabled={loading} /></label>
          <label className="grid gap-1.5 text-[15px]">Your business
            <select name="biz" className={fld} disabled={loading}>{['Restaurant', 'Salon or spa', 'Dental practice', 'Something else'].map((o) => <option key={o} className="text-ink">{o}</option>)}</select></label>
          <label className="grid gap-1.5 text-[15px]">What do you need?<textarea name="msg" className={`${fld} min-h-[120px] resize-y`} disabled={loading} /></label>
          <Btn p className={`w-fit ${loading ? 'opacity-70 pointer-events-none' : ''}`} disabled={loading}>{loading ? 'Sending...' : 'Send message'}</Btn>
          <p role="status" aria-live="polite" className="min-h-[1.5em] text-[15px] text-bg/70">{s}</p>
        </form>
      </div>
    </Wrap></section>
  )
}

export const Footer = () => (
  <footer className="py-8 text-[15px] text-mute"><Wrap className="flex flex-wrap justify-between gap-3">
    <span>© 2026 Dan Khan. Demo projects are concept work for fictional businesses.</span>
    <span className="flex gap-5"><a href={`mailto:${EMAIL}`}>Email</a><a href={FACEBOOK} target="_blank" rel="noopener noreferrer">Facebook</a></span>
  </Wrap></footer>
)
