import { EventSubscription, requireOptionalNativeModule } from "expo-modules-core";
import type { ExpoSpotlightModule, SpotlightItem, SpotlightItemTappedEvent } from "./ExpoSpotlight.types";

const nativeModule = requireOptionalNativeModule<ExpoSpotlightModule>("ExpoSpotlight");


const emptySubscription: EventSubscription = {
  remove() {},
};

/**
 * This function Indexes one or more items into iOS Spotlight. If an item with an id already exist it will be updated.
 * @param {items} 	SpotlightItem[]: 	An array of Spotlight items to index for spotlight.
 */
export function indexItems(items: SpotlightItem[]) {
  return nativeModule?.indexItems(items);
}

/**
 * This function Indexes one or more items into iOS Spotlight. If an item with an id already exist it will be updated.
 * @param {id} string: 	The id used when the item was indexed
 */
export function removeItem(id: string) {
  return nativeModule?.removeItem(id);
}

/**
 * This function removes all Spotlight items indexed by your app.
 */
export function clearAll() {
  return nativeModule?.clearAll();
}

/**
 * This function Removes all Spotlight items associated with a specific domain identifier.
 * @param {domainIdentifer} string: The domain identifier used when indexing items.
 */
export function clearDomain(domainIdentifier: string) {
  return nativeModule?.clearDomain(domainIdentifier);
}

/**
 * This Listener is triggered when a user opens the app from a spotlight-indexed item.
 * @param {event} SpotlightItemTappedEvent: Returns the id used when indexing items
 * */
export function addSpotlightItemTappedListener(listener: (event: SpotlightItemTappedEvent) => void): EventSubscription {
  if(!nativeModule){
    return emptySubscription;
  }
  return nativeModule?.addListener('onSpotlightItemTapped', listener);
}


