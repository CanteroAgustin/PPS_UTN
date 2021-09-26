import React, { useEffect, useState } from 'react';
import { Animated, StatusBar, View, Image, StyleSheet, Dimensions } from 'react-native';
import Firebase from '../config/firebase';

export default function GaleriaCosasLindas() {

  const db = Firebase.firestore();
  const [fotosLindas, setFotosLindas] = useState();
  const { width, height } = Dimensions.get('screen');

  useEffect(() => {
    db.collection('imageneslinda').onSnapshot((querySnapshot) => {
      const datos = [];
      querySnapshot.docs.forEach((doc) => {
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
            <View style={{ width, height: height - 146 }}>
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