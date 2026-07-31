"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/components/Logo";
import Container from "@/components/Container";

const links = [
  { href: "/", label: "Home" },
  { href: "/library", label: "Library" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-frost/[0.06] bg-void/70 backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between">
        <Link
          href="/"
          className="focus-ring flex items-center gap-3"
          aria-label="PERCEPTA LAB — inicio"
        >
          <Logo />
          <span className="flex flex-col leading-none">
            <span className="text-[13px] font-semibold tracking-[0.22em] text-frost">
              PERCEPTA
            </span>
            <span className="text-[9px] font-medium tracking-[0.18em] text-haze/70">
              DISEÑAMOS PERCEPCIÓN
            </span>
          </span>
        </Link>

        <nav aria-label="Navegación principal" className="hidden sm:block">
          <ul className="flex items-center gap-8">
            {links.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "focus-ring relative text-sm font-medium tracking-tight transition-colors duration-200",
                      active ? "text-frost" : "text-haze hover:text-frost"
                    )}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute -bottom-[29px] left-0 h-px w-full bg-signal" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="focus-ring flex h-10 w-10 items-center justify-center rounded-full text-frost sm:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Navegación móvil"
            className="overflow-hidden border-t border-frost/[0.06] bg-void/95 backdrop-blur-xl sm:hidden"
          >
            <Container>
              <ul className="flex flex-col py-4">
                {links.map((link) => {
                  const active =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "focus-ring block py-3 text-base font-medium tracking-tight transition-colors duration-200",
                          active ? "text-frost" : "text-haze hover:text-frost"
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
