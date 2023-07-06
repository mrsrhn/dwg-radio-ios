import React from 'react';
import { View } from 'react-native';
import useConfig from '../hooks/useConfig';
import DWGBottomSheet from './DWGBottomSheet';
import DWGPager from './DWGPager';

function Layout() {
  const { configColors } = useConfig();
  return (
    <>
      <View style={{ flex: 1 }}>
        <DWGPager />
      </View>
      <View
        style={{
          height: '60%',
          backgroundColor: configColors.dwgBackgroundColor,
        }}
      />
      <DWGBottomSheet />
    </>
  );
}

export default Layout;
