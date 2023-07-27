import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { Image } from 'expo-image';
import { observer } from 'mobx-react-lite';
import React, { Ref, useCallback, useMemo } from 'react';
import { StyleSheet, Linking, Text } from 'react-native';
import Colors from '../Colors';
import useConfig from '../hooks/useConfig';
import InfoMenuButton from './InfoMenuButton';

const InfoMenuBottomSheet = observer(
  React.forwardRef((_, ref) => {
    const initialSnapPoints = useMemo(() => ['1%', '50%'], []);
    const { configBase, configStrings } = useConfig();

    // Workaround to make backdrop work: https://github.com/gorhom/react-native-bottom-sheet/issues/1362
    const handleSheetChanges = useCallback(
      (index: number) => {
        if (index === 0) {
          ref?.current?.close();
        }
      },
      [ref]
    );

    const {
      animatedHandleHeight,
      animatedSnapPoints,
      animatedContentHeight,
      handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

    return (
      <BottomSheet
        ref={ref as Ref<BottomSheetMethods>}
        index={-1}
        backgroundStyle={{ backgroundColor: Colors.dwgBackgroundColor }}
        animateOnMount={false}
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        enablePanDownToClose
        backdropComponent={BottomSheetBackdrop}
        onChange={handleSheetChanges}
      >
        <BottomSheetView
          style={styles.container}
          onLayout={handleContentLayout}
        >
          <Text style={styles.sectionTitle}>
            {configStrings.additionalLinks}
          </Text>
          <InfoMenuButton
            iconName="globe-outline"
            title={configStrings.preview}
            onPress={() => {
              Linking.openURL(configBase.urlPreview);
            }}
          />
          <InfoMenuButton
            iconName="globe-outline"
            title={configStrings.archive}
            onPress={() => {
              Linking.openURL(configBase.urlArchive);
            }}
          />
          <Text style={styles.sectionTitle}>{configStrings.contact}</Text>
          <InfoMenuButton
            iconName="mail-outline"
            title={configStrings.mailButton}
            onPress={() => {
              Linking.openURL(`mailto:${configBase.contactMail}`);
            }}
          />
          <Text style={styles.sectionTitle}>{configStrings.donation}</Text>
          <InfoMenuButton
            iconName="mail-outline"
            title={configStrings.mailButton}
            onPress={() => {
              Linking.openURL(configBase.urlPaypal);
            }}
            component={
              <Image
                style={{ flex: 1, height: 20 }}
                source={require('../../assets/paypalLogo.png')}
                contentFit="scale-down"
              />
            }
          />
        </BottomSheetView>
      </BottomSheet>
    );
  })
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: Colors.dwgBackgroundColor,
    gap: 10,
    paddingBottom: 50,
  },
  sectionTitle: {
    fontSize: 15,
    color: Colors.dwgDarkColor,
    fontWeight: 'bold',
  },
});

export default InfoMenuBottomSheet;
