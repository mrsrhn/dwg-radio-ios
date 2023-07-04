import React from "react";
import { DWGPager } from "./src/DWGPager";
import { View } from "react-native";
import { DWGBottomSheet } from "./src/DWGBottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <DWGPager />
      </View>
      <View style={{ height: "60%", backgroundColor: "blue" }}></View>
      <DWGBottomSheet />
    </GestureHandlerRootView>
  );
}
