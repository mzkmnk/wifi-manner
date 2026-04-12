import { useMemo } from "react";
import { isRegisteredSSID } from "../lib/wifi-matcher";
import { useSettings } from "./useSettings";
import { useWifiState } from "./useWifiState";

export interface WifiMonitoringResult {
  isRegisteredNetwork: boolean;
  currentSSID: string | null;
  isConnected: boolean;
  /** `true` when monitoring is enabled AND connection type is wifi */
  isWifiConnected: boolean;
}

export function useWifiMonitoring(): WifiMonitoringResult {
  const { settings } = useSettings();
  const { ssid, isConnected, type } = useWifiState();

  const isEnabled = settings?.isEnabled ?? false;
  const registeredSSIDs = settings?.registeredSSIDs ?? [];

  const isRegisteredNetwork = useMemo(() => {
    if (!isEnabled) {
      return false;
    }
    return isRegisteredSSID(ssid, registeredSSIDs);
  }, [isEnabled, ssid, registeredSSIDs]);

  const isWifiConnected = isEnabled && isConnected && type === "wifi";

  return {
    isRegisteredNetwork,
    currentSSID: isEnabled ? ssid : null,
    isConnected,
    isWifiConnected,
  };
}
