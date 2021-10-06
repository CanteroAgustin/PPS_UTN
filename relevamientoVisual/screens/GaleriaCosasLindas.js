import React, { useContext, useEffect, useState } from 'react';
import { Animated, StatusBar, View, Image, StyleSheet, Dimensions, TouchableOpacity, ImageBackground, Text } from 'react-native';
import Firebase from '../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import { AntDesign } from '@expo/vector-icons';

export default function GaleriaCosasLindas() {

  const db = Firebase.firestore();
  const [fotosLindas, setFotosLindas] = useState();
  const { width, height } = Dimensions.get('screen');
  const { user, setUser } = useContext(AuthenticatedUserContext);

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

    db.collection('imageneslinda').onSnapshot(async (querySnapshot) => {
      const datos = [];
      await querySnapshot.docs.forEach((doc) => {
        datos.push(doc.data());
      });
      if (datos.length > 0) {
        setFotosLindas(datos);
      }
    })
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      {!fotosLindas && <ImageBackground style={{ width, height: 800, marginTop: 50 }} source={require('../assets/nofoto.jpg')} resizeMode="cover" />}
      <Animated.FlatList
        data={fotosLindas}
        pagingEnabled
        keyStractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <View style={{ width, height: height - 90 }}>
              {(item.users && item.users.includes(user.email)) &&
                <TouchableOpacity style={{ zIndex: 99999, position: 'absolute', top: 20, left: 350 }} onPress={() => { handleDisLike(item.id) }}>
                  <AntDesign name={'heart'} size={40} color="red" />
                </TouchableOpacity>}
              {(!item.users || !item.users.includes(user.email)) &&
                <TouchableOpacity style={{ zIndex: 99999, position: 'absolute', top: 20, left: 350 }} onPress={() => { handleLike(item.id) }}>
                  <AntDesign name={'hearto'} size={40} color="red" />
                </TouchableOpacity>}
              <Image
                source={{ uri: item.url }}
                style={{ flex: 1, resizeMode: 'cover' }}
              />
              <View style={styles.textContainer}>
                <Text style={styles.textStyle}>Autor: {item.user}</Text>
                <Text style={styles.textStyle}>Fecha de creación: {item.fecha}</Text>
              </View>
            </View>
          )
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flexDirection: 'column',
    position: 'absolute',
    top: 0,
    left: 0,
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
  }
});