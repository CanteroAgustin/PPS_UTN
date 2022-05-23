import React, { useEffect, useState } from 'react';
import { Dimensions, Text, View, Modal, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { BarChart, Grid } from 'react-native-svg-charts'
import GraficoVacio from './GraficoVacio';
import { Defs, LinearGradient, Stop } from "react-native-svg";
const CosasFeasChart = ({ imagenes }) => {

  const [data, setData] = useState([]);
  const { height } = Dimensions.get('screen');
  const [foto, setFoto] = useState({});
  const [open, setOpen] = useState(null);
  const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7);

  useEffect(() => {
    const svgs = [];
    const dataTemp = [];
    const urls = [];
    if (imagenes.length > 0) {
      imagenes.forEach(imagen => {
        dataTemp.push(
          {
            value: imagen.likes,
            svg: {
              fill: randomColor(),
              onPress: () => (actualizar(imagen))
            },
          }
        );
        svgs.push({ fill: 'gray', onPress: () => actualizar(imagen) });
        urls.push(imagen.url);
      });
    }
    setData(dataTemp);
  }, [])

  const actualizar = (foto) => {
    setOpen(true);
    setFoto(foto);
  }

  const Gradient = () => (
    <Defs key={'gradient'}>
      <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
        <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'} />
        <Stop offset={'100%'} stopColor={'rgb(66, 194, 244)'} />
      </LinearGradient>
    </Defs>
  )

  return (
    <View style={{ height: height / 2.25 }}>
      <Text style={styles.title}>Estas son las cosas feas más votadas!!!</Text>
      {(imagenes.length === 0) && <GraficoVacio />}
      <View>
        <BarChart
          style={{ height: 200 }}
          data={data}
          gridMin={0}
          svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
          yAccessor={({ item }) => item.value}
          contentInset={{ top: 20, bottom: 20 }}
        >
          <Grid />
          <Gradient />
        </BarChart>
      </View>
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
    </View >
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
  photo: {
    width,
    height
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
  },
  textStyle: {
    padding: 5,
    fontSize: 16,
    color: 'blue',
    fontWeight: 'bold'
  },
});