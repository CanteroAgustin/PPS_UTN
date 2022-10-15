import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Button, InputField, ErrorMessage } from '../components';
import Firebase from '../config/firebase';
import { Formik, useFormikContext } from 'formik';
import { signupValidationSchema } from '../schemas/signupSchema'
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Progress from 'react-native-progress';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'uuid';
const auth = Firebase.auth();
const db = Firebase.firestore();
const storage = Firebase.storage();

export default function SignupScreen({ navigation }) {

  const [hasGalleryPermission, setHasGalleryPermission] = useState(true);
  const [image, setImage] = useState(null);
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [passwordConfVisibility, setPasswordConfVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [rightIconConf, setRightIconConf] = useState('eye');
  const [signupError, setSignupError] = useState('');
  const [isLoading, setIsLoading] = useState('');
  const { validateForm } = useFormikContext;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannerOpened, setScannerOpened] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
  }, []);

  useEffect(() => {
    validateForm;
  }, [])

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const openScanner = () => {
    setScannerOpened(!scannerOpened)
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    })

    console.log("result: " + JSON.stringify(result));

    if (!result.cancelled) {
      setImage(result.uri)
    };

    if (!hasGalleryPermission) {
      return <Text>No access to Internal Storage</Text>
    }
  };

  const handlePasswordVisibility = field => {
    if (field === 'password') {
      if (rightIcon === 'eye') {
        setRightIcon('eye-off');
        setPasswordVisibility(!passwordVisibility);
      } else if (rightIcon === 'eye-off') {
        setRightIcon('eye');
        setPasswordVisibility(!passwordVisibility);
      }
    } else {
      if (rightIconConf === 'eye') {
        setRightIconConf('eye-off');
        setPasswordConfVisibility(!passwordConfVisibility);
      } else if (rightIconConf === 'eye-off') {
        setRightIconConf('eye');
        setPasswordConfVisibility(!passwordConfVisibility);
      }
    }
  };

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
    <View style={styles.container}>
      <StatusBar style='dark-content' />
      {(isLoading) ?
        <Progress.Pie size={60} indeterminate={true} style={styles.spinner} color='#17a2b8' /> : null}
      <Formik
        validationSchema={signupValidationSchema}
        initialValues={{ name: '', lastName: '', dni: '', email: '', password: '', passwordConfirmation: '' }}
        onSubmit={(values, { resetForm }) => {
          if (values.email !== '' && values.password !== '') {
            setIsLoading(true);
            auth.createUserWithEmailAndPassword(values.email, values.password)
              .then(async data => {
                console.log("sign data:", data);
                const img = await fetch(image);
                const blob = await img.blob();
                console.log("imagen" + JSON.stringify(image))
                const now = formatDate(new Date());
                const path = 'userImg/' + values.email + '-' + now;
                const storageRef = storage.ref();
                const spaceRef = storageRef.child(path);
                const metadata = {
                  contentType: 'image/jpeg',
                };
                spaceRef.put(blob, metadata).then(async function (snapshot) {
                  snapshot.ref.getDownloadURL().then(url => {
                    auth.signInWithEmailAndPassword('administrador@prueba.com', '123456').then(() => {

                      db.collection("users").doc(data.user.uid).set({
                        email: values.email,
                        password: values.password,
                        name: values.name,
                        lastName: values.lastName,
                        dni: values.dni,
                        createdAt: now,
                        rol: 'user',
                        photoUrl: url,
                        id: data.user.uid
                      });
                    });
                  });
                });

                setTimeout(() => {

                  setIsLoading(false);
                  resetForm();
                }, 3000)
              })
              .catch(error => {
                setTimeout(() => {
                  console.log(error);
                  resetForm();
                  setIsLoading(false);
                  setSignupError(error);
                }, 3000)
              });
          }
        }}>
        {(props) => (
          <View>
            {
              (scannerOpened) ?
                <View style={styles.barcodeContainer}>
                  <View style={styles.barcodebox}>
                    <BarCodeScanner
                      onBarCodeScanned={scanned ? undefined : ({ data }) => {
                        setScanned(true);
                        let nombres = ''
                        let apellidos = ''
                        let dni = ''
                        if (data.substring(0, 1) === '@') {
                          nombres = data.split('@')[5]
                          apellidos = data.split('@')[4]
                          dni = data.split('@')[1]
                        } else {
                          nombres = data.split('@')[2]
                          apellidos = data.split('@')[1]
                          dni = data.split('@')[4]
                        }
                        props.setFieldValue('name', nombres);
                        props.setFieldValue('lastName', apellidos);
                        props.setFieldValue('dni', dni);
                        setScannerOpened(false);
                      }}
                      style={StyleSheet.absoluteFillObject}
                    />
                    {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
                  </View>
                </View> : null
            }

            <Button
              image={image}
              backgroundColor='white'
              titleColor='black'
              title={'Subir foto'}
              onPress={() => pickImage()}
              style={styles.btnStyle}
              containerStyle={styles.btnContainerStyle}
              leftIcon={'image-search-outline'}
              textStyle={styles.btnTextStyle}
              imageStyle={styles.btnImageStyle}></Button>
            <InputField
              inputStyle={{
                fontSize: 14
              }}
              containerStyle={{
                backgroundColor: '#fff',
                marginBottom: 20
              }}
              leftIcon='note-edit-outline'
              placeholder='Nombres'
              autoCapitalize='none'
              keyboardType='default'
              textContentType='name'
              autoFocus={true}
              onChangeText={props.handleChange('name')}
              onBlur={() => {
                props.handleBlur('name');
                setSignupError('');
              }}
              value={props.values.name}
            />
            <InputField
              inputStyle={{
                fontSize: 14
              }}
              containerStyle={{
                backgroundColor: '#fff',
                marginBottom: 20
              }}
              leftIcon='note-edit-outline'
              placeholder='Apellidos'
              autoCapitalize='none'
              keyboardType='default'
              textContentType='familyName'
              autoFocus={true}
              onChangeText={props.handleChange('lastName')}
              onBlur={() => {
                props.handleBlur('lastName');
                setSignupError('');
              }}
              value={props.values.lastName}
            />
            <InputField
              inputStyle={{
                fontSize: 14
              }}
              containerStyle={{
                backgroundColor: '#fff',
                marginBottom: 20
              }}
              leftIcon='note-edit-outline'
              placeholder='DNI'
              autoCapitalize='none'
              keyboardType='numeric'
              textContentType='none'
              autoFocus={true}
              onChangeText={props.handleChange('dni')}
              onBlur={props.handleBlur('dni')}
              value={props.values.dni}
            />
            <InputField
              inputStyle={{
                fontSize: 14
              }}
              containerStyle={{
                backgroundColor: '#fff',
                marginBottom: 20
              }}
              leftIcon='email'
              placeholder='Correo electronico'
              autoCapitalize='none'
              keyboardType='email-address'
              textContentType='emailAddress'
              autoFocus={true}
              onChangeText={props.handleChange('email')}
              onBlur={props.handleBlur('email')}
              value={props.values.email}
            />
            <InputField
              inputStyle={{
                fontSize: 14
              }}
              containerStyle={{
                backgroundColor: '#fff',
                marginBottom: 20
              }}
              leftIcon='lock'
              placeholder='Contraseña'
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry={passwordVisibility}
              textContentType='password'
              rightIcon={rightIcon}
              value={props.values.password}
              onChangeText={props.handleChange('password')}
              onBlur={props.handleBlur('password')}
              handlePasswordVisibility={() => handlePasswordVisibility('password')}
            />
            <InputField
              inputStyle={{
                fontSize: 14
              }}
              containerStyle={{
                backgroundColor: '#fff',
                marginBottom: 20
              }}
              leftIcon='lock'
              placeholder='Repita la contraseña'
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry={passwordConfVisibility}
              textContentType='password'
              rightIcon={rightIconConf}
              value={props.values.passwordConfirmation}
              onChangeText={props.handleChange('passwordConfirmation')}
              onBlur={props.handleBlur('passwordConfirmation')}
              handlePasswordVisibility={() => handlePasswordVisibility('passwordConfirmation')}
            />
            {signupError ? <ErrorMessage error={signupError} visible={true} /> : null}
            {props.errors.name && props.dirty && props.touched.name &&
              <Text style={styles.errorMsg}>{props.errors.name}</Text>
            }
            {props.errors.lastName && props.dirty && props.touched.lastName &&
              <Text style={styles.errorMsg}>{props.errors.lastName}</Text>
            }
            {props.errors.dni && props.dirty && props.touched.dni &&
              <Text style={styles.errorMsg}>{props.errors.dni}</Text>
            }
            {props.errors.email && props.dirty && props.touched.email &&
              <Text style={styles.errorMsg}>{props.errors.email}</Text>
            }
            {props.errors.password && props.dirty && props.touched.password &&
              <Text style={styles.errorMsg}>{props.errors.password}</Text>
            }
            {props.errors.passwordConfirmation && props.dirty && props.touched.passwordConfirmation &&
              <Text style={styles.errorMsg}>{props.errors.passwordConfirmation}</Text>
            }
            <Button
              onPress={openScanner}
              backgroundColor='#17a2b8'
              title={scannerOpened ? 'Cerrar scanner' : 'Escanear DNI'}
              tileColor='#fff'
              titleSize={20}
              containerStyle={{
                marginBottom: 24
              }}
            />
            <Button
              onPress={props.handleSubmit}
              backgroundColor='#17a2b8'
              title='Grabar usuario'
              tileColor='#fff'
              titleSize={20}
              containerStyle={{
                marginBottom: 24
              }}
              disabled={!props.isValid || !image}
            />
          </View>
        )
        }
      </Formik >
    </View >
  );
}

const styles = StyleSheet.create({
  barcodeContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,

  },
  barcodebox: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: '#17a2b8',
    marginTop: 270
  },
  container: {
    flex: 1,
    backgroundColor: '#e8eaf6',
    paddingTop: 50,
    paddingHorizontal: 12
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#17a2b8',
    alignSelf: 'center',
    paddingBottom: 24
  },
  button: {
    alignItems: "center",
  },
  textButton: {
    color: "#0000FF",
    fontSize: 18
  },
  errorMsg: {
    color: '#dc3545',
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '600'
  },
  spinner: {
    alignItems: 'center',
    padding: 5
  },
  btnContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
    minHeight: 50,
  },
  btnTextStyle: {
    paddingLeft: 10,

  },
  btnImageStyle: {
    height: 42,
    width: 42,
    marginLeft: 200
  }
});