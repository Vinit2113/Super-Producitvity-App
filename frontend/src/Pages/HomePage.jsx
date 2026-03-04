// import { Link } from 'react-router-dom';

const HomePage = () => {
  const tools = [
    {
      name: 'To-Do',
      desc: 'Organize and manage daily tasks',
      link: '/todo',
      num: '01',
      tag: 'Action'
    },
    {
      name: 'Habits',
      desc: 'Build consistent routines',
      link: '/habits',
      num: '02',
      tag: 'Routine'
    },
    {
      name: 'Journal',
      desc: 'Productivity reflections',
      link: '/journal',
      num: '03',
      tag: 'Mind'
    },
    {
      name: 'Diary',
      desc: 'Personal thoughts space',
      link: '/diary',
      num: '04',
      tag: 'Soul'
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9F9F8] text-zinc-900 relative overflow-hidden">
      {/* Subtle Background Glows (from Editorial) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-zinc-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-120 h-120 bg-zinc-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none" />

      {/* <Navbar /> */}

      <main className="max-w-5xl mx-auto pt-40 px-8 pb-20 relative z-10">

        {/* Refined Header (from Editorial) */}
        <header className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-8 h-px bg-zinc-300"></span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-medium">
              Your Workspace
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif italic tracking-tight text-zinc-800">
            What requires your focus today?
          </h1>
        </header>

        {/* Enhanced Grid (Merged Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <a
              key={tool.name}
              href={tool.link} // Use <Link to={tool.link}> if using React Router
              className="group relative p-10 bg-white rounded-4xl border border-zinc-100 hover:border-zinc-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-500 flex flex-col justify-between min-h-60 overflow-hidden"
            >
              {/* Top Section: Number and Arrow */}
              <div className="flex justify-between items-start mb-8">
                <span className="text-sm font-mono text-zinc-400 group-hover:text-zinc-900 transition-colors">
                  {tool.num}
                </span>

                {/* Arrow from Editorial */}
                <div className="w-10 h-10 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 group-hover:bg-zinc-900 group-hover:text-white group-hover:border-zinc-900 -rotate-45 group-hover:rotate-0 transition-all duration-500">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Bottom Section: Title, Tag, and Desc */}
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <h2 className="text-3xl font-medium text-zinc-800 group-hover:-translate-y-1 transition-transform duration-500">
                    {tool.name}
                  </h2>
                  {/* Category Tag from Editorial */}
                  <span className="px-3 py-1 bg-[#F9F9F8] rounded-full text-[9px] uppercase tracking-widest text-zinc-500 group-hover:-translate-y-1 transition-transform duration-500">
                    {tool.tag}
                  </span>
                </div>
                <p className="text-zinc-500 font-serif italic text-lg opacity-80">
                  {tool.desc}
                </p>
              </div>
            </a>
          ))}
        </div>

      </main>
    </div>
  );
};

export default HomePage;