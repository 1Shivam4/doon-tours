import { Schema, model, models, InferSchemaType } from 'mongoose'

const BlogSectionSchema = new Schema({
  heading: { type: String, required: true },
  body:    { type: String, required: true }
})

const InfoboxItemSchema = new Schema({
  key:   { type: String, required: true },
  value: { type: String, required: true }
})

const BlogSchema = new Schema(
  {
    title:        { type: String, required: true, trim: true },
    slug:         { type: String, required: true, unique: true, trim: true },
    summary:      { type: String, required: true },
    introduction: { type: String, required: true },
    sections:     [BlogSectionSchema],
    infobox:      [InfoboxItemSchema],
    images:       { type: [String], default: [] },
    categories:   { type: [String], default: [] },
    isActive:     { type: Boolean, default: true },
    order:        { type: Number, default: 0 }
  },
  { timestamps: true }
)

export type IBlog = InferSchemaType<typeof BlogSchema>

const Blog = models.Blog ?? model('Blog', BlogSchema)
export default Blog
