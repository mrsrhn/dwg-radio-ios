import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Layout from './src/components/layout';
import StoreProvider from './src/providers/storeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 0,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Layout />
        </GestureHandlerRootView>
      </StoreProvider>
    </QueryClientProvider>
  );
}
