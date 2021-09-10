import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { IconButton } from '../components';
import Firebase from '../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';

const auth = Firebase.auth();

export default function HomeScreen() {
  const { user } = useContext(AuthenticatedUserContext);
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
      <Text style={styles.title}>Bienvenido {user.email}!</Text>
      <Text style={styles.title}>Este es el primer ejercicio para la materia Practica profesional supervisada</Text>
      <View style={styles.textContainer}>
        <Text style={styles.subTitle}>Este ejercicio se lo realice utilizando react native, expo y firebase.</Text>
        <Text style={styles.subTitle}>Con este ejercicio se practico: extructura de projecto react, ruteo en react native, componentes basicos de react native, coneccion con firebase, configuracion de variables de entorno, estilos basicos, compilacion, entorno de desarrollo y generacion de apk.</Text>
      </View>
      <Text style={styles.text}>Tu UID es: {user.uid} </Text>
      <Text style={styles.textBottom}>*(Si queres deslogearte, presiona el icono arriba a la derecha.)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8eaf6',
    paddingTop: 50,
    paddingHorizontal: 12
  },
  row: {
    padding: 20,
    alignItems: 'flex-end',
    marginBottom: 24
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    paddingBottom: 20
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#000'
  },
  textBottom: {
    marginTop: 250,
    fontSize: 12,
    fontWeight: 'normal',
    color: 'gray',
    marginBottom: 0
  },
  textContainer: {
    borderWidth: 1,
    borderStyle: 'dashed',
    padding: 5,
    marginBottom: 20
  }
});