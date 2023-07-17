import BottomSheet, {
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import { observer } from 'mobx-react-lite';
import React, { useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';
import HistoryView from './HistoryView';
import PlayerControls from './PlayerControls';
import Title from './Title';

const DWGBottomSheet = observer(() => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const initialSnapPoints = useMemo(() => ['50%', 'CONTENT_HEIGHT'], []);

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      animateOnMount={false}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
    >
      <BottomSheetView style={styles.container} onLayout={handleContentLayout}>
        <Title />
        <PlayerControls />
        <HistoryView />
      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
});

export default DWGBottomSheet;
