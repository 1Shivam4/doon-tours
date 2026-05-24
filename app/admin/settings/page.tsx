import { getSettings } from '@/lib/getSettings'
import SettingsForm from './SettingsForm'

export default async function AdminSettingsPage() {
  const settings = await getSettings()

  const initial = {
    packagesEnabled:   settings.packagesEnabled,
    guesthouseEnabled: settings.guesthouseEnabled,
    businessName:      settings.businessName  || '',
    tagline:           settings.tagline       || '',
    whatsappNumber:    settings.whatsappNumber|| '',
    phone:             settings.phone         || '',
    email:             settings.email         || '',
    address:           settings.address       || '',
  }

  return (
    <div className="p-8">
      <h1 className="font-serif text-3xl font-semibold text-bark mb-1">Settings</h1>
      <p className="text-sm text-stone mb-8">Manage feature toggles, contact details, and business info.</p>
      <SettingsForm initial={initial} />
    </div>
  )
}
