import mongoose, { Schema, model, models, InferSchemaType } from 'mongoose'

const DriverSchema = new Schema(
  {
    name:       { type: String, required: true, trim: true },
    initials:   { type: String, required: true, maxlength: 3, uppercase: true },
    experience: { type: Number, required: true, min: 0 },
    trips:      { type: Number, default: 0, min: 0 },
    languages:  { type: [String], default: ['Hindi'] },
  },
  { timestamps: true }
)

export type IDriver = InferSchemaType<typeof DriverSchema>

const Driver = models.Driver ?? model('Driver', DriverSchema)
export default Driver
