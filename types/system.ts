export type SystemTier = "free" | "premium";

export type SystemLevel = "Principiante" | "Intermedio" | "Avanzado";

export interface SystemFAQ {
  question: string;
  answer: string;
}

export interface System {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  category: string;
  previewImage: string;
  prompt: string;
  negativePrompt?: string;
  compatibleAI: string[];
  featured: boolean;
  createdAt: string;

  tier: SystemTier;
  level: SystemLevel;
  estimatedTime: string;
  includes: string[];
  faq: SystemFAQ[];
}
