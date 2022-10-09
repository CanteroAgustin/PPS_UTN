import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ChatA from '../screens/ChatA';
import ChatB from '../screens/ChatB';
import { IconButton } from '../components';
import Firebase from '../config/firebase';
import SplashScreen from '../screens/SplashScreen';

const auth = Firebase.auth();
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
          size={28}
          color='#757ce8'
          onPress={handleSignOut}
        />
      ),
    }}
    >
      <Stack.Screen name='Cursos' component={HomeScreen} />
      <Stack.Screen name='Chat PPS-4A' component={ChatA} />
      <Stack.Screen name='Chat PPS-4B' component={ChatB} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    flex: 1,
    height: 80,
  }
});