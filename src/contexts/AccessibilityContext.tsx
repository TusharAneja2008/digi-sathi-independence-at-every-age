import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import {
  ThemeMode,
  TextSize,
  Language,
  ActiveTab,
  PersonalNote,
  TrustedContact,
  AccessibilitySettings,
  GuidedTask,
} from '../types/accessibility.js';
import { speechService } from '../services/speechService.js';
import { SAMPLE_GUIDED_TASKS } from '../services/sampleTasks.js';

interface FeedbackMessage {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  message: string;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSettings: (partial: Partial<AccessibilitySettings>) => void;
  resetSettings: () => void;
  resetTheme: () => void;

  // Modals & Navigation
  isAccessibilityModalOpen: boolean;
  setIsAccessibilityModalOpen: (open: boolean) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;

  // Active Guided Task (for Memory Support Mode)
  activeTask: GuidedTask | null;
  setActiveTask: (task: GuidedTask | null) => void;
  startTaskById: (id: string) => void;

  // Personal Notes
  notes: PersonalNote[];
  addNote: (title: string, content: string, category?: PersonalNote['category']) => void;
  updateNote: (id: string, title: string, content: string, category?: PersonalNote['category']) => void;
  deleteNote: (id: string) => void;

  // Trusted Contact
  trustedContact: TrustedContact;
  updateTrustedContact: (contact: TrustedContact) => void;

  // Audio / Speech
  isSpeaking: boolean;
  isPaused: boolean;
  currentSpokenText: string;
  speakText: (text: string) => void;
  pauseSpeech: () => void;
  resumeSpeech: () => void;
  stopSpeech: () => void;
  repeatSpeech: () => void;

  // Clear Feedback Alerts
  feedback: FeedbackMessage | null;
  showFeedback: (message: string, type?: FeedbackMessage['type']) => void;
  clearFeedback: () => void;
}

const DEFAULT_SETTINGS: AccessibilitySettings = {
  memorySupportMode: false,
  simpleMode: false,
  highContrastMode: false,
  theme: 'original',
  textSize: 'normal',
  readAloud: false,
  speechSpeed: 'normal',
  language: 'en',
};

const DEFAULT_NOTES: PersonalNote[] = [
  {
    id: 'note-1',
    title: 'Dr. Sharma Cardiology Visit',
    content: 'Room 204 at City Hospital. Token #38. Fasting blood test required at 10:45 AM. Carry UHID 908129 card.',
    category: 'medicine',
    createdAt: new Date(Date.now() - 86400000 * 2).toLocaleDateString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toLocaleDateString(),
  },
  {
    id: 'note-2',
    title: 'Electricity Consumer Number',
    content: 'BSES CA Number: 102938475. Bill is due on the 5th of every month. Check with son before paying.',
    category: 'general',
    createdAt: new Date(Date.now() - 86400000 * 5).toLocaleDateString(),
    updatedAt: new Date(Date.now() - 86400000 * 5).toLocaleDateString(),
  },
];

const DEFAULT_CONTACT: TrustedContact = {
  name: 'Priya (Daughter)',
  phone: '+91 98765 43210',
  relationship: 'Daughter',
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

const STORAGE_KEY_SETTINGS = 'digisaathi_accessibility_settings_v3';
const STORAGE_KEY_NOTES = 'digisaathi_notes_v3';
const STORAGE_KEY_CONTACT = 'digisaathi_contact_v3';

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load saved settings or fall back to defaults
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Could not read saved settings:', e);
    }
    return DEFAULT_SETTINGS;
  });

  const [notes, setNotes] = useState<PersonalNote[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_NOTES);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not read saved notes:', e);
    }
    return DEFAULT_NOTES;
  });

  const [trustedContact, setTrustedContact] = useState<TrustedContact>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONTACT);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not read saved contact:', e);
    }
    return DEFAULT_CONTACT;
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('assistant');
  const [activeTask, setActiveTask] = useState<GuidedTask | null>(null);
  const [isAccessibilityModalOpen, setIsAccessibilityModalOpen] = useState(false);

  // Audio speech status
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSpokenText, setCurrentSpokenText] = useState('');

  // Feedback banner state
  const [feedback, setFeedback] = useState<FeedbackMessage | null>(null);

  // Subscribe to speech service
  useEffect(() => {
    const unsub = speechService.subscribe((speaking, paused, text) => {
      setIsSpeaking(speaking);
      setIsPaused(paused);
      setCurrentSpokenText(text);
    });
    return unsub;
  }, []);

  // Sync settings to localStorage & apply DOM classes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.warn('Could not save settings:', e);
    }

    // Apply classes to root html and documentElement
    const root = document.documentElement;
    root.classList.remove('theme-original', 'theme-hc-light', 'theme-hc-dark', 'hc-mode');
    root.classList.remove('text-size-sm', 'text-size-normal', 'text-size-lg', 'text-size-xl');

    root.classList.add(`theme-${settings.theme}`);
    root.classList.add(`text-size-${settings.textSize}`);

    if (settings.highContrastMode || settings.theme !== 'original') {
      root.classList.add('hc-mode');
    }
  }, [settings]);

  // Sync notes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(notes));
    } catch (e) {
      console.warn('Could not save notes:', e);
    }
  }, [notes]);

  // Sync contact to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CONTACT, JSON.stringify(trustedContact));
    } catch (e) {
      console.warn('Could not save contact:', e);
    }
  }, [trustedContact]);

  const showFeedback = useCallback((message: string, type: FeedbackMessage['type'] = 'success') => {
    setFeedback({
      id: String(Date.now()),
      type,
      message,
    });
  }, []);

  const clearFeedback = useCallback(() => {
    setFeedback(null);
  }, []);

  const updateSettings = useCallback((partial: Partial<AccessibilitySettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...partial };
      return updated;
    });
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    speechService.stop();
    showFeedback('Accessibility settings restored to defaults.', 'info');
  }, [showFeedback]);

  const resetTheme = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      theme: 'original',
      highContrastMode: false,
    }));
    showFeedback('Restored to Original Brown Matte theme.', 'info');
  }, [showFeedback]);

  const speakText = useCallback(
    (text: string) => {
      speechService.speak(text, settings.language, settings.speechSpeed);
    },
    [settings.language, settings.speechSpeed]
  );

  const pauseSpeech = useCallback(() => {
    speechService.pause();
  }, []);

  const resumeSpeech = useCallback(() => {
    speechService.resume();
  }, []);

  const stopSpeech = useCallback(() => {
    speechService.stop();
  }, []);

  const repeatSpeech = useCallback(() => {
    speechService.repeat();
  }, []);

  const startTaskById = useCallback((id: string) => {
    const task = SAMPLE_GUIDED_TASKS.find((t) => t.id === id);
    if (task) {
      setActiveTask(task);
      setActiveTab('memory');
    }
  }, []);

  // Notes operations
  const addNote = useCallback(
    (title: string, content: string, category: PersonalNote['category'] = 'general') => {
      const newNote: PersonalNote = {
        id: 'note-' + Date.now(),
        title: title.trim() || 'Untitled Note',
        content: content.trim(),
        category,
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date().toLocaleDateString(),
      };
      setNotes((prev) => [newNote, ...prev]);
      showFeedback('Your note has been saved.', 'success');
    },
    [showFeedback]
  );

  const updateNote = useCallback(
    (id: string, title: string, content: string, category: PersonalNote['category'] = 'general') => {
      setNotes((prev) =>
        prev.map((n) =>
          n.id === id
            ? {
                ...n,
                title: title.trim() || 'Untitled Note',
                content: content.trim(),
                category,
                updatedAt: new Date().toLocaleDateString(),
              }
            : n
        )
      );
      showFeedback('Your note has been updated.', 'success');
    },
    [showFeedback]
  );

  const deleteNote = useCallback(
    (id: string) => {
      setNotes((prev) => prev.filter((n) => n.id !== id));
      showFeedback('Note deleted.', 'info');
    },
    [showFeedback]
  );

  const updateTrustedContact = useCallback(
    (contact: TrustedContact) => {
      setTrustedContact(contact);
      showFeedback('Emergency contact details saved.', 'success');
    },
    [showFeedback]
  );

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        updateSettings,
        resetSettings,
        resetTheme,
        isAccessibilityModalOpen,
        setIsAccessibilityModalOpen,
        activeTab,
        setActiveTab,
        activeTask,
        setActiveTask,
        startTaskById,
        notes,
        addNote,
        updateNote,
        deleteNote,
        trustedContact,
        updateTrustedContact,
        isSpeaking,
        isPaused,
        currentSpokenText,
        speakText,
        pauseSpeech,
        resumeSpeech,
        stopSpeech,
        repeatSpeech,
        feedback,
        showFeedback,
        clearFeedback,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
