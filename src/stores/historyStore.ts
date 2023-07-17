import { makeObservable, observable, action } from 'mobx';

import { Config } from '../types/config';

interface HistoryEntry {
  artist: string;
  datetime: string;
  raw_title: string;
  title: string;
}
class HistoryStore {
  config: Config;

  historyRadio: HistoryEntry[] = [];

  historyPur: HistoryEntry[] = [];

  historyLyra: HistoryEntry[] = [];

  constructor(config: Config) {
    makeObservable(this, {
      historyRadio: observable,
      historyLyra: observable,
      historyPur: observable,
    });
    this.config = config;
    this.init();
  }

  async init() {
    const data = await Promise.all([
      HistoryStore.getHistory(this.config.configBase.urlHistoryRadio),
      HistoryStore.getHistory(this.config.configBase.urlHistoryLyra),
      HistoryStore.getHistory(this.config.configBase.urlHistoryPur),
    ]);

    this.setHistoryRadio(data[0]);
    this.setHistoryLyra(data[1]);
    this.setHistoryPur(data[2]);
  }

  setHistoryRadio = action((history: HistoryEntry[]) => {
    this.historyRadio = history;
  });

  setHistoryPur = action((history: HistoryEntry[]) => {
    this.historyPur = history;
  });

  setHistoryLyra = action((history: HistoryEntry[]) => {
    this.historyLyra = history;
  });

  static async getHistory(url: string) {
    const { data } = await (await fetch(url)).json();
    return data as HistoryEntry[];
  }
}

export default HistoryStore;
