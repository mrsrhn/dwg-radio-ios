import registerRootComponent from 'expo/build/launch/registerRootComponent';
import TrackPlayer from 'react-native-track-player';
import App from './App.tsx';

registerRootComponent(App);

// eslint-disable-next-line
const { default: service } = require('./service');
TrackPlayer.registerPlaybackService(() => service);
