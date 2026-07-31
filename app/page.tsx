import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import HowToUse from "@/components/HowToUse";
import PromptAccordion from "@/components/PromptAccordion";
import SystemCard from "@/components/SystemCard";
import Container from "@/components/Container";
import Section from "@/components/Section";
import { getAllSystems, getFeaturedSystems } from "@/lib/systems";
import { SITE_URL } from "@/lib/site";

export default function Home() {
  const featured = getFeaturedSystems();
  const heroSystem = featured[0] ?? getAllSystems()[0];
  const rest = getAllSystems().filter((s) => s.slug !== heroSystem?.slug);

  if (!heroSystem) {
    return (
      <Container>
        <div className="py-32 text-center text-haze">
          Añade tu primer System en{" "}
          <code className="text-teal">/data/systems</code>.
        </div>
      </Container>
    );
  }

  return (
    <>
      <Hero system={heroSystem} shareUrl={`${SITE_URL}/system/${heroSystem.slug}`} />

      <Section className="pt-0">
        <Container>
          <div className="mx-auto max-w-3xl">
            <PromptAccordion
              prompt={heroSystem.prompt}
              negativePrompt={heroSystem.negativePrompt}
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
                  LIBRARY
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-frost sm:text-4xl">
                  Más Systems de dirección visual.
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
              {rest.slice(0, 3).map((system, i) => (
                <SystemCard key={system.id} system={system} index={i} />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
