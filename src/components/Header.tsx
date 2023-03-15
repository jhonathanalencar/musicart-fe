export function Header() {
  return (
    <header className="w-full h-24 px-4 bg-slate-200/60 dark:bg-[#121214]/60 backdrop-blur-sm drop-shadow-md">
      <div className="w-full h-full max-w-[1400px] mx-auto flex items-center justify-between">
        <input type="text" placeholder="search" />

        <div className="h-16 w-16 rounded-full bg-slate-600">avatar</div>
      </div>
    </header>
  );
}
