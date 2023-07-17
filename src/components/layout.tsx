import React from 'react';
import { View } from 'react-native';
import Colors from '../Colors';
import DWGBottomSheet from './DWGBottomSheet';
import DWGPager from './DWGPager';

function Layout() {
  return (
    <>
      <View style={{ flex: 1 }}>
        <DWGPager />
      </View>
      <View
        style={{
          height: '50%',
          backgroundColor: Colors.dwgBackgroundColor,
        }}
      />
      <DWGBottomSheet />
    </>
  );
}

export default Layout;
