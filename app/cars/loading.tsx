export default function CarsLoading() {
  return (
    <div style={{ paddingTop: 'var(--nav-height)' }}>
      {/* Header skeleton */}
      <div className="border-b border-border">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 pt-12 pb-10">
          <div className="h-3 w-32 bg-mist rounded animate-pulse mb-5" />
          <div className="h-12 w-56 bg-mist rounded animate-pulse mb-3" />
          <div className="h-4 w-80 bg-mist rounded animate-pulse" />
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-10">
        {/* Filter bar skeleton */}
        <div className="h-14 bg-mist rounded-xl animate-pulse mb-8" />

        {/* Cards grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white border border-border rounded-xl overflow-hidden">
              <div className="h-52 bg-mist animate-pulse" />
              <div className="p-5 flex flex-col gap-3">
                <div className="h-5 w-3/4 bg-mist rounded animate-pulse" />
                <div className="h-3 w-1/2 bg-mist rounded animate-pulse" />
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-mist rounded-full animate-pulse" />
                  <div className="h-6 w-20 bg-mist rounded-full animate-pulse" />
                </div>
                <div className="h-10 bg-mist rounded-lg animate-pulse mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
