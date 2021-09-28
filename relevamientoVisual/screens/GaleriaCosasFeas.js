import React, { useEffect, useState } from 'react';
import { Animated, StatusBar, View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Firebase from '../config/firebase';
import { AntDesign } from '@expo/vector-icons';

export default function GaleriaCosasFeas() {

  const db = Firebase.firestore();
  const [fotosFeas, setFotosFeas] = useState();
  const { width, height } = Dimensions.get('screen');
  const iconName = 'hearto';
  const handleLike = (idImg) => {
    setIconName('heart');
    db.collection("usuarios")
      .where("email", "==", user.email)
      .get()
      .then(function (querySnapshot) {
        user.imgLiked = idImg;
        setUser({ ...user });
        querySnapshot.forEach((doc) => {
          doc.ref.update({ imgLiked: user.imgLiked });
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
      setFotosFeas(datos);
    })
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.FlatList
        data={fotosFeas}
        pagingEnabled
        keyStractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <View style={{ width, height: height - 90 }}>
              <TouchableOpacity style={{ zIndex: 99999, position: 'absolute', top: 20, left: 350 }} onPress={() => { handleLike(item.id) }}>
                <AntDesign name={iconName} size={40} color="red" />
              </TouchableOpacity>
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