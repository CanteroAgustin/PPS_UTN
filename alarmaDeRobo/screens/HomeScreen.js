import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';

import { IconButton, InputField } from '../components';
import Firebase from '../config/firebase';
import { Gyroscope } from 'expo-sensors';
import { Audio } from 'expo-av';
import { Camera } from 'expo-camera';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';

const auth = Firebase.auth();
const db = Firebase.firestore();

export default function HomeScreen() {

  const { user } = useContext(AuthenticatedUserContext);
  const [hasPermission, setHasPermission] = useState(null);
  const [pass, setPass] = useState("");
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [alert, setAlert] = useState(false);
  const [passInput, setPassInput] = useState(false);
  let sirenImg = alert ? require('../assets/1.gif') : require('../assets/sirenOff.png');
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [sound, setSound] = React.useState();
  const [subscription, setSubscription] = useState(null);
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  const _subscribe = () => {
    setSubscription(
      Gyroscope.addListener(gyroscopeData => {
        console.log("Alert en listener: ", alert)

        if (gyroscopeData.z < -1) {
          console.log("derecha: ", gyroscopeData)
          playSound('der')
        }
        if (gyroscopeData.z > 1) {
          console.log("izquierda ", gyroscopeData)
          playSound('izq')
        }
        if (gyroscopeData.x > 1) {
          console.log("up ", gyroscopeData)
          playSound('up')
        }
        if (gyroscopeData.x < -1) {
          console.log("down ", gyroscopeData)
          setFlash(Camera.Constants.FlashMode.torch)
          setTimeout(() => {
            setFlash(Camera.Constants.FlashMode.off)
          }, 5000)
        }

        setData(gyroscopeData);

      }));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    Gyroscope.setUpdateInterval(100);
    if (alert) {
      _subscribe();
    } else {
      _unsubscribe();
    }
    return () => _unsubscribe();
  }, [alert]);

  useEffect(() => {

    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound])

  const { x, y, z } = data;

  async function playSound(audio) {
    if (audio == 'der') {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/audios/der.m4a')
      );
      setSound(sound);
      await sound.playAsync();
    }
    if (audio == 'izq') {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/audios/izq.m4a')
      );
      setSound(sound);
      await sound.playAsync();
    }
    if (audio == 'up') {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/audios/upalarm.m4a')
      );
      setSound(sound);
      await sound.playAsync();
    }
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.containerApp}>
      <StatusBar style='dark-content' />
      <View style={styles.row}>
        <IconButton
          name='logout'
          size={24}
          color='#757ce8'
          onPress={handleSignOut}
        />
      </View>
      <View style={styles.alarmContainer}>
        <TouchableOpacity
          onPress={() => {
            if (!alert) {
              setAlert(true);
            } else {
              setPassInput(true)
            }
          }}
        >
          <Image
            style={alert ? styles.alarma : styles.alarmaOff}
            source={sirenImg}
          />
        </TouchableOpacity>
      </View>
      {(passInput) ?
        <InputField
          inputStyle={{
            fontSize: 14,
          }}
          containerStyle={{
            backgroundColor: '#f0e7c5',
            marginTop: 20
          }}
          placeholder='Enter password'
          autoCapitalize='none'
          autoCorrect={false}
          textContentType='password'
          onChangeText={async text => {
            console.log("user:", user.uid);
            db.collection("usuarios").doc(user.uid)
              .onSnapshot((doc) => {
                console.log("Current data: ", doc.data());
                setPass(doc.data().password)
              });
            if (pass === text) {
              setAlert(false);
              setPassInput(false);
            }
            console.log("text: ", text)
            console.log("pass: ", pass)
          }}
        /> : null}
      <View style={styles.container}>
        <Text style={styles.text}>Gyroscope:</Text>
        <Text style={styles.text}>
          x: {round(x)} y: {round(y)} z: {round(z)}
        </Text>
      </View>
      <View style={styles.container}>
        <Camera style={styles.camera} type={type} flashMode={flash}>

        </Camera>
      </View>
    </View>
  );
}

function round(n) {
  if (!n) {
    return 0;
  }
  return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 0.001,
    width: 0.3,
  },
  containerApp: {
    flex: 1,
    backgroundColor: '#e8eaf6',
    paddingTop: 50,
    paddingHorizontal: 12
  },
  row: {
    padding: 20,
    alignItems: 'flex-end',
    marginBottom: 24
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    paddingBottom: 20
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#000'
  },
  textBottom: {
    marginTop: 250,
    fontSize: 12,
    fontWeight: 'normal',
    color: 'gray',
    marginBottom: 0
  },
  textContainer: {
    borderWidth: 1,
    borderStyle: 'dashed',
    padding: 5,
    marginBottom: 20
  },
  alarma: {
    height: 205,
    width: 162
  },
  alarmaOff: {
    height: 178,
    width: 132
  },
  alarmContainer: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  text: {
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
});