'use client'

import { useRouter, useSearchParams } from 'next/navigation'

const TABS = ['All', 'SUV', 'Sedan', 'Tempo Traveller']

const SORT_OPTIONS = [
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'seats',      label: 'Capacity' },
]

export default function FilterBar({ total }: { total: number }) {
  const router = useRouter()
  const sp = useSearchParams()
  const activeType = sp.get('type') ?? 'All'
  const activeSort = sp.get('sort') ?? 'price-asc'

  function update(key: string, value: string) {
    const params = new URLSearchParams(sp.toString())
    if (value === 'All' || value === 'price-asc') {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    router.push(`/cars?${params.toString()}`)
  }

  return (
    <div className="flex items-center justify-between bg-white border border-border rounded-xl px-5 py-3 mb-8 flex-wrap gap-3">
      {/* Filter tabs */}
      <div className="flex gap-1 flex-wrap">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => update('type', tab)}
            className={`text-[13px] font-medium px-4 py-[7px] rounded-lg transition-all ${
              activeType === tab
                ? 'bg-forest text-white'
                : 'text-stone hover:bg-mist hover:text-bark'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Sort + count */}
      <div className="flex items-center gap-3 text-[13px] text-stone">
        <span className="hidden sm:inline">{total} vehicle{total !== 1 ? 's' : ''}</span>
        <span>Sort by</span>
        <select
          value={activeSort}
          onChange={e => update('sort', e.target.value)}
          className="font-sans text-[13px] text-bark bg-mist border-none rounded-md px-[10px] py-[6px] outline-none cursor-pointer"
        >
          {SORT_OPTIONS.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
