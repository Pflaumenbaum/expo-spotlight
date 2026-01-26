import { registerWebModule, NativeModule } from 'expo';

import { ExpoSpotlightModuleEvents } from './ExpoSpotlight.types';

class ExpoSpotlightModule extends NativeModule<ExpoSpotlightModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoSpotlightModule, 'ExpoSpotlightModule');
