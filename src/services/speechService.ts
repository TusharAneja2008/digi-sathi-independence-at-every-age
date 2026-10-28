import { Language } from '../types/accessibility.js';

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeaking: boolean = false;
  private isPaused: boolean = false;
  private listeners: Set<(speaking: boolean, paused: boolean, currentText: string) => void> = new Set();
  private lastSpokenText: string = '';
  private currentSpokenText: string = '';

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public isAvailable(): boolean {
    return this.synth !== null;
  }

  public subscribe(listener: (speaking: boolean, paused: boolean, currentText: string) => void): () => void {
    this.listeners.add(listener);
    listener(this.isSpeaking, this.isPaused, this.currentSpokenText);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach((l) => l(this.isSpeaking, this.isPaused, this.currentSpokenText));
  }

  public speak(text: string, language: Language = 'en', speed: 'normal' | 'slow' = 'normal'): void {
    if (!this.synth) return;

    // Clean text: strip emojis or asterisks for clean pronunciation
    const cleanText = text
      .replace(/[*_#`~]/g, '')
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/gu, '')
      .trim();

    if (!cleanText) return;

    this.stop();

    this.lastSpokenText = cleanText;
    this.currentSpokenText = cleanText;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = speed === 'slow' ? 0.72 : 0.92;
    utterance.pitch = 1.0;

    // Choose appropriate voice
    const voices = this.synth.getVoices();
    if (language === 'hi') {
      const hiVoice = voices.find((v) => v.lang.startsWith('hi') || v.name.toLowerCase().includes('hindi'));
      if (hiVoice) utterance.voice = hiVoice;
      utterance.lang = 'hi-IN';
    } else {
      const enVoice =
        voices.find((v) => v.lang === 'en-IN') ||
        voices.find((v) => v.lang === 'en-GB') ||
        voices.find((v) => v.lang.startsWith('en'));
      if (enVoice) utterance.voice = enVoice;
      utterance.lang = 'en-US';
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.isPaused = false;
      this.notify();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.isPaused = false;
      this.currentSpokenText = '';
      this.currentUtterance = null;
      this.notify();
    };

    utterance.onerror = (e) => {
      console.warn('Speech error:', e);
      this.isSpeaking = false;
      this.isPaused = false;
      this.currentSpokenText = '';
      this.currentUtterance = null;
      this.notify();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public repeat(): void {
    if (this.lastSpokenText) {
      this.speak(this.lastSpokenText);
    }
  }

  public pause(): void {
    if (this.synth && this.isSpeaking && !this.isPaused) {
      this.synth.pause();
      this.isPaused = true;
      this.notify();
    }
  }

  public resume(): void {
    if (this.synth && this.isPaused) {
      this.synth.resume();
      this.isPaused = false;
      this.notify();
    }
  }

  public stop(): void {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
      this.isPaused = false;
      this.currentSpokenText = '';
      this.currentUtterance = null;
      this.notify();
    }
  }

  public getLastSpoken(): string {
    return this.lastSpokenText;
  }
}

export const speechService = new SpeechService();
