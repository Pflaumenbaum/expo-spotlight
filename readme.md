# expo-spotlight

An Expo native module for indexing and managing searchable content in iOS Spotlight using the iOS [`CoreSpotlight`](https://developer.apple.com/documentation/corespotlight) API

![ExampleApp Video](https://github.com/user-attachments/assets/8d0968e9-ee4f-4cc8-918d-8b03534e3415)

With expo-spotlight, you can make your app’s content discoverable directly from the iOS system search

## Features

- Index custom items into iOS Spotlight
- Group items using domain identifiers
- Remove items by id.
- Clear all Spotlight data or clear by domain
- Handle item selection events via a listener (Delegate Subscriber)

## Installation

```
npm install expo-spotlight
```

After installation, you need to run `npx expo prebuild` or `pod install` because this package uses native code.

> This package does not work in Expo Go. You need to create a Dev-Client using **expo eas** or **prebuild**. [Instructions Dev-Client](https://docs.expo.dev/develop/development-builds/create-a-build/)

## Usage

### _Example:_ `JS Api`

```jsx
import * as ExpoSpotlight from "expo-spotlight";
import { useEffect, useState } from "react";
import { Button, View, Text } from "react-native";

export default function SpotlightExample() {
  const [selectedItem, setSelectedItem] = useState<string>();

  async function handleIndexSampleItems() {
    await ExpoSpotlight.indexItems([
      {
        id: "note-1",
        title: "Shopping List",
        domainIdentifier: "com.example.notes",
        description: "Milk, Eggs, Bread",
        metadata: {
          keywords: ["shopping", "groceries"],
        },
      },
      {
        id: "note-2",
        title: "Workout Plan edited",
        domainIdentifier: "com.example.notes",
        description: "Leg day routine",
      },
    ]);
  }

  async function handleRemove(id: string) {
    await ExpoSpotlight.removeItem(id);
  }

  async function handleClearNotes() {
    await ExpoSpotlight.clearDomain("com.example.notes");
  }

  useEffect(() => {
    const subscription = ExpoSpotlight.addSpotlightItemTappedListener(
      ({ id }) => {
        setSelectedItem(id);
      },
    );

    return () => subscription.remove();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Index sample items" onPress={handleIndexSampleItems} />
      <View style={{ height: 12 }} />
      <Button title="Remove note-1" onPress={() => handleRemove("note-1")} />
      <View style={{ height: 12 }} />
      <Button title="Clear all notes" onPress={handleClearNotes} />
      <Text>Selected item: {selectedItem}</Text>
    </View>
  );
}

```

## Methods:

## `indexItems()`


Indexes one or more items into iOS Spotlight. If an item with an id already exist it will be updated.

| Parameter | Type              | Note                                                |
| --------- | ----------------- | --------------------------------------------------- |
| `items`   | `SpotlightItem[]` | An array of Spotlight items to index for spotlight. |

## `removeItem()`

Removes a single indexed item from Spotlight.

| Parameter | Type     | Note                                                 |
| --------- | -------- | ---------------------------------------------------- |
| `id`      | `string` | The unique identifier used when the item was indexed |

## `clearAll()`

Removes all Spotlight items indexed by your app.

## `clearDomain()`

Removes all Spotlight items associated with a specific domain identifier.

| Parameter         | Type     | Note                                           |
| ----------------- | -------- | ---------------------------------------------- |
| `domainIdentifer` | `string` | The domain identifier used when indexing items |

## Listeners

## `onSpotlightItemTapped()`

This Listener is triggered when a user opens the app from a spotlight-indexed item. 

| Parameter | Type                       | Note                                           |
| --------- | -------------------------- | ---------------------------------------------- |
| `event`   | `SpotlightItemTappedEvent` | Returns the id used when indexing items |

## Types

### `SpotlightItem`

**SpotlightItemThumbnail**

| Attribute | Type              | Description                           |
| --------- | ----------------- | ------------------------------------- |
| base64    | string (optional) | Base64-encoded image data (PNG/JPEG). |
| url       | string (optional) | Image URL for light theme.            |
| darkUrl   | string (optional) | Image URL for dark theme.            |

**SpotlightItemMetadata**

| Attribute   | Type                                                                                           | Description                                                                   |
| ----------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| keywords    | string[] (optional)                                                                            | Search keywords associated with the item.                                     |
| contentType | string (optional)                                                                              | content type of the item                                                      |
| rankingHint | number (optional)                                                                              | A number that indicates the relative importance of the item among other items from the app|
| copyright   | string (optional)                                                                              | The copyright date of the item                                                |
| url         | string (optional)                                                                              | The URL associated with the media                                             |
| location    | { latitude: number; longitude: number; namedLocation?: string; alatitude?: number } (optional) | Geographic location data of the item                                          |
| createdAt   | number (optional)                                                                              | Creation timestamp (ms since epoch).                                          |
| updatedAt   | number (optional)                                                                              | Last updated timestamp (ms since epoch).                                      |
| endDate     | number (optional)                                                                              | End timestamp (ms since epoch).                                               |
| dueDate     | number (optional)                                                                              | Due timestamp (ms since epoch).                                               |
| addedDate   | number (optional)                                                                              | Timestamp when item was added to index (ms since epoch).                      |
| startDate   | number (optional)                                                                              | Start timestamp (ms since epoch).                                             |

**SpotlightItemTappedEvent**

| Attribute | Type   | Description                                     |
| --------- | ------ | ----------------------------------------------- |
| id        | string | Id of the tapped Spotlight item. |

**SpotlightItem**

| Attribute        | Type                              | Description                                           |
| ---------------- | --------------------------------- | ----------------------------------------------------- |
| id               | string                            | Unique identifier for the item.                       |
| title            | string                            | Display title shown in Spotlight.                     |
| domainIdentifier | string                            | Grouping identifier used to organize items by domain. |
| description      | string (optional)                 | Item description shown in Spotlight.                  |
| thumbnail        | SpotlightItemThumbnail (optional) | Thumbnail image that should be displayed instead of the app icon.                                      |
| metadata         | SpotlightItemMetadata (optional)  | Optional metadata that can improve search accuracy. |

## License

[MIT](https://github.com/Pflaumenbaum/expo-spotlight/blob/main/LICENSE)
