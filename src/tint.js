import gsap from 'gsap'
import { P } from './data'
export const RM = matchMedia('(prefers-reduced-motion: reduce)').matches
export const D = (x) => (RM ? 0 : x)
const BASE = { bg: '#EFEFEA', ink: '#17181A', acc: '#3347FF' }
export function tint(i, dur = 0.7) {
  const p = i == null ? BASE : P[i]
  gsap.to(document.documentElement, { '--bg': p.bg, '--ink': p.ink, '--acc': p.acc, duration: D(dur), ease: 'power2.out' })
  window.dispatchEvent(new CustomEvent('tint', { detail: i }))
}
