import { Lock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SystemTier } from "@/types/system";

export default function TierBadge({
  tier,
  className,
}: {
  tier: SystemTier;
  className?: string;
}) {
  if (tier === "free") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full bg-teal/90 px-3 py-1 text-[10px] font-bold tracking-[0.12em] text-frost",
          className
        )}
      >
        <Sparkles className="h-3 w-3" strokeWidth={2.5} />
        FREE
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-frost/[0.08] px-3 py-1 text-[10px] font-bold tracking-[0.12em] text-haze",
        className
      )}
    >
      <Lock className="h-3 w-3" strokeWidth={2.5} />
      PREMIUM
    </span>
  );
}
