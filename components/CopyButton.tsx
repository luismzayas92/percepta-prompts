"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clipboard, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
  className?: string;
  variant?: "primary" | "inline";
  label?: string;
  copiedLabel?: string;
}

export default function CopyButton({
  text,
  className,
  variant = "primary",
  label = "Copiar Prompt",
  copiedLabel = "Prompt copiado",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — no-op.
    }
  }

  const base =
    variant === "primary"
      ? "px-6 py-3.5 text-sm rounded-full bg-gradient-to-b from-[#f0dfb8] via-gold to-[#b6935f] text-obsidian shadow-[0_1px_0_0_rgba(255,255,255,0.4)_inset,0_8px_24px_-8px_rgba(212,180,131,0.5)]"
      : "px-4 py-2 text-xs rounded-lg glass text-silver hover:text-white";

  return (
    <motion.button
      type="button"
      onClick={handleCopy}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "focus-ring inline-flex items-center justify-center gap-2 font-semibold tracking-tight transition-colors duration-300",
        base,
        className
      )}
      aria-live="polite"
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="copied"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-2"
          >
            <Check className="h-4 w-4" strokeWidth={2.5} />
            {copiedLabel}
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-2"
          >
            <Clipboard className="h-4 w-4" strokeWidth={2.5} />
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
