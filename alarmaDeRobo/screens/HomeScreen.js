import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, Vibration } from 'react-native';

import { IconButton, InputField } from '../components';
import Firebase from '../config/firebase';
import { Gyroscope } from 'expo-sensors';
import { Audio } from 'expo-av';
import { Camera } from 'expo-camera';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import { Card } from 'react-native-paper';

const auth = Firebase.auth();
const db = Firebase.firestore();

export default function HomeScreen() {

  const { user } = useContext(AuthenticatedUserContext);
  const [hasPermission, setHasPermission] = useState(null);
  const [pass, setPass] = useState("");
  const [flash, setFlash] = useState(false);
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
        if (gyroscopeData.y > 5) {
          playSound('der')
        }
        if (gyroscopeData.y < -5) {
          playSound('izq')
        }
        if (gyroscopeData.x > 4) {
          setFlash(true);
          playSound('up');
          setTimeout(function () {
            setFlash(false)
          }, 5000);

        }
        if (gyroscopeData.x < -2) {
          Vibration.vibrate(5000)
          playSound('down')
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
    db.collection("usuarios").doc(user.uid)
      .onSnapshot((doc) => {
        setPass(doc.data().password)
      });
    return sound
      ? () => {
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
    if (audio == 'down') {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/audios/down.m4a')
      );
      setSound(sound);
      await sound.playAsync();
    }
    if (audio == 'mal1') {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/audios/mal1.m4a')
      );
      setSound(sound);
      await sound.playAsync();
    }
    if (audio == 'mal2') {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/audios/mal2.m4a')
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
      <Text style={styles.titulo}>
        🚨 Alarma de robo 🚨
      </Text>
      <TouchableOpacity onPress={() => {
        if (!alert) {
          setAlert(true);
        } else {
          setPassInput(true)
        }
      }}>
        <Card style={alert ? styles.card : styles.cardOff}>
          <Card.Title />
          <View style={styles.alarmContainer}>
            <Image
              style={alert ? styles.alarma : styles.alarmaOff}
              source={sirenImg}
            />
          </View>
          {(passInput) ?
            <View>
              <InputField
                inputStyle={{
                  fontSize: 14,
                }}
                containerStyle={{
                  backgroundColor: '#f0e7c5',
                  marginTop: 20
                }}
                placeholder='Ingrese la contraseña'
                autoCapitalize='none'
                autoCorrect={false}
                textContentType='password'
                onChangeText={async text => {
                  if (pass === text) {
                    setAlert(false);
                    setPassInput(false);
                  } else if (text.length === 6) {
                    setFlash(true)
                    setTimeout(() => {
                      setFlash(false)
                    }, 5000)
                    Vibration.vibrate(5000)
                    playSound('mal1');
                    setTimeout(() => {
                      playSound('mal2');
                    }, 4000)
                  };
                }}
              />
              <Text style={styles.avisoCancelamiento}> ⚠ Ingrese la misma contraseña con la que se registro para cancelar la alarma.</Text>
            </View>
            : null}
          <Card.Actions>
          </Card.Actions>
        </Card>
      </TouchableOpacity>
      {!passInput ?
        <Text style={styles.avisoCancelamiento}> ⚠ Toque una vez el dibujo de la sirena para encender la alarma y otra vez para apagarla.</Text>
        : null}
      <View style={styles.container}>
        <Camera
          style={{ width: 1, height: 1, marginBottom: 500, marginLeft: 90 }}
          flashMode={flash ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}
        >
          <View>
            <TouchableOpacity onPress={() => this.setState({ flashMode: !this.state.flashMode })}>
            </TouchableOpacity>
          </View>
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
  avisoCancelamiento: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 1,
    padding: 5,
    marginTop: 10,
    textAlign: 'center',
    color: '#86A1A8',
    borderColor: '#86A1A8',
    fontSize: 15
  },
  titulo: {
    textAlign: 'center',
    fontSize: 36,
    color: '#757ce8',
    fontWeight: 'bold',
    paddingBottom: 40
  },
  container: {
    flex: 1,
    backgroundColor: '#D9B9AF'
  },
  camera: {
    flex: 0.001,
    width: 0.3,
  },
  containerApp: {
    flex: 1,
    backgroundColor: '#FBD9A1',
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
    height: 285,
    width: 242
  },
  alarmaOff: {
    height: 258,
    width: 190
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
  card: {
    height: 400,
    borderRadius: 20,
    backgroundColor: '#BBEDBE',
  },
  cardOff: {
    height: 400,
    borderRadius: 20,
    backgroundColor: '#F1B9AC',
  }
});