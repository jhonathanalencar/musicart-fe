import './skeleton.css';

interface SkeletonProps {
  classes: string;
}

export function Skeleton({ classes }: SkeletonProps) {
  const classNames = `skeleton ${classes} animate-pulse`;

  return <div className={classNames} />;
}
