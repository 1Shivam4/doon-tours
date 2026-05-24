import { adminCookieHeader } from '@/lib/auth'

export async function POST(request: Request) {
  const { password } = await request.json()

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return Response.json({ success: false, error: 'Invalid password' }, { status: 401 })
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': adminCookieHeader(password),
    },
  })
}
