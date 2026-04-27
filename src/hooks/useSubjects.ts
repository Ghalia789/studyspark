import { Dispatch, SetStateAction } from 'react';
import { useLocalStorage } from './useLocalStorage';

export interface Subject {
  id: string;
  name: string;
  color?: string;
  createdAt: string;
}

const DEFAULT_SUBJECTS: Subject[] = [
  {
    id: '1',
    name: 'Math',
    color: '#FF6B6B',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Biology',
    color: '#4ECDC4',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'English',
    color: '#45B7D1',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'History',
    color: '#FFA07A',
    createdAt: new Date().toISOString(),
  },
];

/**
 * Custom hook for managing subjects with localStorage persistence
 * @returns [subjects, setSubjects]
 */
export function useSubjects(): [Subject[], Dispatch<SetStateAction<Subject[]>>] {
  return useLocalStorage<Subject[]>('studyspark_subjects', DEFAULT_SUBJECTS);
}
