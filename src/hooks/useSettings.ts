import { useCallback, useEffect, useState } from "react";
import { getSettings, saveSettings } from "../lib/storage";
import type { AppSettings } from "../types/settings";

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSettings()
      .then(setSettings)
      .finally(() => setIsLoading(false));
  }, []);

  const updateSettings = useCallback(async (partial: Partial<AppSettings>) => {
    const current = await getSettings();
    const next = { ...current, ...partial };
    await saveSettings(next);
    setSettings(next);
  }, []);

  return { settings, updateSettings, isLoading } as const;
}
