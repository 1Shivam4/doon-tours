"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface NavLink {
  label: string;
  href: string;
}

interface Props {
  links: NavLink[];
  whatsappNumber: string;
  businessName: string;
}

export default function NavbarClient({
  links,
  whatsappNumber,
  businessName,
}: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const waHref = `https://wa.me/${whatsappNumber}`;

  const dark = !scrolled;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        dark ? "bg-transparent" : "bg-snow border-b border-border shadow-sm"
      }`}
    >
      <div className="max-w-[1280px] mx-auto h-full flex items-center justify-between px-6 md:px-8 relative">
        {/* Logo */}
        <Link
          href="/"
          className="relative z-50 transition-transform duration-300 self-start"
        >
          {dark ? (
            <div
              className="bg-white text-black font-serif flex flex-col items-center justify-center pt-2 pb-6 px-4 shadow-lg select-none"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)",
                minWidth: "55px",
                borderBottom: "none",
              }}
            >
              <div className="text-xl font-bold tracking-widest leading-none mb-1 text-slate-900">
                H
              </div>
              <div className="text-[7px] uppercase tracking-wider font-semibold text-slate-500">
                Journey
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center pt-2">
              <Image
                src="/dev-bhoomi_logo.png"
                alt="logo"
                height={100}
                width={100}
                priority
                className="object-contain"
              />
            </div>
          )}
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8">
          {dark ? (
            <>
              <Link
                href="/"
                className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white hover:text-white/80 transition-colors"
              >
                HOME
              </Link>
              <Link
                href="/about"
                className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/80 hover:text-white transition-colors"
              >
                ABOUT
              </Link>
              <Link
                href="#testimonials"
                className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/80 hover:text-white transition-colors"
              >
                TESTIMONIALS
              </Link>
            </>
          ) : (
            links.map(({ label, href }) => {
              const active =
                pathname === href ||
                (href !== "/" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={`text-[11px] font-semibold tracking-[0.14em] uppercase transition-colors pb-1 ${
                    active
                      ? "text-bark border-b border-saffron"
                      : "text-stone hover:text-bark"
                  }`}
                >
                  {label}
                </Link>
              );
            })
          )}
        </nav>

        {/* Desktop CTA */}
        {!dark && (
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 bg-saffron hover:bg-saffron-light text-white text-[11px] font-semibold px-5 py-[9px] rounded-md transition-colors tracking-[0.05em] uppercase"
          >
            WhatsApp Us ↗
          </a>
        )}

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className={`md:hidden p-2 rounded-md transition-colors ${dark ? "text-white" : "text-bark"}`}
          aria-label="Toggle menu"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {menuOpen ? (
              <>
                <line x1="4" y1="4" x2="18" y2="18" />
                <line x1="18" y1="4" x2="4" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="19" y2="7" />
                <line x1="3" y1="11" x2="19" y2="11" />
                <line x1="3" y1="15" x2="19" y2="15" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-forest border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium transition-colors ${
                pathname === href
                  ? "text-white"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex justify-center items-center gap-2 bg-saffron text-white text-sm font-semibold px-5 py-3 rounded-md"
          >
            WhatsApp Us ↗
          </a>
        </div>
      )}
    </header>
  );
}
