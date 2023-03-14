import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type Response<T> = [T, Dispatch<SetStateAction<T>>];

export function useLocalStorage<T>(key: string, initialState: T): Response<T> {
  const [state, setState] = useState<T>(() => {
    const storageJSON = localStorage.getItem(key);

    if (storageJSON) {
      return JSON.parse(storageJSON);
    } else {
      return initialState;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
