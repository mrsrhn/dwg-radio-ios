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
  urlPreview: string;
  urlArchive: string;
  urlPaypal: string;
  contactMail: string;
}

interface ConfigStrings {
  lastPlayedString: string;
  sleepTimer: string;
  minutes: string;
  off: string;
  preview: string;
  archive: string;
  mailButton: string;
  contact: string;
  additionalLinks: string;
  donation: string;
}
