import fs from "fs";
import path from "path";
import type { System } from "@/types/system";

const SYSTEMS_DIR = path.join(process.cwd(), "data", "systems");

function readAll(): System[] {
  if (!fs.existsSync(SYSTEMS_DIR)) return [];

  const files = fs.readdirSync(SYSTEMS_DIR).filter((f) => f.endsWith(".json"));

  const systems = files.map((file) => {
    const raw = fs.readFileSync(path.join(SYSTEMS_DIR, file), "utf-8");
    return JSON.parse(raw) as System;
  });

  return systems.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getAllSystems(): System[] {
  return readAll();
}

export function getFeaturedSystems(): System[] {
  return readAll().filter((s) => s.featured);
}

export function getSystemBySlug(slug: string): System | undefined {
  return readAll().find((s) => s.slug === slug);
}

export function getAllSlugs(): string[] {
  return readAll().map((s) => s.slug);
}

export function getCategories(): string[] {
  const categories = new Set(readAll().map((s) => s.category));
  return Array.from(categories);
}

export function getFreeSystems(): System[] {
  return readAll().filter((s) => s.tier === "free");
}

export function getRelatedSystems(slug: string, limit = 3): System[] {
  return readAll()
    .filter((s) => s.slug !== slug)
    .slice(0, limit);
}
