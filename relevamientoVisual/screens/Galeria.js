import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GaleriaCosasLindas from '../screens/GaleriaCosasLindas';
import GaleriaCosasFeas from '../screens/GaleriaCosasFeas';
import { Image, Text, View } from 'react-native';

export default function Galeria() {

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle:
      {
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 35,
        marginhorizontal: 35,
        height: 60,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: {
          width: 10,
          height: 10
        }
      }
    }}>
      <Tab.Screen name='Cosas Lindas' component={GaleriaCosasLindas} options={{
        tabBarIcon: ({ focused }) => (
          < View style={{ position: 'absolute' }}>
            <Image style={{ width: 45, height: 40 }} source={require('../assets/cosaLindaCaraIcon.png')} />
            {/* <FontAwesome5 name='home' size={20} color={focused ? 'red' : 'gray'}></FontAwesome5> */}
          </View>
        )
      }}></Tab.Screen >
      <Tab.Screen name='Cosas Feas' component={GaleriaCosasFeas} options={{
        tabBarIcon: ({ focused }) => (
          < View style={{ position: 'absolute' }}>
            <Image style={{ width: 40, height: 45 }} source={require('../assets/cosaFeaCaraIcon.png')} />
            {/* <FontAwesome5 name='home' size={20} color={focused ? 'red' : 'gray'}></FontAwesome5> */}
          </View>
        )
      }}></Tab.Screen>
    </Tab.Navigator >
  );
}