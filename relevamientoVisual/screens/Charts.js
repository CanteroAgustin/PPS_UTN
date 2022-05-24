import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import CosasLindasChart from '../components/CosasLindasChart';
import CosasFeasChart from '../components/CosasFeasChart';
import Firebase from '../config/firebase';
const db = Firebase.firestore();
const Charts = ({ route }) => {
  const { tipo } = route.params;
  const [cosasLindas, setCosasLindas] = useState(undefined);
  const [cosasFeas, setCosasFeas] = useState(undefined);


  useEffect(() => {
    if (tipo == "linda") {
      db.collection('imageneslinda').onSnapshot((querySnapshot) => {
        const imagenes = [];
        querySnapshot.docs.forEach((doc) => {
          imagenes.push(doc.data());
        });
        setCosasLindas(imagenes);
      })
    } else if ('fea') {
      db.collection('imagenesfea').onSnapshot((querySnapshot) => {
        const imagenes = [];
        querySnapshot.docs.forEach((doc) => {
          imagenes.push(doc.data());
        });
        setCosasFeas(imagenes);
      })
    }
  }, [])
  return (
    <View>
      {cosasFeas && <CosasFeasChart imagenes={cosasFeas} />}
      {cosasLindas && <CosasLindasChart imagenes={cosasLindas} />}
    </View>
  )
}

export default Charts;
