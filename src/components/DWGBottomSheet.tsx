import BottomSheet, {
  BottomSheetScrollView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import { observer } from 'mobx-react-lite';
import React, { useMemo, useRef } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import PlayerControls from './PlayerControls';
import Title from './Title';
import ProgramView from './ProgramView';
import useConfig from '../hooks/useConfig';
import useStores from '../hooks/useStores';
import HistoryView from './HistoryView';

interface DWGBottomSheetProps {
  onInfoMenuButton: () => void;
}

const DWGBottomSheet: React.FC<DWGBottomSheetProps> = observer(
  ({ onInfoMenuButton }) => {
    const { configBase } = useConfig();
    const { playerStore } = useStores();

    const bottomSheetRef = useRef<BottomSheet>(null);
    const initialSnapPoints = useMemo(() => ['50%', '90%'], []);

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
          {configBase.showProgramForRadio &&
          playerStore.selectedChannel === 'radio' ? (
            <ProgramView />
          ) : (
            <HistoryView />
          )}
        </BottomSheetScrollView>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingBottom: 150,
  },
});

export default DWGBottomSheet;
