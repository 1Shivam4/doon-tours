import { v2 as cloudinary } from 'cloudinary'
import { isAdmin } from '@/lib/auth'

cloudinary.config({
  cloud_name:  process.env.CLOUDINARY_CLOUD_NAME,
  api_key:     process.env.CLOUDINARY_API_KEY,
  api_secret:  process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const { folder = 'devbhumi' } = await request.json()

  const timestamp = Math.round(Date.now() / 1000)
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder },
    process.env.CLOUDINARY_API_SECRET!
  )

  return Response.json({
    success: true,
    data: {
      timestamp,
      signature,
      folder,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey:    process.env.CLOUDINARY_API_KEY,
    },
  })
}
