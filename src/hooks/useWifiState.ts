import NetInfo, { type NetInfoState, type NetInfoStateType } from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

export interface WifiState {
  ssid: string | null;
  isConnected: boolean;
  type: NetInfoStateType;
}

export function useWifiState(): WifiState {
  const [state, setState] = useState<WifiState>({
    ssid: null,
    isConnected: false,
    type: NetInfoStateType.unknown,
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((netInfo: NetInfoState) => {
      setState({
        ssid: netInfo.details?.ssid ?? null,
        isConnected: netInfo.isConnected ?? false,
        type: netInfo.type,
      });
    });

    return unsubscribe;
  }, []);

  return state;
}
