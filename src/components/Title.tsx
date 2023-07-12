import { observer } from 'mobx-react-lite';
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import useConfig from '../hooks/useConfig';
import useStores from '../hooks/useStores';

const Title = observer(() => {
  const { metaDataStore } = useStores();
  const { configColors } = useConfig();
  return (
    <View style={styles.container}>
      <Text style={{ ...styles.title, color: configColors.dwgDarkColor }}>
        {metaDataStore.currentTitle}
      </Text>
      <Text style={{ ...styles.subTitle, color: configColors.dwgDarkColor }}>
        {metaDataStore.currentInterpret}
      </Text>
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
  },
  subTitle: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
  },
});
export default Title;
