import { Schema, model, models, InferSchemaType } from 'mongoose'

const RoomSchema = new Schema(
  {
    type:      { type: String, required: true },              // "Deluxe Double", "Family Suite"
    capacity:  { type: Number, required: true, min: 1 },
    price:     { type: Number, required: true, min: 0 },
    amenities: { type: [String], default: [] },
    images:    { type: [String], default: [] },
  },
  { _id: false }
)

const GuesthouseSchema = new Schema(
  {
    name:            { type: String, required: true, trim: true },
    description:     { type: String, required: true },
    location:        { type: String, required: true },
    pricePerNight:   { type: Number, required: true, min: 0 },
    rooms:           { type: [RoomSchema], default: [] },
    amenities:       { type: [String], default: [] },
    images:          { type: [String], default: [] },
    isActive:        { type: Boolean, default: true },
  },
  { timestamps: true }
)

export type IGuesthouse = InferSchemaType<typeof GuesthouseSchema>

const Guesthouse = models.Guesthouse ?? model('Guesthouse', GuesthouseSchema)
export default Guesthouse
