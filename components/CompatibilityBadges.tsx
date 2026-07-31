import { cn } from "@/lib/utils";

const AI_INITIALS: Record<string, string> = {
  ChatGPT: "GPT",
  Gemini: "GEM",
  Claude: "CLD",
  Grok: "GRK",
  Midjourney: "MJ",
};

export default function CompatibilityBadges({
  models,
  className,
}: {
  models: string[];
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-wrap gap-3", className)}>
      {models.map((model) => (
        <li
          key={model}
          className="glass flex items-center gap-2.5 rounded-full px-4 py-2"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-frost/[0.06] text-[9px] font-bold tracking-tight text-haze">
            {AI_INITIALS[model] ?? model.slice(0, 3).toUpperCase()}
          </span>
          <span className="text-xs font-medium text-haze">{model}</span>
          <span className="text-[10px] font-medium tracking-wide text-haze/40">
            Compatible
          </span>
        </li>
      ))}
    </ul>
  );
}
