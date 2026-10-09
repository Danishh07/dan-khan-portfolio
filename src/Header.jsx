import { useState } from 'react'
import { Btn } from './ui'
import { links } from './data'

export default function Header() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <header className="sticky top-0 z-30 bg-bg/85 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-[1360px] items-center justify-between gap-5 px-5 md:px-10 lg:px-16">
          <a href="#top" className="whitespace-nowrap font-display text-2xl font-semibold tracking-[-0.03em]">Dan Khan
            <small className="ml-2.5 hidden font-sans text-[15px] font-normal tracking-normal text-mute sm:inline">Web Designer & Developer</small></a>
          <nav aria-label="Main" className="hidden gap-8 lg:flex">{links.map(([h, l]) => <a key={h} href={h} className="hover:text-acc">{l}</a>)}</nav>
          <div className="flex items-center gap-3">
            <Btn p href="#contact" className="!px-5 !py-2.5"><span className="sm:hidden">Start</span><span className="hidden sm:inline">Start a project</span></Btn>
            <button className="px-1 py-2 lg:hidden" aria-expanded={open} aria-controls="drawer" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button>
          </div>
        </div>
      </header>
      <nav id="drawer" aria-label="Mobile" className={`fixed inset-x-0 bottom-0 top-[72px] z-20 bg-bg px-5 pt-6 transition-all duration-300 lg:hidden ${open ? 'opacity-100' : 'pointer-events-none -translate-y-3 opacity-0'}`}>
        <ul>{links.map(([h, l]) => <li key={h} className="border-b border-line"><a href={h} onClick={() => setOpen(false)} className="block py-4 font-display text-[34px] tracking-[-0.03em]">{l}</a></li>)}</ul>
      </nav>
    </>
  )
}
