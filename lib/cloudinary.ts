const TRANSFORM = 'f_auto,q_auto'

export function cloudinaryUrl(url: string | undefined | null): string {
  if (!url) return ''
  if (!url.includes('res.cloudinary.com')) return url
  // Avoid double-applying transforms
  if (url.includes(TRANSFORM)) return url
  return url.replace('/image/upload/', `/image/upload/${TRANSFORM}/`)
}
