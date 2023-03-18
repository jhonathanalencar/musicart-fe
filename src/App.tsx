import { useMediaQuery } from './hooks/useMediaQuery';

import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Home } from './pages/Home';

export function App() {
  const isAboveMediumScreens = useMediaQuery('(min-width: 50em)');

  return (
    <div className="h-full w-full flex bg-slate-300 dark:bg-slate-900 duration-500">
      {isAboveMediumScreens ? <Sidebar /> : null}

      <main className="h-full w-full overflow-hidden hide-scrollbar">
        <Header />
        <Home />
      </main>
    </div>
  );
}
