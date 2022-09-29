import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image, Modal } from 'react-native';
import { Camera, Constants } from 'expo-camera';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Firebase from '../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import Spinner from 'react-native-loading-spinner-overlay';

const Camara = ({ route, navigation }) => {
  const { tipo } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [temPhotos, setTempPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [foto, setFoto] = useState(null);
  const [open, setOpen] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const camRef = useRef(null);

  const storage = Firebase.storage();
  const { user } = useContext(AuthenticatedUserContext);

  const db = Firebase.firestore();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    return () => {
      setIsLoading(false);
    };
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Acceso denegado</Text>;
  }

  const takePicture = async () => {
    if (camRef) {
      setIsLoading(true);
      const data = await camRef.current.takePictureAsync();
      setIsLoading(false);
      setFoto(data.uri);
      setOpen(true);
    }
  }

  const savePicture = async data => {
    const img = await fetch(foto);
    const blob = await img.blob();
    temPhotos.push(blob);
    setTempPhotos(temPhotos);
    console.log(data)
    console.log(foto)

    if (data == 'many') {
      setOpen(false);
    } else if (data == 'one') {
      setIsLoading(true);
      temPhotos.forEach((temPhoto, i) => {
        console.log("foto" + i)
        setTimeout(() => {
          // let randomNumber = Math.floor(Math.random() * 10000) + 1;
          const now = formatDate(new Date());
          console.log("now: ", now)
          const path = 'images/' + tipo + '/' + user.email + '-' + now;
          console.log("path: ", path)
          const storageRef = storage.ref();
          const spaceRef = storageRef.child(path);
          spaceRef.put(temPhoto).then(function (snapshot) {
            snapshot.ref.getDownloadURL().then(url => {
              db.collection('imagenes' + tipo).add({
                user: user.email,
                url,
                fecha: now,
                likes: 0,
                id: user.uid + now
              });
              db.collection('imagenes').add({
                user: user.email,
                url,
                fecha: now,
                likes: 0,
                id: user.uid + now
              });
              navigation.replace('Listados');
            });
          });
        }, i * 1000);
      });
    }
  }

  function dateComponentPad(value) {
    var format = String(value);

    return format.length < 2 ? '0' + format : format;
  }

  function formatDate(date) {
    var datePart = [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(dateComponentPad);
    var timePart = [date.getHours(), date.getMinutes(), date.getSeconds()].map(dateComponentPad);

    return datePart.join('-') + ' ' + timePart.join(':');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Spinner
        visible={isLoading}
        textContent={'Cargando...'}
        textStyle={StyleSheet.flatten(styles.spinnerTextStyle)}
      />
      <Camera style={styles.camera} type={type} ref={camRef} ratio='16:9'>
        <TouchableOpacity style={styles.btnPhoto} onPress={takePicture}>
          <Ionicons name="camera" size={40} color="black" />
        </TouchableOpacity>
        {
          foto &&
          <Modal
            animationType='slide'
            transparent={false}
            visible={open}
            backgroundColor='#e8eaf6'
          >
            <View style={styles.imgContainer}>
              <View style={styles.header}>
                <Image style={styles.headerImg} source={require('../assets/emoji.png')} />
                <Text style={styles.titulo}>Guau, excelente toma.</Text>
                <Text style={styles.subtitulo}>¿Que te gustaría hacer?</Text>
              </View>
              <Image style={styles.photo} source={{ uri: foto }} />
              <View style={styles.btnContainer}>
                <TouchableOpacity onPress={() => setOpen(false)} style={styles.btnCancel}>
                  <MaterialIcons name="autorenew" size={60} color="black" />
                  <Text style={styles.btnText} >Sacar de nuevo</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { savePicture('many') }} style={styles.btnOther}>
                  <MaterialIcons name="backup" size={60} color="black" />
                  <Text style={styles.btnText}>Sacar otra</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { savePicture('one') }} style={styles.btnSave}>
                  <MaterialIcons name="backup" size={60} color="black" />
                  <Text style={styles.btnText}>Guardar y finalizar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        }
      </Camera>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    bottom: 15
  },
  headerImg: {
    width: 300,
    height: 200,
    marginTop: 50
  },
  titulo: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#BAA539'
  },
  subtitulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#BAA539'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  camera: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    left: 20,
    backgroundColor: 'white',
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    bottom: 20,
    paddingVertical: 5
  },
  btnPhoto: {
    position: 'absolute',
    backgroundColor: 'white',
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 30,
    bottom: 20,
    paddingVertical: 5,
  },
  photo: {
    width: '95%',
    height: 350,
    marginLeft: 10,
    marginRight: 10,
  },
  imgContainer: {
    justifyContent: 'center',
    backgroundColor: '#e8eaf6',
  },
  btnCancel: {
    backgroundColor: 'papayawhip',
    height: 80,
    borderWidth: 1,
    width: 121.6,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomStartRadius: 10,
    marginBottom: 30
  },
  btnOther: {
    backgroundColor: 'papayawhip',
    height: 80,
    borderWidth: 1,
    width: 121.6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  },
  btnSave: {
    backgroundColor: 'papayawhip',
    height: 80,
    borderWidth: 1,
    width: 121.6,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 10,
    marginBottom: 30
  },
  btnContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
  },
  btnText: {
    fontSize: 10
  }
});

export default Camara;