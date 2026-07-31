import type { Metadata } from "next";
import Container from "@/components/Container";
import Section from "@/components/Section";
import LibraryGrid from "@/components/LibraryGrid";
import { getAllSystems } from "@/lib/systems";

export const metadata: Metadata = {
  title: "Library",
  description:
    "Explora la biblioteca completa de Systems de dirección visual de PERCEPTA LAB.",
};

export default function LibraryPage() {
  const systems = getAllSystems();

  return (
    <Section className="pt-16">
      <Container>
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 text-xs font-medium tracking-[0.22em] text-haze">
            LIBRARY
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-frost sm:text-5xl">
            Toda la biblioteca de Systems.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-haze">
            Sistemas de dirección visual completos, listos para copiar o
            comprar, probados en ChatGPT, Gemini, Claude y Grok.
          </p>
        </div>

        {systems.length === 0 ? (
          <p className="text-haze">
            Aún no hay Systems publicados. Añade un archivo{" "}
            <code className="text-teal">.json</code> en{" "}
            <code className="text-teal">/data/systems</code>.
          </p>
        ) : (
          <LibraryGrid systems={systems} />
        )}
      </Container>
    </Section>
  );
}
