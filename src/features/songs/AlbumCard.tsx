import { KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface AlbumCardProps {
  albumId: string;
  coverartUrl: string;
  name: string;
}

export function AlbumCard({ albumId, name, coverartUrl }: AlbumCardProps) {
  const navigate = useNavigate();

  function handleOnClick() {
    navigate(`/album/${albumId}`);
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
      className="aspect-square w-full h-full group p-3 rounded flex flex-col gap-1 bg-violet-400 dark:bg-gray-700 drop-shadow-sm shadow-md cursor-pointer hover:bg-violet-500 dark:hover:bg-gray-600 focus:bg-violet-500 focus-within:bg-violet-500 dark:focus:bg-gray-600 dark:focus-within:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-violet-900 dark:focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-slate-300 dark:focus:ring-offset-gray-800"
    >
      <img
        src={coverartUrl}
        alt={`${name} Album`}
        className="object-cover aspect-square w-60 h-60"
      />
      <p className="text-slate-200 wrap-text">{name}</p>
    </div>
  );
}
