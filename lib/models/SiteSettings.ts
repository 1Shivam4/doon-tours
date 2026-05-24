import { Schema, model, models, InferSchemaType } from 'mongoose'

// Singleton document — always query with findOne(), never findById()
const SiteSettingsSchema = new Schema(
  {
    packagesEnabled:   { type: Boolean, default: false },
    guesthouseEnabled: { type: Boolean, default: false },
    whatsappNumber:    { type: String, default: '' },
    phone:             { type: String, default: '' },
    email:             { type: String, default: '' },
    address:           { type: String, default: '' },
    businessName:      { type: String, default: 'DevBhumi Travels' },
    tagline:           { type: String, default: 'Uttarakhand Tours & Travels' },
  },
  { timestamps: true }
)

export type ISiteSettings = InferSchemaType<typeof SiteSettingsSchema>

const SiteSettings = models.SiteSettings ?? model('SiteSettings', SiteSettingsSchema)
export default SiteSettings
