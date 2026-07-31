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
          <p className="mb-4 text-xs font-medium tracking-[0.22em] text-haze">
            ABOUT
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-frost sm:text-5xl">
            Diseñamos percepción.
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-haze">
            PERCEPTA LAB es el estudio de Systems™ de dirección visual de
            PERCEPTA, especializado en generación de imagen con inteligencia
            artificial. Cada System es un producto digital completo —
            dirección de iluminación, composición, gradación de color,
            restricciones de identidad, documentación y ejemplos — diseñado
            para producir resultados consistentes y de calidad editorial en
            cualquier modelo generativo compatible.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-haze">
            No vendemos filtros ni prompts sueltos. Vendemos criterio visual,
            empaquetado como producto.
          </p>

          <div className="mt-12">
            <Button href="/library">Explorar la Library</Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
