import { describe, expect, it } from "vitest";
import { isRegisteredSSID } from "../lib/wifi-matcher";

describe("isRegisteredSSID", () => {
  it("currentSSIDがnullの場合はfalseを返す", () => {
    expect(isRegisteredSSID(null, ["HomeWiFi"])).toBe(false);
  });

  it("registeredSSIDsが空の場合はfalseを返す", () => {
    expect(isRegisteredSSID("HomeWiFi", [])).toBe(false);
  });

  it("一致するSSIDがある場合はtrueを返す", () => {
    expect(isRegisteredSSID("HomeWiFi", ["OfficeWiFi", "HomeWiFi"])).toBe(true);
  });

  it("一致するSSIDがない場合はfalseを返す", () => {
    expect(isRegisteredSSID("CafeWiFi", ["OfficeWiFi", "HomeWiFi"])).toBe(false);
  });

  it("デフォルトで大文字小文字を無視する", () => {
    expect(isRegisteredSSID("homewifi", ["HomeWiFi"])).toBe(true);
    expect(isRegisteredSSID("HOMEWIFI", ["HomeWiFi"])).toBe(true);
    expect(isRegisteredSSID("HomeWiFi", ["homewifi"])).toBe(true);
  });

  it("caseInsensitive=falseの場合は大文字小文字を区別する", () => {
    expect(isRegisteredSSID("homewifi", ["HomeWiFi"], { caseInsensitive: false })).toBe(false);
    expect(isRegisteredSSID("HomeWiFi", ["HomeWiFi"], { caseInsensitive: false })).toBe(true);
  });

  it("両方がnull/空の場合はfalseを返す", () => {
    expect(isRegisteredSSID(null, [])).toBe(false);
  });
});
