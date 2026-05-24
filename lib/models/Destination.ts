import { Schema, model, models, InferSchemaType } from 'mongoose'

const DestinationSchema = new Schema(
  {
    name:     { type: String, required: true, trim: true },
    tag:      { type: String, required: true },               // "Sacred Pilgrimage · 3583m"
    image:    { type: String, default: '' },                  // Cloudinary URL
    order:    { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export type IDestination = InferSchemaType<typeof DestinationSchema>

const Destination = models.Destination ?? model('Destination', DestinationSchema)
export default Destination
