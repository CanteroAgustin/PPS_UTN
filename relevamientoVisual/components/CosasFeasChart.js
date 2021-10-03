import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View, Modal, TouchableOpacity, Dimensions } from 'react-native';
import { PieChart } from 'react-native-svg-charts'
import GraficoVacio from '../components/GraficoVacio';

const CosasFeasChart = ({ imagenes }) => {

  const [open, setOpen] = useState(null);
  const [foto, setFoto] = useState({});
  const { width, height } = Dimensions.get('screen');
  const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7);

  const actualizar = (foto) => {
    setOpen(true);
    setFoto(foto);
  }
  const pieDatas = imagenes
    .filter((value) => value.likes > 0)
    .map((value, index) => ({
      value: value.likes,
      svg: {
        onPress: () => actualizar(value),
        fill: randomColor(),
      },

      key: value.id,
    }))

  return (
    <View style={{ height: height / 2.25 }}>
      <Text style={styles.title}>Estas son las cosas feas más votadas!!!</Text>
      {(imagenes.length === 0) && <GraficoVacio />}
      <View style={styles.container}>

        <PieChart
          style={{ height: 250, width: 250 }}
          outerRadius={'70%'}
          innerRadius={10}
          data={pieDatas}
        />
      </View >
      <Modal
        animationType='slide'
        transparent={false}
        visible={open}
      >
        <View >
          <Image style={styles.photo} source={{ uri: foto.url }} />
          <TouchableOpacity onPress={() => setOpen(false)} style={styles.btnCancel}>
            <Text style={styles.btnText}>X</Text>
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text style={styles.textStyle}>Autor: {foto.user}</Text>
            <Text style={styles.textStyle}>Fecha de cracion: {foto.fecha}</Text>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default CosasFeasChart;
const { width, height } = Dimensions.get('screen');
const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 28,
    color: 'blue',
    fontWeight: 'bold',
    padding: 5,
    paddingBottom: 10
  },
  container: {
    alignItems: 'center'
  },
  photo: {
    width,
    height
  },
  itemsContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    alignContent: 'center'
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textStyle: {
    padding: 5,
    fontSize: 16,
    color: 'blue',
    fontWeight: 'bold'
  },
  btnCancel: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'red',
    borderRadius: 5,
    top: 5,
    right: 5
  },
  btnText: {
    color: 'white',
    fontSize: 36,
  },
  textContainer: {
    flexDirection: 'column',
    position: 'absolute',
    bottom: 110,
    backgroundColor: 'white',
    opacity: 0.6,
    borderRadius: 10,
    alignSelf: 'center',
  }
});