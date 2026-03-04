
const ConstructionPage = ({ featureName = "This Space", onBack }) => {
  return (
    <div className="min-h-screen bg-[#F9F9F8] text-zinc-800 relative overflow-hidden flex flex-col justify-center">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-125 h-125 bg-zinc-200/30 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-150 h-150 bg-zinc-200/20 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 pointer-events-none" />

      <main className="max-w-4xl mx-auto px-8 relative z-10 text-center">
        {/* Editorial Label */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className="w-8 h-px bg-zinc-300"></span>
          <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 font-medium">
            Status: Archive Pending
          </span>
          <span className="w-8 h-px bg-zinc-300"></span>
        </div>

        {/* Hero Text */}
        <h1 className="text-6xl md:text-8xl font-serif italic tracking-tighter text-zinc-800 mb-8 leading-tight">
          Quietly <br />Composing.
        </h1>

        <p className="max-w-md mx-auto text-zinc-400 font-serif italic text-xl mb-16 leading-relaxed">
          {featureName} is currently being refined to meet the standard of your workspace.
          We believe in the beauty of things done slowly and well.
        </p>

        {/* Return Button */}
        <div className="flex justify-center">
          <button
            onClick={onBack || (() => window.history.back())}
            className="group relative h-14 px-10 flex items-center justify-center bg-zinc-900 overflow-hidden rounded-full transition-all duration-500 hover:shadow-xl hover:shadow-zinc-200 hover:cursor-pointer"
          >
            <div className="absolute inset-0 w-0 bg-zinc-800 transition-all duration-500 group-hover:w-full" />
            <span className="relative z-10 text-[10px] uppercase tracking-[0.3em] text-zinc-100 font-semibold ">
              Return to Safety
            </span>
          </button>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="absolute bottom-12 left-0 w-full text-center">
        <span className="text-[9px] uppercase tracking-[0.5em] text-zinc-300">
          Refinement in Progress • MMXXVI
        </span>
      </footer>
    </div>
  );
};

export default ConstructionPage;