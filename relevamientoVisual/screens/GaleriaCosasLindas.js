import React, { useContext, useEffect, useState } from 'react';
import { Animated, StatusBar, View, Image, StyleSheet, Dimensions, TouchableOpacity, ImageBackground, Text } from 'react-native';
import Firebase from '../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import { AntDesign } from '@expo/vector-icons';
import { Button } from '../components';
import Spinner from 'react-native-loading-spinner-overlay';

export default function GaleriaCosasLindas({ navigation }) {

  const db = Firebase.firestore();
  const [fotosLindas, setFotosLindas] = useState();
  const { width, height } = Dimensions.get('screen');
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = (idImg) => {
    db.collection("imageneslinda")
      .where("id", "==", idImg)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
          const { likes, users } = doc.data();
          let usuarios = [];
          if (users) {
            users.push(user.email);
            doc.ref.update({ 'likes': likes + 1, users: users });
          } else {
            usuarios.push(user.email);
            doc.ref.update({ 'likes': likes + 1, users: usuarios });
          }
        });
      });
  }

  const handleDisLike = (idImg) => {
    db.collection("imageneslinda")
      .where("id", "==", idImg)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
          const { id, likes, users } = doc.data();
          users.forEach((element, index) => {
            if (element === user.email) {
              users.splice(index, 1);
            }
          });
          doc.ref.update({ 'likes': likes - 1, users });
        });
      });
  }

  useEffect(() => {
    setIsLoading(true);
    db.collection('imageneslinda').onSnapshot(async (querySnapshot) => {
      const datos = [];
      await querySnapshot.docs.forEach((doc) => {
        datos.push(doc.data());
      });
      if (datos.length > 0) {
        datos.sort((a, b) => {
          return new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
        })
        setFotosLindas(datos);
        setTimeout(() => {
          setIsLoading(false);
        }, 1)
      } else {
        setIsLoading(false);
      }
    })
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Spinner
        visible={isLoading}
        textContent={'Cargando...'}
        textStyle={StyleSheet.flatten(styles.spinnerTextStyle)}
      />
      {!fotosLindas && !isLoading &&
        < View >
          <Text style={styles.textoSinFoto}>
            Aun no hay fotos para mostrar, podes ser el primero en subir una.
          </Text>
          <ImageBackground style={{ width, height: 400, marginTop: 50 }} source={require('../assets/casalinda.png')} resizeMode="cover" />
        </View>
      }
      {!isLoading && <Animated.FlatList
        data={fotosLindas}
        pagingEnabled
        keyStractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <View style={{ width, height: height - 290 }}>
              {(item.users && item.users.includes(user.email)) &&
                <TouchableOpacity style={{ zIndex: 99999, position: 'absolute', top: 20, left: 330 }} onPress={() => { handleDisLike(item.id) }}>
                  <AntDesign name={'heart'} size={40} color="red" />
                </TouchableOpacity>}
              {(!item.users || !item.users.includes(user.email)) &&
                <TouchableOpacity style={{ zIndex: 99999, position: 'absolute', top: 20, left: 330 }} onPress={() => { handleLike(item.id) }}>
                  <AntDesign name={'hearto'} size={40} color="red" />
                </TouchableOpacity>}
              <Image
                source={{ uri: item.url }}
                style={{ flex: 1, resizeMode: 'cover', borderWidth: 1, borderColor: 'red', borderRadius: 5, margin: 5 }}
              />
              <View style={styles.textContainer}>
                <Text style={styles.textStyle}>Autor: {item.user}</Text>
                <Text style={styles.textStyle}>Fecha de creaci??n: {item.fecha}</Text>
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
        fotosLindas && !isLoading && <Button
          onPress={() => {
            navigation.navigate('Graficos', { tipo: 'linda' });
          }}
          title='Ver gr??fico'
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
      {!isLoading && <Button
        onPress={() => {
          navigation.navigate('Mis fotos')
        }}
        title='Ver mis fotos'
        backgroundColor='#fff'
        titleSize={40}
        titleColor='white'
        containerStyle={{
          borderColor: '#000000',
          borderWidth: 1,
          borderRadius: 5,
          marginBottom: 4,
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
  }
});