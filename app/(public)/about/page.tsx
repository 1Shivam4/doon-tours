import Link from "next/link";
import type { Metadata } from "next";
import { getSettings } from "@/lib/getSettings";
import PageHero from "@/components/PageHero";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://devbhumitravels.com";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "DevBhumi Travels — your trusted local guide to the Himalayas. Based in Uttarakhand, built on a decade of mountain road experience.",
  alternates: { canonical: `${BASE_URL}/about` },
};

const values = [
  {
    icon: "🏔️",
    title: "Local Vetted Network",
    body: "We are your dedicated travel partner in Uttarakhand. We connect you directly with a hand-selected network of certified hill drivers, cozy guesthouses, and organic farmhouses.",
  },
  {
    icon: "🚗",
    title: "Fleet & Safety Vetting",
    body: "All vehicles in our network—from Innovas to Tempo Travellers—are rigorously inspected. Our drivers are Himalayan locals who understand mountain terrain and prioritize safety.",
  },
  {
    icon: "🏡",
    title: "Curated Homestays & Stays",
    body: "We partner directly with family-run guesthouses and organic farmhouses, ensuring you experience genuine Kumaoni and Garhwali hospitality with guaranteed hygiene.",
  },
  {
    icon: "🗺️",
    title: "Custom Packages & B2B Partner",
    body: "From sacred Char Dham Yatras to off-grid treks, we design customized itineraries. We act as your on-ground travel agent and partner, offering direct, friction-free pricing.",
  },
];

const milestones = [
  {
    year: "2026",
    event:
      "Launched the unified DevBhumi Travels online portal to coordinate regional drivers, cozy guesthouses, and organic farmhouses.",
  },
  {
    year: "2026",
    event:
      "Partnered with over 50+ local farmhouses and mountain guesthouses across Garhwal & Kumaon.",
  },
  {
    year: "2026",
    event:
      "Introduced customized pilgrimage, family, and adventure packages with transparent, agent-direct pricing.",
  },
  {
    year: "2026",
    event:
      "Launched a frictionless WhatsApp enquiry system to connect travelers directly to local guides.",
  },
];

export default async function AboutPage() {
  const settings = await getSettings();
  const waNumber =
    settings.whatsappNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const waHref = waNumber
    ? `https://wa.me/${waNumber}?text=${encodeURIComponent("Hi! I would like to enquire about travel packages and stays with DevBhumi Travels.")}`
    : "#";

  return (
    <div>
      <PageHero
        badge="Our Vision for 2026"
        title={`Your Local Travel Partner\nin Uttarakhand.`}
        subtitle="DevBhumi Travels is a modern booking platform connecting you with Uttarakhand's finest drivers, rustic farmhouses, cozy guesthouses, and customized itineraries."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]}
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=80"
      />

      {/* Story */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="font-serif text-[clamp(28px,3.5vw,40px)] font-semibold text-bark leading-[1.2] mb-5">
              Connecting you directly to the soul of the Himalayas
            </h2>
            <div className="flex flex-col gap-4 text-[15px] text-stone leading-[1.8]">
              <p>
                Launched in 2026, DevBhumi Travels was created to bridge the gap
                between travelers and authentic local hospitality. Instead of
                dealing with multi-layered booking agencies and markup fees, we
                serve as your direct travel partner, connecting you with
                verified drivers, homestays, and tour itineraries.
              </p>
              <p>
                We believe travel should benefit local communities. That&lsquo;s
                why we partner directly with independent hill drivers who know
                the safest routes, and family-run guesthouses and organic
                farmhouses situated in remote valleys. By booking with us, you
                support local livelihoods while enjoying a highly personalized,
                safe, and authentic mountain journey.
              </p>
              <p>
                Whether you are planning a sacred Char Dham pilgrimage, a family
                holiday to Mussoorie, or a trek to the Valley of Flowers, our
                network is ready to support you. We coordinate all logistics,
                provide clear quotes, and offer 24/7 support.
              </p>
              <p>
                Let us be your trusted on-ground partner. From your first
                enquiry to the final drop-off, we ensure every detail is handled
                with transparency, care, and local expertise.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="flex flex-col gap-0">
            {milestones.map((m, i) => (
              <div key={m.event} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-forest text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0">
                    26
                  </div>
                  {i < milestones.length - 1 && (
                    <div className="w-px flex-1 bg-mist-dark my-1" />
                  )}
                </div>
                <div className="pb-8">
                  <div className="text-[11px] font-semibold text-saffron tracking-wide mb-1">
                    {m.year}
                  </div>
                  <p className="text-[14px] text-stone leading-[1.65]">
                    {m.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-mist border-y border-border">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-16 md:py-24">
          <h2 className="font-serif text-[clamp(26px,3vw,36px)] font-semibold text-bark mb-2 text-center">
            Why travellers choose us
          </h2>
          <p className="text-stone text-center text-[15px] mb-12">
            The four things we never compromise on.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-xl p-6 border border-border"
              >
                <div className="text-3xl mb-4">{v.icon}</div>
                <div className="font-semibold text-bark text-[15px] mb-2">
                  {v.title}
                </div>
                <p className="text-[13px] text-stone leading-[1.7]">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { stat: "5,000+", label: "Journeys completed" },
            { stat: "10+", label: "Years on the road" },
            { stat: "15+", label: "Vehicles in fleet" },
            { stat: "4.9★", label: "Average rating" },
          ].map(({ stat, label }) => (
            <div key={label}>
              <div className="font-serif text-[clamp(36px,4vw,48px)] font-semibold text-forest leading-none mb-2">
                {stat}
              </div>
              <div className="text-[13px] text-stone">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-saffron">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-14 md:py-20 text-center">
          <h2 className="font-serif text-[clamp(28px,3.5vw,40px)] font-semibold text-white mb-4">
            Ready to plan your trip?
          </h2>
          <p className="text-white/80 text-[15px] mb-8 max-w-md mx-auto">
            Message us on WhatsApp — we respond within the hour and help you
            plan the whole route.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-forest text-sm font-semibold px-7 py-3 rounded-lg hover:bg-snow transition-colors"
            >
              Chat on WhatsApp
            </a>
            <Link
              href="/cars"
              className="border border-white text-white text-sm font-semibold px-7 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              Browse Our Fleet
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
