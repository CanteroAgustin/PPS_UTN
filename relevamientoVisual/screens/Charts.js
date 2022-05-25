import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import CosasLindasChart from '../components/CosasLindasChart';
import CosasFeasChart from '../components/CosasFeasChart';
import Firebase from '../config/firebase';
import GraficoVacio from '../components/GraficoVacio';

const db = Firebase.firestore();
const Charts = ({ route }) => {
  const { tipo } = route.params;
  const [cosasLindas, setCosasLindas] = useState(undefined);
  const [cosasFeas, setCosasFeas] = useState(undefined);
  const [hasVotes, SetHasVotes] = useState(false);

  const searchVotes = imagenes => {
    let hasVotes = false;
    imagenes.forEach(imagen => {
      if (imagen.likes > 0) {
        hasVotes = true
      }
    });

    return hasVotes;
  }

  useEffect(() => {
    if (tipo == "linda") {
      db.collection('imageneslinda').onSnapshot((querySnapshot) => {
        const imagenes = [];
        querySnapshot.docs.forEach((doc) => {
          imagenes.push(doc.data());
        });
        setCosasLindas(imagenes);
        SetHasVotes(searchVotes(imagenes));
      })
    } else if ('fea') {
      db.collection('imagenesfea').onSnapshot((querySnapshot) => {
        const imagenes = [];
        querySnapshot.docs.forEach((doc) => {
          imagenes.push(doc.data());
        });
        setCosasFeas(imagenes);
        SetHasVotes(searchVotes(imagenes));
      })
    }
  }, [])
  return (
    <View>
      {cosasFeas && hasVotes && <CosasFeasChart imagenes={cosasFeas} />}
      {cosasLindas && hasVotes && <CosasLindasChart imagenes={cosasLindas} />}
      {!hasVotes && <GraficoVacio />}
    </View>
  )
}



export default Charts;
