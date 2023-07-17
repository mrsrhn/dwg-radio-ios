import { makeObservable, observable, action, computed, reaction } from 'mobx';

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

    reaction(
      () => this.playerStore.metaRadio,
      () => this.updateHistoryRadio()
    );
    reaction(
      () => this.playerStore.metaLyra,
      () => this.updateHistoryLyra()
    );
    reaction(
      () => this.playerStore.metaPur,
      () => this.updateHistoryPur()
    );
  }

  init() {
    this.updateHistoryRadio();
    this.updateHistoryLyra();
    this.updateHistoryPur();
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

  updateHistoryRadio = async () => {
    const data = await HistoryStore.getHistory(
      this.config.configBase.urlHistoryRadio
    );
    this.setHistoryRadio(data);
  };

  updateHistoryLyra = async () => {
    const data = await HistoryStore.getHistory(
      this.config.configBase.urlHistoryLyra
    );
    this.setHistoryLyra(data);
  };

  updateHistoryPur = async () => {
    const data = await HistoryStore.getHistory(
      this.config.configBase.urlHistoryPur
    );
    this.setHistoryPur(data);
  };

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
