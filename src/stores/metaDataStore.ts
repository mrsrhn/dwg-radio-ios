import { computed, makeObservable } from 'mobx';

import { Config } from '../types/config';
import PlayerStore from './playerStore';

class MetaDataStore {
  config: Config;

  playerStore: PlayerStore;

  constructor(config: Config, playerStore: PlayerStore) {
    makeObservable(this, {
      currentMetaData: computed,
      currentTitle: computed,
      currentInterpret: computed,
    });
    this.config = config;
    this.playerStore = playerStore;
  }

  get currentMetaData() {
    switch (this.playerStore.selectedChannel) {
      case 'lyra':
        return this.playerStore.metaLyra;
      case 'radio':
        return this.playerStore.metaRadio;
      case 'pur':
        return this.playerStore.metaPur;
      default:
        return '';
    }
  }

  get currentTitle() {
    return this.currentMetaData.split(' - ')[1] ?? '';
  }

  get currentInterpret() {
    return this.currentMetaData.split(' - ')[0] ?? '';
  }
}

export default MetaDataStore;
