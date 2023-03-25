interface ErrorMessageProps {
  message?: string;
}

export function ErrorMessage({
  message = 'Something went wrong. Please try later.',
}: ErrorMessageProps) {
  return (
    <h1 className="text-slate-700 dark:text-slate-100 text-3xl mt-4 text-center font-bold">
      {message}
    </h1>
  );
}
