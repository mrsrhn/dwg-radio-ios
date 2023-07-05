import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, View, Text } from 'react-native';
import useStores from '../hooks/useStores';

const PlayerControls = observer(() => {
  const { playerStore } = useStores();

  const onPlayButtonPress = () => playerStore.togglePlayer();

  return (
    <View style={{ flex: 1 }}>
      <Text>{playerStore.title}</Text>
      <Button
        title={playerStore.isPlaying ? 'Pause' : 'Play'}
        onPress={onPlayButtonPress}
      />
    </View>
  );
});

export default PlayerControls;
