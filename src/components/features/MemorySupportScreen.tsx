import React, { useState } from 'react';
import { useAccessibility } from '../../contexts/AccessibilityContext.js';
import {
  Brain,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Home,
  Volume2,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { SAMPLE_GUIDED_TASKS } from '../../services/sampleTasks.js';
import { GuidedTask } from '../../types/accessibility.js';

export const MemorySupportScreen: React.FC = () => {
  const {
    settings,
    activeTask,
    setActiveTask,
    setActiveTab,
    speakText,
    repeatSpeech,
    showFeedback,
  } = useAccessibility();

  // Selected task; default to first sample if none active
  const currentTask: GuidedTask = activeTask || SAMPLE_GUIDED_TASKS[0];
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps = settings.language === 'hi' ? currentTask.stepsHi : currentTask.steps;
  const totalSteps = steps.length;
  const currentStep = steps[currentStepIndex] || steps[0];

  const handleNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      const nextStep = steps[nextIndex];
      if (settings.readAloud) {
        speakText(`${nextStep.instruction}. ${nextStep.explanation}`);
      }
    } else {
      showFeedback('Congratulations! You completed all steps of this task.', 'success');
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      const prevStep = steps[prevIndex];
      if (settings.readAloud) {
        speakText(`${prevStep.instruction}. ${prevStep.explanation}`);
      }
    }
  };

  const handleRepeat = () => {
    const text = `${currentStep.instruction}. ${currentStep.explanation}. ${currentStep.tip || ''}`;
    speakText(text);
    showFeedback('Reading instruction aloud...', 'info');
  };

  const handleRestart = () => {
    setCurrentStepIndex(0);
    showFeedback('Restarted task from Step 1.', 'info');
  };

  const handleSelectTask = (task: GuidedTask) => {
    setActiveTask(task);
    setCurrentStepIndex(0);
    showFeedback(`Switched task to "${settings.language === 'hi' ? task.titleHi : task.title}".`, 'info');
  };

  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  return (
    <div className="py-6 sm:py-8 space-y-6 max-w-4xl mx-auto pb-28">
      {/* Header Banner */}
      <div
        className="p-6 rounded-3xl border-2 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{
          backgroundColor: 'var(--bg-banner)',
          borderColor: 'var(--border-strong)',
        }}
      >
        <div className="flex items-center gap-3.5">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md flex-shrink-0"
            style={{
              backgroundColor: 'var(--brand-brown)',
              color: 'var(--brand-text)',
            }}
          >
            <Brain className="w-7 h-7" aria-hidden="true" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-textMuted block">
              {settings.language === 'hi' ? 'स्मृति सहायता मोड' : 'MEMORY SUPPORT ASSISTANCE'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif" style={{ color: 'var(--text-main)' }}>
              {settings.language === 'hi' ? 'एक-एक कदम सहायता' : 'One-Step-at-a-Time Assistance'}
            </h1>
          </div>
        </div>

        {/* Quick Return to Home / Tasks */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('assistant')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-bold border border-borderSubtle bg-surface hover:bg-secondary transition-all"
            style={{ color: 'var(--text-main)' }}
          >
            <Home className="w-4 h-4" />
            <span>{settings.language === 'hi' ? 'होम पेज' : 'Return Home'}</span>
          </button>
        </div>
      </div>

      {/* Task Selection Bar */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-textMuted block px-1">
          {settings.language === 'hi' ? 'कार्य चुनें:' : 'Select Task to Follow:'}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {SAMPLE_GUIDED_TASKS.map((t) => {
            const isSelected = t.id === currentTask.id;
            return (
              <button
                key={t.id}
                onClick={() => handleSelectTask(t)}
                className={`p-3 rounded-2xl border-2 text-left font-bold text-xs sm:text-sm transition-all shadow-sm ${
                  isSelected
                    ? 'ring-2 ring-brandBrown border-brandBrown scale-[1.02]'
                    : 'border-borderSubtle bg-surface hover:border-borderStrong'
                }`}
                style={{
                  backgroundColor: isSelected ? 'var(--brand-brown-light)' : 'var(--bg-surface)',
                  color: 'var(--text-main)',
                }}
              >
                <div className="truncate">{settings.language === 'hi' ? t.titleHi : t.title}</div>
                <div className="text-[11px] text-textMuted font-normal mt-0.5">
                  {t.steps.length} {settings.language === 'hi' ? 'चरण' : 'steps'}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress Indicator (e.g. "Step 2 of 5") */}
      <div
        className="p-4 sm:p-5 rounded-2xl border-2 shadow-sm space-y-3"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        <div className="flex items-center justify-between text-base sm:text-lg font-bold">
          <span style={{ color: 'var(--brand-brown)' }}>
            {settings.language === 'hi'
              ? `चरण ${currentStepIndex + 1} / ${totalSteps}`
              : `Step ${currentStepIndex + 1} of ${totalSteps}`}
          </span>
          <span className="text-sm font-semibold text-textMuted">
            {progressPercent}% {settings.language === 'hi' ? 'पूर्ण' : 'Completed'}
          </span>
        </div>

        {/* Visual Progress Bar */}
        <div
          className="w-full h-3.5 rounded-full overflow-hidden border border-borderSubtle"
          style={{ backgroundColor: 'var(--bg-secondary)' }}
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${progressPercent}%`,
              backgroundColor: 'var(--brand-brown)',
            }}
          />
        </div>

        {/* Step Dots */}
        <div className="flex justify-between items-center px-1 pt-1">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStepIndex(idx)}
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all border-2 ${
                idx === currentStepIndex
                  ? 'scale-110 shadow ring-2 ring-brandBrown border-brandBrown'
                  : idx < currentStepIndex
                  ? 'border-green-600 bg-green-100 text-green-900 dark:bg-green-950 dark:text-green-200'
                  : 'border-borderSubtle bg-secondary text-textMuted'
              }`}
              style={{
                backgroundColor:
                  idx === currentStepIndex
                    ? 'var(--brand-brown)'
                    : undefined,
                color:
                  idx === currentStepIndex
                    ? 'var(--brand-text)'
                    : undefined,
              }}
              aria-label={`Jump to Step ${idx + 1}`}
            >
              {idx < currentStepIndex ? '✓' : idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* SINGLE INSTRUCTION DISPLAY BOX (Feature 1.A: Display only one instruction at a time) */}
      <div
        className="p-6 sm:p-10 rounded-3xl border-4 shadow-xl space-y-6 relative"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-strong)',
        }}
      >
        {/* Step Badge & Audio Read Button */}
        <div className="flex items-center justify-between border-b border-borderSubtle pb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-extrabold border-2"
            style={{
              backgroundColor: 'var(--brand-brown-light)',
              borderColor: 'var(--brand-brown)',
              color: 'var(--text-main)',
            }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-brandBrown animate-ping" />
            <span>CURRENT STEP {currentStepIndex + 1} OF {totalSteps}</span>
          </div>

          {/* Repeat Instructions / Read This to Me Button */}
          <button
            onClick={handleRepeat}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border-2 shadow-sm transition-all hover:scale-105"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-strong)',
              color: 'var(--text-main)',
            }}
            aria-label="Read this instruction aloud"
            title="Read instructions aloud to me"
          >
            <Volume2 className="w-5 h-5 text-brandBrown" />
            <span>{settings.language === 'hi' ? 'मुझे पढ़कर सुनाएं' : 'Read This to Me'}</span>
          </button>
        </div>

        {/* Short, Simple Primary Sentence */}
        <div className="space-y-4">
          <h2
            className="text-2xl sm:text-3xl font-serif font-bold leading-snug"
            style={{ color: 'var(--text-main)' }}
          >
            {currentStep.instruction}
          </h2>

          {/* Helpful Plain-Language Explanation */}
          <p
            className="text-lg sm:text-xl leading-relaxed p-4 rounded-2xl border border-borderSubtle"
            style={{
              backgroundColor: 'var(--bg-app)',
              color: 'var(--text-main)',
            }}
          >
            {currentStep.explanation}
          </p>

          {/* Practical Safety Tip */}
          {currentStep.tip && (
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-700 text-amber-950 dark:text-amber-100">
              <HelpCircle className="w-6 h-6 text-amber-700 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm sm:text-base font-medium">
                <span className="font-bold uppercase tracking-wider block text-xs mb-0.5">
                  [HELPFUL TIP]
                </span>
                {currentStep.tip}
              </div>
            </div>
          )}
        </div>

        {/* LARGE ACTION BUTTONS: Next Step, Go Back, Repeat (Requirement 1.A) */}
        <div className="pt-4 border-t border-borderSubtle space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Go Back Button */}
            <button
              onClick={handleBack}
              disabled={currentStepIndex === 0}
              className="flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-bold text-base sm:text-lg border-2 shadow-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-secondary"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-strong)',
                color: 'var(--text-main)',
              }}
              aria-label="Go Back to Previous Step"
            >
              <ArrowLeft className="w-6 h-6" />
              <span>{settings.language === 'hi' ? 'पीछे जाएं' : 'Go Back'}</span>
            </button>

            {/* Repeat Button */}
            <button
              onClick={handleRepeat}
              className="flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-bold text-base sm:text-lg border-2 shadow-sm transition-all hover:bg-secondary"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-strong)',
                color: 'var(--text-main)',
              }}
              aria-label="Repeat Current Instruction"
            >
              <RotateCcw className="w-5 h-5 text-brandBrown" />
              <span>{settings.language === 'hi' ? 'दोहराएं' : 'Repeat'}</span>
            </button>

            {/* Next Step / Finish Button */}
            <button
              onClick={handleNext}
              className="flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-bold text-base sm:text-lg border-2 shadow-md transition-all hover:scale-[1.02]"
              style={{
                backgroundColor: 'var(--brand-brown)',
                borderColor: 'var(--brand-brown-hover)',
                color: 'var(--brand-text)',
              }}
              aria-label={
                currentStepIndex === totalSteps - 1
                  ? 'Finish task'
                  : 'Proceed to Next Step'
              }
            >
              <span>
                {currentStepIndex === totalSteps - 1
                  ? settings.language === 'hi'
                    ? 'कार्य पूरा हुआ ✓'
                    : 'Finish Task ✓'
                  : settings.language === 'hi'
                  ? 'अगला कदम'
                  : 'Next Step'}
              </span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>

          {/* Secondary Options: Restart Task or Return to Home (Requirement 1.A) */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 text-sm">
            <button
              onClick={handleRestart}
              className="font-bold underline text-textMuted hover:text-textMain flex items-center gap-1.5 p-1"
            >
              <RotateCcw className="w-4 h-4" />
              <span>
                {settings.language === 'hi' ? 'कार्य दोबारा शुरू करें' : 'Restart this task from Step 1'}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('assistant')}
              className="font-bold underline text-textMuted hover:text-textMain flex items-center gap-1.5 p-1"
            >
              <Home className="w-4 h-4" />
              <span>
                {settings.language === 'hi' ? 'होमपेज पर वापस जाएं' : 'Return to DigiSaathi homepage'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
