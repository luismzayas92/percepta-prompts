import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import Section from "@/components/Section";
import PromptAccordion from "@/components/PromptAccordion";
import CopyButton from "@/components/CopyButton";
import ShareButton from "@/components/ShareButton";
import CompatibilityBadges from "@/components/CompatibilityBadges";
import HowToUse from "@/components/HowToUse";
import PromptCard from "@/components/PromptCard";
import { getAllPrompts, getAllSlugs, getPromptBySlug } from "@/lib/prompts";
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
  const prompt = getPromptBySlug(slug);

  if (!prompt) {
    return { title: "Prompt no encontrado" };
  }

  const url = `${SITE_URL}/p/${prompt.slug}`;

  return {
    title: prompt.title,
    description: prompt.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: `${prompt.title} — PERCEPTA PROMPTS™`,
      description: prompt.description,
      images: [{ url: prompt.previewImage, width: 1000, height: 1250, alt: prompt.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${prompt.title} — PERCEPTA PROMPTS™`,
      description: prompt.description,
      images: [prompt.previewImage],
    },
  };
}

export default async function PromptPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);

  if (!prompt) {
    notFound();
  }

  const related = getAllPrompts()
    .filter((p) => p.slug !== prompt.slug)
    .slice(0, 3);

  return (
    <>
      <Section className="pb-0 pt-16">
        <Container>
          <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2 lg:gap-20">
            <div className="lg:sticky lg:top-28">
              <div className="glass relative aspect-[4/5] w-full overflow-hidden rounded-3xl">
                <Image
                  src={prompt.previewImage}
                  alt={prompt.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/40 via-transparent to-transparent" />
              </div>
            </div>

            <div>
              <p className="mb-5 text-xs font-medium tracking-[0.22em] text-gold">
                {prompt.category.toUpperCase()}
              </p>
              <h1 className="text-balance text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl">
                {prompt.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-silver">
                {prompt.description}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <CopyButton text={prompt.prompt} />
                <ShareButton
                  url={`${SITE_URL}/p/${prompt.slug}`}
                  title={prompt.title}
                />
              </div>

              <CompatibilityBadges models={prompt.compatibleAI} className="mt-10" />

              <div className="mt-10">
                <PromptAccordion
                  prompt={prompt.prompt}
                  negativePrompt={prompt.negativePrompt}
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <HowToUse />

      {related.length > 0 && (
        <Section className="pt-0">
          <Container>
            <p className="mb-8 text-xs font-medium tracking-[0.22em] text-gold">
              TAMBIÉN TE PUEDE INTERESAR
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <PromptCard key={p.id} prompt={p} index={i} />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
