export interface Config {
  configBase: ConfigBase;
  configColors: ConfigColors;
}

interface ConfigBase {
  urlRadio: string;
  urlPur: string;
  urlLyra: string;
}

interface ConfigColors {
  dwgBaseColor: string;
  dwgDarkColor: string;
  dwgLightColor: string;
  dwgAlarmColor: string;
  dwgGreyColor: string;
  dwgBackgroundColor: string;
}
