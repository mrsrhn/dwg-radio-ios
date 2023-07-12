import { action, computed, makeObservable, observable } from 'mobx';
import {
  Audio,
  AudioMode,
  AVPlaybackStatusError,
  AVPlaybackStatusSuccess,
  InterruptionModeIOS,
} from 'expo-av';
import { Config } from '../types/config';

export type Channel = 'lyra' | 'radio' | 'pur';

class PlayerStore {
  isLoaded = false;

  isPlaying = false;

  playerRadio: Audio.Sound | undefined = undefined;

  metaRadio = '';

  playerPur: Audio.Sound | undefined = undefined;

  metaPur = '';

  playerLyra: Audio.Sound | undefined = undefined;

  metaLyra = '';

  selectedChannel: Channel = 'radio';

  config: Config;

  constructor(config: Config) {
    makeObservable(this, {
      isPlaying: observable,
      selectedChannel: observable,
      currentPlayerObject: computed,
      metaLyra: observable,
      metaRadio: observable,
      metaPur: observable,
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

  setSelectedChannel = action((channel: Channel) => {
    this.selectedChannel = channel;
  });

  setMetaRadio = action((meta: string) => {
    this.metaRadio = meta;
  });

  setMetaLyra = action((meta: string) => {
    this.metaLyra = meta;
  });

  setMetaPur = action((meta: string) => {
    this.metaPur = meta;
  });

  updateChannel = async (selectedChannel: Channel) => {
    this.setSelectedChannel(selectedChannel);
    if (!this.isPlaying) return;
    await Promise.all(
      [this.playerLyra, this.playerRadio, this.playerPur].map((playerObject) =>
        playerObject?.pauseAsync()
      )
    );
    switch (selectedChannel) {
      case 'lyra':
        this.playerLyra?.playAsync();
        break;
      case 'radio':
        this.playerRadio?.playAsync();
        break;
      case 'pur':
        this.playerPur?.playAsync();
        break;
      default:
        break;
    }
  };

  togglePlayer = () => {
    if (!this.currentPlayerObject) return;
    if (this.isPlaying) {
      this.currentPlayerObject.pauseAsync();
    } else {
      this.currentPlayerObject.playAsync();
    }
  };

  initAudioPlayer = async () => {
    const { urlRadio, urlLyra, urlPur } = this.config.configBase;

    // TODO: if one of the streams is offline, the method breaks here. We have to handle that.
    const playbackObjects = await Promise.all(
      [urlRadio, urlLyra, urlPur].map((url) =>
        Audio.Sound.createAsync({ uri: url }, {}, this.onPlaybackStatusUpdate)
      )
    );

    this.playerRadio = playbackObjects[0].sound;
    this.playerLyra = playbackObjects[1].sound;
    this.playerPur = playbackObjects[2].sound;

    this.playerRadio.setOnMetadataUpdate((m) =>
      this.setMetaRadio(m.title ?? '')
    );
    this.playerLyra.setOnMetadataUpdate((m) => this.setMetaLyra(m.title ?? ''));
    this.playerPur.setOnMetadataUpdate((m) => this.setMetaPur(m.title ?? ''));
  };

  get currentPlayerObject() {
    switch (this.selectedChannel) {
      case 'radio':
        return this.playerRadio;
      case 'lyra':
        return this.playerLyra;
      case 'pur':
        return this.playerPur;
      default:
        return undefined;
    }
  }

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
}

export default PlayerStore;
