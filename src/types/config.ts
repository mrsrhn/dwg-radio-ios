export interface Config {
  configBase: ConfigBase;
  configStrings: ConfigStrings;
}

interface ConfigBase {
  urlRadio: string;
  urlPur: string;
  urlLyra: string;
  urlHistoryRadio: string;
  urlHistoryPur: string;
  urlHistoryLyra: string;
}

interface ConfigStrings {
  lastPlayedString: string;
  sleepTimer: string;
  minutes: string;
  off: string;
}
