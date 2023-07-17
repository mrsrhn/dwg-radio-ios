import React, { useCallback, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import PagerView, {
  PagerViewOnPageScrollEventData,
} from 'react-native-pager-view';
import { Image, ImageSource } from 'expo-image';
import { ScalingDot } from 'react-native-animated-pagination-dots';
import useConfig from '../hooks/useConfig';
import { Channel } from '../stores/playerStore';
import useStores from '../hooks/useStores';

interface ChannelData {
  key: Channel;
  imgSource: ImageSource;
}

const CHANNELS: ChannelData[] = [
  { key: 'lyra', imgSource: require('../../assets/channels/lyra.jpg') },
  { key: 'radio', imgSource: require('../../assets/channels/radio.jpg') },
  { key: 'pur', imgSource: require('../../assets/channels/pur.jpg') },
];

const DWGPager = observer(() => {
  const { configColors } = useConfig();
  const { playerStore } = useStores();
  const pagerRef = useRef<PagerView>(null);

  const onPageSelect = useCallback(
    (page: number) => {
      switch (page) {
        case 0:
          playerStore.updateChannel('lyra');
          break;
        case 1:
          playerStore.updateChannel('radio');
          break;
        case 2:
          playerStore.updateChannel('pur');
          break;
        default:
          break;
      }
    },
    [playerStore]
  );

  useEffect(() => {
    switch (playerStore.selectedChannel) {
      case 'lyra':
        pagerRef.current?.setPage(0);
        onPageSelect(0);
        break;
      case 'radio':
        pagerRef.current?.setPage(1);
        onPageSelect(1);
        break;
      case 'pur':
        pagerRef.current?.setPage(2);
        onPageSelect(2);
        break;
      default:
        break;
    }
  }, [playerStore.selectedChannel, onPageSelect]);

  const { width } = Dimensions.get('window');
  const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const inputRange = [0, CHANNELS.length];
  const scrollX = Animated.add(
    scrollOffsetAnimatedValue,
    positionAnimatedValue
  ).interpolate({
    inputRange,
    outputRange: [0, CHANNELS.length * width],
  });

  const onPageScroll = React.useMemo(
    () =>
      Animated.event<PagerViewOnPageScrollEventData>(
        [
          {
            nativeEvent: {
              offset: scrollOffsetAnimatedValue,
              position: positionAnimatedValue,
            },
          },
        ],
        {
          useNativeDriver: false,
        }
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <View style={styles.container}>
      <PagerView
        ref={pagerRef}
        style={{
          ...styles.viewPager,
          backgroundColor: configColors.dwgBackgroundColor,
        }}
        initialPage={1}
        onPageScroll={onPageScroll}
        onPageSelected={(e) => onPageSelect(e.nativeEvent.position)}
      >
        {CHANNELS.map((channel) => (
          <View style={styles.page} key={channel.key}>
            <Image
              style={styles.channelImage}
              source={channel.imgSource}
              contentFit="cover"
            />
          </View>
        ))}
      </PagerView>
      <ScalingDot
        data={CHANNELS}
        scrollX={scrollX as Animated.Value}
        inActiveDotOpacity={0.6}
        dotStyle={styles.paginationDot}
        activeDotColor={configColors.dwgDarkColor}
        inActiveDotColor={configColors.dwgGreyColor}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewPager: {
    flex: 1,
  },
  page: {
    flex: 1,
    justifyContent: 'center',
  },
  channelImage: {
    marginVertical: 90,
    marginHorizontal: 20,
    flex: 1,
    borderRadius: 20,
  },
  paginationDot: {
    width: 7,
    height: 7,
    backgroundColor: '#347af0',
    borderRadius: 5,
    marginHorizontal: 7,
  },
});

export default DWGPager;
