import React, { useState } from 'react';
import { useAccessibility } from '../../contexts/AccessibilityContext.js';
import {
  StickyNote,
  Plus,
  Trash2,
  Edit3,
  Volume2,
  CheckCircle2,
  AlertTriangle,
  X,
  FileText,
  Clock,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { PersonalNote } from '../../types/accessibility.js';

export const PersonalNotesScreen: React.FC = () => {
  const { notes, addNote, updateNote, deleteNote, speakText, settings, showFeedback } = useAccessibility();

  const [isEditing, setIsEditing] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteCategory, setNoteCategory] = useState<PersonalNote['category']>('general');

  // Confirmation modal state before deleting
  const [noteToDelete, setNoteToDelete] = useState<PersonalNote | null>(null);

  const startCreateNew = (templateTitle?: string, templateContent?: string, category: PersonalNote['category'] = 'general') => {
    setEditingNoteId(null);
    setNoteTitle(templateTitle || '');
    setNoteContent(templateContent || '');
    setNoteCategory(category);
    setIsEditing(true);
  };

  const startEdit = (note: PersonalNote) => {
    setEditingNoteId(note.id);
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setNoteCategory(note.category);
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim() && !noteContent.trim()) {
      showFeedback('Please enter a note title or some information.', 'warning');
      return;
    }

    if (editingNoteId) {
      updateNote(editingNoteId, noteTitle, noteContent, noteCategory);
    } else {
      addNote(noteTitle, noteContent, noteCategory);
    }

    setIsEditing(false);
    setEditingNoteId(null);
    setNoteTitle('');
    setNoteContent('');
  };

  const confirmDelete = () => {
    if (noteToDelete) {
      deleteNote(noteToDelete.id);
      setNoteToDelete(null);
    }
  };

  const seniorTemplates = [
    {
      label: 'Doctor Appointment',
      labelHi: 'डॉक्टर की अपॉइंटमेंट',
      title: 'Dr. Appointment Details',
      content: 'Hospital: \nDoctor Name: \nDate & Time: \nRoom No: \nThings to carry: Old reports, glasses',
      category: 'medicine' as const,
    },
    {
      label: 'Medicine Schedule',
      labelHi: 'दवाइयों का समय',
      title: 'Daily Medicines',
      content: 'Morning (after breakfast): \nAfternoon (after lunch): \nNight (before bed): \nPharmacy phone: ',
      category: 'medicine' as const,
    },
    {
      label: 'Service Number',
      labelHi: 'जरूरी फोन नंबर',
      title: 'Local Service Contacts',
      content: 'Plumber: \nElectrician: \nChemist: \nMilk delivery: ',
      category: 'contact' as const,
    },
    {
      label: 'Account Reference',
      labelHi: 'खाता / बिल संदर्भ',
      title: 'Electricity / Water Consumer ID',
      content: 'Electricity Board CA Number: \nWater connection No: \nGas consumer ID: ',
      category: 'general' as const,
    },
  ];

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
            <StickyNote className="w-7 h-7" aria-hidden="true" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-textMuted block">
              {settings.language === 'hi' ? 'सुरक्षित डायरी' : 'SAFE PERSONAL MEMORY NOTEBOOK'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif" style={{ color: 'var(--text-main)' }}>
              {settings.language === 'hi' ? 'मेरे पर्सनल नोट्स' : 'Personal Notes'}
            </h1>
          </div>
        </div>

        <button
          onClick={() => startCreateNew()}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-base shadow-md border-2 transition-all hover:scale-105"
          style={{
            backgroundColor: 'var(--brand-brown)',
            borderColor: 'var(--brand-brown-hover)',
            color: 'var(--brand-text)',
          }}
          aria-label="Create a new personal note"
        >
          <Plus className="w-5 h-5" />
          <span>{settings.language === 'hi' ? 'नया नोट लिखें' : 'Add New Note'}</span>
        </button>
      </div>

      {/* Quick Templates Bar for Seniors */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-textMuted px-1 block">
          {settings.language === 'hi' ? 'जल्दी नोट बनाने के लिए चुनें:' : 'Quick Note Starters:'}
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {seniorTemplates.map((t, idx) => (
            <button
              key={idx}
              onClick={() => startCreateNew(t.title, t.content, t.category)}
              className="p-3 rounded-2xl border-2 text-left font-bold text-xs sm:text-sm shadow-sm transition-all hover:border-brandBrown"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-main)',
              }}
            >
              <span className="block truncate">{settings.language === 'hi' ? t.labelHi : t.label}</span>
              <span className="text-[11px] text-textMuted font-normal mt-0.5 block">+ Tap to use</span>
            </button>
          ))}
        </div>
      </div>

      {/* Note Editor Modal / Inline Form */}
      {isEditing && (
        <form
          onSubmit={handleSave}
          className="p-6 sm:p-8 rounded-3xl border-3 shadow-xl space-y-4 animate-in fade-in"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--brand-brown)',
          }}
        >
          <div className="flex items-center justify-between border-b border-borderSubtle pb-3">
            <h2 className="text-xl font-bold font-serif" style={{ color: 'var(--text-main)' }}>
              {editingNoteId
                ? settings.language === 'hi'
                  ? 'नोट बदलें'
                  : 'Edit Note'
                : settings.language === 'hi'
                ? 'नया नोट लिखें'
                : 'Write a New Note'}
            </h2>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="p-2 rounded-xl hover:bg-secondary text-textMuted"
              aria-label="Cancel editing"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold block" style={{ color: 'var(--text-main)' }}>
              {settings.language === 'hi' ? 'नोट का शीर्षक' : 'Note Title'}
            </label>
            <input
              type="text"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              placeholder={
                settings.language === 'hi'
                  ? 'जैसे: डॉक्टर की दवाई या बिजली का बिल'
                  : 'e.g. Doctor details, electricity bill CA number'
              }
              className="w-full p-3.5 rounded-xl border-2 text-base font-semibold outline-none focus:ring-4"
              style={{
                backgroundColor: 'var(--bg-app)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-main)',
              }}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold block" style={{ color: 'var(--text-main)' }}>
              {settings.language === 'hi' ? 'महत्वपूर्ण जानकारी' : 'Important Information'}
            </label>
            <textarea
              rows={5}
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder={
                settings.language === 'hi'
                  ? 'यहाँ अपनी जानकारी लिखें...'
                  : 'Type your notes, dates, contact numbers, or details here...'
              }
              className="w-full p-3.5 rounded-xl border-2 text-base leading-relaxed outline-none focus:ring-4 resize-y"
              style={{
                backgroundColor: 'var(--bg-app)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-main)',
              }}
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="w-full sm:w-auto px-5 py-3 rounded-xl border-2 border-borderSubtle font-bold text-sm hover:bg-secondary transition-all"
            >
              {settings.language === 'hi' ? 'रद्द करें' : 'Cancel'}
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3 rounded-xl font-bold text-base shadow border-2 transition-all hover:scale-105"
              style={{
                backgroundColor: 'var(--brand-brown)',
                borderColor: 'var(--brand-brown-hover)',
                color: 'var(--brand-text)',
              }}
            >
              {settings.language === 'hi' ? 'नोट सुरक्षित करें ✓' : 'Save Note ✓'}
            </button>
          </div>
        </form>
      )}

      {/* Notes List (Feature 1.D: Display notes in clear, readable layout) */}
      {notes.length === 0 ? (
        <div
          className="text-center py-16 px-4 rounded-3xl border-2 border-dashed space-y-3"
          style={{
            borderColor: 'var(--border-strong)',
            backgroundColor: 'var(--bg-surface)',
          }}
        >
          <StickyNote className="w-12 h-12 text-textMuted mx-auto opacity-50" />
          <h3 className="text-xl font-bold font-serif" style={{ color: 'var(--text-main)' }}>
            {settings.language === 'hi' ? 'अभी कोई नोट नहीं है' : 'No notes saved yet'}
          </h3>
          <p className="text-sm text-textMuted max-w-md mx-auto">
            {settings.language === 'hi'
              ? 'डॉक्टर की पर्ची, जरूरी तारीखें या बिजली का नंबर याद रखने के लिए "नया नोट लिखें" पर टैप करें।'
              : 'Tap "Add New Note" above to write down medicines, bill IDs, or important phone numbers.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="p-5 sm:p-6 rounded-3xl border-2 shadow-sm flex flex-col justify-between gap-4 transition-all hover:shadow-md"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg sm:text-xl font-bold font-serif leading-snug" style={{ color: 'var(--text-main)' }}>
                    {note.title}
                  </h3>
                  <button
                    onClick={() => speakText(`${note.title}. ${note.content}`)}
                    className="p-2 rounded-xl hover:bg-secondary text-brandBrown border border-borderSubtle transition-all flex-shrink-0"
                    aria-label={`Read note "${note.title}" aloud`}
                    title="Read note aloud"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line text-textMain/90 p-3 rounded-2xl bg-secondary/50 border border-borderSubtle">
                  {note.content}
                </p>
              </div>

              {/* Note Card Footer: Date & Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-borderSubtle text-xs">
                <span className="flex items-center gap-1.5 text-textMuted font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Saved on {note.createdAt}</span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => startEdit(note)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-borderSubtle hover:bg-secondary font-bold text-xs"
                    style={{ color: 'var(--text-main)' }}
                    aria-label={`Edit note "${note.title}"`}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => setNoteToDelete(note)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-300 dark:border-red-800 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 font-bold text-xs transition-colors"
                    aria-label={`Delete note "${note.title}"`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CONFIRMATION MODAL BEFORE DELETING (Requirement 1.D) */}
      {noteToDelete && (
        <div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <div
            className="w-full max-w-md rounded-3xl border-4 p-6 sm:p-8 space-y-4 shadow-2xl animate-in zoom-in-95"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--emergency-red)',
              color: 'var(--text-main)',
            }}
          >
            <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
              <AlertTriangle className="w-8 h-8 flex-shrink-0" />
              <h3 id="delete-dialog-title" className="text-xl sm:text-2xl font-bold font-serif">
                {settings.language === 'hi' ? 'क्या आप इस नोट को हटाना चाहते हैं?' : 'Delete this note?'}
              </h3>
            </div>

            <p className="text-base text-textMuted leading-relaxed">
              {settings.language === 'hi'
                ? `क्या आप वाकई "${noteToDelete.title}" को मिटाना चाहते हैं? एक बार हटाने के बाद इसे वापस नहीं लाया जा सकता।`
                : `Are you sure you want to delete "${noteToDelete.title}"? This action cannot be undone.`}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-3">
              <button
                onClick={() => setNoteToDelete(null)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border-2 border-borderStrong font-bold text-sm hover:bg-secondary transition-all"
              >
                {settings.language === 'hi' ? 'नहीं, नोट रखें' : 'Cancel, Keep Note'}
              </button>

              <button
                onClick={confirmDelete}
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm shadow text-white transition-all hover:opacity-90"
                style={{ backgroundColor: 'var(--emergency-red)' }}
              >
                {settings.language === 'hi' ? 'हाँ, हटा दें' : 'Yes, Delete Note'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
