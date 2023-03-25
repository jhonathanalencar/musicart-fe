import { Skeleton } from './Skeleton';

export function SkeletonPlaylistCard() {
  return (
    <div className="w-full max-w-[250px] bg-gray-700 p-3 m-1 rounded drop-shadow-md">
      <Skeleton classes="coverart width-100" />
      <Skeleton classes="title width-100" />
    </div>
  );
}
