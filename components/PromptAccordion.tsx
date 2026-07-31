"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import CopyButton from "@/components/CopyButton";

export default function PromptAccordion({
  prompt,
  negativePrompt,
}: {
  prompt: string;
  negativePrompt?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="glass overflow-hidden rounded-2xl">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="focus-ring flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-sm font-semibold tracking-tight text-frost">
          Ver Prompt
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-frost/[0.04] text-haze"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-frost/[0.06] px-6 py-6">
              <pre className="max-h-[420px] overflow-auto rounded-xl bg-void/60 p-5 text-[13px] leading-relaxed text-haze">
                <code className="whitespace-pre-wrap font-mono">{prompt}</code>
              </pre>

              {negativePrompt && (
                <div className="mt-4">
                  <p className="mb-2 text-xs font-medium tracking-[0.14em] text-haze/50">
                    NEGATIVE PROMPT
                  </p>
                  <pre className="max-h-[200px] overflow-auto rounded-xl bg-void/60 p-5 text-[13px] leading-relaxed text-haze/80">
                    <code className="whitespace-pre-wrap font-mono">
                      {negativePrompt}
                    </code>
                  </pre>
                </div>
              )}

              <div className="mt-5 flex justify-end">
                <CopyButton
                  text={prompt}
                  variant="inline"
                  label="Copiar desde aquí"
                  copiedLabel="Copiado"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
