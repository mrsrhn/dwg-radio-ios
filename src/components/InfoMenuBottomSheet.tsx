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

const InfoMenuBottomSheet = observer(
  React.forwardRef((_, ref) => {
    const { infoMenuStore } = useStores();

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
            {infoMenuStore.channelInfo.title}
          </Text>
          <Text style={styles.infoString}>
            {infoMenuStore.channelInfo.infoString}
          </Text>
          <Text style={styles.sectionTitle}>
            {configStrings.additionalLinks}
          </Text>
          {infoMenuStore.channelInfoButtons.map((button) => {
            if (!button.url) return null;
            return (
              <InfoMenuButton
                key={`button_${button.title}`}
                iconName={button.iconName}
                title={button.title}
                onPress={() => {
                  Linking.openURL(button.url);
                }}
              />
            );
          })}
          {configBase.urlAboutUs.length ? (
            <InfoMenuButton
              iconName="information-circle-outline"
              title={configStrings.aboutUs}
              onPress={() => {
                Linking.openURL(configBase.urlAboutUs);
              }}
            />
          ) : null}
          {configBase.contactMail.length ? (
            <>
              <Text style={styles.sectionTitle}>{configStrings.contact}</Text>
              <InfoMenuButton
                iconName="mail-outline"
                title={configStrings.mailButton}
                onPress={() => {
                  Linking.openURL(`mailto:${configBase.contactMail}`);
                }}
              />
              {configBase.additionalContactLinks.map((link, index) => (
                <InfoMenuButton
                  key={`link_${index}`}
                  iconName={link.icon}
                  title={link.name}
                  onPress={() => {
                    Linking.openURL(link.url);
                  }}
                />
              ))}
            </>
          ) : null}

          {configBase.urlBankTransfer.length || configBase.urlPaypal.length ? (
            <Text style={styles.sectionTitle}>{configStrings.donation}</Text>
          ) : null}
          {configBase.urlBankTransfer.length ? (
            <InfoMenuButton
              iconName="card-outline"
              title={configStrings.bankTransfer}
              onPress={() => {
                Linking.openURL(configBase.urlBankTransfer);
              }}
            />
          ) : null}
          {configBase.urlPaypal.length ? (
            <InfoMenuButton
              title={configStrings.paypal}
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
          ) : null}
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
