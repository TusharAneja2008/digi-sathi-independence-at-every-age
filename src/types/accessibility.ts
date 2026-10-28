export type ThemeMode = 'original' | 'hc-light' | 'hc-dark';

export type TextSize = 'sm' | 'normal' | 'lg' | 'xl';

export type Language = 'en' | 'hi';

export type ActiveTab = 'assistant' | 'guide' | 'memory' | 'notes' | 'emergency' | 'settings';

export interface PersonalNote {
  id: string;
  title: string;
  content: string;
  category: 'general' | 'medicine' | 'contact' | 'reminder';
  createdAt: string;
  updatedAt: string;
}

export interface GuidedStep {
  stepNumber: number;
  totalSteps: number;
  instruction: string;
  explanation: string;
  tip?: string;
  actionHint?: string;
}

export interface GuidedTask {
  id: string;
  title: string;
  titleHi: string;
  category: string;
  categoryHi: string;
  shortDescription: string;
  shortDescriptionHi: string;
  steps: GuidedStep[];
  stepsHi: GuidedStep[];
}

export interface TrustedContact {
  name: string;
  phone: string;
  relationship: string;
}

export interface AccessibilitySettings {
  memorySupportMode: boolean;
  simpleMode: boolean;
  highContrastMode: boolean;
  theme: ThemeMode;
  textSize: TextSize;
  readAloud: boolean;
  speechSpeed: 'normal' | 'slow';
  language: Language;
}
