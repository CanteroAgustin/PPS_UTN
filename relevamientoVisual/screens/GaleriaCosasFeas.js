import React, { useContext, useEffect, useState } from 'react';
import { Animated, StatusBar, View, Image, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import Firebase from '../config/firebase';
import { AntDesign } from '@expo/vector-icons';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';

export default function GaleriaCosasFeas() {

  const db = Firebase.firestore();
  const [fotosFeas, setFotosFeas] = useState();
  const { width, height } = Dimensions.get('screen');
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const handleLike = (idImg) => {
    db.collection("usuarios")
      .where("email", "==", user.email)
      .get()
      .then(function (querySnapshot) {
        user.imgFeaLiked = idImg;
        setUser({ ...user });
        querySnapshot.forEach((doc) => {
          doc.ref.update({ imgFeaLiked: user.imgFeaLiked });
        });
      });
    db.collection("imagenesfea")
      .where("id", "==", idImg)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
          const { id, likes } = doc.data();
          if (id === idImg) {
            doc.ref.update({ 'likes': likes + 1 });
          }
        });
      });
  }

  useEffect(() => {
    db.collection('imagenesfea').onSnapshot(async (querySnapshot) => {
      const datos = [];
      await querySnapshot.docs.forEach((doc) => {
        datos.push(doc.data());
      });
      if (datos.length > 0) {
        setFotosFeas(datos);
      }
    })
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      {!fotosFeas && <ImageBackground style={{ width: 390, height: 800, marginTop: 50 }} source={require('../assets/nohayfotofea.jpg')} resizeMode="cover" />}
      <Animated.FlatList
        data={fotosFeas}
        pagingEnabled
        keyStractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <View style={{ width, height: height - 90 }}>
              {(user.imgFeaLiked && user.imgFeaLiked === item.id) &&
                <TouchableOpacity style={{ zIndex: 99999, position: 'absolute', top: 20, left: 350 }}>
                  <AntDesign name={'heart'} size={40} color="red" />
                </TouchableOpacity>}
              {(!user.imgFeaLiked) &&
                <TouchableOpacity style={{ zIndex: 99999, position: 'absolute', top: 20, left: 350 }} onPress={() => { handleLike(item.id) }}>
                  <AntDesign name={'hearto'} size={40} color="red" />
                </TouchableOpacity>}
              <Image
                source={{ uri: item.url }}
                style={{ flex: 1, resizeMode: 'cover' }}
              />
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
});