/* eslint-disable react/style-prop-object */
import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Colors from '../Colors';
import DWGBottomSheet from './DWGBottomSheet';
import DWGPager from './DWGPager';

function Layout() {
  return (
    <>
      <StatusBar style="dark" />
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
