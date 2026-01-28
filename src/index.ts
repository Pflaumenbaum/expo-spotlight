// Re-export the native module functions and types. On web this resolves to
// `ExpoSpotlightModule.web.ts`, and on native platforms to `ExpoSpotlightModule.ts`.
export { indexItems, removeItem, clearAll, clearDomain, addSpotlightItemTappedListener } from './ExpoSpotlightModule';
export * from './ExpoSpotlight.types';
