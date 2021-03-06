import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, Modal, TouchableOpacity, Dimensions } from 'react-native';
import { PieChart } from 'react-native-svg-charts'
import GraficoVacio from './GraficoVacio';

const CosasLindasChart = ({ imagenes }) => {

  const [open, setOpen] = useState(null);
  const [foto, setFoto] = useState({});
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
    <View style={{ height: '100%', backgroundColor: '#e8eaf6' }}>
      <Text style={styles.title}>Estas son las cosas lindas más votadas!!!</Text>
      {(imagenes.length === 0) && <GraficoVacio />}
      <View style={styles.container}>

        <PieChart
          style={{ height: 350, width: 350 }}
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
            <Text style={styles.textStyle}>Fecha de creación: {foto.fecha}</Text>
            <Text style={styles.textStyle}>Likes: {foto.likes}</Text>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default CosasLindasChart;
const { width, height } = Dimensions.get('screen');
const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 48,
    color: 'blue',
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 20
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