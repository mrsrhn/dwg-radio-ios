import React from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import PagerView, {
  PagerViewOnPageScrollEventData,
} from 'react-native-pager-view';
import { Image } from 'expo-image';
import { ScalingDot } from 'react-native-animated-pagination-dots';
import useConfig from '../hooks/useConfig';

const CHANNELS = [
  { key: 'lyra', imgSource: require('../../assets/channels/lyra.jpg') },
  { key: 'radio', imgSource: require('../../assets/channels/radio.jpg') },
  { key: 'pur', imgSource: require('../../assets/channels/pur.jpg') },
];

function DWGPager() {
  const { configColors } = useConfig();

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
        style={{
          ...styles.viewPager,
          backgroundColor: configColors.dwgBackgroundColor,
        }}
        initialPage={1}
        onPageScroll={onPageScroll}
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
}

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
    marginVertical: 75,
    marginHorizontal: 50,
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
