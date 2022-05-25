import React, { useState, useContext, useEffect } from 'react';

import Firebase from '../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import { Image, View, StyleSheet, StatusBar, Text, ImageBackground, Dimensions, Animated } from 'react-native';
import { Button } from '../components';
import Spinner from 'react-native-loading-spinner-overlay';

export default function Galeria({ navigation }) {

  const db = Firebase.firestore();
  const [isLoading, setIsLoading] = useState(false);
  const [fotos, setFotos] = useState();
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const { width, height } = Dimensions.get('screen');

  useEffect(() => {
    setIsLoading(true);
    db.collection("imagenes").where("user", "==", user.email)
      .get()
      .then(async (querySnapshot) => {
        const datos = [];
        await querySnapshot.docs.forEach((doc) => {
          datos.push(doc.data());
        });
        if (datos.length > 0) {
          datos.sort((a, b) => {
            return new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
          })
          setFotos(datos);
          setTimeout(() => {
            setIsLoading(false);
          }, 1)
        } else {
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

  }, [])

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Spinner
        visible={isLoading}
        textContent={'Cargando...'}
        textStyle={StyleSheet.flatten(styles.spinnerTextStyle)}
      />
      {!fotos && !isLoading &&
        < View >
          <Text style={styles.textoSinFoto}>
            Aun no sacaste ninguna foto, es un buen momento para hacerlo.
          </Text>
          <ImageBackground style={{ width, height: 400, marginTop: 50 }} source={require('../assets/casalinda.png')} resizeMode="cover" />
        </View>
      }
      {!isLoading && <Animated.FlatList
        data={fotos}
        pagingEnabled
        keyStractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <View style={{ width, height: height - 235 }}>
              <Image
                source={{ uri: item.url }}
                style={{ flex: 1, resizeMode: 'cover', borderWidth: 1, borderColor: 'red', borderRadius: 5, margin: 5 }}
              />
              <View style={styles.textContainer}>
                <Text style={styles.textStyle}>Fecha de creación: {item.fecha}</Text>
              </View>
            </View>
          )
        }}
      />}
      {!isLoading && <Button
        onPress={() => {
          navigation.navigate('Camara', { tipo: 'linda' });
        }}
        title='Tomar foto'
        backgroundColor='#fff'
        titleSize={40}
        titleColor='white'
        containerStyle={{
          borderColor: '#000000',
          borderWidth: 1,
          borderRadius: 5,
          marginTop: 2,
          marginBottom: 2,
          backgroundColor: '#2979ff',
          height: 50,
          width: '97%'
        }}
      />}
      {
        fotos && !isLoading && <Button
          onPress={() => {
            navigation.navigate('Graficos', { tipo: 'linda' });
          }}
          title='Ver gráfico'
          backgroundColor='#fff'
          titleSize={40}
          titleColor='white'
          containerStyle={{
            borderColor: '#000000',
            borderWidth: 1,
            borderRadius: 5,
            marginBottom: 2,
            backgroundColor: '#2979ff',
            height: 50,
            width: '97%'
          }}
        />
      }
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8eaf6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flexDirection: 'column',
    position: 'absolute',
    top: 5,
    left: 5,
    margin: 5,
    backgroundColor: 'white',
    opacity: 0.5,
    borderRadius: 10,
    alignSelf: 'center',
  },
  textStyle: {
    padding: 5,
    fontSize: 16,
    color: 'blue',
    fontWeight: 'bold'
  },
  textoSinFoto: {
    textAlign: 'center',
    color: '#6fa8dc',
    fontSize: 30,
    fontWeight: 'bold',
    top: 10
  },
  spinnerTextStyle: {
    color: '#fff',
  }
});