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
