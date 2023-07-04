import { action, makeObservable, observable } from 'mobx';

class PlayerStore {
  isPlaying = false;

  constructor() {
    makeObservable(this, {
      isPlaying: observable,
    });
  }

  setIsPlaying = action((isPlaying: boolean) => {
    this.isPlaying = isPlaying;
  });
}

export default PlayerStore;
