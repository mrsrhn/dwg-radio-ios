import { action, makeObservable, observable } from 'mobx';

import TrackPlayer, {
  Capability,
  State,
  Event,
} from 'react-native-track-player';
import { Config } from '../types/config';

export type Channel = 'lyra' | 'radio' | 'pur';

class PlayerStore {
  isLoaded = false;

  isPlaying = false;

  selectedChannel: Channel = 'radio';

  config: Config;

  currentMetaData: unknown = undefined;

  constructor(config: Config) {
    makeObservable(this, {
      isPlaying: observable,
      selectedChannel: observable,
      currentMetaData: observable,
    });
    this.config = config;
    this.init();
  }

  setCurrentMetaData = action((metaData: unknown) => {
    this.currentMetaData = metaData;
  });

  handleMetadataReceived(metadata: unknown) {
    console.log(metadata);
    this.setCurrentMetaData(metadata);
  }

  init = async () => {
    await TrackPlayer.setupPlayer();
    TrackPlayer.addEventListener(Event.PlaybackMetadataReceived, (metadata) =>
      this.handleMetadataReceived(metadata)
    );

    await TrackPlayer.updateOptions({
      capabilities: [Capability.Play, Capability.Pause],
    });

    const channels = [
      this.config.configBase.urlLyra,
      this.config.configBase.urlRadio,
      this.config.configBase.urlPur,
    ].map((url) => ({ url }));
    await TrackPlayer.add(channels);
  };

  setIsPlaying = action((isPlaying: boolean) => {
    this.isPlaying = isPlaying;
  });

  setIsLoaded = action((isLoaded: boolean) => {
    this.isLoaded = isLoaded;
  });

  setSelectedChannel = action((channel: Channel) => {
    this.selectedChannel = channel;
  });

  updateChannel = async (selectedChannel: Channel) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack === null) return;

    switch (selectedChannel) {
      case 'lyra':
        if (currentTrack === 0) {
          break;
        } else if (currentTrack === 1) {
          TrackPlayer.skipToPrevious();
          break;
        } else {
          await TrackPlayer.skipToPrevious();
          TrackPlayer.skipToPrevious();
          break;
        }
      case 'radio':
        if (currentTrack === 0) {
          TrackPlayer.skipToNext();
          break;
        } else if (currentTrack === 1) {
          break;
        } else {
          TrackPlayer.skipToPrevious();
          break;
        }
      case 'pur':
        if (currentTrack === 0) {
          await TrackPlayer.skipToNext();
          TrackPlayer.skipToNext();
          break;
        } else if (currentTrack === 1) {
          TrackPlayer.skipToNext();
          break;
        } else {
          break;
        }
      default:
        break;
    }
    this.setSelectedChannel(selectedChannel);
  };

  togglePlayer = async () => {
    const state = await TrackPlayer.getState();
    if (state === State.Playing) {
      TrackPlayer.pause();
      this.setIsPlaying(false);
    } else {
      await this.seekToLivePosition();
      await TrackPlayer.play();
      this.setIsPlaying(true);
    }
  };

  seekToLivePosition = async () => {
    // React Native Track Player cannot seek to the live position in a stream,
    // so we switch channels for a moment
    if (this.selectedChannel === 'pur') {
      await TrackPlayer.skipToPrevious();
      await TrackPlayer.skipToNext();
    } else {
      await TrackPlayer.skipToNext();
      await TrackPlayer.skipToPrevious();
    }
  };
}

export default PlayerStore;
