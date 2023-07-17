export interface Config {
  configBase: ConfigBase;
  configColors: ConfigColors;
}

interface ConfigBase {
  urlRadio: string;
  urlPur: string;
  urlLyra: string;
  urlHistoryRadio: string;
  urlHistoryPur: string;
  urlHistoryLyra: string;
}

interface ConfigColors {
  dwgBaseColor: string;
  dwgDarkColor: string;
  dwgLightColor: string;
  dwgAlarmColor: string;
  dwgGreyColor: string;
  dwgBackgroundColor: string;
}
