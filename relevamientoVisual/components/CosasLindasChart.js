import React, { useEffect, useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import {
  BarChart, StackedBarChart
} from "react-native-chart-kit";

const CosasLindasChart = (props) => {

  const [labels, setLabels] = useState([]);
  const [dataSet, setDataSet] = useState([]);
  const { width } = Dimensions.get('screen');
  useEffect(() => {
    if (props.imagenes) {
      setLabels(props.imagenes.map(img => (img.url)));
      setDataSet(props.imagenes.map(img => (img.likes)));
    }
  }, [])

  const dataBar = {
    labels: labels,
    datasets: [
      {
        data: dataSet || []
      }
    ]
  };

  const data = {
    labels: labels,
    data: [
      dataSet
    ],
    barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"]
  };

  return (

    <View>
      <StackedBarChart
        data={data}
        width={width}
        height={220}
        chartConfig={chartConfig}
        segments={3}
      />
      {/* <BarChart
        data={dataBar}
        width={Dimensions.get("window").width}
        height={220}
        chartConfig={chartConfig}
        segments={3}
      /> */}
    </View>
  )
}

export default CosasLindasChart;

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientTo: "#08130D",
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  useShadowColorFromDataset: false, // optional
  decimalPlaces: 0,
};