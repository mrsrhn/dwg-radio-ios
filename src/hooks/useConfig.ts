import React from 'react';
import { RootStoreContext } from '../providers/storeProvider';

const useConfig = () => React.useContext(RootStoreContext).config;

export default useConfig;
