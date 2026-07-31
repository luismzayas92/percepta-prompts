import fs from "fs";
import path from "path";
import type { Prompt } from "@/types/prompt";

const PROMPTS_DIR = path.join(process.cwd(), "data", "prompts");

function readAll(): Prompt[] {
  if (!fs.existsSync(PROMPTS_DIR)) return [];

  const files = fs.readdirSync(PROMPTS_DIR).filter((f) => f.endsWith(".json"));

  const prompts = files.map((file) => {
    const raw = fs.readFileSync(path.join(PROMPTS_DIR, file), "utf-8");
    return JSON.parse(raw) as Prompt;
  });

  return prompts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getAllPrompts(): Prompt[] {
  return readAll();
}

export function getFeaturedPrompts(): Prompt[] {
  return readAll().filter((p) => p.featured);
}

export function getPromptBySlug(slug: string): Prompt | undefined {
  return readAll().find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return readAll().map((p) => p.slug);
}

export function getCategories(): string[] {
  const categories = new Set(readAll().map((p) => p.category));
  return Array.from(categories);
}
