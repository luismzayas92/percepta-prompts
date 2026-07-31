"use client";

import Link from "next/link";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-obsidian shadow-[0_1px_0_0_rgba(255,255,255,0.4)_inset,0_8px_24px_-8px_rgba(212,180,131,0.5)] hover:brightness-[1.06]",
  secondary:
    "glass text-white hover:bg-white/[0.06] hover:border-white/[0.14]",
  ghost: "text-silver hover:text-white",
};

interface ButtonBaseProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<HTMLMotionProps<"button">, "children"> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps & {
  href: string;
  target?: string;
  rel?: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "focus-ring inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold tracking-tight transition-all duration-300",
    variants[variant],
    className
  );

  if ("href" in props && props.href) {
    const { href, target, rel } = props;
    return (
      <motion.div
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="inline-block"
      >
        <Link href={href} target={target} rel={rel} className={classes}>
          {children}
        </Link>
      </motion.div>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <motion.button
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={classes}
      {...buttonProps}
    >
      {children}
    </motion.button>
  );
}
