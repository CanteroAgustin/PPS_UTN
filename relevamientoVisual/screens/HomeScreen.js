import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, IconButton } from '../components';
import Firebase from '../config/firebase';
import BotonCosas from '../components/BotonCosas';

const auth = Firebase.auth();

export default function HomeScreen({ navigation }) {
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style='dark-content' />
      <View style={styles.row}>
        <IconButton
          name='logout'
          size={24}
          color='#757ce8'
          onPress={handleSignOut}
        />
      </View>
      <Text style={styles.title}>¿Que te gustaria fotografiar?</Text>
      <View style={styles.imgContainer}>
        <BotonCosas
          imgSrc={require('../assets/cosalinda.jpg')} disable={false}
          onPress={() => {
            navigation.navigate('Camara', { tipo: 'linda' });
          }}
        />
        <BotonCosas
          imgSrc={require('../assets/cosafearesized.jpg')} disable={false}
          onPress={() => {
            navigation.navigate('Camara', { tipo: 'fea' });
          }}
        />
      </View>
      <View style={styles.menu}>
        <Button
          onPress={() => {
            navigation.navigate('Galeria')
          }}
          title='Galeria'
          backgroundColor='#fff'
          titleSize={40}
          titleColor='#2979ff'
          containerStyle={{
            fontWeight: 'bold',
            borderColor: '#000000',
            borderWidth: 1,
            borderRadius: 5,
            marginTop: 4,
            with: 100,
            backgroundColor: '#fff',
            height: 100
          }}
        />
        <Button
          onPress={() => {
            navigation.navigate('Charts')
          }}
          title='Graficos'
          backgroundColor='#fff'
          titleSize={40}
          titleColor='#2979ff'
          containerStyle={{
            borderColor: '#000000',
            borderWidth: 1,
            borderRadius: 5,
            marginTop: 4,
            backgroundColor: '#fff',
            height: 100
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    alignSelf: 'center',
    color: '#2979ff',
    paddingBottom: 30,
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    backgroundColor: '#e8eaf6',
    paddingTop: 50,
  },
  row: {
    padding: 20,
    alignItems: 'flex-end',
    marginBottom: 24
  },
  imgContainer: {
    flexDirection: 'row'
  },
  menu: {
    marginLeft: 2,
    marginRight: 2
  }
});