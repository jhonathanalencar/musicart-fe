import { ArtistAvatarFallback } from './ArtistAvatarFallback';

interface ArtistHeaderProps {
  name: string;
  imageUrl: string;
}

export function ArtistHeader({ imageUrl, name }: ArtistHeaderProps) {
  return (
    <div className="flex items-center flex-col sm:flex-row gap-6 pb-4 mb-4 border-b-2 border-b-gray-400 dark:border-b-gray-600">
      <div className="h-64 w-64 rounded-full overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <ArtistAvatarFallback />
        )}
      </div>
      <strong className="text-3xl md:text-5xl text-gray-800 dark:text-white font-bold">
        {name}
      </strong>
    </div>
  );
}
