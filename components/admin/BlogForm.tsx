'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ImageUploader from './ImageUploader'

interface Section {
  heading: string
  body: string
}

interface InfoboxItem {
  key: string
  value: string
}

interface BlogFormData {
  title:        string
  slug:         string
  summary:      string
  introduction: string
  sections:     Section[]
  infobox:      InfoboxItem[]
  categories:   string
  isActive:     boolean
  order:        number
}

const inputClass  = 'w-full text-sm text-bark bg-white border border-border rounded-lg px-4 py-[10px] outline-none focus:border-forest focus:shadow-[0_0_0_3px_rgba(13,33,69,0.12)] transition-all'
const labelClass  = 'block text-[12px] font-semibold text-stone uppercase tracking-[0.04em] mb-[6px]'
const textareaClass = 'w-full text-sm text-bark bg-white border border-border rounded-lg px-4 py-[10px] outline-none focus:border-forest focus:shadow-[0_0_0_3px_rgba(13,33,69,0.12)] transition-all min-h-[100px]'

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

interface Props {
  initial?:      Partial<BlogFormData>
  blogId?:       string
  initialImages?: string[]
}

export default function BlogForm({ initial, blogId, initialImages }: Props) {
  const router = useRouter()
  const isEdit = Boolean(blogId)
  const [saving, setSaving] = useState(false)
  const [error, setError]   = useState('')
  const [images, setImages] = useState<string[]>(initialImages ?? [])
  
  // Format initial values
  const [form, setForm] = useState<BlogFormData>({
    title:        initial?.title || '',
    slug:         initial?.slug || '',
    summary:      initial?.summary || '',
    introduction: initial?.introduction || '',
    sections:     initial?.sections || [{ heading: '', body: '' }],
    infobox:      initial?.infobox || [{ key: '', value: '' }],
    categories:   initial?.categories || '',
    isActive:     initial?.isActive !== false,
    order:        initial?.order ?? 0,
  })

  function set(key: keyof BlogFormData, value: any) {
    setForm(prev => {
      const next = { ...prev, [key]: value }
      if (key === 'title' && !isEdit) next.slug = slugify(value as string)
      return next
    })
  }

  // Section managers
  function addSection() {
    set('sections', [...form.sections, { heading: '', body: '' }])
  }

  function removeSection(index: number) {
    if (form.sections.length <= 1) return
    set('sections', form.sections.filter((_, i) => i !== index))
  }

  function updateSection(index: number, field: keyof Section, val: string) {
    const updated = form.sections.map((sec, i) => {
      if (i === index) return { ...sec, [field]: val }
      return sec
    })
    set('sections', updated)
  }

  function moveSection(index: number, direction: 'up' | 'down') {
    if (direction === 'up' && index === 0) return
    if (direction === 'down' && index === form.sections.length - 1) return
    
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    const nextSections = [...form.sections]
    const temp = nextSections[index]
    nextSections[index] = nextSections[targetIndex]
    nextSections[targetIndex] = temp
    set('sections', nextSections)
  }

  // Infobox managers
  function addInfoboxItem() {
    set('infobox', [...form.infobox, { key: '', value: '' }])
  }

  function removeInfoboxItem(index: number) {
    set('infobox', form.infobox.filter((_, i) => i !== index))
  }

  function updateInfoboxItem(index: number, field: keyof InfoboxItem, val: string) {
    const updated = form.infobox.map((item, i) => {
      if (i === index) return { ...item, [field]: val }
      return item
    })
    set('infobox', updated)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    // Pre-processing fields
    const parsedCategories = form.categories
      .split(',')
      .map(c => c.trim())
      .filter(Boolean)

    const cleanSections = form.sections.filter(s => s.heading.trim() && s.body.trim())
    const cleanInfobox = form.infobox.filter(i => i.key.trim() && i.value.trim())

    const payload = {
      ...form,
      categories: parsedCategories,
      sections:   cleanSections,
      infobox:    cleanInfobox,
      images,
    }

    try {
      const url    = isEdit ? `/api/blogs/${blogId}` : '/api/blogs'
      const method = isEdit ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!json.success) throw new Error(json.error || 'Failed to save blog')
      
      router.push('/admin/blogs')
      router.refresh()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'An error occurred while saving')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-[760px] flex flex-col gap-6">
      
      {/* Basic Metadata */}
      <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
        <h2 className="font-serif text-lg font-semibold text-bark mb-4">Blog Article Details</h2>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Title *</label>
              <input required className={inputClass} value={form.title}
                onChange={e => set('title', e.target.value)} placeholder="e.g. Kedarnath Yatra Guide" />
            </div>
            <div>
              <label className={labelClass}>Slug (URL key) *</label>
              <input required className={inputClass} value={form.slug}
                onChange={e => set('slug', e.target.value)} placeholder="e.g. kedarnath-yatra-guide"
                disabled={isEdit} />
            </div>
          </div>

          <div>
            <label className={labelClass}>Summary (Short Snippet) *</label>
            <input required className={inputClass} value={form.summary}
              onChange={e => set('summary', e.target.value)} placeholder="Short overview for listings and card previews" />
          </div>

          <div>
            <label className={labelClass}>Introduction Paragraph *</label>
            <textarea required className={textareaClass} value={form.introduction}
              onChange={e => set('introduction', e.target.value)} 
              placeholder="First introductory paragraph before the table of contents. Support simple bold (**text**) and markdown links ([label](url))." />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Categories (comma-separated)</label>
              <input className={inputClass} value={form.categories}
                onChange={e => set('categories', e.target.value)} placeholder="e.g. Pilgrimage, Garhwal, Chota Char Dham" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={labelClass}>Sort Order</label>
                <input type="number" className={inputClass} value={form.order}
                  onChange={e => set('order', Number(e.target.value))} />
              </div>
              <div className="flex items-end pb-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.isActive}
                    onChange={e => set('isActive', e.target.checked)}
                    className="w-4 h-4 accent-forest" />
                  <span className="text-sm font-medium text-bark">Publish immediately</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wikipedia Infobox */}
      <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-serif text-lg font-semibold text-bark">Wikipedia Infobox</h2>
          <button type="button" onClick={addInfoboxItem} className="text-xs text-forest font-semibold hover:underline">
            + Add Row
          </button>
        </div>
        <p className="text-xs text-stone mb-4">Crucial travel facts displayed in the right-floating panel (e.g. Key: &quot;Elevation&quot;, Value: &quot;3,583 m&quot;).</p>
        
        <div className="flex flex-col gap-3">
          {form.infobox.map((item, idx) => (
            <div key={idx} className="flex gap-3 items-center">
              <input className={`${inputClass} flex-1`} placeholder="Fact label (e.g. Best Time to Visit)"
                value={item.key} onChange={e => updateInfoboxItem(idx, 'key', e.target.value)} />
              <input className={`${inputClass} flex-[1.5]`} placeholder="Fact detail (e.g. May to October)"
                value={item.value} onChange={e => updateInfoboxItem(idx, 'value', e.target.value)} />
              <button type="button" onClick={() => removeInfoboxItem(idx)}
                className="text-stone hover:text-red-500 text-xs px-2" title="Delete row">
                ✕
              </button>
            </div>
          ))}
          {form.infobox.length === 0 && (
            <button type="button" onClick={addInfoboxItem} className="text-sm border-2 border-dashed border-mist-dark py-4 text-center text-stone hover:border-forest hover:text-forest transition-colors rounded-lg">
              + Click to add travel wiki infobox facts
            </button>
          )}
        </div>
      </div>

      {/* Sections List */}
      <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-serif text-lg font-semibold text-bark">Article Sections</h2>
          <button type="button" onClick={addSection} className="text-xs text-forest font-semibold hover:underline">
            + Add Section
          </button>
        </div>
        <p className="text-xs text-stone mb-4">Structure the body of your wiki article. Each section gets its own heading and Table of Contents link.</p>

        <div className="flex flex-col gap-5">
          {form.sections.map((sec, idx) => (
            <div key={idx} className="border border-border rounded-xl p-4 bg-mist/20 flex flex-col gap-3 relative group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone">Section #{idx + 1}</span>
                <div className="flex gap-2">
                  <button type="button" onClick={() => moveSection(idx, 'up')}
                    disabled={idx === 0}
                    className="text-stone hover:text-bark disabled:opacity-30 text-xs px-1">
                    ↑ Up
                  </button>
                  <button type="button" onClick={() => moveSection(idx, 'down')}
                    disabled={idx === form.sections.length - 1}
                    className="text-stone hover:text-bark disabled:opacity-30 text-xs px-1">
                    ↓ Down
                  </button>
                  <button type="button" onClick={() => removeSection(idx)}
                    className="text-stone hover:text-red-500 text-xs px-1 ml-2">
                    Delete
                  </button>
                </div>
              </div>

              <div>
                <input required className={`${inputClass} font-semibold`} placeholder="Section Title (e.g. History & Mythology)"
                  value={sec.heading} onChange={e => updateSection(idx, 'heading', e.target.value)} />
              </div>
              <div>
                <textarea required className={textareaClass} placeholder="Write section body here... Supports bold (**text**), lists (starting lines with * or -), and markdown links ([label](url))."
                  value={sec.body} onChange={e => updateSection(idx, 'body', e.target.value)} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cloudinary Images */}
      <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
        <h2 className="font-serif text-lg font-semibold text-bark mb-1">Photos</h2>
        <p className="text-xs text-stone mb-4">Upload pictures for the wiki. The first image will be used for the list preview and the main infobox header.</p>
        <ImageUploader images={images} onChange={setImages} />
      </div>

      {error && <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3 shadow-sm">{error}</p>}

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button type="submit" disabled={saving}
          className="bg-forest hover:bg-forest-light disabled:opacity-60 text-white font-semibold px-6 py-[10px] rounded-lg transition-colors cursor-pointer">
          {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Blog Post'}
        </button>
        <button type="button" onClick={() => router.back()}
          className="text-sm text-stone border border-border px-5 py-[10px] rounded-lg hover:bg-mist transition-colors cursor-pointer">
          Cancel
        </button>
      </div>
    </form>
  )
}
