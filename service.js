// eslint-disable-next-line import/no-import-module-exports
import TrackPlayer from 'react-native-track-player';

// eslint-disable-next-line func-names
module.exports = async function () {
  TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());
  TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());
};
