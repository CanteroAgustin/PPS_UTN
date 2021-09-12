import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import SplashScreen from '../screens/SplashScreen';
import * as SplashScreen2 from 'expo-splash-screen';
const Stack = createStackNavigator();



export default function AuthStack() {
  useEffect(() => {
    setTimeout(async () => {
      await SplashScreen2.hideAsync();
      console.log('hide ok')
    }, 100);
  }, [])
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name='SplashScreen' component={SplashScreen} />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Signup' component={SignupScreen} />
    </Stack.Navigator>
  );
}