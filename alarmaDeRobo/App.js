import { StyleSheet } from 'react-native';
import Routes from './navigation';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { decode, encode } from 'base-64'
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);
if (!global.btoa) { global.btoa = encode }

if (!global.atob) { global.atob = decode }

SplashScreen.preventAutoHideAsync()
  .catch(console.warn);

export default function App() {
  useEffect(() => {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 900);
  }, [])
  return Routes();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBD9A1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
