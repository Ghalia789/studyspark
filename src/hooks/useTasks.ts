import { Dispatch, SetStateAction } from 'react';
import { useLocalStorage } from './useLocalStorage';

export interface Task {
  id: string;
  title: string;
  description: string;
  subject: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  completed: boolean;
}

const DEFAULT_TASKS: Task[] = [
  {
    id: '1',
    title: 'Complete Algebra Assignment',
    description: 'Solve problems 1-20 from Chapter 5',
    subject: 'Math',
    priority: 'high',
    dueDate: 'Feb 5, 2026',
    completed: false,
  },
  {
    id: '2',
    title: 'Read Biology Chapter 3',
    description: 'Focus on photosynthesis section',
    subject: 'Biology',
    priority: 'medium',
    dueDate: 'Feb 6, 2026',
    completed: true,
  },
];

/**
 * Custom hook for managing tasks with localStorage persistence
 * @returns [tasks, setTasks]
 */
export function useTasks(): [Task[], Dispatch<SetStateAction<Task[]>>] {
  return useLocalStorage<Task[]>('studyspark_tasks', DEFAULT_TASKS);
}
