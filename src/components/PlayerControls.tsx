import React from 'react';
import { observer } from 'mobx-react-lite';
import { View, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import useStores from '../hooks/useStores';
import useConfig from '../hooks/useConfig';

const PLAYBUTTON_SIZE = 70;

const PlayerControls = observer(() => {
  const { playerStore } = useStores();
  const config = useConfig();

  const playButtonIconName = playerStore.isPlaying
    ? 'pause-circle-outline'
    : 'play-circle-outline';

  const onPlayButtonPress = playerStore.togglePlayer;

  return (
    <View style={styles.container}>
      <Pressable onPress={onPlayButtonPress}>
        <MaterialIcons
          color={config.configColors.dwgDarkColor}
          style={{
            height: PLAYBUTTON_SIZE, // needed as workaround for this bug: https://github.com/gorhom/react-native-bottom-sheet/issues/1218
          }}
          size={PLAYBUTTON_SIZE}
          name={playButtonIconName}
        />
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default PlayerControls;
