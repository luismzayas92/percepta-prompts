"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

  return (
    <header className="sticky top-0 z-50 border-b border-frost/[0.06] bg-void/70 backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between">
        <Link
          href="/"
          className="focus-ring flex items-center gap-3"
          aria-label="PERCEPTA PROMPTS — inicio"
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

        <nav aria-label="Navegación principal">
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
      </Container>
    </header>
  );
}
