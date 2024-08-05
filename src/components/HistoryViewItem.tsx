import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Linking,
  Alert,
} from 'react-native';
import Colors from '../Colors';
import useConfig from '../hooks/useConfig';
import { Image } from 'expo-image';

interface HistoryItemProps {
  title: string;
  artist: string;
  time: string;
  url?: string;
  hasBeenPlayed?: boolean;
  highlighted?: boolean;
}

function HistoryViewItem(props: HistoryItemProps) {
  const { title, artist, time, url, hasBeenPlayed, highlighted } = props;
  const { configStrings } = useConfig();

  const openInDwgLoad = () => {
    if (url?.length) {
      Alert.alert('', configStrings.openInDwgLoad, [
        {
          text: configStrings.cancel,
          style: 'cancel',
        },
        {
          text: configStrings.openInDwgLoadButton,
          onPress: () => {
            Linking.openURL(url);
          },
        },
      ]);
    }
  };

  return (
    <View
      style={styles.container}
      accessible
      accessibilityLabel={`${title}, ${configStrings.accessFrom} ${artist}, ${configStrings.accessPlayedAt} ${time} ${configStrings.accessClock}`}
    >
      <Pressable style={styles.titleContainer} onPress={openInDwgLoad}>
        <Text style={highlighted ? styles.titleHighlighted : styles.title}>
          {title}
        </Text>
        <Text style={styles.artist}>{artist}</Text>
      </Pressable>
      {url !== undefined && url.length > 0 && hasBeenPlayed ? (
        <Pressable
          style={styles.externalLinkContainer}
          onPress={openInDwgLoad}
          accessibilityLabel={configStrings.accessOpenInDwgLoad}
        >
          <Image
            style={styles.externalLinkImage}
            source={require('../../assets/external-link.svg')}
          />
        </Pressable>
      ) : null}
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: 'white',
  },
  titleContainer: {
    maxWidth: '80%',
    textAlign: 'left',
  },
  externalLinkContainer: {
    paddingTop: 3,
    paddingLeft: 3,
    alignContent: 'flex-start',
    maxWidth: '5%',
  },
  externalLinkImage: {
    width: 10,
    height: 10,
    paddingLeft: 2,
  },
  timeContainer: { width: '15%', flex: 1 },
  title: {
    color: Colors.dwgDarkColor,
  },
  titleHighlighted: {
    color: Colors.dwgDarkColor,
    fontWeight: 'bold',
  },
  artist: {
    color: Colors.dwgGreyColor,
    fontSize: 12,
  },
  time: {
    textAlign: 'right',
    color: Colors.dwgGreyColor,
    fontSize: 12,
  },
});

export default HistoryViewItem;
