import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import Camara from '../screens/Camara';
import Galeria from '../screens/Galeria';
import Charts from '../screens/Charts';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Camara' component={Camara} />
      <Stack.Screen name='Galeria' component={Galeria} />
      <Stack.Screen name='Charts' component={Charts} />
    </Stack.Navigator>
  );
}