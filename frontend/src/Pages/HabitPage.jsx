import { useEffect, useState } from "react";
import CreateHabitView from "../components/habitPage/CreateHabitView";

const HabitPage = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [habits, setHabits] = useState([
    { id: 1, name: 'Deep Work', goal: '4h', tag: 'Action', streak: 12, reflection: 'Focus is a muscle. Keep training it.', completed: [true, true, false, true, false, false, false] },
    { id: 2, name: 'Morning Reflection', goal: '15m', tag: 'Mind', streak: 5, reflection: 'Clarifying the mind before the noise starts.', completed: [true, true, true, true, true, false, false] },
    { id: 3, name: 'Physical Movement', goal: '30m', tag: 'Soul', streak: 8, reflection: 'The body deserves respect through motion.', completed: [false, true, true, false, true, false, false] },
  ]);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const calculateRate = (completedArray) => {
    const done = completedArray.filter(Boolean).length;
    return Math.round((done / completedArray.length) * 100);
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isCreating ? 'hidden' : 'unset';
  }, [isCreating]);

  return (
    <div className="min-h-screen bg-[#F9F9F8] text-zinc-800 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-125 h-125 bg-zinc-200/30 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-150 h-150 bg-zinc-200/20 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 pointer-events-none" />

      <main className="max-w-5xl mx-auto pt-40 px-8 pb-32 relative z-10">
        <header className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <span className="w-12 h-px bg-zinc-200"></span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 font-medium">March 2026 • Spring Collection</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="max-w-2xl">
              <h1 className="text-6xl md:text-7xl font-serif italic tracking-tight text-zinc-800 leading-[1.1]">Habit is the <br />architecture of life.</h1>
              <p className="mt-6 text-zinc-400 font-serif italic text-xl max-w-md">Small, deliberate actions today create the person you become tomorrow.</p>
            </div>

            <div className="flex items-center gap-12 border-l border-zinc-100 pl-12">
              <div className="text-right">
                <p className="text-[9px] uppercase tracking-widest text-zinc-400 mb-2">Global Success</p>
                <p className="text-4xl font-light font-mono text-zinc-700">84<span className="text-lg opacity-40">%</span></p>
              </div>

              {/* NAVIGATE TO CREATE VIEW */}
              <button
                onClick={() => setIsCreating(true)}
                className="group relative h-14 px-8 flex items-center justify-center bg-zinc-900 overflow-hidden rounded-full transition-all duration-500 hover:shadow-xl hover:shadow-zinc-200"
              >
                <div className="absolute inset-0 w-0 bg-zinc-800 transition-all duration-500 group-hover:w-full" />
                <span className="relative z-10 text-[10px] uppercase tracking-[0.2em] text-zinc-100 font-semibold whitespace-nowrap">Begin New Habit</span>
              </button>
            </div>
          </div>
        </header>

        <div className="space-y-12">
          {habits.map((habit) => (
            <section key={habit.id} className="group">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-4 space-y-6">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] text-zinc-300">0{habit.id}</span>
                    <h2 className="text-3xl font-medium text-zinc-800 tracking-tight">{habit.name}</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white border border-zinc-100 rounded-full text-[9px] uppercase tracking-widest text-zinc-500">{habit.tag}</span>
                    <span className="px-3 py-1 bg-zinc-50 rounded-full text-[9px] uppercase tracking-widest text-zinc-400">Target: {habit.goal}</span>
                  </div>
                  <p className="text-zinc-400 font-serif italic text-sm leading-relaxed border-l-2 border-zinc-50 pl-4">"{habit.reflection}"</p>
                </div>

                <div className="lg:col-span-8 bg-white p-8 md:p-10 rounded-[2.5rem] border border-zinc-100 group-hover:border-zinc-200 transition-all duration-700 shadow-sm group-hover:shadow-xl group-hover:shadow-zinc-200/40">
                  <div className="flex justify-between items-center mb-10">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-300 font-semibold">Weekly Progression</span>
                    <div className="flex gap-6">
                      <span className="text-[10px] text-zinc-400 font-mono">Streak: <span className="text-zinc-800">{habit.streak}d</span></span>
                      <span className="text-[10px] text-zinc-400 font-mono">Rate: <span className="text-zinc-800">{calculateRate(habit.completed)}%</span></span>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-3 md:gap-4">
                    {habit.completed.map((done, idx) => (
                      <button key={idx} className={`group/day relative flex flex-col items-center gap-4 py-6 rounded-3xl transition-all duration-700 border ${done ? 'bg-zinc-800 border-zinc-800 text-zinc-200' : 'bg-transparent border-zinc-100 text-zinc-300 hover:border-zinc-300'}`}>
                        <span className={`text-[9px] font-mono tracking-tighter ${done ? 'text-zinc-500' : 'text-zinc-300'}`}>{days[idx]}</span>
                        <div className={`w-1.5 h-1.5 rounded-full transition-all duration-700 ${done ? 'bg-zinc-400' : 'bg-zinc-100 group-hover/day:bg-zinc-200'}`} />
                        {done && <div className="absolute -top-1 -right-1 w-2 h-2 bg-zinc-400 rounded-full animate-pulse" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-40 pt-12 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <a href="/" className="group flex items-center gap-4 text-zinc-400 hover:text-zinc-800 transition-all text-sm font-serif italic">
            <div className="w-10 h-10 rounded-full border border-zinc-100 flex items-center justify-center group-hover:bg-zinc-900 group-hover:text-white transition-all duration-500">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="rotate-180">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
            Exit to Workspace
          </a>
          <div className="flex gap-8 items-center text-[9px] uppercase tracking-[0.4em] text-zinc-300">
            <span>Privacy</span>
            <span>Archives</span>
            <span className="text-zinc-200">© MMXXVI</span>
          </div>
        </footer>
      </main>

      {/* --- CREATE HABIT OVERLAY --- */}
      {isCreating && (
        <CreateHabitView
          onCancel={() => setIsCreating(false)}
          onSave={(newData) => {
            const newHabit = {
              id: Date.now(),
              ...newData,
              streak: 0,
              completed: [false, false, false, false, false, false, false]
            };
            setHabits([newHabit, ...habits]);
            setIsCreating(false);
          }}
        />
      )}
    </div>
  );
};

export default HabitPage;