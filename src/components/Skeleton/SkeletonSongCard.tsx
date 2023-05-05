import { Skeleton } from './Skeleton';

export function SkeletonSongCard() {
  return (
    <div className="bg-gray-700 p-3 rounded w-full">
      <Skeleton classes="coverart" />
      <Skeleton classes="title width-100" />
      <Skeleton classes="text width-50" />
    </div>
  );
}
