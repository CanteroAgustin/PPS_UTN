import React, { useContext, useEffect, useState } from 'react';
import { Animated, StatusBar, View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Firebase from '../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import { AntDesign } from '@expo/vector-icons';

export default function GaleriaCosasLindas() {

  const db = Firebase.firestore();
  const [fotosLindas, setFotosLindas] = useState();
  const { width, height } = Dimensions.get('screen');
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [iconName, setIconName] = useState('hearto');
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
    db.collection("imageneslinda")
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

    db.collection('imageneslinda').onSnapshot(async (querySnapshot) => {
      const datos = [];
      await querySnapshot.docs.forEach((doc) => {
        datos.push(doc.data());
      });
      setFotosLindas(datos);
    })
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.FlatList
        data={fotosLindas}
        pagingEnabled
        keyStractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <View style={{ width, height: height - 90 }}>
              {(!user.imgLiked || user.imgLiked === item.id) &&
                <TouchableOpacity style={{ zIndex: 99999, position: 'absolute', top: 20, left: 350 }} onPress={() => { handleLike(item.id) }}>
                  <AntDesign name={iconName} size={40} color="red" />
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