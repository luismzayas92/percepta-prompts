"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import type { System } from "@/types/system";
import Container from "@/components/Container";
import Section from "@/components/Section";
import CopyButton from "@/components/CopyButton";
import ShareButton from "@/components/ShareButton";
import BuyButton from "@/components/BuyButton";
import CompatibilityBadges from "@/components/CompatibilityBadges";
import TierBadge from "@/components/TierBadge";
import { PRICING, formatPrice } from "@/lib/pricing";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero({ system, shareUrl }: { system: System; shareUrl: string }) {
  const isFree = system.tier === "free";

  return (
    <Section>
      <Container>
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="mb-5 flex items-center gap-3">
              <p className="text-xs font-medium tracking-[0.22em] text-haze">
                {system.category.toUpperCase()}
              </p>
              <TierBadge tier={system.tier} />
            </div>
            <h1 className="text-balance text-5xl font-bold leading-[1.05] tracking-tight text-frost sm:text-6xl">
              {system.title}
            </h1>
            <p className="mt-6 max-w-md text-balance text-lg leading-relaxed text-haze">
              {system.subtitle ?? system.description}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              {isFree ? (
                <>
                  <Link
                    href={`/download/${system.slug}`}
                    className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-signal px-6 py-3.5 text-sm font-semibold tracking-tight text-frost shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset,0_8px_24px_-8px_rgba(94,124,224,0.55)] transition-all duration-300 hover:brightness-[1.08]"
                  >
                    <Download className="h-4 w-4" strokeWidth={2.5} />
                    Descargar gratis
                  </Link>
                  <CopyButton text={system.prompt} variant="inline" label="Copiar Demo" />
                </>
              ) : (
                <BuyButton
                  slug={system.slug}
                  label={`Comprar System — ${formatPrice(PRICING.systemIndividual)}`}
                />
              )}
              <ShareButton url={shareUrl} title={system.title} />
            </div>

            <CompatibilityBadges models={system.compatibleAI} className="mt-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="relative"
          >
            <div className="glass relative aspect-[4/5] w-full overflow-hidden rounded-3xl">
              <Image
                src={system.previewImage}
                alt={system.title}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/40 via-transparent to-transparent" />
            </div>
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-sandy/10 blur-3xl" />
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
