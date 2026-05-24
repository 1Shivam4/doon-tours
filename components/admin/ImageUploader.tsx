'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'

interface Props {
  images: string[]
  onChange: (images: string[]) => void
}

export default function ImageUploader({ images, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return
    setUploading(true)
    setError('')

    const uploaded: string[] = []

    for (const file of Array.from(files)) {
      try {
        // 1. Get signed params from our server
        const sigRes = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ folder: 'devbhumi/cars' }),
        })
        const { data, success } = await sigRes.json()
        if (!success) throw new Error('Failed to get upload signature')

        // 2. Upload directly to Cloudinary
        const fd = new FormData()
        fd.append('file', file)
        fd.append('api_key', data.apiKey)
        fd.append('timestamp', String(data.timestamp))
        fd.append('signature', data.signature)
        fd.append('folder', data.folder)

        const upRes = await fetch(
          `https://api.cloudinary.com/v1_1/${data.cloudName}/image/upload`,
          { method: 'POST', body: fd }
        )
        const upJson = await upRes.json()
        if (!upJson.secure_url) throw new Error(upJson.error?.message || 'Upload failed')

        uploaded.push(upJson.secure_url)
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Upload failed')
      }
    }

    if (uploaded.length > 0) onChange([...images, ...uploaded])
    setUploading(false)
    if (inputRef.current) inputRef.current.value = ''
  }

  function remove(url: string) {
    onChange(images.filter(u => u !== url))
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-3">
        {images.map((url, i) => (
          <div key={url} className="relative w-28 h-20 rounded-lg overflow-hidden border border-border group">
            <Image src={url} alt={`Car photo ${i + 1}`} fill className="object-cover" />
            <button
              type="button"
              onClick={() => remove(url)}
              className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ✕
            </button>
          </div>
        ))}

        {/* Add button */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-28 h-20 rounded-lg border-2 border-dashed border-mist-dark text-stone text-xs font-medium flex flex-col items-center justify-center gap-1 hover:border-forest hover:text-forest transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <>
              <span className="text-base animate-spin">⟳</span>
              <span>Uploading…</span>
            </>
          ) : (
            <>
              <span className="text-xl">+</span>
              <span>Add Photo</span>
            </>
          )}
        </button>
      </div>

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={e => handleFiles(e.target.files)}
      />
    </div>
  )
}
