import type { Metadata } from "next";
import Container from "@/components/Container";
import Section from "@/components/Section";
import PromptCard from "@/components/PromptCard";
import { getAllPrompts } from "@/lib/prompts";

export const metadata: Metadata = {
  title: "Library",
  description:
    "Explora la biblioteca completa de sistemas de dirección visual de PERCEPTA.",
};

export default function LibraryPage() {
  const prompts = getAllPrompts();

  return (
    <Section className="pt-16">
      <Container>
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 text-xs font-medium tracking-[0.22em] text-haze">
            LIBRARY
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-frost sm:text-5xl">
            Toda la biblioteca de prompts.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-haze">
            Sistemas de dirección visual listos para copiar, probados en
            ChatGPT, Gemini, Claude y Grok.
          </p>
        </div>

        {prompts.length === 0 ? (
          <p className="text-haze">
            Aún no hay prompts publicados. Añade un archivo{" "}
            <code className="text-teal">.json</code> en{" "}
            <code className="text-teal">/data/prompts</code>.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {prompts.map((prompt, i) => (
              <PromptCard key={prompt.id} prompt={prompt} index={i} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
