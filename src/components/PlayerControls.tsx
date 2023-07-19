import React from 'react';
import { observer } from 'mobx-react-lite';
import { View, StyleSheet, Pressable } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import useStores from '../hooks/useStores';
import Colors from '../Colors';

const PLAYBUTTON_SIZE = 70;
const CHEVRON_SIZE = 30;

const PlayerControls = observer(() => {
  const { playerStore } = useStores();

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
      <Pressable>
        <Ionicons
          name="timer-outline"
          size={CHEVRON_SIZE}
          color={Colors.dwgDarkColor}
        />
      </Pressable>
      <Pressable onPress={onChannelBackward}>
        <Ionicons
          name="chevron-back"
          size={CHEVRON_SIZE}
          color={Colors.dwgDarkColor}
        />
      </Pressable>
      <Pressable onPress={playerStore.togglePlayer}>
        <MaterialIcons
          color={Colors.dwgDarkColor}
          style={{
            height: PLAYBUTTON_SIZE, // TODO: necessary as workaround for this bug: https://github.com/gorhom/react-native-bottom-sheet/issues/1218
          }}
          size={PLAYBUTTON_SIZE}
          name={playButtonIconName}
        />
      </Pressable>
      <Pressable onPress={onChannelForward}>
        <Ionicons
          name="chevron-forward"
          size={CHEVRON_SIZE}
          color={Colors.dwgDarkColor}
        />
      </Pressable>
      <Pressable>
        <Ionicons
          name="ellipsis-horizontal-circle-outline"
          size={CHEVRON_SIZE}
          color={Colors.dwgDarkColor}
        />
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
  },
});

export default PlayerControls;
