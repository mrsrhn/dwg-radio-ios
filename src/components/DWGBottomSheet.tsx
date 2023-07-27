import BottomSheet, {
  BottomSheetScrollView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import { observer } from 'mobx-react-lite';
import React, { useMemo, useRef } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import HistoryView from './HistoryView';
import PlayerControls from './PlayerControls';
import Title from './Title';

interface DWGBottomSheetProps {
  onInfoMenuButton: () => void;
}

const DWGBottomSheet: React.FC<DWGBottomSheetProps> = observer(
  ({ onInfoMenuButton }) => {
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
        <BottomSheetScrollView
          onLayout={handleContentLayout}
          contentContainerStyle={styles.container}
          style={{
            maxHeight: Dimensions.get('window').height,
          }}
        >
          <Title />
          <PlayerControls onInfoMenuButton={onInfoMenuButton} />
          <HistoryView />
        </BottomSheetScrollView>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
});

export default DWGBottomSheet;
