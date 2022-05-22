import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import Camara from '../screens/Camara';
import GaleriaCosasLindas from '../screens/GaleriaCosasLindas';
import GaleriaCosasFeas from '../screens/GaleriaCosasFeas';
import Charts from '../screens/Charts';
import { IconButton } from '../components';

const Stack = createStackNavigator();
const handleSignOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.log(error);
  }
};

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerRightContainerStyle: styles.headerRight,
      headerStyle: { backgroundColor: 'papayawhip' },
      headerRight: () => (
        <IconButton
          name='logout'
          size={24}
          color='#757ce8'
          onPress={handleSignOut}
        />
      ),
    }}
    >
      <Stack.Screen name='Listados' component={HomeScreen} />
      <Stack.Screen name='Camara' component={Camara} />
      <Stack.Screen name='Galeria cosas lindas' component={GaleriaCosasLindas} />
      <Stack.Screen name='Galeria cosas feas' component={GaleriaCosasFeas} />
      <Stack.Screen name='Charts' component={Charts} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    paddingRight: 30,
  }
});