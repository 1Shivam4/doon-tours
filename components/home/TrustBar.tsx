const stats = [
  { value: '500+', label: 'Trips Completed' },
  { value: '15',   label: 'Cars in Fleet' },
  { value: '8 yrs', label: 'Experience' },
  { value: '4.9 ★', label: 'Google Rating' },
]

export default function TrustBar() {
  return (
    <div className="max-w-[1280px] mx-auto px-6 md:px-8 -mt-8 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 bg-white border border-border rounded-xl overflow-hidden shadow-[var(--shadow-card)]">
        {stats.map(({ value, label }, i) => (
          <div
            key={label}
            className={`text-center py-6 px-4 hover:bg-snow transition-colors ${
              i < stats.length - 1 ? 'border-r border-border' : ''
            }`}
          >
            <div className="font-serif text-[36px] font-semibold text-forest leading-none mb-1">
              {value}
            </div>
            <div className="text-xs font-medium text-stone tracking-[0.03em]">{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
