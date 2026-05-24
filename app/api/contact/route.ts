import { z } from 'zod'

const ContactSchema = z.object({
  name:         z.string().min(1),
  phone:        z.string().min(7),
  email:        z.string().email().optional().or(z.literal('')),
  travelDate:   z.string().optional(),
  groupSize:    z.string().optional(),
  message:      z.string().optional(),
  carName:      z.string().optional(),   // pre-filled from car detail page
})

export async function POST(request: Request) {
  const body = await request.json()
  const parsed = ContactSchema.safeParse(body)

  if (!parsed.success) {
    return Response.json({ success: false, error: 'Invalid form data' }, { status: 400 })
  }

  const { name, phone, email, travelDate, groupSize, message, carName } = parsed.data
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

  const lines = [
    `Hi, I'm *${name}* and I'd like to enquire about a trip.`,
    carName     ? `🚗 Vehicle: ${carName}`             : '',
    travelDate  ? `📅 Travel date: ${travelDate}`       : '',
    groupSize   ? `👥 Group size: ${groupSize}`         : '',
    phone       ? `📱 Phone: ${phone}`                  : '',
    email       ? `📧 Email: ${email}`                  : '',
    message     ? `\n📝 Details:\n${message}`           : '',
  ].filter(Boolean).join('\n')

  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(lines)}`

  return Response.json({ success: true, data: { waUrl } })
}
