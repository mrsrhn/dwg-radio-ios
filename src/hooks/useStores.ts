import React from 'react';
import { RootStoreContext } from '../providers/storeProvider';

const useStores = () => React.useContext(RootStoreContext);

export default useStores;
