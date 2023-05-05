import { Skeleton } from './Skeleton';

export function SkeletonArtistCard() {
  return (
    <div className="bg-gray-700 p-3 rounded w-full max-w-[250px]">
      <Skeleton classes="coverart profile width-100" />
      <Skeleton classes="title width-100" />
    </div>
  );
}
