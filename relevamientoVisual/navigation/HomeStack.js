import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import Camara from '../screens/Camara';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Camara' component={Camara} />
    </Stack.Navigator>
  );
}