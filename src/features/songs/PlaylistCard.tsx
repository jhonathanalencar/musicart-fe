import { KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface PlaylistCardProps {
  playlistId: string;
  coverartUrl: string;
  name: string;
}

export function PlaylistCard({
  playlistId,
  name,
  coverartUrl,
}: PlaylistCardProps) {
  const navigate = useNavigate();

  function handleOnClick() {
    navigate(`/playlist/${playlistId}`);
  }

  function handleOnKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.code === 'Enter') {
      handleOnClick();
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleOnClick}
      onKeyDown={handleOnKeyDown}
      className="group p-3 rounded flex flex-col gap-1 bg-violet-400  dark:bg-gray-700 animate-fadeIn drop-shadow-sm shadow-md cursor-pointer hover:bg-violet-500 dark:hover:bg-gray-600 focus:bg-violet-500 focus-within:bg-violet-500 dark:focus:bg-gray-600 dark:focus-within:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-violet-900 dark:focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-slate-300 dark:focus:ring-offset-gray-800"
    >
      <img src={coverartUrl} alt={`${name} Playlist`} />
      <p className="text-slate-200 truncate">{name}</p>
    </div>
  );
}
