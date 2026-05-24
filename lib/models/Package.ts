import { Schema, model, models, InferSchemaType } from 'mongoose'

const PackageSchema = new Schema(
  {
    title:        { type: String, required: true, trim: true },
    slug:         { type: String, required: true, unique: true, lowercase: true },
    description:  { type: String, required: true },
    duration:     { type: String, required: true },          // e.g. "5 Days / 4 Nights"
    destinations: { type: [String], default: [] },
    price:        { type: Number, required: true, min: 0 },
    inclusions:   { type: [String], default: [] },
    exclusions:   { type: [String], default: [] },
    images:       { type: [String], default: [] },
    isActive:     { type: Boolean, default: true },
    order:        { type: Number, default: 0 },
  },
  { timestamps: true }
)

export type IPackage = InferSchemaType<typeof PackageSchema>

const Package = models.Package ?? model('Package', PackageSchema)
export default Package
