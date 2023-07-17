import BottomSheet from '@gorhom/bottom-sheet';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useMemo, useRef } from 'react';
import { View } from 'react-native';
import PlayerControls from './PlayerControls';
import Title from './Title';

const DWGBottomSheet = observer(() => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['50%', '90%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      animateOnMount={false}
    >
      <View style={{ height: '50%', justifyContent: 'space-between' }}>
        <Title />
        <PlayerControls />
      </View>
    </BottomSheet>
  );
});

export default DWGBottomSheet;
