import { observer } from 'mobx-react-lite';
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Colors from '../Colors';
import useStores from '../hooks/useStores';

const Title = observer(() => {
  const { metaDataStore } = useStores();
  return (
    <View style={styles.container}>
      <Text lineBreakMode="middle" style={styles.title}>
        {metaDataStore.currentTitle}
      </Text>
      <Text style={styles.subTitle}>{metaDataStore.currentInterpret}</Text>
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
