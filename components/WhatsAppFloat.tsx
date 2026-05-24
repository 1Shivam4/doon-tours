'use client'

export default function WhatsAppFloat() {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''
  const href = `https://wa.me/${waNumber}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-8 right-8 z-[9999] w-14 h-14 rounded-full bg-wa-green flex items-center justify-center text-[26px] wa-pulse hover:scale-110 hover:[animation:none] hover:shadow-[0_6px_24px_rgba(37,211,102,0.55)] transition-transform"
    >
      💬
    </a>
  )
}
