import { MagnifyingGlass } from 'phosphor-react';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (query.trim().length > 0) {
      navigate(`/search/${query}`);
    }
  }

  return (
    <div className="group flex items-center gap-2 py-2 px-4 h-12 w-80 rounded-full bg-violet-500 dark:bg-gray-600 focus-within:ring-2 focus-within:ring-violet-500 focus-within:ring-offset-2 focus-within:ring-offset-slate-200 dark:focus-within:ring-offset-gray-600">
      <MagnifyingGlass
        className="h-6 w-6 text-gray-200 dark:text-gray-400"
        weight="bold"
      />
      <form className="w-full" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="search"
          className="w-full bg-transparent focus:outline-none text-base font-medium text-gray-100 dark:text-gray-300 placeholder:text-gray-300 dark:placeholder:text-gray-400"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </div>
  );
}
