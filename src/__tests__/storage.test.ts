import { describe, expect, it, vi } from "vitest";
import { DEFAULT_SETTINGS, getSettings, saveSettings } from "../lib/storage";

const STORE = new Map<string, string>();

vi.mock("@react-native-async-storage/async-storage", () => ({
  default: {
    getItem: (key: string) => Promise.resolve(STORE.get(key) ?? null),
    setItem: (key: string, value: string) => {
      STORE.set(key, value);
      return Promise.resolve();
    },
  },
}));

describe("storage", () => {
  it("データなしの場合はデフォルト値を返す", async () => {
    STORE.clear();
    const settings = await getSettings();
    expect(settings).toEqual(DEFAULT_SETTINGS);
  });

  it("設定を保存して読み込める", async () => {
    STORE.clear();
    const custom = { ...DEFAULT_SETTINGS, isEnabled: true, mediaVolume: 80 };
    await saveSettings(custom);
    const loaded = await getSettings();
    expect(loaded).toEqual(custom);
  });

  it("部分データはデフォルト値で補完される", async () => {
    STORE.clear();
    STORE.set("@wifi-manner/settings", JSON.stringify({ isEnabled: true }));
    const settings = await getSettings();
    expect(settings.isEnabled).toBe(true);
    expect(settings.mediaVolume).toBe(DEFAULT_SETTINGS.mediaVolume);
  });
});
