import { connectDB } from './db'
import SiteSettings, { type ISiteSettings } from './models/SiteSettings'

export type Settings = ISiteSettings & { _id: string }

export async function getSettings(): Promise<Settings> {
  await connectDB()
  let doc = await SiteSettings.findOne().lean<Settings>()
  if (!doc) {
    const created = await SiteSettings.create({})
    doc = created.toObject() as Settings
  }
  return doc
}
