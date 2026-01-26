// Reexport the native module. On web, it will be resolved to ExpoSpotlightModule.web.ts
// and on native platforms to ExpoSpotlightModule.ts
export { default } from './ExpoSpotlightModule';
export { default as ExpoSpotlightView } from './ExpoSpotlightView';
export * from  './ExpoSpotlight.types';
