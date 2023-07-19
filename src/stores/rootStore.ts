import { Config } from '../types/config';
import PlayerStore from './playerStore';
import configBase from '../config/configBase.json';
import configStrings from '../config/configStrings.json';
import HistoryStore from './historyStore';

class RootStore {
  historyStore: HistoryStore;

  playerStore: PlayerStore;

  config: Config = { configBase, configStrings };

  constructor() {
    this.playerStore = new PlayerStore(this.config);
    this.historyStore = new HistoryStore(this.config, this.playerStore);
  }
}

export default RootStore;
