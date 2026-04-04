export interface MatcherOptions {
  caseInsensitive?: boolean;
}

export function isRegisteredSSID(
  currentSSID: string | null,
  registeredSSIDs: string[],
  options: MatcherOptions = {},
): boolean {
  const { caseInsensitive = true } = options;

  if (!currentSSID || registeredSSIDs.length === 0) {
    return false;
  }

  if (caseInsensitive) {
    const lower = currentSSID.toLowerCase();
    return registeredSSIDs.some((ssid) => ssid.toLowerCase() === lower);
  }

  return registeredSSIDs.includes(currentSSID);
}
