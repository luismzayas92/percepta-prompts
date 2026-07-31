import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Button from "@/components/Button";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { getSystemBySlug } from "@/lib/systems";

export const metadata: Metadata = {
  title: "Compra confirmada",
  robots: { index: false, follow: false },
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; system?: string }>;
}) {
  const { session_id, system: slugParam } = await searchParams;

  let verified = false;
  let systemTitle = "";
  let slug = slugParam ?? "";

  if (session_id && isStripeConfigured()) {
    try {
      const stripe = getStripe();
      const session = await stripe.checkout.sessions.retrieve(session_id);
      verified = session.payment_status === "paid";
      slug = (session.metadata?.systemSlug as string) ?? slug;
    } catch {
      verified = false;
    }
  }

  const system = slug ? getSystemBySlug(slug) : undefined;
  systemTitle = system?.title ?? "";

  return (
    <Section className="pt-16">
      <Container>
        <div className="mx-auto max-w-lg text-center">
          {verified ? (
            <>
              <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-teal/15 text-teal">
                <CheckCircle2 className="h-8 w-8" strokeWidth={2} />
              </div>
              <p className="mb-4 text-xs font-medium tracking-[0.22em] text-haze">
                COMPRA CONFIRMADA
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-frost sm:text-5xl">
                Gracias por tu compra.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-haze">
                {systemTitle
                  ? `${systemTitle} ya está listo para descargar.`
                  : "Tu System ya está listo para descargar."}
              </p>
              <div className="mt-10">
                <Button
                  href={
                    slug ? `/download/${slug}?session_id=${session_id}` : "/library"
                  }
                >
                  Ir a mi descarga
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="mb-4 text-xs font-medium tracking-[0.22em] text-haze">
                VERIFICANDO
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-frost sm:text-5xl">
                No pudimos confirmar tu pago.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-haze">
                Si acabas de completar el pago, espera unos segundos y
                recarga esta página. Si el problema continúa, contáctanos con
                tu recibo de compra.
              </p>
              <div className="mt-10">
                <Button href="/library">Volver a la Library</Button>
              </div>
            </>
          )}
          <p className="mt-8 text-xs text-haze/50">
            <Link href="/library" className="hover:text-haze">
              Explorar más Systems
            </Link>
          </p>
        </div>
      </Container>
    </Section>
  );
}
