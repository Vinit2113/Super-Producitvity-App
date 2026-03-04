import { useState } from 'react';

// --- SUB-COMPONENT: CREATE HABIT VIEW ---
const CreateHabitView = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    goal: '',
    tag: 'Action',
    reflection: ''
  });

  const tags = ['Action', 'Mind', 'Soul', 'Body'];

  return (
    <div className="fixed inset-0 z-100 bg-[#F9F9F8] flex flex-col overflow-y-auto animate-in fade-in duration-700">
      <div className="absolute top-0 left-1/4 w-125 h-125 bg-zinc-200/30 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 pointer-events-none" />

      <main className="max-w-3xl mx-auto w-full pt-32 px-8 pb-20 relative z-10 flex-1">
        <header className="mb-20">
          <button
            onClick={onCancel}
            className="group flex items-center gap-3 text-zinc-400 hover:text-zinc-800 transition-all text-xs font-serif italic mb-10"
          >
            <div className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-zinc-900 group-hover:text-white transition-all">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="rotate-180">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
            Discard Entry
          </button>

          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-px bg-zinc-200"></span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 font-medium">New Intention</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif italic tracking-tight text-zinc-800 leading-[1.1]">Define the ritual.</h1>
        </header>

        <div className="space-y-16">
          <div className="space-y-4">
            <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">What is the habit?</label>
            <input
              type="text"
              placeholder="e.g. Deep Work"
              className="w-full bg-transparent border-b border-zinc-100 py-4 text-3xl font-medium text-zinc-800 focus:outline-none focus:border-zinc-900 transition-colors placeholder:text-zinc-200"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">Daily Target</label>
              <input
                type="text"
                placeholder="e.g. 4h"
                className="w-full bg-transparent border-b border-zinc-100 py-4 text-xl text-zinc-800 focus:outline-none focus:border-zinc-900 transition-colors placeholder:text-zinc-200"
                value={formData.goal}
                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">Sphere</label>
              <div className="flex flex-wrap gap-2 pt-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setFormData({ ...formData, tag })}
                    className={`px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest transition-all border ${formData.tag === tag
                      ? 'bg-zinc-900 border-zinc-900 text-white'
                      : 'bg-white border-zinc-100 text-zinc-400 hover:border-zinc-300'
                      }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">Reflection</label>
            <textarea
              placeholder="The philosophy behind this habit..."
              rows="2"
              className="w-full bg-transparent border-b border-zinc-100 py-4 text-lg font-serif italic text-zinc-500 focus:outline-none focus:border-zinc-900 transition-colors placeholder:text-zinc-200 resize-none"
              value={formData.reflection}
              onChange={(e) => setFormData({ ...formData, reflection: e.target.value })}
            />
          </div>

          <footer className="pt-10 flex justify-end">
            <button
              onClick={() => onSave(formData)}
              className="group relative h-16 px-12 bg-zinc-900 overflow-hidden rounded-full transition-all duration-500 hover:shadow-2xl hover:shadow-zinc-300"
            >
              <div className="absolute inset-0 w-0 bg-zinc-800 transition-all duration-500 group-hover:w-full" />
              <span className="relative z-10 text-[11px] uppercase tracking-[0.3em] text-zinc-100 font-bold">Archive Intention</span>
            </button>
          </footer>
        </div>
      </main>
    </div>
  );
};


export default CreateHabitView