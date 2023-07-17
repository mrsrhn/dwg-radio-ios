import BottomSheet from '@gorhom/bottom-sheet';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useMemo, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import HistoryView from './HistoryView';
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
      <View style={styles.container}>
        <Title />
        <PlayerControls />
        <HistoryView />
      </View>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: '50%',
    justifyContent: 'space-between',
  },
});

export default DWGBottomSheet;
