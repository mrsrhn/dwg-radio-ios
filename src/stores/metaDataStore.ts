import { action, computed, makeObservable, observable } from 'mobx';

import { Config } from '../types/config';
import PlayerStore from './playerStore';

class MetaDataStore {
  config: Config;

  playerStore: PlayerStore;

  metaRadio = '';

  metaLyra = '';

  metaPur = '';

  constructor(config: Config, playerStore: PlayerStore) {
    makeObservable(this, {
      metaRadio: observable,
      metaLyra: observable,
      metaPur: observable,
      currentTitle: computed,
    });
    this.config = config;
    this.playerStore = playerStore;
  }

  setMetaRadio = action((metaData: string) => {
    this.metaRadio = metaData;
  });

  setMetaLyra = action((metaData: string) => {
    this.metaLyra = metaData;
  });

  setMetaPur = action((metaData: string) => {
    this.metaPur = metaData;
  });

  get currentTitle() {
    switch (this.playerStore.selectedChannel) {
      case 'lyra':
        return this.metaLyra;
      case 'radio':
        return this.metaRadio;
      case 'pur':
        return this.metaPur;
      default:
        return '';
    }
  }
}

export default MetaDataStore;
