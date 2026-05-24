import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found',
}

export default function NotFound() {
  return (
    <div
      style={{ paddingTop: 'var(--nav-height)' }}
      className="min-h-screen bg-snow flex flex-col items-center justify-center px-6 text-center"
    >
      <div className="max-w-md">
        <p className="font-serif text-[120px] leading-none font-semibold text-mist-dark select-none">
          404
        </p>
        <h1 className="font-serif text-3xl font-semibold text-bark mt-2 mb-3">
          Lost in the mountains?
        </h1>
        <p className="text-stone text-[15px] leading-[1.7] mb-8">
          The page you&apos;re looking for may have moved or never existed. Let us guide you back to safer ground.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-forest text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-forest-light transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/cars"
            className="border border-forest text-forest text-sm font-semibold px-6 py-3 rounded-lg hover:bg-forest hover:text-white transition-all"
          >
            Browse Our Fleet
          </Link>
        </div>
      </div>
    </div>
  )
}
