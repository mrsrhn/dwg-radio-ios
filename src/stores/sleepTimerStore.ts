import { makeObservable, observable, action, reaction } from 'mobx';

import { Config } from '../types/config';
import PlayerStore from './playerStore';

class SleepTimerStore {
  config: Config;

  playerStore: PlayerStore;

  sleepTimerProgress: number | undefined = undefined;

  sleepTimerInterval?: number | NodeJS.Timeout;

  constructor(config: Config, playerStore: PlayerStore) {
    makeObservable(this, {
      sleepTimerProgress: observable,
    });
    this.config = config;
    this.playerStore = playerStore;

    reaction(
      () => this.playerStore.isPlaying,
      () => {
        if (this.sleepTimerProgress) {
          if (this.playerStore.isPlaying) {
            this.continueSleepTimer();
          } else {
            this.pauseSleepTimer();
          }
        }
      }
    );
  }

  setSleepTimerProgress = action((value: number | undefined) => {
    this.sleepTimerProgress = value;
  });

  activateSleepTimer = (durationInMinutes: number) => {
    if (this.sleepTimerInterval) {
      clearInterval(this.sleepTimerInterval as NodeJS.Timeout);
      this.setSleepTimerProgress(undefined);
    }
    this.setSleepTimerProgress(durationInMinutes * 60);

    this.sleepTimerInterval = setInterval(this.timerCallback, 1000);
    if (!this.playerStore.isPlaying) {
      this.pauseSleepTimer();
    }
  };

  timerCallback = () => {
    if (this.sleepTimerProgress === 0 || !this.sleepTimerProgress) {
      clearInterval(this.sleepTimerInterval);
      this.playerStore.stop();
      this.setSleepTimerProgress(undefined);
    } else {
      this.setSleepTimerProgress(this.sleepTimerProgress - 1);
    }
  };

  pauseSleepTimer = () => {
    if (this.sleepTimerInterval) {
      clearInterval(this.sleepTimerInterval as NodeJS.Timeout);
    }
  };

  continueSleepTimer = () => {
    this.sleepTimerInterval = setInterval(this.timerCallback, 1000);
  };

  stopSleepTimer = () => {
    this.pauseSleepTimer();
    this.setSleepTimerProgress(undefined);
  };
}

export default SleepTimerStore;
