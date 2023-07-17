import React from 'react';
import { observer } from 'mobx-react-lite';
import { View, StyleSheet, Pressable } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import useStores from '../hooks/useStores';
import useConfig from '../hooks/useConfig';

const PLAYBUTTON_SIZE = 70;
const CHEVRON_SIZE = 30;

const PlayerControls = observer(() => {
  const { playerStore } = useStores();
  const config = useConfig();

  const playButtonIconName = playerStore.isPlaying
    ? 'pause-circle-outline'
    : 'play-circle-outline';

  const onChannelBackward = () => {
    switch (playerStore.selectedChannel) {
      case 'lyra':
        break;
      case 'radio':
        playerStore.setSelectedChannel('lyra');
        break;
      case 'pur':
        playerStore.setSelectedChannel('radio');
        break;
      default:
        break;
    }
  };

  const onChannelForward = () => {
    switch (playerStore.selectedChannel) {
      case 'lyra':
        playerStore.setSelectedChannel('radio');
        break;
      case 'radio':
        playerStore.setSelectedChannel('pur');
        break;
      case 'pur':
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={onChannelBackward}>
        <Ionicons
          name="chevron-back"
          size={CHEVRON_SIZE}
          color={config.configColors.dwgDarkColor}
        />
      </Pressable>
      <Pressable onPress={playerStore.togglePlayer}>
        <MaterialIcons
          color={config.configColors.dwgDarkColor}
          style={{
            paddingHorizontal: 20,
            height: PLAYBUTTON_SIZE, // needed as workaround for this bug: https://github.com/gorhom/react-native-bottom-sheet/issues/1218
          }}
          size={PLAYBUTTON_SIZE}
          name={playButtonIconName}
        />
      </Pressable>
      <Pressable onPress={onChannelForward}>
        <Ionicons
          name="chevron-forward"
          size={CHEVRON_SIZE}
          color={config.configColors.dwgDarkColor}
        />
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PlayerControls;
