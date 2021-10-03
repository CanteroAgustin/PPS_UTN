import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dimensions, Text, View } from 'react-native';
import { BarChart, Grid } from 'react-native-svg-charts'
import GraficoVacio from './GraficoVacio';

const CosasLindasChart = ({ imagenes }) => {

  const [data, setData] = useState([]);
  const [imgSrc, setImgSrc] = useState(null);
  const fill = 'rgb(134, 65, 244)';
  const { width, height } = Dimensions.get('screen');

  useEffect(() => {
    if (imagenes) {
      imagenes.sort(function (a, b) {
        return a.likes - b.likes;
      });
      let count = 0;

      const dataTemp = [];
      const urls = [];

      while (count < 3) {
        count++;

        if (imagenes[count]) {
          urls.push(imagenes[count].url);
          dataTemp.push(imagenes[count].likes);
          console.log(imagenes[count]);
        }
      }
      count = 0;
      setData(dataTemp);
      setImgSrc(urls);
    }

  }, [])

  return (
    <View style={{ height: height / 2.25 }}>
      <Text style={styles.title}>Estas son las cosas lindas más votadas!!!</Text>
      {(imagenes.length === 0) && <GraficoVacio />}
      <View>
        <BarChart style={{ height: 200 }} data={data} svg={{ fill }} contentInset={{ top: 30, bottom: 30 }}>
          <Grid />
        </BarChart>
      </View>
    </View>
  )
}

export default CosasLindasChart;

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 28,
    color: 'blue',
    fontWeight: 'bold',
    padding: 5,
    paddingBottom: 10
  }
});