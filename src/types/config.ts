export interface Config {
  configBase: ConfigBase;
  configColors: ConfigColors;
}

interface ConfigBase {
  url: string;
}

interface ConfigColors {
  dwgBaseColor: string;
  dwgDarkColor: string;
  dwgLightColor: string;
  dwgAlarmColor: string;
  dwgGreyColor: string;
}
