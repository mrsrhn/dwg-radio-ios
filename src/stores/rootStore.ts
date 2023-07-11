import { Config } from '../types/config';
import PlayerStore from './playerStore';
import configBase from '../config/configBase.json';
import configColors from '../config/configColors.json';
import MetaDataStore from './metaDataStore';

class RootStore {
  playerStore: PlayerStore;

  metaDataStore: MetaDataStore;

  config: Config = { configBase, configColors };

  constructor() {
    this.playerStore = new PlayerStore(this.config);
    this.metaDataStore = new MetaDataStore(this.config, this.playerStore);
  }
}

export default RootStore;
