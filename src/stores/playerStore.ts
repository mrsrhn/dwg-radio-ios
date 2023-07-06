import { action, makeObservable, observable } from 'mobx';
import {
  Audio,
  AudioMode,
  AVMetadata,
  AVPlaybackStatusError,
  AVPlaybackStatusSuccess,
  InterruptionModeIOS,
} from 'expo-av';
import { Config } from '../types/config';

class PlayerStore {
  isLoaded = false;

  isPlaying = false;

  player: Audio.Sound | undefined = undefined;

  title = '';

  config: Config;

  constructor(config: Config) {
    makeObservable(this, {
      isPlaying: observable,
      title: observable,
    });
    this.config = config;
    this.initAudioPlayer();
  }

  setIsPlaying = action((isPlaying: boolean) => {
    this.isPlaying = isPlaying;
  });

  setIsLoaded = action((isLoaded: boolean) => {
    this.isLoaded = isLoaded;
  });

  setTitle = action((title: string) => {
    this.title = title;
  });

  togglePlayer = () => {
    if (!this.player) return;
    if (this.isPlaying) {
      this.player.pauseAsync();
    } else {
      this.player.playAsync();
    }
  };

  initAudioPlayer = async () => {
    const { sound: playbackObject } = await Audio.Sound.createAsync(
      { uri: this.config.configBase.url },
      {},
      this.onPlaybackStatusUpdate
    );
    playbackObject.setOnMetadataUpdate(this.onMetadataUpdate);

    this.player = playbackObject;
  };

  private onPlaybackStatusUpdate = (
    status: AVPlaybackStatusError | AVPlaybackStatusSuccess
  ) => {
    const partialMode: Partial<AudioMode> = {
      allowsRecordingIOS: false,
      interruptionModeIOS: InterruptionModeIOS.MixWithOthers,
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
    };
    Audio.setAudioModeAsync(partialMode);
    this.setIsLoaded(status.isLoaded);
    if ('isPlaying' in status) {
      this.setIsPlaying(status.isPlaying);
    } else if (status.error) {
      console.error(status.error);
      this.setIsPlaying(false);
    }
  };

  private onMetadataUpdate = (metadata: AVMetadata) => {
    console.log('meta: ', metadata.title);
    this.setTitle(metadata.title ?? '');
  };
}

export default PlayerStore;
