import { Config } from '../types/config';
import PlayerStore from './playerStore';
import configBase from '../config/configBase.json';
import configColors from '../config/configColors.json';

class RootStore {
  playerStore: PlayerStore;

  config: Config = { configBase, configColors };

  constructor() {
    this.playerStore = new PlayerStore(this.config);
  }
}

export default RootStore;
