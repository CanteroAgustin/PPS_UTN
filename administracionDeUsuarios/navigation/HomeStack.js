import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton } from '../components';
import Firebase from '../config/firebase';
import HomeScreen from '../screens/HomeScreen';
import SignupScreen from '../screens/SignupScreen';

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
      headerStyle: { backgroundColor: '#17a2b8' },
      headerTitleStyle: {
        color: 'white'
      },
      headerRight: () => (
        <IconButton
          name='logout'
          size={24}
          color='white'
          onPress={handleSignOut}
        />
      ),
    }}>
      <Stack.Screen name='Lista de usuarios' component={HomeScreen} />
      <Stack.Screen name='Nuevo usuario' component={SignupScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    paddingRight: 30,
    color: 'green'
  }
});