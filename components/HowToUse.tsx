import { ClipboardList, Camera, Sparkles } from "lucide-react";
import Container from "@/components/Container";
import Section from "@/components/Section";
import StepCard from "@/components/StepCard";

const steps = [
  {
    icon: <ClipboardList className="h-5 w-5" strokeWidth={2} />,
    title: "Copia el prompt",
    description:
      "Usa el botón de copiar para llevar el sistema de dirección visual completo a tu portapapeles.",
  },
  {
    icon: <Camera className="h-5 w-5" strokeWidth={2} />,
    title: "Sube una fotografía",
    description:
      "Elige una imagen donde el rostro sea claramente visible y esté bien iluminado.",
  },
  {
    icon: <Sparkles className="h-5 w-5" strokeWidth={2} />,
    title: "Genera la imagen",
    description:
      "Pega el prompt en ChatGPT, Gemini, Claude o Grok junto a tu fotografía y genera el resultado.",
  },
];

export default function HowToUse() {
  return (
    <Section>
      <Container>
        <div className="mb-14 max-w-xl">
          <p className="mb-4 text-xs font-medium tracking-[0.22em] text-gold">
            CÓMO USAR
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Tres pasos hacia una imagen de dirección impecable.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {steps.map((step, i) => (
            <StepCard key={step.title} index={i + 1} {...step} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
