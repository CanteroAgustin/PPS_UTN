import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import CosasFeasChart from '../components/CosasFeasChart';
import CosasLindasChart from '../components/CosasLindasChart';
import Firebase from '../config/firebase';
const db = Firebase.firestore();
const Charts = () => {
  const [cosasLindas, setCosasLindas] = useState(undefined);
  const [cosasFeas, setCosasFeas] = useState(undefined);


  useEffect(() => {
    db.collection('imageneslinda').onSnapshot((querySnapshot) => {
      const imagenes = [];
      querySnapshot.docs.forEach((doc) => {
        imagenes.push(doc.data());
      });
      setCosasLindas(imagenes);
    })
    db.collection('imagenesfea').onSnapshot((querySnapshot) => {
      const imagenes = [];
      querySnapshot.docs.forEach((doc) => {
        imagenes.push(doc.data());
      });
      setCosasFeas(imagenes);
    })
  }, [])
  return (
    <View style={{ paddingTop: 50 }}>
      {cosasFeas && <CosasFeasChart imagenes={cosasFeas} />}
      {cosasLindas && <CosasLindasChart imagenes={cosasLindas} />}
    </View>
  )
}

export default Charts;
