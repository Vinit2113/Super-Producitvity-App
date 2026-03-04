  import { useState } from "react";
  import { Link, useLocation, useNavigate } from "react-router";
  import Sidebar from "./Sidebar";

  const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(() => {
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("username");
      return token && username ? username : null;
    }); const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      setUser(null);
      navigate("/login");
    };

    const currentPage =
      location.pathname === "/"
        ? "Home"
        : location.pathname.replace("/", "").charAt(0).toUpperCase() +
        location.pathname.replace("/", "").slice(1);

    return (
      <>
        <nav className="fixed top-0 w-full z-40 bg-white/70 backdrop-blur-md border-b border-zinc-100/80">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

            {/* Menu Trigger */}
            <button
              onClick={() => setIsOpen(true)}
              className="group flex items-center gap-3 transition-all hover:opacity-70 hover:cursor-pointer"
            >
              <div className="flex flex-col gap-1.5">
                <span className="h-px w-5 bg-zinc-800 transition-all group-hover:w-8" />
                <span className="h-px w-8 bg-zinc-800" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-zinc-500">
                Menu
              </span>
            </button>

            {/* Logo / Title */}
            <div className="absolute left-1/2 -translate-x-1/2 text-lg font-serif italic tracking-tight text-zinc-900">
              <Link to="/">LifeOne</Link>
              <span className="mx-2 text-zinc-300 font-light text-sm">/</span>
              {currentPage}
            </div>

            {/* Account Connection / Logged In User */}
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-[11px] uppercase tracking-widest font-semibold text-zinc-900 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div> {/* Status Indicator */}
                  {user}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-[10px] uppercase tracking-widest font-semibold text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-[11px] uppercase tracking-widest font-semibold text-zinc-400 hover:text-zinc-900 transition-colors"
              >
                Account
              </Link>
            )}
          </div>
        </nav>

        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </>
    );
  };

  export default Navbar;