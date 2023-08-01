import { Config } from '../types/config';
import PlayerStore from './playerStore';
import configBase from '../config/configBase.json';
import configStrings from '../config/configStrings.json';
import HistoryStore from './historyStore';
import SleepTimerStore from './sleepTimerStore';
import InfoMenuStore from './infoMenuStore';

class RootStore {
  infoMenuStore: InfoMenuStore;

  historyStore: HistoryStore;

  sleepTimerStore: SleepTimerStore;

  playerStore: PlayerStore;

  config: Config = { configBase, configStrings };

  constructor() {
    this.playerStore = new PlayerStore(this.config);
    this.historyStore = new HistoryStore(this.config, this.playerStore);
    this.sleepTimerStore = new SleepTimerStore(this.config, this.playerStore);
    this.infoMenuStore = new InfoMenuStore(this.config, this.playerStore);
  }
}

export default RootStore;
