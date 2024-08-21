import TrackPlayer from 'react-native-track-player';

// eslint-disable-next-line
module.exports = async function () {
  TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());
  TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());
};
