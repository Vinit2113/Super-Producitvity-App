import { Link } from "react-router";

const Sidebar = ({ isOpen, setIsOpen, setSelectedPage }) => {
  const handleSelect = (page) => {
    setSelectedPage(page);
    setIsOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-50 bg-zinc-900/10 backdrop-blur-sm transition-opacity duration-700 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-80 bg-white shadow-[30px_0_60px_rgba(0,0,0,0.02)] border-r border-zinc-100 transform transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="p-10 flex flex-col h-full">
          <div className="flex justify-between items-center mb-16">
            <span className="font-serif italic text-xl">L.1</span>
            <button onClick={() => setIsOpen(false)} className="text-zinc-300 hover:text-zinc-900 transition-colors">
              ✕
            </button>
          </div>

          <nav className="flex flex-col space-y-8">
            {["Home", "Todo", "Journal", "Settings"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                onClick={() => handleSelect(item)}
                className="text-2xl font-light tracking-tight text-zinc-400 hover:text-zinc-900 transition-all hover:translate-x-2"
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="mt-auto">
            <p className="text-[10px] text-zinc-300 uppercase tracking-[0.4em]">Curated Living</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;