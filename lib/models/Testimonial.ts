import { Schema, model, models, InferSchemaType } from 'mongoose'

const TestimonialSchema = new Schema(
  {
    quote:          { type: String, required: true },
    authorName:     { type: String, required: true, trim: true },
    location:       { type: String, required: true },           // "Delhi · Char Dham Yatra"
    avatarInitials: { type: String, required: true, maxlength: 3, uppercase: true },
    isApproved:     { type: Boolean, default: false },
    order:          { type: Number, default: 0 },
  },
  { timestamps: true }
)

export type ITestimonial = InferSchemaType<typeof TestimonialSchema>

const Testimonial = models.Testimonial ?? model('Testimonial', TestimonialSchema)
export default Testimonial
