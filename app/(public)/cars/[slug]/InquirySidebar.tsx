const FEATURES = [
  { icon: '✅', text: 'Free cancellation up to 24 hrs' },
  { icon: '🧭', text: 'Driver knows all Uttarakhand routes' },
  { icon: '⛽', text: 'Fuel charges as per actuals' },
  { icon: '🏔️', text: 'Mountain-terrain ready' },
]

interface Props {
  carName:    string
  pricePerDay: number
  waNumber:   string
  phone:      string
}

export default function InquirySidebar({ carName, pricePerDay, waNumber, phone }: Props) {
  const waText = encodeURIComponent(
    `Hi, I'd like to enquire about the *${carName}* for an Uttarakhand trip. Please share availability and details.`
  )
  const waHref  = `https://wa.me/${waNumber}?text=${waText}`
  const telHref = `tel:${phone.replace(/\s/g, '')}`

  return (
    <div className="bg-white border border-border rounded-xl overflow-hidden shadow-[var(--shadow-card)]">

      {/* Price header */}
      <div className="bg-forest px-6 py-5">
        <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-white/55 mb-1">
          Starting from
        </div>
        <div className="font-serif text-[32px] font-semibold text-white leading-none">
          ₹{pricePerDay.toLocaleString('en-IN')}{' '}
          <span className="text-sm font-normal text-white/55">/ day</span>
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-5 flex flex-col gap-[10px]">

        {/* WhatsApp CTA */}
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-wa-green hover:bg-[#20bd5a] text-white text-sm font-semibold py-[13px] rounded-lg transition-colors"
        >
          📱 Enquire on WhatsApp
        </a>

        {/* Call CTA */}
        {phone && (
          <a
            href={telHref}
            className="w-full flex items-center justify-center gap-2 text-stone border border-border text-sm font-medium py-3 rounded-lg hover:border-forest hover:text-forest transition-colors"
          >
            📞 Call Us
          </a>
        )}

        <p className="text-[12px] text-stone text-center">We respond within 30 minutes</p>

        <hr className="border-border my-1" />

        {/* Feature list */}
        <div className="flex flex-col gap-[10px]">
          {FEATURES.map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-[10px] text-[13px] text-stone">
              <div className="w-7 h-7 rounded flex items-center justify-center text-sm bg-mist flex-shrink-0">
                {icon}
              </div>
              {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
