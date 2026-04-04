import { useMemo } from "react";
import { isRegisteredSSID } from "../lib/wifi-matcher";
import { useSettings } from "./useSettings";
import { useWifiState } from "./useWifiState";

export interface WifiMonitoringResult {
  isRegisteredNetwork: boolean;
  currentSSID: string | null;
  isConnected: boolean;
}

export function useWifiMonitoring(): WifiMonitoringResult {
  const { settings } = useSettings();
  const { ssid, isConnected } = useWifiState();

  const isEnabled = settings?.isEnabled ?? false;
  const registeredSSIDs = settings?.registeredSSIDs ?? [];

  const isRegisteredNetwork = useMemo(() => {
    if (!isEnabled) {
      return false;
    }
    return isRegisteredSSID(ssid, registeredSSIDs);
  }, [isEnabled, ssid, registeredSSIDs]);

  return {
    isRegisteredNetwork,
    currentSSID: isEnabled ? ssid : null,
    isConnected: isEnabled && isConnected,
  };
}
