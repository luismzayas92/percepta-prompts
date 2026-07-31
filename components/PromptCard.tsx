"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Prompt } from "@/types/prompt";

export default function PromptCard({
  prompt,
  index = 0,
}: {
  prompt: Prompt;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (index % 6) * 0.06 }}
    >
      <Link
        href={`/p/${prompt.slug}`}
        className="focus-ring group relative block overflow-hidden rounded-2xl"
      >
        <motion.div
          whileHover={{ scale: 1.015 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="glass overflow-hidden rounded-2xl"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-depth">
            <Image
              src={prompt.previewImage}
              alt={prompt.title}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void via-void/10 to-transparent" />
            {prompt.featured && (
              <span className="absolute left-4 top-4 rounded-full bg-signal/90 px-3 py-1 text-[10px] font-bold tracking-[0.12em] text-frost">
                FEATURED
              </span>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="mb-1 text-[10px] font-medium tracking-[0.18em] text-haze">
                {prompt.category.toUpperCase()}
              </p>
              <h3 className="flex items-center gap-1.5 text-base font-semibold tracking-tight text-frost">
                {prompt.title}
                <ArrowUpRight className="h-4 w-4 shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </h3>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
