import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Layout from './src/components/layout';
import StoreProvider from './src/providers/storeProvider';

export default function App() {
  return (
    <StoreProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Layout />
      </GestureHandlerRootView>
    </StoreProvider>
  );
}
