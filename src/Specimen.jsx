export default function Specimen({ p, full }) {
  return (
    <div className="size-full" style={{ containerType: 'inline-size' }}>
      <div className={`flex size-full flex-col items-center text-center ${full ? 'justify-center gap-[3cqw] px-[10cqw]' : 'justify-between px-[9cqw] pb-[7cqw] pt-[20cqw]'}`} style={{ background: p.bg, color: p.ink }}>
        <span className="text-[4.2cqw] opacity-80 md:text-[max(15px,3.2cqw)]">{p.m}</span>
        <span className={`leading-[1.02] tracking-[-0.02em] ${full ? 'max-w-[11ch] text-[9cqw]' : 'max-w-[9ch] text-[10cqw]'}`} style={{ fontFamily: `'${p.f}', serif`, fontWeight: p.w }}>{p.t}</span>
        <span className="flex gap-2">{p.sw.map((c) => <i key={c} className="block size-[7cqw] max-h-7 max-w-7 rounded-full" style={{ background: c }} />)}</span>
        <span className="text-[max(15px,4cqw)] font-medium">{p.n}</span>
      </div>
    </div>
  )
}
