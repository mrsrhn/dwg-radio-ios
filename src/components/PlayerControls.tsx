import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, View } from 'react-native';
import useStores from '../hooks/useStores';

const PlayerControls = observer(() => {
  const { playerStore } = useStores();
  return (
    <View style={{ flex: 1 }}>
      <Button
        title={JSON.stringify(playerStore.isPlaying)}
        onPress={() => playerStore.setIsPlaying(!playerStore.isPlaying)}
      />
    </View>
  );
});

export default PlayerControls;
