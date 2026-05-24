import CarForm from '@/components/admin/CarForm'

export default function AdminCarNewPage() {
  return (
    <div className="p-8">
      <h1 className="font-serif text-3xl font-semibold text-bark mb-1">Add Car</h1>
      <p className="text-sm text-stone mb-8">Add a new vehicle to your fleet.</p>
      <CarForm />
    </div>
  )
}
