export interface PromptStep {
  icon: string;
  title: string;
  description: string;
}

export interface Prompt {
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
  steps?: PromptStep[];
  createdAt: string;
}
