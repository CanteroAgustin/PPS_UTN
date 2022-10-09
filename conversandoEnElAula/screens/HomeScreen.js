import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import BotonCosas from '../components/BotonCosas';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.imgContainer}>
      <StatusBar style='dark-content' />
      <BotonCosas
        imgSrc={require('../assets/cartel1.jpg')} disable={false}
        onPress={() => {
          navigation.navigate('Chat PPS-4A')
        }}
      />
      <BotonCosas
        imgSrc={require('../assets/cartel2.jpg')} disable={false}
        onPress={() => {
          navigation.navigate('Chat PPS-4B')
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    backgroundColor: 'papayawhip',
  },
});