"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { System } from "@/types/system";
import SystemCard from "@/components/SystemCard";
import { cn } from "@/lib/utils";

type TierFilter = "all" | "free" | "premium";

export default function LibraryGrid({ systems }: { systems: System[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | "all">("all");
  const [tier, setTier] = useState<TierFilter>("all");

  const categories = useMemo(
    () => Array.from(new Set(systems.map((s) => s.category))),
    [systems]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return systems.filter((s) => {
      const matchesQuery =
        q.length === 0 ||
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q);
      const matchesCategory = category === "all" || s.category === category;
      const matchesTier = tier === "all" || s.tier === tier;
      return matchesQuery && matchesCategory && matchesTier;
    });
  }, [systems, query, category, tier]);

  return (
    <div>
      <div className="mb-10 flex flex-col gap-4">
        <div className="glass flex items-center gap-3 rounded-full px-5 py-3.5">
          <Search className="h-4 w-4 shrink-0 text-haze" strokeWidth={2} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar un System…"
            aria-label="Buscar un System"
            className="w-full bg-transparent text-sm text-frost placeholder:text-haze/50 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <FilterChip active={category === "all"} onClick={() => setCategory("all")}>
            Todas las categorías
          </FilterChip>
          {categories.map((c) => (
            <FilterChip key={c} active={category === c} onClick={() => setCategory(c)}>
              {c}
            </FilterChip>
          ))}

          <span className="mx-1 h-4 w-px bg-frost/[0.1]" aria-hidden="true" />

          <FilterChip active={tier === "all"} onClick={() => setTier("all")}>
            Todos
          </FilterChip>
          <FilterChip active={tier === "free"} onClick={() => setTier("free")}>
            Free
          </FilterChip>
          <FilterChip active={tier === "premium"} onClick={() => setTier("premium")}>
            Premium
          </FilterChip>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-haze">
          No encontramos ningún System con esos filtros.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((system, i) => (
            <SystemCard key={system.id} system={system} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "focus-ring rounded-full px-4 py-2 text-xs font-medium tracking-tight transition-colors duration-200",
        active
          ? "bg-signal text-frost"
          : "glass text-haze hover:text-frost"
      )}
    >
      {children}
    </button>
  );
}
