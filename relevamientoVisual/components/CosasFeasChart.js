import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-svg-charts'

const CosasFeasChart = ({ imagenes }) => {
  const [pieData, setPieData] = useState([]);
  const [imgSrc, setImgSrc] = useState(null);
  const colours = ['purple', 'green', 'blue', 'purple'];
  useEffect(() => {
    imagenes.sort(function (a, b) {
      return a.likes - b.likes;
    });
    let count = 0;

    const data = [];
    const urls = [];

    while (count < 3) {
      const arc = count === 2 ? { outerRadius: '110%', cornerRadius: 5, } : {};
      count++;

      urls.push(imagenes[count].url);

      data.push(
        {
          key: count,
          value: imagenes[count].likes,
          svg: { fill: colours[count] },
          arc
        }
      )
    }
    count = 0;
    setPieData(data);
    setImgSrc(urls);
  }, [])

  return (
    <>
      <Text style={styles.title}>Las fotos de las cosas feas más votadas!!!</Text>
      <View style={styles.container}>

        <PieChart
          style={{ height: 250, width: 250 }}
          outerRadius={'70%'}
          innerRadius={10}
          data={pieData}
        />
        <View style={styles.itemsContainer}>
          <View style={styles.itemContainer}>
            <View style={{ borderRadius: 50, margin: 5, width: 50, height: 50, backgroundColor: colours[1] }}>
            </View>
            {imgSrc && <Image
              style={styles.photo}
              source={{ uri: imgSrc[0] }}
            />}
          </View>
          <View style={styles.itemContainer}>
            <View style={{ borderRadius: 50, margin: 5, width: 50, height: 50, backgroundColor: colours[2] }}>
            </View>
            {imgSrc && <Image
              style={styles.photo}
              source={{ uri: imgSrc[1] }}
            />}
          </View>
          <View style={styles.itemContainer}>
            <View style={{ borderRadius: 50, margin: 5, width: 50, height: 50, backgroundColor: colours[3] }}>
            </View>
            {imgSrc && <Image
              style={styles.photo}
              source={{ uri: imgSrc[2] }}
            />}
          </View>
        </View>
      </View >
    </>
  )
}

export default CosasFeasChart;

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 28,
    color: 'blue',
    fontWeight: 'bold',
    paddingTop: 5,
    paddingBottom: 10
  },
  container: {
    flexDirection: 'row'
  },
  photo: {
    width: 75,
    height: 75,
    margin: 5
  },
  itemsContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    alignContent: 'center'
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});