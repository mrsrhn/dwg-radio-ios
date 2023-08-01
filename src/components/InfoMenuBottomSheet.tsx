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
import useStores from '../hooks/useStores';
import InfoMenuButton from './InfoMenuButton';

interface InfoContent {
  title: string;
  infoString: string;
}

interface InfoButton {
  iconName: string;
  title: string;
  url: string;
}

const InfoMenuBottomSheet = observer(
  React.forwardRef((_, ref) => {
    const { playerStore } = useStores();

    const initialSnapPoints = useMemo(() => ['1%', 'CONTENT_HEIGHT'], []);
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

    const infoButtons: InfoButton[] = useMemo(() => {
      switch (playerStore.selectedChannel) {
        case 'radio':
          return [
            {
              iconName: 'globe-outline',
              title: configStrings.preview,
              url: configBase.urlPreview,
            },
            {
              iconName: 'archive-outline',
              title: configStrings.archive,
              url: configBase.urlArchive,
            },
            {
              iconName: 'logo-apple-appstore',
              title: configStrings.load,
              url: configBase.urlDWGLoad,
            },
          ];
        case 'pur':
          return [
            {
              iconName: 'globe-outline',
              title: configStrings.programInfo,
              url: configBase.urlPurInfo,
            },
          ];
        case 'lyra':
          return [];
        default:
          return [];
      }
    }, [
      configBase.urlArchive,
      configBase.urlDWGLoad,
      configBase.urlPreview,
      configBase.urlPurInfo,
      configStrings.archive,
      configStrings.load,
      configStrings.preview,
      configStrings.programInfo,
      playerStore.selectedChannel,
    ]);

    const currentInfoString: InfoContent = useMemo(() => {
      switch (playerStore.selectedChannel) {
        case 'radio':
          return {
            title: configStrings.radio,
            infoString: configStrings.infoStringRadio,
          };
        case 'pur':
          return {
            title: configStrings.pur,
            infoString: configStrings.infoStringPur,
          };
        case 'lyra':
          return {
            title: configStrings.lyra,
            infoString: configStrings.infoStringLyra,
          };
        default:
          return { title: '', infoString: '' };
      }
    }, [
      configStrings.infoStringLyra,
      configStrings.infoStringPur,
      configStrings.infoStringRadio,
      configStrings.lyra,
      configStrings.pur,
      configStrings.radio,
      playerStore.selectedChannel,
    ]);

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
          <Text style={styles.sectionTitle}>{currentInfoString.title}</Text>
          <Text style={styles.infoString}>{currentInfoString.infoString}</Text>
          <Text style={styles.sectionTitle}>
            {configStrings.additionalLinks}
          </Text>
          {infoButtons.map((button) => (
            <InfoMenuButton
              iconName={button.iconName}
              title={button.title}
              onPress={() => {
                Linking.openURL(button.url);
              }}
            />
          ))}
          <InfoMenuButton
            iconName="information-circle-outline"
            title={configStrings.aboutUs}
            onPress={() => {
              Linking.openURL(configBase.urlAboutUs);
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
            iconName="card-outline"
            title={configStrings.bankTransfer}
            onPress={() => {
              Linking.openURL(configBase.urlBankTranksfer);
            }}
          />
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
  infoString: {
    fontSize: 15,
    color: Colors.dwgDarkColor,
  },
});

export default InfoMenuBottomSheet;
