import { NextRequest, NextResponse } from "next/server";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { getSystemBySlug } from "@/lib/systems";
import { CURRENCY, PRICING, toStripeAmount } from "@/lib/pricing";
import { SITE_URL } from "@/lib/site";

export async function POST(request: NextRequest) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      {
        error:
          "Stripe no está configurado todavía. Añade STRIPE_SECRET_KEY como variable de entorno para activar los pagos.",
      },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);
  const slug = body?.slug as string | undefined;

  if (!slug) {
    return NextResponse.json({ error: "Falta el slug del System." }, { status: 400 });
  }

  const system = getSystemBySlug(slug);

  if (!system) {
    return NextResponse.json({ error: "System no encontrado." }, { status: 404 });
  }

  if (system.tier === "free") {
    return NextResponse.json(
      { error: "Este System es gratuito, no requiere checkout." },
      { status: 400 }
    );
  }

  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: CURRENCY,
          unit_amount: toStripeAmount(PRICING.systemIndividual),
          product_data: {
            name: system.title,
            description: system.description,
            images: [`${SITE_URL}${system.previewImage}`],
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}&system=${system.slug}`,
    cancel_url: `${SITE_URL}/system/${system.slug}?checkout=cancelled`,
    metadata: {
      systemSlug: system.slug,
    },
  });

  if (!session.url) {
    return NextResponse.json(
      { error: "No se pudo crear la sesión de pago." },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: session.url });
}
