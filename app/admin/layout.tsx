import { isAdmin } from '@/lib/auth'
import { getSettings } from '@/lib/getSettings'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authenticated = await isAdmin()

  // Login page: no sidebar — middleware handles redirect for other pages
  if (!authenticated) {
    return <>{children}</>
  }

  const settings = await getSettings()

  return (
    <div className="flex min-h-screen bg-[#f4f5f7]">
      <AdminSidebar
        packagesEnabled={settings.packagesEnabled}
        guesthouseEnabled={settings.guesthouseEnabled}
      />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
