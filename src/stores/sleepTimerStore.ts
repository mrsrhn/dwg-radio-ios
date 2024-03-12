import { makeObservable, observable, action, reaction } from 'mobx';
import { Platform } from 'react-native';
import Timer from 'react-native-background-timer-android';

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

  setDwgInterval = (callback: () => void, ms: number) => {
    if (Platform.OS === 'android') {
      return Timer.setInterval(callback, ms);
    }
    return setInterval(callback, ms);
  };

  clearDwgInterval = (interval: NodeJS.Timeout | number) => {
    if (Platform.OS === 'android' && typeof interval === 'number') {
      return Timer.clearInterval(interval);
    }
    return clearInterval(interval);
  };

  activateSleepTimer = (durationInMinutes: number) => {
    if (this.sleepTimerInterval) {
      this.clearDwgInterval(this.sleepTimerInterval as NodeJS.Timeout);
      this.setSleepTimerProgress(undefined);
    }
    this.setSleepTimerProgress(durationInMinutes * 60);

    this.sleepTimerInterval = this.setDwgInterval(this.timerCallback, 1000);
    if (!this.playerStore.isPlaying) {
      this.pauseSleepTimer();
    }
  };

  timerCallback = () => {
    if (this.sleepTimerProgress === 0 || !this.sleepTimerProgress) {
      if (this.sleepTimerInterval) {
        this.clearDwgInterval(this.sleepTimerInterval);
      }
      this.playerStore.stop();
      this.setSleepTimerProgress(undefined);
    } else {
      this.setSleepTimerProgress(this.sleepTimerProgress - 1);
    }
  };

  pauseSleepTimer = () => {
    if (this.sleepTimerInterval) {
      this.clearDwgInterval(this.sleepTimerInterval as NodeJS.Timeout);
    }
  };

  continueSleepTimer = () => {
    this.sleepTimerInterval = this.setDwgInterval(this.timerCallback, 1000);
  };

  stopSleepTimer = () => {
    this.pauseSleepTimer();
    this.setSleepTimerProgress(undefined);
  };
}

export default SleepTimerStore;
