export interface DriverData {
  _id: string
  name: string
  initials: string
  experience: number
  trips: number
  languages: string[]
}

export interface CarData {
  _id: string
  name: string
  slug: string
  type: string
  seats: number
  fuel: string
  pricePerDay: number
  features: string[]
  images: string[]
  driver: DriverData | null
  isAvailable: boolean
}

export interface DestinationData {
  _id: string
  name: string
  tag: string
  image: string
  order: number
}

export interface TestimonialData {
  _id: string
  quote: string
  authorName: string
  location: string
  avatarInitials: string
  isApproved: boolean
}

export interface PackageData {
  _id: string
  title: string
  slug: string
  description: string
  duration: string
  destinations: string[]
  price: number
  inclusions: string[]
  exclusions: string[]
  images: string[]
  isActive: boolean
  order: number
}
