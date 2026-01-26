import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoSpotlightViewProps } from './ExpoSpotlight.types';

const NativeView: React.ComponentType<ExpoSpotlightViewProps> =
  requireNativeView('ExpoSpotlight');

export default function ExpoSpotlightView(props: ExpoSpotlightViewProps) {
  return <NativeView {...props} />;
}
