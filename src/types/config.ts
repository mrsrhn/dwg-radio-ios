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
  urlAboutUs: string;
  urlDWGLoad: string;
  urlPurInfo: string;
  urlBankTransfer: string;
  contactMail: string;
  additionalContactLinks: { name: string; url: string; icon: string }[];
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
  infoStringRadio: string;
  infoStringLyra: string;
  infoStringPur: string;
  radio: string;
  pur: string;
  lyra: string;
  load: string;
  paypal: string;
  programInfo: string;
  aboutUs: string;
  bankTransfer: string;
  noConnectionMessage: string;
  accessCurrentTitle: string;
  accessFrom: string;
  accessPlayedAt: string;
  accessClock: string;
  accessOpenInfoMenu: string;
  accessContinue: string;
  accessPause: string;
  accessSwitchChannelForward: string;
  accessSwitchChannelBackward: string;
}
