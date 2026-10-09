export const Wrap = ({ className = '', children, ...r }) => (
  <div className={`mx-auto w-full max-w-[1360px] px-5 md:px-10 lg:px-16 ${className}`} {...r}>{children}</div>
)
export const Btn = ({ p, href, className = '', ...x }) => {
  const c = `inline-flex items-center justify-center whitespace-nowrap rounded-full border px-6 py-3.5 text-base font-medium transition-colors ${p ? 'border-acc bg-acc text-white hover:brightness-110' : 'border-ink hover:bg-ink hover:text-bg'} ${className}`
  return href ? <a href={href} className={c} {...x} /> : <button className={c} {...x} />
}
export const H2 = ({ children, className = '' }) => (
  <h2 className={`rv mb-10 max-w-[14ch] text-[clamp(38px,5.4vw,76px)] leading-[.98] md:mb-14 ${className}`}>{children}</h2>
)
