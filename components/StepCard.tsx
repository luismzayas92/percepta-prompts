"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StepCardProps {
  index: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export default function StepCard({
  index,
  icon,
  title,
  description,
  className,
}: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className={cn(
        "glass group relative overflow-hidden rounded-2xl p-8 transition-colors duration-300 hover:border-gold/30",
        className
      )}
    >
      <span className="absolute right-6 top-6 text-xs font-medium tracking-[0.2em] text-silver/30">
        {String(index).padStart(2, "0")}
      </span>
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors duration-300 group-hover:bg-gold/15">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold tracking-tight text-white">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-silver">{description}</p>
    </motion.div>
  );
}
