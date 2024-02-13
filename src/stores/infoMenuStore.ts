import { makeObservable, computed } from 'mobx';

import { Config } from '../types/config';
import PlayerStore from './playerStore';

interface InfoButton {
  iconName: string;
  title: string;
  url: string;
}

interface ChannelInfo {
  title: string;
  infoString: string;
}

class InfoMenuStore {
  config: Config;

  playerStore: PlayerStore;

  constructor(config: Config, playerStore: PlayerStore) {
    makeObservable(this, {
      channelInfoButtons: computed,
      channelInfo: computed,
    });

    this.config = config;
    this.playerStore = playerStore;
  }

  get channelInfo(): ChannelInfo {
    const { configStrings } = this.config;
    switch (this.playerStore.selectedChannel) {
      case 'radio':
        return {
          title: configStrings.radio,
          infoString: configStrings.infoStringRadio,
        };
      case 'pur':
        return {
          title: configStrings.pur,
          infoString: configStrings.infoStringPur,
        };
      case 'lyra':
        return {
          title: configStrings.lyra,
          infoString: configStrings.infoStringLyra,
        };
      default:
        return { title: '', infoString: '' };
    }
  }

  get channelInfoButtons(): InfoButton[] {
    const { configStrings, configBase } = this.config;

    switch (this.playerStore.selectedChannel) {
      case 'radio':
        return [
          {
            iconName: 'globe-outline',
            title: configStrings.preview,
            url: configBase.urlPreview,
          },
          {
            iconName: 'archive-outline',
            title: configStrings.archive,
            url: configBase.urlArchive,
          },
          {
            iconName: 'logo-apple-appstore',
            title: configStrings.load,
            url: configBase.urlDWGLoad,
          },
        ];
      case 'pur':
        return [
          ...(configBase.urlPurInfo.length
            ? [
                {
                  iconName: 'globe-outline',
                  title: configStrings.programInfo,
                  url: configBase.urlPurInfo,
                },
              ]
            : []),
        ];
      case 'lyra':
        return [];
      default:
        return [];
    }
  }
}

export default InfoMenuStore;
