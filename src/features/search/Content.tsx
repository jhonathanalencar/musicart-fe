import { ReactNode } from 'react';

interface ContentProps {
  title: string;
  content: ReactNode;
}

export function Content({ title, content }: ContentProps) {
  return (
    <div className="w-full flex flex-col gap-3 mt-4">
      <h2 className="text-lg md:text-3xl font-semibold text-gray-700 dark:text-gray-200">
        {title}
      </h2>

      {content}
    </div>
  );
}
