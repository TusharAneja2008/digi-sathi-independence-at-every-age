import React, { useState } from 'react';
import { useAccessibility } from '../../contexts/AccessibilityContext.js';
import {
  FileText,
  Lightbulb,
  ArrowRight,
  Volume2,
  Brain,
  Info,
  CheckCircle2,
  RotateCcw,
  BookOpen,
} from 'lucide-react';
import { GUIDE_SAMPLES } from '../../services/sampleQnA.js';
import { convertTextToGuidedSteps } from '../../services/sampleTasks.js';

export const DigitalGuideScreen: React.FC = () => {
  const { settings, speakText, setActiveTask, setActiveTab, showFeedback } = useAccessibility();
  const [inputText, setInputText] = useState('');
  const [simplifiedResult, setSimplifiedResult] = useState<{
    title: string;
    explanation: string;
    steps: string[];
    rawText: string;
  } | null>(null);

  const handleSimplify = (textToSimplify?: string, sampleTitle?: string) => {
    const text = textToSimplify || inputText;
    if (!text.trim()) return;

    // Check if matching sample
    const matched = GUIDE_SAMPLES.find((s) => text.includes(s.title) || s.originalText.includes(text.slice(0, 30)));

    if (matched) {
      setSimplifiedResult({
        title: settings.language === 'hi' ? matched.titleHi : matched.title,
        explanation: settings.language === 'hi' ? matched.simpleExplanationHi : matched.simpleExplanation,
        steps: matched.steps,
        rawText: matched.originalText,
      });
      setInputText(matched.originalText);
    } else {
      // Plain language summarization of user pasted text
      setSimplifiedResult({
        title: sampleTitle || (settings.language === 'hi' ? 'सरल भाषा में व्याख्या' : 'Plain Language Breakdown'),
        explanation:
          settings.language === 'hi'
            ? 'इस संदेश का मुख्य अर्थ यह है कि आपको घबराने की आवश्यकता नहीं है। इसे ध्यानपूर्वक पढ़ें और नीचे दिए गए आसान चरणों का पालन करें।'
            : 'Here is what this means in plain words: This document is asking you to verify your details calmly. You do not need to rush or worry.',
        steps: [
          'Step 1: Check the date and your official name on the document.',
          'Step 2: Keep your required identity documents (Aadhaar or passbook) ready.',
          'Step 3: If an online fee is mentioned, verify it with a trusted family member first.',
        ],
        rawText: text,
      });
    }

    showFeedback('Text simplified into plain words.', 'success');
  };

  const handleOpenInOneStep = () => {
    if (!simplifiedResult) return;
    const task = convertTextToGuidedSteps(simplifiedResult.rawText, simplifiedResult.title);
    setActiveTask(task);
    setActiveTab('memory');
    showFeedback('Opened in One-Step-at-a-Time Memory Support Mode.', 'info');
  };

  return (
    <div className="py-6 sm:py-8 space-y-6 max-w-4xl mx-auto pb-24">
      {/* Top Banner Card (Matching Screenshot 2) */}
      <div
        className="p-6 sm:p-8 rounded-3xl border-2 shadow-sm relative overflow-hidden"
        style={{
          backgroundColor: 'var(--bg-banner)',
          borderColor: 'var(--border-strong)',
        }}
      >
        <div className="relative z-10 space-y-2">
          <span
            className="text-xs font-bold uppercase tracking-widest block opacity-80"
            style={{ color: 'var(--text-muted)' }}
          >
            DIGISAATHI · INDEPENDENCE AT EVERY AGE
          </span>
          <h1
            className="text-3xl sm:text-4xl font-serif font-bold tracking-tight"
            style={{ color: 'var(--text-main)' }}
          >
            {settings.language === 'hi' ? 'डिजिटल गाइड' : 'Digital Guide'}
          </h1>
          <p
            className="text-base sm:text-lg max-w-2xl leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            {settings.language === 'hi'
              ? 'विश्वास, सुरक्षा और रोजमर्रा की स्वतंत्रता के लिए बनाए गए विचारशील डिजिटल उपकरण।'
              : 'Thoughtful digital tools made for confidence, safety, and everyday independence.'}
          </p>
        </div>
      </div>

      {/* Demo Mode Notice (Matching Screenshot 2) */}
      <div
        className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl border-2 text-xs sm:text-sm font-semibold shadow-sm"
        style={{
          backgroundColor: 'var(--demo-pill-bg)',
          borderColor: 'var(--demo-pill-border)',
          color: 'var(--demo-pill-text)',
        }}
        role="note"
      >
        <Info className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
        <p className="leading-snug">
          <span className="font-bold uppercase tracking-wider mr-1.5">[Demo mode]</span>
          {settings.language === 'hi'
            ? 'नमूना परिदृश्य पहले से बने स्पष्टीकरण दिखाते हैं। अपना टेक्स्ट पेस्ट करने पर सामान्य डेमो ब्रेकडाउन मिलता है।'
            : 'Sample scenarios show pre-built explanations. Pasting your own text gives a generic demo breakdown.'}
        </p>
      </div>

      {/* Main Text Input Card (Matching Screenshot 2) */}
      <div
        className="p-6 sm:p-8 rounded-3xl border-2 shadow-sm space-y-5"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-strong)',
        }}
      >
        <div className="flex items-start gap-3">
          <FileText className="w-6 h-6 text-brandBrown flex-shrink-0 mt-1" aria-hidden="true" />
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif" style={{ color: 'var(--text-main)' }}>
              {settings.language === 'hi' ? 'अपना उलझन भरा टेक्स्ट यहाँ पेस्ट करें' : 'Paste your confusing text'}
            </h2>
            <p className="text-sm sm:text-base text-textMuted mt-1">
              {settings.language === 'hi'
                ? 'कोई भी जटिल निर्देश, फॉर्म या मैसेज नीचे पेस्ट करें। हम इसे आसान चरणों में तोड़ देंगे।'
                : 'Paste any complicated instructions, form, or message below. We will break it into easy steps.'}
            </p>
          </div>
        </div>

        <textarea
          rows={5}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={
            settings.language === 'hi'
              ? 'अपना टेक्स्ट यहाँ पेस्ट करें...'
              : 'Paste your text here...'
          }
          className="w-full p-4 rounded-2xl border-2 text-base sm:text-lg resize-y outline-none transition-all focus:ring-4"
          style={{
            backgroundColor: 'var(--bg-app)',
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-main)',
          }}
        />

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => handleSimplify()}
            disabled={!inputText.trim()}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-bold text-base sm:text-lg border-2 shadow transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.01]"
            style={{
              backgroundColor: 'var(--brand-brown)',
              borderColor: 'var(--brand-brown-hover)',
              color: 'var(--brand-text)',
            }}
          >
            <Lightbulb className="w-5 h-5" />
            <span>{settings.language === 'hi' ? 'इसे आसान बनाएं' : 'Simplify it'}</span>
          </button>

          {inputText && (
            <button
              onClick={() => {
                setInputText('');
                setSimplifiedResult(null);
              }}
              className="px-4 py-3 rounded-2xl border border-borderSubtle font-semibold text-textMuted hover:bg-secondary transition-all"
            >
              {settings.language === 'hi' ? 'हटाएं' : 'Clear'}
            </button>
          )}
        </div>
      </div>

      {/* Pre-built Sample Scenarios (Matching Screenshot 2) */}
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-textMuted px-1 block">
          {settings.language === 'hi' ? 'या कोई नमूना आज़माएं:' : 'Or try a sample:'}
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {GUIDE_SAMPLES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => handleSimplify(sample.originalText, sample.title)}
              className="flex items-center justify-between p-4 rounded-2xl border-2 shadow-sm text-left transition-all hover:scale-[1.02] group"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-main)',
              }}
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-brandBrown flex-shrink-0" />
                <span className="font-bold text-sm sm:text-base leading-snug">
                  {settings.language === 'hi' ? sample.titleHi : sample.title}
                </span>
              </div>
              <ArrowRight className="w-5 h-5 text-textMuted group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Simplified Result Box */}
      {simplifiedResult && (
        <div
          className="p-6 sm:p-8 rounded-3xl border-3 shadow-lg space-y-5 animate-in fade-in duration-300"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--brand-brown)',
          }}
        >
          <div className="flex items-start justify-between gap-4 border-b border-borderSubtle pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-green-700 dark:text-green-400 block mb-1">
                [✓ SIMPLIFIED BREAKDOWN]
              </span>
              <h3 className="text-2xl font-bold font-serif" style={{ color: 'var(--text-main)' }}>
                {simplifiedResult.title}
              </h3>
            </div>
            <button
              onClick={() => speakText(simplifiedResult.explanation)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-borderSubtle bg-secondary text-sm font-bold shadow-sm hover:scale-105 transition-all"
              style={{ color: 'var(--text-main)' }}
            >
              <Volume2 className="w-4 h-4 text-brandBrown" />
              <span>Read Aloud</span>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-secondary/60 border border-borderSubtle whitespace-pre-line text-base sm:text-lg leading-relaxed">
            {simplifiedResult.explanation}
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-textMuted">
              {settings.language === 'hi' ? 'आसान चरण:' : 'Action Steps:'}
            </span>
            <ul className="space-y-2 pl-2">
              {simplifiedResult.steps.map((st, i) => (
                <li key={i} className="flex items-start gap-2 text-sm sm:text-base">
                  <CheckCircle2 className="w-5 h-5 text-brandBrown flex-shrink-0 mt-0.5" />
                  <span>{st}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Integration with Feature 1: Memory Support Mode */}
          <div className="pt-2">
            <button
              onClick={handleOpenInOneStep}
              className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-bold text-base sm:text-lg shadow-md border-2 transition-all hover:scale-[1.01]"
              style={{
                backgroundColor: 'var(--brand-brown)',
                borderColor: 'var(--brand-brown-hover)',
                color: 'var(--brand-text)',
              }}
            >
              <Brain className="w-6 h-6" />
              <span>
                {settings.language === 'hi'
                  ? 'इसे मेमोरी सपोर्ट में एक-एक कदम करके देखें'
                  : 'Start One-Step-at-a-Time Assistance'}
              </span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
