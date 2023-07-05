import { Config } from '../types/config';
import PlayerStore from './playerStore';
import configBase from '../config/configBase.json';

class RootStore {
  playerStore: PlayerStore;

  config: Config = { configBase };

  constructor() {
    this.playerStore = new PlayerStore(this.config);
  }
}

export default RootStore;
