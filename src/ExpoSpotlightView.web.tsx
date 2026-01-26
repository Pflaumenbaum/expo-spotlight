import * as React from 'react';

import { ExpoSpotlightViewProps } from './ExpoSpotlight.types';

export default function ExpoSpotlightView(props: ExpoSpotlightViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
