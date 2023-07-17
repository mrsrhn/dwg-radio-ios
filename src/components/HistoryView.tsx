import React from 'react';
import { observer } from 'mobx-react-lite';
import { View, Text, StyleSheet } from 'react-native';
import useStores from '../hooks/useStores';
import Colors from '../Colors';
import useConfig from '../hooks/useConfig';
import HistoryViewItem from './HistoryViewItem';
import getTimeFromIsoDate from '../utils/getTimeFromIsoDate';

const HistoryView = observer(() => {
  const { historyStore } = useStores();
  const { configStrings } = useConfig();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{configStrings.lastPlayedString}</Text>
      {historyStore.currentHistory.map((item) => (
        <HistoryViewItem
          title={item.title}
          artist={item.artist}
          time={getTimeFromIsoDate(item.datetime)}
        />
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: Colors.dwgBackgroundColor,
  },
  title: {
    paddingVertical: 10,
    fontSize: 15,
    textAlign: 'center',
    color: Colors.dwgDarkColor,
  },
});

export default HistoryView;
