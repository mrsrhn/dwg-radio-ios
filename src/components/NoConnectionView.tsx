import React from 'react';
import { observer } from 'mobx-react-lite';
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';
import useStores from '../hooks/useStores';
import Colors from '../Colors';
import useConfig from '../hooks/useConfig';

const NoConnectionView = observer(() => {
  const { playerStore } = useStores();
  const { configStrings } = useConfig();

  if (playerStore.isConnected) return null;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text
          style={styles.text}
          accessible
          accessibilityLabel={configStrings.noConnectionMessage}
          accessibilityRole="text"
        >
          {configStrings.noConnectionMessage}
        </Text>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dwgBackgroundColor,
    position: 'absolute',
    width: '100%',
    zIndex: 999,
  },
  textContainer: {
    borderRadius: 10,
    backgroundColor: Colors.dwgAlarmColor,
    marginHorizontal: 5,
  },
  text: {
    paddingVertical: 5,
    fontSize: 15,
    textAlign: 'center',
    color: 'white',
  },
});

export default NoConnectionView;
