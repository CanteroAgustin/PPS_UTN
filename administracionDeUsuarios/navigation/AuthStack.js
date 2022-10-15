import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import SplashScreen from '../screens/SplashScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name='SplashScreen' component={SplashScreen} />
      <Stack.Screen name='Login' component={LoginScreen} />
    </Stack.Navigator>
  );
}