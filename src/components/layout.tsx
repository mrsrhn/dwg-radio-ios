/* eslint-disable react/style-prop-object */
import React, { useRef } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import BottomSheet from '@gorhom/bottom-sheet';
import Colors from '../Colors';
import DWGBottomSheet from './DWGBottomSheet';
import DWGPager from './DWGPager';
import InfoMenuBottomSheet from './InfoMenuBottomSheet';

function Layout() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const onInfoMenuButton = () => {
    if (!bottomSheetRef.current) return;
    bottomSheetRef.current?.expand();
  };

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
      <DWGBottomSheet onInfoMenuButton={onInfoMenuButton} />
      <InfoMenuBottomSheet ref={bottomSheetRef} />
    </>
  );
}

export default Layout;
