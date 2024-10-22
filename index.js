import registerRootComponent from 'expo/build/launch/registerRootComponent';
import TrackPlayer from 'react-native-track-player';
import App from './App.tsx';

TrackPlayer.registerPlaybackService(() => async () => { 
  TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());
  TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());
});

registerRootComponent(App);
