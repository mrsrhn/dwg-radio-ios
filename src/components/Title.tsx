import { observer } from 'mobx-react-lite';
import React from 'react';
import { Text } from 'react-native';
import useStores from '../hooks/useStores';

const Title = observer(() => {
  const { playerStore } = useStores();
  return <Text>{playerStore.metaData}</Text>;
});

export default Title;
