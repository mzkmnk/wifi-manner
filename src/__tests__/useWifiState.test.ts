import { describe, expect, it, vi } from "vitest";

const mockUnsubscribe = vi.fn();

vi.mock("@react-native-community/netinfo", () => ({
  default: {
    addEventListener: vi.fn(() => mockUnsubscribe),
  },
  NetInfoStateType: { unknown: "unknown", wifi: "wifi" },
}));

describe("useWifiState (unit)", () => {
  it("NetInfoモジュールがaddEventListenerをエクスポートする", async () => {
    const NetInfo = (await import("@react-native-community/netinfo")).default;
    expect(typeof NetInfo.addEventListener).toBe("function");
  });
});
