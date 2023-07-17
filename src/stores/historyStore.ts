import { makeObservable, observable } from 'mobx';

import { Config } from '../types/config';

interface HistoryEntry {
  title: string;
}
class HistoryStore {
  config: Config;

  historyRadio: HistoryEntry[] = [];

  constructor(config: Config) {
    makeObservable(this, {
      historyRadio: observable,
    });
    this.config = config;
  }
}

export default HistoryStore;
