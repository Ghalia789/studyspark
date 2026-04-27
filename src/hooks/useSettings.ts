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
export function useSettings(): [UserSettings, (settings: UserSettings) => void] {
  return useLocalStorage<UserSettings>('studyspark_settings', DEFAULT_SETTINGS);
}
