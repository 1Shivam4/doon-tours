import { cookies } from 'next/headers'

const COOKIE_NAME = 'admin_token'

// btoa used instead of Buffer so the same function works in Edge runtime (middleware)
export function makeToken(password: string): string {
  return btoa(encodeURIComponent(password))
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies()
  const token = store.get(COOKIE_NAME)?.value
  if (!token) return false
  return token === makeToken(process.env.ADMIN_PASSWORD ?? '')
}

export function adminCookieHeader(password: string): string {
  const token = makeToken(password)
  const maxAge = 60 * 60 * 24 * 7 // 7 days
  return `${COOKIE_NAME}=${token}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=Lax`
}

export function clearCookieHeader(): string {
  return `${COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`
}
