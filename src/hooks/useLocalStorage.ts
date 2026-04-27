import { Dispatch, SetStateAction, useState, useEffect } from 'react';

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
  // State to store our value. Initialize to the provided initial value
  // so server and first client render match. We then hydrate from
  // localStorage on the client inside an effect to avoid hydration
  // mismatches when persisted values differ from defaults.
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Read the persisted value on mount (client-side) and update state.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      // Swallow errors to avoid breaking the app during hydration
      console.log(error);
    }
    // We intentionally ignore `initialValue` here; the effect should
    // run once on mount for the current key.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

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
