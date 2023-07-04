import BottomSheet from '@gorhom/bottom-sheet';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useMemo, useRef } from 'react';
import PlayerControls from './PlayerControls';

const DWGBottomSheet = observer(() => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['60%', '90%'], []);

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
      <PlayerControls />
    </BottomSheet>
  );
});

export default DWGBottomSheet;
