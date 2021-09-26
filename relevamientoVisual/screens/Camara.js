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
  const [type, setType] = useState(Camera.Constants.Type.back);
  const camRef = useRef(null);
  const [foto, setFoto] = useState(null);
  const [open, setOpen] = useState(null);
  const storage = Firebase.storage();
  const { user } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(false);
  const db = Firebase.firestore();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
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
  const savePicture = async () => {
    const img = await fetch(foto);
    const now = formatDate(new Date());
    const path = 'images/' + tipo + '/' + user.email + '-' + now;
    const blob = await img.blob();
    const storageRef = storage.ref();
    const spaceRef = storageRef.child(path);
    setIsLoading(true);
    spaceRef.put(blob).then(function (snapshot) {
      snapshot.ref.getDownloadURL().then(url => {
        db.collection('imagenes' + tipo).add({
          user: user.uid,
          url,
          fecha: now,
          likes: 0,
          id: user.uid + now
        });
      });
      setIsLoading(false);
      navigation.replace('Home');
    });
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
      <Camera style={styles.camera} type={type} ref={camRef}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}>
          <Ionicons name="ios-camera-reverse" size={40} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnPhoto} onPress={takePicture}>
          <Ionicons name="camera" size={40} color="black" />
        </TouchableOpacity>
        {
          foto &&
          <Modal
            animationType='slide'
            transparent={false}
            visible={open}
          >
            <View style={styles.imgContainer}>
              <View style={styles.header}>
                <Image style={styles.headerImg} source={require('../assets/emo3.jpg')} />
                <Text style={styles.titulo}>Wow, excelente toma.</Text>
                <Text style={styles.subtitulo}>¿Que te gustaria hacer?</Text>
              </View>
              <Image style={styles.photo} source={{ uri: foto }} />
              <View style={styles.btnContainer}>
                <TouchableOpacity onPress={() => setOpen(false)} style={styles.btnCancel}>

                  <MaterialIcons name="autorenew" size={60} color="black" />
                  <Text style={styles.btnText} >Sacar de nuevo</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={savePicture} style={styles.btnSave}>

                  <MaterialIcons name="backup" size={60} color="black" />
                  <Text style={styles.btnText}>Guardar</Text>
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
    bottom: 40
  },
  headerImg: {
    width: 300,
    height: 200,
    marginTop: 40
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
    backgroundColor: 'yellow',
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    bottom: 20,
    paddingVertical: 5
  },
  btnPhoto: {
    position: 'absolute',
    right: 20,
    backgroundColor: 'yellow',
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    bottom: 20,
    paddingVertical: 5,
  },
  photo: {
    width: '100%',
    height: 350
  },
  imgContainer: {
    justifyContent: 'center',
    margin: 10
  },
  btnCancel: {
    backgroundColor: 'yellow',
    height: 80,
    borderWidth: 1,
    width: 195.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomStartRadius: 10
  },
  btnSave: {
    backgroundColor: 'yellow',
    height: 80,
    borderWidth: 1,
    width: 195.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 10
  },
  btnContainer: {
    flexDirection: 'row'
  },
  btnText: {
    fontSize: 10
  }
});

export default Camara;