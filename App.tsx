import React from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DWGBottomSheet from './src/components/DWGBottomSheet';
import DWGPager from './src/components/DWGPager';
import StoreProvider from './src/providers/storeProvider';

export default function App() {
  return (
    <StoreProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <DWGPager />
        </View>
        <View style={{ height: '60%', backgroundColor: 'blue' }} />
        <DWGBottomSheet />
      </GestureHandlerRootView>
    </StoreProvider>
  );
}
