import { Dispatch, SetStateAction, useState } from 'react';

/**
 * Custom hook for managing localStorage
 * Handles both client-side and server-side rendering
 * @param key - The key to store in localStorage
 * @param initialValue - The initial value if key doesn't exist
 * @returns [storedValue, setValue]
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    // Initialize from localStorage on first render (client-side only)
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage
  const setValue: Dispatch<SetStateAction<T>> = (value) => {
    try {
      setStoredValue((currentValue) => {
        const valueToStore =
          typeof value === 'function'
            ? (value as (val: T) => T)(currentValue)
            : value;

        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }

        return valueToStore;
      });
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
