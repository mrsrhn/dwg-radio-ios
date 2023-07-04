import React from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DWGPager from './src/DWGPager';
import DWGBottomSheet from './src/DWGBottomSheet';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <DWGPager />
      </View>
      <View style={{ height: '60%', backgroundColor: 'blue' }} />
      <DWGBottomSheet />
    </GestureHandlerRootView>
  );
}
