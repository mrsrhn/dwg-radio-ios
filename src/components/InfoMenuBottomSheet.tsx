import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { observer } from 'mobx-react-lite';
import React, { Ref, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Colors from '../Colors';
import InfoMenuButton from './InfoMenuButton';

const InfoMenuBottomSheet = observer(
  React.forwardRef((_, ref) => {
    const initialSnapPoints = useMemo(() => [0, 'CONTENT_HEIGHT'], []);

    const {
      animatedHandleHeight,
      animatedSnapPoints,
      animatedContentHeight,
      handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

    // Zur Programmvorschau
    // Zum PDF Archiv
    // Kontakt
    // Spenden
    return (
      <BottomSheet
        ref={ref as Ref<BottomSheetMethods>}
        index={0}
        backgroundStyle={{ backgroundColor: Colors.dwgBackgroundColor }}
        animateOnMount={false}
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        enablePanDownToClose
        backdropComponent={BottomSheetBackdrop}
      >
        <BottomSheetView
          style={styles.container}
          onLayout={handleContentLayout}
        >
          <InfoMenuButton
            iconName="globe-outline"
            title="Zur Programmvorschau"
            onPress={() => {}}
          />
        </BottomSheetView>
      </BottomSheet>
    );
  })
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    backgroundColor: Colors.dwgBackgroundColor,
    gap: 10,
    paddingBottom: 20,
  },
});

export default InfoMenuBottomSheet;
