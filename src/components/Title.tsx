import { observer } from 'mobx-react-lite';
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Colors from '../Colors';
import useConfig from '../hooks/useConfig';
import useStores from '../hooks/useStores';

const Title = observer(() => {
  const { historyStore } = useStores();
  const { configStrings } = useConfig();
  return (
    <View
      style={styles.container}
      accessible
      accessibilityLabel={`${configStrings.accessCurrentTitle}: ${historyStore.currentTitle}, ${configStrings.accessFrom} ${historyStore.currentArtist}`}
    >
      <Text lineBreakMode="middle" style={styles.title}>
        {historyStore.currentTitle}
      </Text>
      <Text style={styles.subTitle}>{historyStore.currentArtist}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
    color: Colors.dwgDarkColor,
  },
  subTitle: {
    textAlign: 'center',
    fontSize: 18,
    color: Colors.dwgDarkColor,
  },
});

export default Title;
