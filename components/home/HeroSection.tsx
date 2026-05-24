"use client";

import { useState } from "react";
import Link from "next/link";
import "./home.css"

interface Props {
  waNumber: string;
}

export default function HeroSection({ waNumber }: Props) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const waHref = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    "Hi! I would like to get a quick quote for a cab service in Uttarakhand.",
  )}`;

  const packagesHref = "/packages";

  return (
    <section className="hero-section" aria-label="Hero">
      {/* Background image */}
      <div className="hero-bg" />

      {/* Dark overlays for text contrast */}
      <div className="hero-overlay-left" />
      <div className="hero-overlay-bottom" />

      {/* Vertical "Plan Your Trip" side label */}
      <div className="hero-side-label" aria-hidden="true">
        <span>Plan Your Trip</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="hero-side-label-icon"
        >
          <rect
            x="2"
            y="2"
            width="5"
            height="5"
            rx="1"
            fill="currentColor"
            opacity="0.6"
          />
          <rect x="9" y="2" width="5" height="5" rx="1" fill="currentColor" />
          <rect x="2" y="9" width="5" height="5" rx="1" fill="currentColor" />
          <rect
            x="9"
            y="9"
            width="5"
            height="5"
            rx="1"
            fill="currentColor"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Main hero content */}
      <div className="hero-content">
        {/* Spacer for fixed navbar */}
        <div style={{ height: "var(--nav-height, 72px)" }} />

        <div className="hero-body">
          {/* Script / cursive sub-heading */}
          <p className="hero-script">Explore Uttarakhand</p>

          {/* Main bold headline */}
          <h1 className="hero-headline">
            Safe Rides, Scenic
            <br />
            Routes, Sacred
            <br />
            <span className="hero-headline-gold">Journeys</span>
          </h1>

          {/* Sub-description */}
          <p className="hero-desc">
            Reliable cab service for Char Dham Yatra, tourist
            <br className="hero-desc-br" />
            destinations and hidden gems of Uttarakhand.
          </p>

          {/* Feature badges */}
          <div className="hero-badges">
            <div className="hero-badge">
              <span className="hero-badge-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle
                    cx="11"
                    cy="11"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M7 11l3 3 5-5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span>
                <strong>Verified Drivers</strong>
                <br />
                <small>Safe &amp; Professional</small>
              </span>
            </div>
            <div className="hero-badge">
              <span className="hero-badge-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path
                    d="M11 2L4 8v12h14V8L11 2z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 14c0-1.66 1.34-3 3-3s3 1.34 3 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span>
                <strong>Hill Expertise</strong>
                <br />
                <small>Local Route Knowledge</small>
              </span>
            </div>
            <div className="hero-badge">
              <span className="hero-badge-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle
                    cx="11"
                    cy="11"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <text
                    x="11"
                    y="15"
                    textAnchor="middle"
                    fontSize="7"
                    fontWeight="bold"
                    fill="currentColor"
                  >
                    24/7
                  </text>
                </svg>
              </span>
              <span>
                <strong>24/7 Support</strong>
                <br />
                <small>Always with you</small>
              </span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hero-ctas">
            <Link href={packagesHref} className="hero-btn-primary">
              Explore Packages &nbsp;→
            </Link>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn-secondary"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ flexShrink: 0 }}
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              &nbsp;Get a Quick Quote
            </a>
          </div>
        </div>

        {/* Booking bar */}
        <div className="hero-booking-bar">
          <div className="hero-booking-label">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              style={{ flexShrink: 0 }}
            >
              <rect x="3" y="11" width="18" height="10" rx="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
              <circle cx="12" cy="16" r="1.5" fill="currentColor" />
            </svg>
            <span>
              <strong>Book Your Ride</strong>
              <br />
              <small>Simple, Transparent &amp; Hassle-free</small>
            </span>
          </div>

          <div className="hero-booking-divider" />

          <div className="hero-booking-field">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f5a623"
              strokeWidth="2"
            >
              <circle cx="12" cy="10" r="3" />
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            </svg>
            <div className="hero-booking-field-inner">
              <span className="hero-booking-field-label">From</span>
              <input
                id="hero-from"
                type="text"
                placeholder="Pickup Location"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="hero-booking-input"
                aria-label="Pickup location"
              />
            </div>
          </div>

          <div className="hero-booking-arrow" aria-hidden="true">
            →
          </div>

          <div className="hero-booking-field">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f5a623"
              strokeWidth="2"
            >
              <circle cx="12" cy="10" r="3" />
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            </svg>
            <div className="hero-booking-field-inner">
              <span className="hero-booking-field-label">To</span>
              <input
                id="hero-to"
                type="text"
                placeholder="Drop Location"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="hero-booking-input"
                aria-label="Drop location"
              />
            </div>
          </div>

          <div className="hero-booking-divider" />

          <div className="hero-booking-field">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f5a623"
              strokeWidth="2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <div className="hero-booking-field-inner">
              <span className="hero-booking-field-label">Date</span>
              <input
                id="hero-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="hero-booking-input"
                aria-label="Travel date"
                placeholder="Pick a date"
              />
            </div>
          </div>

          <button
            className="hero-booking-btn"
            onClick={() => {
              const msg = `Hi! I want to book a cab.\nFrom: ${from || "?"}\nTo: ${to || "?"}\nDate: ${date || "?"}`;
              window.open(
                `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`,
                "_blank",
              );
            }}
            aria-label="Search cabs"
          >
            Search Cabs &nbsp;→
          </button>
        </div>

        {/* Booking bar sub-tags */}
        <div className="hero-booking-tags">
          <span>✓ One Way / Round Trip</span>
          <span className="hero-tag-dot">·</span>
          <span>✓ Outstation Packages</span>
          <span className="hero-tag-dot">·</span>
          <span>✓ Custom Itineraries</span>
        </div>
      </div>
    </section>
  );
}
