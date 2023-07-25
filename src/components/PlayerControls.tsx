import React from 'react';
import { observer } from 'mobx-react-lite';
import { View, StyleSheet, Pressable } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import useStores from '../hooks/useStores';
import Colors from '../Colors';
import SleepTimerButton from './SleepTimerButton';

const PLAYBUTTON_SIZE = 70;

interface PlayerControlsProps {
  onInfoMenuButton: () => void;
}

const PlayerControls: React.FC<PlayerControlsProps> = observer(
  ({ onInfoMenuButton }) => {
    const { playerStore } = useStores();

    const playButtonIconName = playerStore.isPlaying
      ? 'pause-circle-outline'
      : 'play-circle-outline';

    return (
      <View style={styles.container}>
        <View style={styles.sideButtonsContainer}>
          <SleepTimerButton />
        </View>
        <View
          style={{
            flexGrow: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
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
        </View>
        <View style={styles.sideButtonsContainer}>
          <Pressable onPress={onInfoMenuButton}>
            <Ionicons
              name="ellipsis-horizontal-circle-outline"
              size={30}
              color={Colors.dwgDarkColor}
            />
          </Pressable>
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  sideButtonsContainer: {
    flexBasis: '30%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default PlayerControls;
