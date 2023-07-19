import { registerRootComponent } from 'expo';
import TrackPlayer from 'react-native-track-player';
import App from './App.tsx';

registerRootComponent(App);
TrackPlayer.registerPlaybackService(() => require('./service'));
