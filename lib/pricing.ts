/**
 * Single source of truth for PERCEPTA LAB pricing.
 * Change a price here and it updates everywhere: product pages, checkout,
 * and Stripe Checkout Sessions (which are created with price_data at
 * request time — no pre-created Stripe Products/Prices to keep in sync).
 */

export const CURRENCY = "usd";

export const PRICING = {
  systemIndividual: 19,
} as const;

export function formatPrice(amountUsd: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: CURRENCY.toUpperCase(),
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amountUsd);
}

export function toStripeAmount(amountUsd: number): number {
  return Math.round(amountUsd * 100);
}
