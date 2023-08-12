import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../Colors';
import useConfig from '../hooks/useConfig';

interface HistoryItemProps {
  title: string;
  artist: string;
  time: string;
}

function HistoryViewItem(props: HistoryItemProps) {
  const { title, artist, time } = props;
  const { configStrings } = useConfig();
  return (
    <View
      style={styles.container}
      accessible
      accessibilityLabel={`${title}, ${configStrings.accessFrom} ${artist}, ${configStrings.accessPlayedAt} ${time} ${configStrings.accessClock}`}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.artist}>{artist}</Text>
      </View>
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
  titleContainer: { width: '80%' },
  timeContainer: { width: '20%' },
  title: {
    color: Colors.dwgDarkColor,
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
