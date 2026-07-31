"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BuyButton({
  slug,
  label,
  className,
}: {
  slug: string;
  label: string;
  className?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleBuy() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const data = await res.json();

      if (!res.ok || !data.url) {
        setError(data.error ?? "No se pudo iniciar el pago.");
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Error de red. Intenta de nuevo.");
      setLoading(false);
    }
  }

  return (
    <div>
      <motion.button
        type="button"
        onClick={handleBuy}
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.015 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-signal px-6 py-3.5 text-sm font-semibold tracking-tight text-frost shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset,0_8px_24px_-8px_rgba(94,124,224,0.55)] transition-all duration-300 hover:brightness-[1.08] disabled:cursor-not-allowed disabled:opacity-70",
          className
        )}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.5} />
        ) : (
          <ShoppingCart className="h-4 w-4" strokeWidth={2.5} />
        )}
        {loading ? "Redirigiendo a pago…" : label}
      </motion.button>
      {error && <p className="mt-2 text-xs text-sandy">{error}</p>}
    </div>
  );
}
