import { makeObservable, observable, action, computed } from 'mobx';

import { Config } from '../types/config';

export const PASSED_DAYS_TO_SHOW = 3;
export const FUTURE_DAYS_TO_SHOW = 7;

export const indexForToday = PASSED_DAYS_TO_SHOW;
export const indexForLastDay = PASSED_DAYS_TO_SHOW + FUTURE_DAYS_TO_SHOW;

class ProgramStore {
  config: Config;

  radioProgramToDisplay = indexForToday;

  constructor(config: Config) {
    makeObservable(this, {
      radioProgramToDisplay: observable,
      isShowingProgramForToday: computed,
    });

    this.config = config;
  }

  setRadioProgramToDisplay = action((radioProgramToDisplay: number) => {
    this.radioProgramToDisplay = radioProgramToDisplay;
  });

  updateRadioProgramToDisplay = (direction: 'forward' | 'backward') => {
    if (direction === 'forward') {
      this.setRadioProgramToDisplay(
        this.radioProgramToDisplay === indexForLastDay
          ? indexForLastDay
          : this.radioProgramToDisplay + 1
      );
    } else {
      this.setRadioProgramToDisplay(
        this.radioProgramToDisplay === 0 ? 0 : this.radioProgramToDisplay - 1
      );
    }
  };

  get isShowingProgramForToday() {
    return this.radioProgramToDisplay === indexForToday;
  }
}

export default ProgramStore;
