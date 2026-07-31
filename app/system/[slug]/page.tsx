import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Clock, Gauge, Download } from "lucide-react";
import Container from "@/components/Container";
import Section from "@/components/Section";
import PromptAccordion from "@/components/PromptAccordion";
import CopyButton from "@/components/CopyButton";
import ShareButton from "@/components/ShareButton";
import BuyButton from "@/components/BuyButton";
import CompatibilityBadges from "@/components/CompatibilityBadges";
import TierBadge from "@/components/TierBadge";
import FAQAccordion from "@/components/FAQAccordion";
import HowToUse from "@/components/HowToUse";
import SystemCard from "@/components/SystemCard";
import { getAllSlugs, getSystemBySlug, getRelatedSystems } from "@/lib/systems";
import { PRICING, formatPrice } from "@/lib/pricing";
import { SITE_URL } from "@/lib/site";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const system = getSystemBySlug(slug);

  if (!system) {
    return { title: "System no encontrado" };
  }

  const url = `${SITE_URL}/system/${system.slug}`;

  return {
    title: system.title,
    description: system.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: `${system.title} — PERCEPTA LAB`,
      description: system.description,
      images: [{ url: system.previewImage, width: 1000, height: 1250, alt: system.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${system.title} — PERCEPTA LAB`,
      description: system.description,
      images: [system.previewImage],
    },
  };
}

export default async function SystemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const system = getSystemBySlug(slug);

  if (!system) {
    notFound();
  }

  const isFree = system.tier === "free";
  const related = getRelatedSystems(system.slug, 3);

  return (
    <>
      <Section className="pb-0 pt-16">
        <Container>
          <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2 lg:gap-20">
            <div className="lg:sticky lg:top-28">
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
            </div>

            <div>
              <div className="mb-5 flex items-center gap-3">
                <p className="text-xs font-medium tracking-[0.22em] text-haze">
                  {system.category.toUpperCase()}
                </p>
                <TierBadge tier={system.tier} />
              </div>
              <h1 className="text-balance text-4xl font-bold leading-[1.08] tracking-tight text-frost sm:text-5xl">
                {system.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-haze">
                {system.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-sm text-haze">
                  <Gauge className="h-4 w-4 text-teal" strokeWidth={2} />
                  Nivel: <span className="text-frost">{system.level}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-haze">
                  <Clock className="h-4 w-4 text-teal" strokeWidth={2} />
                  Tiempo estimado: <span className="text-frost">{system.estimatedTime}</span>
                </div>
              </div>

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
                <ShareButton
                  url={`${SITE_URL}/system/${system.slug}`}
                  title={system.title}
                />
              </div>

              <CompatibilityBadges models={system.compatibleAI} className="mt-10" />

              <div className="mt-10">
                <h2 className="mb-4 text-sm font-semibold tracking-tight text-frost">
                  Qué incluye
                </h2>
                <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {system.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-haze"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-teal"
                        strokeWidth={2}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <PromptAccordion
                  prompt={system.prompt}
                  negativePrompt={system.negativePrompt}
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <HowToUse />

      {system.faq.length > 0 && (
        <Section className="pt-0">
          <Container>
            <div className="mx-auto max-w-2xl">
              <p className="mb-8 text-xs font-medium tracking-[0.22em] text-haze">
                PREGUNTAS FRECUENTES
              </p>
              <FAQAccordion items={system.faq} />
            </div>
          </Container>
        </Section>
      )}

      {related.length > 0 && (
        <Section className="pt-0">
          <Container>
            <p className="mb-8 text-xs font-medium tracking-[0.22em] text-haze">
              TAMBIÉN TE PUEDE INTERESAR
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s, i) => (
                <SystemCard key={s.id} system={s} index={i} />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
