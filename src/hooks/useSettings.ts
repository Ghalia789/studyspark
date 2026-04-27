import { Dispatch, SetStateAction } from 'react';
import { useLocalStorage } from './useLocalStorage';

export interface UserSettings {
  theme: 'light' | 'dark';
  viewMode: 'card' | 'list';
  notificationsEnabled: boolean;
  soundEnabled: boolean;
}

const DEFAULT_SETTINGS: UserSettings = {
  theme: 'light',
  viewMode: 'card',
  notificationsEnabled: true,
  soundEnabled: false,
};

/**
 * Custom hook for managing user settings with localStorage persistence
 * @returns [settings, setSettings]
 */
export function useSettings(): [UserSettings, Dispatch<SetStateAction<UserSettings>>] {
  return useLocalStorage<UserSettings>('studyspark_settings', DEFAULT_SETTINGS);
}
