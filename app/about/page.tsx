import type { Metadata } from "next";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Button from "@/components/Button";

export const metadata: Metadata = {
  title: "About",
  description:
    "PERCEPTA diseña sistemas de dirección visual para inteligencia artificial generativa.",
};

export default function AboutPage() {
  return (
    <Section className="pt-16">
      <Container>
        <div className="max-w-3xl">
          <p className="mb-4 text-xs font-medium tracking-[0.22em] text-gold">
            ABOUT
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Diseñamos percepción.
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-silver">
            PERCEPTA es un estudio de dirección visual especializado en
            sistemas de generación de imagen con inteligencia artificial.
            Cada prompt de esta biblioteca es un sistema de dirección
            completo — iluminación, composición, gradación de color y
            restricciones de identidad — diseñado para producir resultados
            consistentes y de calidad editorial en cualquier modelo
            generativo compatible.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-silver">
            No vendemos filtros. Vendemos criterio visual, empaquetado en
            texto, listo para copiar.
          </p>

          <div className="mt-12">
            <Button href="/library">Explorar la biblioteca</Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
