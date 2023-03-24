import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'phosphor-react';

interface PlaylistHeaderProps {
  coverartUrl: string;
  name: string;
  description: string;
  songsAmount: number;
}

export function PlaylistHeader({
  coverartUrl,
  name,
  description,
  songsAmount,
}: PlaylistHeaderProps) {
  const navigate = useNavigate();

  function handleGoBack() {
    navigate(-1);
  }

  return (
    <header className="mt-6 flex flex-col gap-3 animate-slideDown">
      <button
        onClick={handleGoBack}
        className="rounded-md w-fit text-slate-100 hover:text-slate-300 focus-visible:text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800"
      >
        <ArrowLeft weight="bold" className="w-8 h-8 " />
      </button>
      <div className="flex gap-3">
        <div className="w-56 h-56 rounded-md overflow-hidden shrink-0">
          <img
            src={coverartUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl text-slate-700 dark:text-slate-300 font-bold">
            {name}
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            {description}
          </p>
          <span className="text-slate-600 dark:text-slate-300 font-semibold text-lg">
            {songsAmount} songs
          </span>
        </div>
      </div>
    </header>
  );
}
