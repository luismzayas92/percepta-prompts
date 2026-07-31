import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import HowToUse from "@/components/HowToUse";
import PromptAccordion from "@/components/PromptAccordion";
import PromptCard from "@/components/PromptCard";
import Container from "@/components/Container";
import Section from "@/components/Section";
import { getAllPrompts, getFeaturedPrompts } from "@/lib/prompts";
import { SITE_URL } from "@/lib/site";

export default function Home() {
  const featured = getFeaturedPrompts();
  const heroPrompt = featured[0] ?? getAllPrompts()[0];
  const rest = getAllPrompts().filter((p) => p.slug !== heroPrompt?.slug);

  if (!heroPrompt) {
    return (
      <Container>
        <div className="py-32 text-center text-haze">
          Añade tu primer prompt en{" "}
          <code className="text-teal">/data/prompts</code>.
        </div>
      </Container>
    );
  }

  return (
    <>
      <Hero prompt={heroPrompt} shareUrl={`${SITE_URL}/p/${heroPrompt.slug}`} />

      <Section className="pt-0">
        <Container>
          <div className="mx-auto max-w-3xl">
            <PromptAccordion
              prompt={heroPrompt.prompt}
              negativePrompt={heroPrompt.negativePrompt}
            />
          </div>
        </Container>
      </Section>

      <HowToUse />

      {rest.length > 0 && (
        <Section className="pt-0">
          <Container>
            <div className="mb-14 flex items-end justify-between">
              <div>
                <p className="mb-4 text-xs font-medium tracking-[0.22em] text-haze">
                  BIBLIOTECA
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-frost sm:text-4xl">
                  Más sistemas de dirección visual.
                </h2>
              </div>
              <Link
                href="/library"
                className="focus-ring hidden items-center gap-1.5 text-sm font-medium text-haze transition-colors hover:text-frost sm:flex"
              >
                Ver todos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.slice(0, 3).map((prompt, i) => (
                <PromptCard key={prompt.id} prompt={prompt} index={i} />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
