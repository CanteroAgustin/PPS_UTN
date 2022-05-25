import React from 'react';
import { StyleSheet, View } from 'react-native';
import BotonCosas from '../components/BotonCosas';

export default function HomeScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <BotonCosas
          imgSrc={require('../assets/casalinda.png')} disable={false}
          onPress={() => {
            navigation.navigate('Galeria cosas lindas')
          }}
        />
        <BotonCosas
          imgSrc={require('../assets/casafeas.png')} disable={false}
          onPress={() => {
            navigation.navigate('Galeria cosas feas')
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
  },
  row: {
    padding: 20,
    alignItems: 'flex-end',
    marginBottom: 24
  },
  menu: {
    marginLeft: 2,
    marginRight: 2
  }
});