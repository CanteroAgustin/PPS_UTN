import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GaleriaCosasLindas from '../screens/GaleriaCosasLindas';
import GaleriaCosasFeas from '../screens/GaleriaCosasFeas';
import { Image, View } from 'react-native';

export default function Galeria() {

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarStyle:
      {
        backgroundColor: 'white',
        position: 'absolute',
        marginhorizontal: 35,
        height: 60,
        // borderTopStartRadius: 10,
        // borderTopEndRadius: 10,
        borderRadius: 5,
        bottom: 2,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: {
          width: 10,
          height: 10
        }
      }
    }}>
      <Tab.Screen name='Cosas Lindas' component={GaleriaCosasLindas} options={{
        tabBarIcon: () => (
          < View style={{ position: 'absolute' }}>
            <Image style={{ width: 45, height: 40 }} source={require('../assets/cosaLindaCaraIcon.png')} />
          </View>
        )
      }}></Tab.Screen >
      <Tab.Screen name='Cosas Feas' component={GaleriaCosasFeas} options={{
        tabBarIcon: () => (
          < View style={{ position: 'absolute' }}>
            <Image style={{ width: 40, height: 45 }} source={require('../assets/cosaFeaCaraIcon.png')} />
          </View>
        )
      }}></Tab.Screen>
    </Tab.Navigator >
  );
}