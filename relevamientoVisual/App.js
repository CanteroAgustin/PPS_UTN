import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Routes from './navigation';
import * as SplashScreen from 'expo-splash-screen';
import { decode, encode } from 'base-64'

if (!global.btoa) { global.btoa = encode }

if (!global.atob) { global.atob = decode }

SplashScreen.preventAutoHideAsync()
  .catch(console.warn);

export default function App() {
  useEffect(() => {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 500);
  }, [])
  return Routes();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
