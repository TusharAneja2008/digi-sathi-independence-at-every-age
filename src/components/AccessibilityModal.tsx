import React, { useEffect, useRef } from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext.js';
import {
  X,
  Sliders,
  Sparkles,
  Brain,
  Contrast,
  Type,
  Volume2,
  RotateCcw,
  RefreshCw,
  Check,
  Eye,
  Info,
} from 'lucide-react';
import { ThemeMode, TextSize } from '../types/accessibility.js';

export const AccessibilityModal: React.FC = () => {
  const {
    settings,
    updateSettings,
    resetSettings,
    resetTheme,
    isAccessibilityModalOpen,
    setIsAccessibilityModalOpen,
    repeatSpeech,
    speakText,
    showFeedback,
  } = useAccessibility();

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Keyboard accessibility: ESC key to close modal & focus trap
  useEffect(() => {
    if (!isAccessibilityModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsAccessibilityModalOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAccessibilityModalOpen, setIsAccessibilityModalOpen]);

  if (!isAccessibilityModalOpen) return null;

  const themes: { id: ThemeMode; name: string; desc: string; previewBg: string; previewBorder: string; previewText: string }[] = [
    {
      id: 'original',
      name: 'Original Brown Matte',
      desc: 'Warm, calm, and respectful matte design. Easy on the eyes.',
      previewBg: '#FAF6F0',
      previewBorder: '#734C29',
      previewText: '#2E1E12',
    },
    {
      id: 'hc-light',
      name: 'High-Contrast Light',
      desc: 'Crisp bright white background with bold black text and thick borders.',
      previewBg: '#FFFFFF',
      previewBorder: '#000000',
      previewText: '#000000',
    },
    {
      id: 'hc-dark',
      name: 'High-Contrast Dark',
      desc: 'Deep matte black background with vivid gold borders and crisp white text.',
      previewBg: '#0A0A0A',
      previewBorder: '#FFD700',
      previewText: '#FFFFFF',
    },
  ];

  const textSizes: { id: TextSize; label: string; sample: string }[] = [
    { id: 'sm', label: 'Small', sample: 'Aa (15px)' },
    { id: 'normal', label: 'Normal (Recommended)', sample: 'Aa (18px)' },
    { id: 'lg', label: 'Large', sample: 'Aa (21px)' },
    { id: 'xl', label: 'Extra Large', sample: 'Aa (24px)' },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="accessibility-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto"
    >
      <div
        ref={modalRef}
        className="w-full max-w-3xl rounded-3xl border-4 shadow-2xl p-6 sm:p-8 my-auto max-h-[90vh] overflow-y-auto"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-strong)',
          color: 'var(--text-main)',
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-borderSubtle">
          <div className="flex items-center gap-3">
            <div
              className="p-3 rounded-2xl flex items-center justify-center"
              style={{
                backgroundColor: 'var(--brand-brown)',
                color: 'var(--brand-text)',
              }}
            >
              <Sliders className="w-7 h-7" aria-hidden="true" />
            </div>
            <div>
              <h2 id="accessibility-modal-title" className="text-2xl sm:text-3xl font-bold font-serif">
                Accessibility Settings
              </h2>
              <p className="text-sm sm:text-base text-textMuted mt-0.5">
                Customize DigiSaathi to match your reading, memory, and viewing comfort.
              </p>
            </div>
          </div>
          <button
            ref={closeButtonRef}
            onClick={() => setIsAccessibilityModalOpen(false)}
            aria-label="Close Accessibility Settings"
            className="p-2.5 rounded-xl border border-borderSubtle hover:bg-secondary transition-all"
            style={{ color: 'var(--text-main)' }}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="py-6 space-y-6">
          {/* FEATURE 1: MEMORY SUPPORT MODE */}
          <div className="p-5 rounded-2xl border-2 border-borderSubtle bg-secondary/40 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <Brain className="w-6 h-6 text-brandBrown flex-shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-bold">1. Memory Support Mode</h3>
                  <p className="text-sm text-textMuted mt-1 leading-relaxed">
                    Helps with concentration and forgetfulness. Breaks complicated online tasks into small, one-step-at-a-time instructions with large Next, Back, and Repeat buttons.
                  </p>
                </div>
              </div>
              <button
                role="switch"
                aria-checked={settings.memorySupportMode}
                onClick={() => {
                  const next = !settings.memorySupportMode;
                  updateSettings({ memorySupportMode: next });
                  showFeedback(
                    next
                      ? 'Memory Support Mode turned ON.'
                      : 'Memory Support Mode turned OFF.',
                    'info'
                  );
                }}
                className={`relative inline-flex h-8 w-16 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:ring-4 ${
                  settings.memorySupportMode ? 'bg-brandBrown' : 'bg-gray-300 dark:bg-gray-700'
                }`}
              >
                <span className="sr-only">Toggle Memory Support Mode</span>
                <span
                  className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    settings.memorySupportMode ? 'translate-x-8' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-textMuted pl-9">
              Status: {settings.memorySupportMode ? '[✓ ON — Step-by-Step Enabled]' : '[OFF]'}
            </div>
          </div>

          {/* FEATURE 2: SIMPLE MODE */}
          <div className="p-5 rounded-2xl border-2 border-borderSubtle bg-secondary/40 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-brandBrown flex-shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-bold">2. Simple Mode</h3>
                  <p className="text-sm text-textMuted mt-1 leading-relaxed">
                    Clears away visual clutter and technical terms. Shows the most important actions first with plain, easy language.
                  </p>
                </div>
              </div>
              <button
                role="switch"
                aria-checked={settings.simpleMode}
                onClick={() => {
                  const next = !settings.simpleMode;
                  updateSettings({ simpleMode: next });
                  showFeedback(
                    next ? 'Simple Mode turned ON.' : 'Simple Mode turned OFF.',
                    'info'
                  );
                }}
                className={`relative inline-flex h-8 w-16 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:ring-4 ${
                  settings.simpleMode ? 'bg-brandBrown' : 'bg-gray-300 dark:bg-gray-700'
                }`}
              >
                <span className="sr-only">Toggle Simple Mode</span>
                <span
                  className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    settings.simpleMode ? 'translate-x-8' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-textMuted pl-9">
              Status: {settings.simpleMode ? '[✓ ON — Clutter Reduced]' : '[OFF]'}
            </div>
          </div>

          {/* FEATURE 3: COLOUR & CONTRAST ACCESSIBILITY */}
          <div className="p-5 rounded-2xl border-2 border-borderSubtle bg-secondary/40 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <Contrast className="w-6 h-6 text-brandBrown flex-shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-bold">3. Colour & Contrast Settings</h3>
                  <p className="text-sm text-textMuted mt-1 leading-relaxed">
                    Makes text, borders, and buttons easier to read for people with low vision or colour blindness.
                  </p>
                </div>
              </div>
              <button
                role="switch"
                aria-checked={settings.highContrastMode}
                onClick={() => {
                  const next = !settings.highContrastMode;
                  updateSettings({ highContrastMode: next });
                  showFeedback(
                    next ? 'High Contrast Mode ON.' : 'High Contrast Mode OFF.',
                    'info'
                  );
                }}
                className={`relative inline-flex h-8 w-16 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:ring-4 ${
                  settings.highContrastMode ? 'bg-brandBrown' : 'bg-gray-300 dark:bg-gray-700'
                }`}
              >
                <span className="sr-only">Toggle High Contrast Mode</span>
                <span
                  className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    settings.highContrastMode ? 'translate-x-8' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Alternative Colour Themes Picker */}
            <div className="pt-2">
              <label className="block text-sm font-bold mb-2">
                Choose Colour Theme:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {themes.map((t) => {
                  const isSelected = settings.theme === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        updateSettings({
                          theme: t.id,
                          highContrastMode: t.id !== 'original',
                        });
                        showFeedback(`Selected ${t.name}.`, 'info');
                      }}
                      className={`text-left p-3.5 rounded-xl border-3 transition-all relative ${
                        isSelected ? 'ring-4 ring-offset-2 ring-brandBrown border-brandBrown' : 'border-borderSubtle hover:border-brandBrown'
                      }`}
                      style={{
                        backgroundColor: t.previewBg,
                        color: t.previewText,
                        borderColor: isSelected ? 'var(--brand-brown)' : t.previewBorder,
                      }}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-sm">{t.name}</span>
                        {isSelected && <Check className="w-5 h-5 flex-shrink-0" />}
                      </div>
                      <p className="text-xs opacity-90 leading-snug">{t.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={resetTheme}
                className="text-xs font-bold underline flex items-center gap-1.5 text-textMuted hover:text-textMain p-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset to Original Theme</span>
              </button>
            </div>
          </div>

          {/* TEXT SIZE SETTINGS */}
          <div className="p-5 rounded-2xl border-2 border-borderSubtle bg-secondary/40 space-y-3">
            <div className="flex items-center gap-3">
              <Type className="w-6 h-6 text-brandBrown" aria-hidden="true" />
              <div>
                <h3 className="text-lg font-bold">Text & Readability Size</h3>
                <p className="text-sm text-textMuted">
                  Enlarge text without breaking cards, menus, or layout spacing.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              {textSizes.map((ts) => {
                const isSelected = settings.textSize === ts.id;
                return (
                  <button
                    key={ts.id}
                    onClick={() => {
                      updateSettings({ textSize: ts.id });
                      showFeedback(`Text size changed to ${ts.label}.`, 'info');
                    }}
                    className={`p-3 rounded-xl border-2 text-center font-bold text-sm transition-all ${
                      isSelected
                        ? 'border-brandBrown ring-2 ring-brandBrown font-extrabold'
                        : 'border-borderSubtle bg-surface hover:border-borderStrong'
                    }`}
                    style={{
                      backgroundColor: isSelected ? 'var(--brand-brown-light)' : 'var(--bg-surface)',
                      color: 'var(--text-main)',
                    }}
                  >
                    <div>{ts.label}</div>
                    <div className="text-xs text-textMuted mt-0.5">{ts.sample}</div>
                  </button>
                );
              })}
            </div>

            <div className="p-3 rounded-xl border border-borderSubtle bg-surface mt-2">
              <span className="text-xs text-textMuted font-bold uppercase block mb-1">
                Live Text Preview:
              </span>
              <p className="text-base leading-relaxed">
                "DigiSaathi helps you bank, travel, and stay independent with total peace of mind."
              </p>
            </div>
          </div>

          {/* AUDIO SUPPORT & REPEAT */}
          <div className="p-5 rounded-2xl border-2 border-borderSubtle bg-secondary/40 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <Volume2 className="w-6 h-6 text-brandBrown flex-shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-bold">Read Instructions Aloud & Speech</h3>
                  <p className="text-sm text-textMuted mt-1">
                    Listen to instructions read in a clear, calming voice. Never autoplays without your permission.
                  </p>
                </div>
              </div>
              <button
                role="switch"
                aria-checked={settings.readAloud}
                onClick={() => {
                  const next = !settings.readAloud;
                  updateSettings({ readAloud: next });
                  showFeedback(
                    next
                      ? 'Read Aloud feature enabled.'
                      : 'Read Aloud feature turned off.',
                    'info'
                  );
                }}
                className={`relative inline-flex h-8 w-16 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:ring-4 ${
                  settings.readAloud ? 'bg-brandBrown' : 'bg-gray-300 dark:bg-gray-700'
                }`}
              >
                <span className="sr-only">Toggle Read Instructions Aloud</span>
                <span
                  className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    settings.readAloud ? 'translate-x-8' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  repeatSpeech();
                  showFeedback('Repeating last instruction...', 'info');
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border-2 border-borderStrong bg-surface hover:bg-secondary transition-all"
              >
                <RotateCcw className="w-4 h-4 text-brandBrown" />
                <span>Repeat Last Instructions Aloud</span>
              </button>

              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="text-textMuted">Speech Speed:</span>
                <button
                  onClick={() => updateSettings({ speechSpeed: 'normal' })}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-bold ${
                    settings.speechSpeed === 'normal'
                      ? 'bg-brandBrown text-brandText border-brandBrown'
                      : 'bg-surface border-borderSubtle text-textMain'
                  }`}
                >
                  Normal
                </button>
                <button
                  onClick={() => updateSettings({ speechSpeed: 'slow' })}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-bold ${
                    settings.speechSpeed === 'slow'
                      ? 'bg-brandBrown text-brandText border-brandBrown'
                      : 'bg-surface border-borderSubtle text-textMain'
                  }`}
                >
                  Slower (Elderly Friendly)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-borderSubtle">
          <button
            onClick={resetSettings}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-red-700 dark:text-red-400 border border-red-300 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset All Accessibility Settings</span>
          </button>

          <button
            onClick={() => setIsAccessibilityModalOpen(false)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold shadow-md transition-all text-base border-2"
            style={{
              backgroundColor: 'var(--brand-brown)',
              color: 'var(--brand-text)',
              borderColor: 'var(--brand-brown-hover)',
            }}
          >
            Save &amp; Close Settings
          </button>
        </div>
      </div>
    </div>
  );
};
