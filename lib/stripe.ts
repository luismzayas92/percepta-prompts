import Stripe from "stripe";

let stripeClient: Stripe | null = null;

/**
 * Lazily-initialized Stripe client. Reads STRIPE_SECRET_KEY from the
 * environment at call time (never at import time) so the app can build
 * and run without it configured — checkout routes simply fail clearly
 * until the env var is set in Vercel (test key now, live key later).
 */
export function getStripe(): Stripe {
  if (stripeClient) return stripeClient;

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY no está configurada. Añádela como variable de entorno (modo test primero) en Vercel o en .env.local."
    );
  }

  stripeClient = new Stripe(key);
  return stripeClient;
}

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}
