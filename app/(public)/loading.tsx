export default function Loading() {
  return (
    <div style={{ paddingTop: 'var(--nav-height)' }}>
      {/* Hero skeleton */}
      <div className="h-[560px] bg-mist animate-pulse" />

      {/* Trust bar skeleton */}
      <div className="border-y border-border py-5">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-12 bg-mist rounded-lg animate-pulse" />
          ))}
        </div>
      </div>

      {/* Section skeleton */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-16 flex flex-col gap-4">
        <div className="h-8 w-48 bg-mist rounded animate-pulse" />
        <div className="h-4 w-72 bg-mist rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-52 bg-mist rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}
