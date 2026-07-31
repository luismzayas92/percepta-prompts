import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Download,
  FileText,
  Gift,
  RefreshCcw,
  ShieldCheck,
  Lock,
} from "lucide-react";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Button from "@/components/Button";
import BuyButton from "@/components/BuyButton";
import { getAllSlugs, getSystemBySlug } from "@/lib/systems";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { PRICING, formatPrice } from "@/lib/pricing";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export const metadata: Metadata = {
  title: "Descarga",
  robots: { index: false, follow: false },
};

async function verifyPurchase(sessionId: string | undefined, slug: string) {
  if (!sessionId || !isStripeConfigured()) return false;
  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session.payment_status === "paid" && session.metadata?.systemSlug === slug;
  } catch {
    return false;
  }
}

export default async function DownloadPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { slug } = await params;
  const { session_id } = await searchParams;
  const system = getSystemBySlug(slug);

  if (!system) {
    notFound();
  }

  const isFree = system.tier === "free";
  const unlocked = isFree || (await verifyPurchase(session_id, slug));

  if (!unlocked) {
    return (
      <Section className="pt-16">
        <Container>
          <div className="mx-auto max-w-lg text-center">
            <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-frost/[0.06] text-haze">
              <Lock className="h-7 w-7" strokeWidth={2} />
            </div>
            <p className="mb-4 text-xs font-medium tracking-[0.22em] text-haze">
              ACCESO RESTRINGIDO
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-frost sm:text-5xl">
              Esta descarga requiere compra.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-haze">
              No pudimos verificar una compra válida de{" "}
              <span className="text-frost">{system.title}</span>. Si ya
              pagaste, usa el enlace de la página de confirmación.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <BuyButton
                slug={system.slug}
                label={`Comprar System — ${formatPrice(PRICING.systemIndividual)}`}
              />
              <Button href={`/system/${system.slug}`} variant="secondary">
                Ver System
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section className="pt-16">
      <Container>
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <p className="mb-4 text-xs font-medium tracking-[0.22em] text-haze">
              {isFree ? "SYSTEM GRATUITO" : "GRACIAS POR TU COMPRA"}
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-frost sm:text-5xl">
              {system.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-haze">
              Tu System está listo. Descárgalo y sigue el How-to incluido
              para el mejor resultado.
            </p>
          </div>

          <div className="glass mt-12 flex flex-col items-center gap-6 rounded-3xl p-10 text-center">
            <div className="relative aspect-[4/5] w-40 overflow-hidden rounded-xl">
              <Image
                src={system.previewImage}
                alt={system.title}
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>
            <a
              href={`/downloads/${system.slug}.zip`}
              download
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-signal px-8 py-4 text-sm font-semibold tracking-tight text-frost shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset,0_8px_24px_-8px_rgba(94,124,224,0.55)] transition-all duration-300 hover:brightness-[1.08]"
            >
              <Download className="h-4 w-4" strokeWidth={2.5} />
              Descargar System (.zip)
            </a>
            <p className="text-xs text-haze/60">
              Incluye prompt, negative prompt, documentación, ejemplos y
              bonus.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <InfoCard
              icon={<FileText className="h-5 w-5" strokeWidth={2} />}
              title="Documentación"
              description="README.txt y How-to.txt incluidos en tu descarga con la guía completa paso a paso."
            />
            <InfoCard
              icon={<Gift className="h-5 w-5" strokeWidth={2} />}
              title="Bonus"
              description={
                isFree
                  ? "Los Systems Premium incluyen un tip exclusivo de dirección visual (Bonus.txt)."
                  : "Bonus.txt con un tip exclusivo de dirección visual de PERCEPTA para este System."
              }
            />
            <InfoCard
              icon={<RefreshCcw className="h-5 w-5" strokeWidth={2} />}
              title="Actualizaciones futuras"
              description="Si este System recibe mejoras, tu acceso se actualiza sin costo adicional."
            />
          </div>

          {!isFree && (
            <div className="mt-10 flex items-center justify-center gap-2 text-xs text-haze/50">
              <ShieldCheck className="h-4 w-4" strokeWidth={2} />
              Compra verificada vía Stripe
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              href="/library"
              className="focus-ring text-sm font-medium text-haze hover:text-frost"
            >
              Volver a la Library
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function InfoCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 text-teal">
        {icon}
      </div>
      <h3 className="mb-1.5 text-sm font-semibold text-frost">{title}</h3>
      <p className="text-xs leading-relaxed text-haze">{description}</p>
    </div>
  );
}
