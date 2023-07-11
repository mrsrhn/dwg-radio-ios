import { observer } from 'mobx-react-lite';
import React from 'react';
import { Text } from 'react-native';
import useStores from '../hooks/useStores';

const Title = observer(() => {
  const { metaDataStore } = useStores();
  return <Text>{metaDataStore.currentTitle}</Text>;
});

export default Title;
