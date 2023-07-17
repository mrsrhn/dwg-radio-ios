import { makeObservable, observable, action, computed } from 'mobx';

import { Config } from '../types/config';
import PlayerStore from './playerStore';

interface HistoryEntry {
  artist: string;
  datetime: string;
  raw_title: string;
  title: string;
}
class HistoryStore {
  config: Config;

  playerStore: PlayerStore;

  historyRadio: HistoryEntry[] = [];

  historyPur: HistoryEntry[] = [];

  historyLyra: HistoryEntry[] = [];

  constructor(config: Config, playerStore: PlayerStore) {
    makeObservable(this, {
      historyRadio: observable,
      historyLyra: observable,
      historyPur: observable,
      currentHistory: computed,
    });
    this.config = config;
    this.playerStore = playerStore;
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

  get currentHistory() {
    switch (this.playerStore.selectedChannel) {
      case 'radio':
        return this.historyRadio;
      case 'lyra':
        return this.historyLyra;
      case 'pur':
        return this.historyPur;
      default:
        return [];
    }
  }

  static async getHistory(url: string) {
    const { data } = await (await fetch(url)).json();
    return data as HistoryEntry[];
  }
}

export default HistoryStore;
