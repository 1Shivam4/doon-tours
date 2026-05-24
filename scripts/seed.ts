/**
 * Run with:  npx tsx scripts/seed.ts
 */
import { webcrypto } from 'crypto'
// Node 18 doesn't expose crypto globally — MongoDB driver needs it
if (!globalThis.crypto) (globalThis as any).crypto = webcrypto

import 'dotenv/config'
import mongoose from 'mongoose'
import Driver from '../lib/models/Driver'
import Car from '../lib/models/Car'
import Destination from '../lib/models/Destination'
import Testimonial from '../lib/models/Testimonial'
import SiteSettings from '../lib/models/SiteSettings'

const MONGODB_URI = process.env.MONGODB_URI!

async function seed() {
  await mongoose.connect(MONGODB_URI, { dbName: 'devbhumi' })
  console.log('Connected to MongoDB')

  // Clear existing data
  await Promise.all([
    Driver.deleteMany({}),
    Car.deleteMany({}),
    Destination.deleteMany({}),
    Testimonial.deleteMany({}),
    SiteSettings.deleteMany({}),
  ])
  console.log('Cleared existing data')

  // Drivers
  const [ramesh, vinod, deepak] = await Driver.insertMany([
    { name: 'Ramesh Kandpal',     initials: 'RK', experience: 12, trips: 340, languages: ['Hindi', 'English', 'Garhwali'] },
    { name: 'Vinod Negi',         initials: 'VN', experience: 7,  trips: 195, languages: ['Hindi', 'Kumaoni'] },
    { name: 'Deepak Singh Rawat', initials: 'DS', experience: 15, trips: 420, languages: ['Hindi', 'Garhwali', 'English'] },
  ])
  console.log('Seeded drivers')

  // Cars
  await Car.insertMany([
    {
      name: 'Toyota Innova Crysta',
      slug: 'toyota-innova-crysta',
      type: 'SUV',
      seats: 7,
      fuel: 'Diesel',
      pricePerDay: 3500,
      features: ['GPS Navigation', 'First Aid Kit', 'Music System', 'USB Charging', '4x4'],
      images: [],
      driver: ramesh._id,
      isAvailable: true,
    },
    {
      name: 'Maruti Swift Dzire',
      slug: 'maruti-swift-dzire',
      type: 'Sedan',
      seats: 4,
      fuel: 'Petrol',
      pricePerDay: 1800,
      features: ['AC', 'Music System', 'USB Charging'],
      images: [],
      driver: vinod._id,
      isAvailable: true,
    },
    {
      name: 'Force Tempo Traveller',
      slug: 'force-tempo-traveller',
      type: 'Tempo Traveller',
      seats: 12,
      fuel: 'Diesel',
      pricePerDay: 6500,
      features: ['AC', 'Push-back Seats', 'Music System', 'Luggage Carrier', 'First Aid Kit'],
      images: [],
      driver: deepak._id,
      isAvailable: true,
    },
  ])
  console.log('Seeded cars')

  // Destinations
  await Destination.insertMany([
    { name: 'Kedarnath',        tag: 'Sacred Pilgrimage · 3583m',   image: '', order: 1, isActive: true },
    { name: 'Badrinath',        tag: 'Char Dham · 3133m',           image: '', order: 2, isActive: true },
    { name: 'Valley of Flowers',tag: 'UNESCO Heritage · Trek',       image: '', order: 3, isActive: true },
    { name: 'Auli',             tag: 'Skiing · 2519m',               image: '', order: 4, isActive: true },
    { name: 'Rishikesh',        tag: 'Gateway to Himalayas',         image: '', order: 5, isActive: true },
    { name: 'Mussoorie',        tag: 'Hill Station · 2005m',         image: '', order: 6, isActive: true },
  ])
  console.log('Seeded destinations')

  // Testimonials
  await Testimonial.insertMany([
    {
      quote: 'Ramesh knew every turn on the Kedarnath route. The Innova was spotless and we reached safely despite bad weather.',
      authorName: 'Ankit Sharma',
      location: 'Delhi · Char Dham Yatra',
      avatarInitials: 'AS',
      isApproved: true,
      order: 1,
    },
    {
      quote: 'Booked a Tempo Traveller for our family of 10. The driver was patient, knowledgeable and made the whole trip memorable.',
      authorName: 'Priya Mehta',
      location: 'Mumbai · Valley of Flowers',
      avatarInitials: 'PM',
      isApproved: true,
      order: 2,
    },
    {
      quote: 'Honest pricing, responsive on WhatsApp, and a driver who genuinely loves these mountains. Will book again.',
      authorName: 'Rohan Srivastava',
      location: 'Lucknow · Auli Trip',
      avatarInitials: 'RS',
      isApproved: true,
      order: 3,
    },
  ])
  console.log('Seeded testimonials')

  // SiteSettings (singleton)
  await SiteSettings.create({
    packagesEnabled:   false,
    guesthouseEnabled: false,
    whatsappNumber:    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '',
    phone:             '+91 85328 05298',
    email:             'hello@devbhumitravels.com',
    address:           'Rishikesh, Uttarakhand, India — 249201',
    businessName:      'DevBhumi Travels',
    tagline:           'Uttarakhand Tours & Travels',
  })
  console.log('Seeded site settings')

  await mongoose.disconnect()
  console.log('Done.')
}

seed().catch(err => {
  console.error(err)
  process.exit(1)
})
