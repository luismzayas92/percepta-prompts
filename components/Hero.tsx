"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Prompt } from "@/types/prompt";
import Container from "@/components/Container";
import Section from "@/components/Section";
import CopyButton from "@/components/CopyButton";
import ShareButton from "@/components/ShareButton";
import CompatibilityBadges from "@/components/CompatibilityBadges";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero({ prompt, shareUrl }: { prompt: Prompt; shareUrl: string }) {
  return (
    <Section>
      <Container>
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <p className="mb-5 text-xs font-medium tracking-[0.22em] text-haze">
              {prompt.category.toUpperCase()}
            </p>
            <h1 className="text-balance text-5xl font-bold leading-[1.05] tracking-tight text-frost sm:text-6xl">
              {prompt.title}
            </h1>
            <p className="mt-6 max-w-md text-balance text-lg leading-relaxed text-haze">
              {prompt.subtitle ?? prompt.description}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <CopyButton text={prompt.prompt} />
              <ShareButton url={shareUrl} title={prompt.title} />
            </div>

            <CompatibilityBadges models={prompt.compatibleAI} className="mt-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="relative"
          >
            <div className="glass relative aspect-[4/5] w-full overflow-hidden rounded-3xl">
              <Image
                src={prompt.previewImage}
                alt={prompt.title}
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
