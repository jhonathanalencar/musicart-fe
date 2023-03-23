import { useMediaQuery } from './hooks/useMediaQuery';
import { useAppSelector } from './app/store';

import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Home } from './pages/Home';
import { AudioPlayer } from './components/AudioPlayer';

export function App() {
  const isAboveMediumScreens = useMediaQuery('(min-width: 50em)');

  const activeSong = useAppSelector((state) => state.player.activeSong);

  return (
    <div className=" w-full flex bg-slate-300 dark:bg-gray-800 duration-500">
      {isAboveMediumScreens ? <Sidebar /> : null}

      <main className="relative h-screen w-full overflow-hidden">
        <div className="relative h-full w-full flex flex-col">
          {activeSong.preview_url ? <AudioPlayer song={activeSong} /> : null}
          <Header />
          <Home />
        </div>
      </main>
    </div>
  );
}
