import { UserCircle } from 'phosphor-react';

export function ArtistAvatarFallback() {
  return (
    <div className="w-full h-full bg-violet-800 dark:bg-gray-600 flex items-center justify-center rounded-full">
      <UserCircle
        className="w-full h-full text-gray-300 dark:text-gray-500"
        weight="fill"
      />
    </div>
  );
}
