interface CardProps {
  coverart: string;
  title: string;
  subtitle: string;
}

export function Card({ coverart, title, subtitle }: CardProps) {
  return (
    <div className="flex flex-1 gap-2">
      <div className="h-14 w-14 bg-gray-600 rounded">
        <img src={coverart} alt={title} />
      </div>

      <div className="flex flex-col items-start">
        <strong className="text-slate-200 ">{title}</strong>
        <span className="text-slate-300 ">{subtitle}</span>
      </div>
    </div>
  );
}
