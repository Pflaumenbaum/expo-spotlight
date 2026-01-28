import { EventSubscription, requireNativeModule } from "expo-modules-core";
import type { ExpoSpotlightModule, SpotlightItem, SpotlightItemTappedEvent } from "./ExpoSpotlight.types";

const nativeModule = requireNativeModule<ExpoSpotlightModule>("ExpoSpotlight");

export function indexItems(items: SpotlightItem[]) {
  return nativeModule.indexItems(items);
}

export function removeItem(id: string) {
  return nativeModule.removeItem(id);
}

export function clearAll() {
  return nativeModule.clearAll();
}

export function clearDomain(domainIdentifier: string) {
  return nativeModule.clearDomain(domainIdentifier);
}

export function addSpotlightItemTappedListener(listener: (event: SpotlightItemTappedEvent) => void): EventSubscription {
  return nativeModule.addListener('onSpotlightItemTapped', listener);
}


