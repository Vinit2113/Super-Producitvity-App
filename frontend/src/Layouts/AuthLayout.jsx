const AuthLayout = ({ children, title, subtitle }) => (
  <div className="min-h-screen bg-[#F9F9F8] flex items-center justify-center px-8">
    <div className="max-w-md w-full space-y-12">
      <header className="text-center space-y-4">
        <span className="inline-block px-3 py-1 bg-zinc-100 rounded-full text-[9px] uppercase tracking-[0.3em] text-zinc-500">
          Identity
        </span>
        <h1 className="text-4xl font-serif italic text-zinc-900 tracking-tight">{title}</h1>
        <p className="text-zinc-400 font-serif italic text-sm">{subtitle}</p>
      </header>
      {children}
    </div>
  </div>
);

export default AuthLayout;