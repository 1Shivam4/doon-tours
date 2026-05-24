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
      style={{ height: "var(--nav-height)" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        dark ? "bg-forest" : "bg-snow border-b border-border shadow-sm"
      }`}
    >
      <div className="max-w-[1280px] mx-auto h-full flex items-center justify-between px-6 md:px-8">
        {/* Logo */}
        <Link
          href="/"
          className={`font-serif text-[22px] font-semibold tracking-[0.01em] transition-colors flex gap-2 ${
            dark ? "text-white" : "text-bark"
          }`}
        >
          <Image
            src="/dev-bhoomi_logo.png"
            alt="logo"
            width={120}
            height={120}
            priority
          />
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ label, href }) => {
            const active =
              pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`text-sm font-normal relative transition-colors pb-1 ${
                  dark
                    ? active
                      ? "text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-saffron after:rounded-full"
                      : "text-white/70 hover:text-white"
                    : active
                      ? "text-bark font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-saffron after:rounded-full"
                      : "text-stone hover:text-bark"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 bg-saffron hover:bg-saffron-light text-white text-[13px] font-semibold px-5 py-[9px] rounded-md transition-colors tracking-[0.02em]"
        >
          WhatsApp Us ↗
        </a>

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
