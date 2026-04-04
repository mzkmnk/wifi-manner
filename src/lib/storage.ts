import AsyncStorage from "@react-native-async-storage/async-storage";
import type { AppSettings } from "../types/settings";

const SETTINGS_KEY = "@wifi-manner/settings";

export const DEFAULT_SETTINGS: AppSettings = {
  isEnabled: false,
  registeredSSIDs: [],
  mediaVolume: 50,
  ringVolume: null,
};

export async function getSettings(): Promise<AppSettings> {
  const raw = await AsyncStorage.getItem(SETTINGS_KEY);
  if (!raw) {
    return { ...DEFAULT_SETTINGS };
  }
  return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } as AppSettings;
}

export async function saveSettings(settings: AppSettings): Promise<void> {
  await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
