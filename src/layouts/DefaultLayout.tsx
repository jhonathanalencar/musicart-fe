import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../app/store';
import { AudioPlayer } from '../components/AudioPlayer';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { useMediaQuery } from '../hooks/useMediaQuery';

export function DefaultLayout() {
  const isAboveMediumScreens = useMediaQuery('(min-width: 50em)');

  const activeSong = useAppSelector((state) => state.player.activeSong);
  return (
    <div className=" w-full flex bg-slate-300 dark:bg-gray-800 duration-500">
      {isAboveMediumScreens ? <Sidebar /> : null}

      <main className="relative h-screen w-full overflow-hidden">
        <div className="relative h-full w-full flex flex-col">
          {activeSong.preview_url ? <AudioPlayer song={activeSong} /> : null}
          <Header />

          <Outlet />
        </div>
      </main>
    </div>
  );
}
