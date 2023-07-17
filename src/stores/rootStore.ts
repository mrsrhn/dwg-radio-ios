import { Config } from '../types/config';
import PlayerStore from './playerStore';
import configBase from '../config/configBase.json';
import configColors from '../config/configColors.json';
import MetaDataStore from './metaDataStore';
import HistoryStore from './historyStore';

class RootStore {
  playerStore: PlayerStore;

  metaDataStore: MetaDataStore;

  historyStore: HistoryStore;

  config: Config = { configBase, configColors };

  constructor() {
    this.playerStore = new PlayerStore(this.config);
    this.metaDataStore = new MetaDataStore(this.config, this.playerStore);
    this.historyStore = new HistoryStore(this.config);
  }
}

export default RootStore;
