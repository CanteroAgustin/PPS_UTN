import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const GraficoVacio = () => {
  return (
    <View style={styles.base}>
      <AntDesign style={{ padding: 20 }} name='piechart' size={50} color='black' />
      <Text style={{ fontSize: 24 }}>Aun no hay gráficos.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default GraficoVacio;