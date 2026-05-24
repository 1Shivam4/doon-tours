import { Schema, model, models, Types, InferSchemaType } from 'mongoose'

const CarSchema = new Schema(
  {
    name:        { type: String, required: true, trim: true },
    slug:        { type: String, required: true, unique: true, lowercase: true },
    type:        { type: String, enum: ['SUV', 'Sedan', 'Tempo Traveller', 'Other'], required: true },
    seats:       { type: Number, required: true, min: 1 },
    fuel:        { type: String, enum: ['Diesel', 'Petrol', 'CNG', 'Electric'], required: true },
    pricePerDay: { type: Number, required: true, min: 0 },
    features:    { type: [String], default: [] },
    images:      { type: [String], default: [] },
    driver:      { type: Types.ObjectId, ref: 'Driver', default: null },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export type ICar = InferSchemaType<typeof CarSchema>

const Car = models.Car ?? model('Car', CarSchema)
export default Car
