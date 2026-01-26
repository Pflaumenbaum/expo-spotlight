import { NativeModule, requireNativeModule } from 'expo';

import { ExpoSpotlightModuleEvents } from './ExpoSpotlight.types';

declare class ExpoSpotlightModule extends NativeModule<ExpoSpotlightModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoSpotlightModule>('ExpoSpotlight');
