import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { useMediaQuery } from './hooks/useMediaQuery';

export function App() {
  const isAboveMediumScreens = useMediaQuery('(min-width: 50em)');

  return (
    <div className="h-full bg-slate-300 dark:bg-slate-900 duration-500">
      {isAboveMediumScreens ? <Sidebar /> : null}
      <Header />
    </div>
  );
}
