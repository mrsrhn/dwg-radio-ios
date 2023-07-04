import PlayerStore from './playerStore';

class RootStore {
  playerStore: PlayerStore;

  constructor() {
    this.playerStore = new PlayerStore();
  }
}

export default RootStore;
