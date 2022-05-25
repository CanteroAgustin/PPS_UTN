import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const GraficoVacio = () => {
  return (
    <View style={styles.base}>
      <AntDesign style={{ paddingBottom: 40, paddingTop: 80 }} name='piechart' size={200} color='green' />
      <Text style={{ fontSize: 38, textAlign: 'center', color: 'blue' }}>Aun no hay gráficos, para mostrar.</Text>
      <Text style={{ fontSize: 38, textAlign: 'center', color: 'blue' }}>Busca las imagenes que mas te gusten en la galeria y votalas.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#e8eaf6'
  }
});

export default GraficoVacio;