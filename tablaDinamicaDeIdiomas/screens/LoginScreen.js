import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Button, InputField, ErrorMessage, IconButton } from '../components';
import Firebase from '../config/firebase';
import { Formik, useFormikContext } from 'formik';
import { loginValidationSchema } from '../schemas/loginSchema'

const auth = Firebase.auth();

export default function LoginScreen({ navigation }) {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState('');
  const { validateForm } = useFormikContext;
  const [isMockLogin, setIsMockLogin] = useState(false);
  const [activeButton, setActiveButton] = useState('1');
  const [allButtonsActive, setAllButtonsActive] = useState(false);

  useEffect(() => {
    validateForm;
  }, [])

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const handleOne = props => {
    setActiveButton('1');
    setAllButtonsActive(!allButtonsActive);
    props.resetForm();
    setLoginError('');
    props.setFieldValue('email', 'administrador@prueba.com');
    props.setFieldValue('password', '123456');
    setIsMockLogin(true);
  }

  const handleTwo = props => {
    setActiveButton('2');
    setAllButtonsActive(!allButtonsActive);
    props.resetForm();
    setLoginError('');
    props.setFieldValue('email', 'prueba@prueba.com');
    props.setFieldValue('password', '123456');
    setIsMockLogin(true);
  }

  const handleThree = props => {
    setActiveButton('3');
    setAllButtonsActive(!allButtonsActive);
    props.resetForm();
    setLoginError('');
    props.setFieldValue('email', 'prueba1@prueba.com');
    props.setFieldValue('password', '123456');
    setIsMockLogin(true);
  }

  return (
    <View style={styles.container}>
      <StatusBar style='dark-content' />
      {(isLoading) ?
        <ActivityIndicator size='large' color="#00ff00" /> : null}
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, { resetForm }) => {
          if (values.email !== '' && values.password !== '') {
            setIsLoading(true);
            auth.signInWithEmailAndPassword(values.email, values.password).then(() => {
              setTimeout(() => {
                setIsLoading(false);
                resetForm();
              }, 3000)
            }).catch(error => {
              resetForm();
              setIsLoading(false);
              setLoginError(error)
            });
          }
        }}>
        {(props) => (
          <View>
            <View style={styles.signupContainer}>
              <Text style={styles.textSignup}>
                Registrarme
              </Text>
              <IconButton
                onPress={() => {
                  props.resetForm();
                  setLoginError('');
                  navigation.navigate('Signup');
                }}
                color='#000000'
                backgroundColor='#1c8155'
                size={40}
                name='arrowright'
                disabled={false}
              />
            </View>
            <Image
              style={styles.loginImg}
              source={require('../assets/adaptive-icon.png')}
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
              onChangeText={() => {
                setIsMockLogin(true);
                props.handleChange('email')
              }}
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
              handlePasswordVisibility={handlePasswordVisibility}
              onChangeText={() => {
                setIsMockLogin(true);
                props.handleChange('password');
              }}
              onBlur={props.handleBlur('password')}
              value={props.values.password}
            />
            {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}
            {props.errors.email && props.dirty && props.touched.email &&
              <Text style={styles.errorMsg}>{props.errors.email}</Text>
            }
            {props.errors.password && props.dirty && props.touched.password &&
              <Text style={styles.errorMsg}>{props.errors.password}</Text>
            }
            <Button
              onPress={props.handleSubmit}
              backgroundColor='#ffca18'
              title='Ingresar'
              tileColor='#fff'
              titleSize={20}
              containerStyle={{
                marginBottom: 24
              }}
              disabled={!props.isValid && !isMockLogin}
            />
            {/* <View style={styles.buttonsContainer}>
              <Button
                onPress={() => {
                  props.resetForm();
                  setLoginError('')
                  props.setFieldValue('email', 'administrador@prueba.com');
                  props.setFieldValue('password', '123456');
                  setIsMockLogin(true);
                }}
                title='Prueba Administrador'
                backgroundColor='#ffca18'
                titleSize={28}
                textStyle={{
                  textAlign: 'center'
                }}
                containerStyle={{
                  borderWidth: 5,
                  borderColor: 'gray',
                  borderStyle: 'dashed',
                  height: 100
                }}
              />
              <Button
                onPress={() => {
                  props.resetForm();
                  setLoginError('')
                  props.setFieldValue('email', 'prueba@prueba.com');
                  props.setFieldValue('password', '123456')
                  setIsMockLogin(true);
                }}
                title='Prueba usuario'
                backgroundColor='#ffca18'
                titleSize={28}
                textStyle={{
                  textAlign: 'center'
                }}
                containerStyle={{
                  borderWidth: 5,
                  borderColor: 'gray',
                  borderStyle: 'dashed',
                  height: 100,
                }}
              />
              <Button
                onPress={() => {
                  props.resetForm();
                  setLoginError('')
                  props.setFieldValue('email', 'prueba1@prueba.com');
                  props.setFieldValue('password', '123456')
                  setIsMockLogin(true);
                }}
                title='Prueba desarrollador'
                backgroundColor='#ffca18'
                titleSize={28}
                textStyle={{
                  textAlign: 'center'
                }}
                containerStyle={{
                  borderWidth: 5,
                  borderColor: 'gray',
                  borderStyle: 'dashed',
                  height: 100
                }}
              />
            </View> */}
            <Text style={styles.textSignup}>
              - Usuarios de prueba -
            </Text>
            <View style={styles.testButtonsContainer}>
              {(activeButton == '1' || allButtonsActive) && <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleOne(props)}
                style={styles.testButtonsStyle}>
                <Text style={styles.textSignup}>
                  Administrador
                </Text>
              </TouchableOpacity>}
              {(activeButton == '2' || allButtonsActive) && < TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleTwo(props)}
                style={styles.testButtonsStyle}>
                <Text style={styles.textSignup}>
                  Usuario
                </Text>
              </TouchableOpacity>}
              {(activeButton == '3' || allButtonsActive) && <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleThree(props)}
                style={styles.testButtonsStyle}>
                <Text style={styles.textSignup}>
                  Desarrollador
                </Text>
              </TouchableOpacity>}
            </View>
          </View>
        )
        }
      </Formik >
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d6fbff',
    paddingTop: 50,
    paddingHorizontal: 12
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    alignSelf: 'center',
    paddingBottom: 24
  },
  errorMsg: {
    color: '#fdca40',
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '600'
  },
  loginImg: {
    height: 160,
    width: 160,
    alignSelf: 'center'
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textSignup: {
    alignSelf: 'center',
    color: '#000000',
    fontSize: 20,
    padding: 10
  },
  textTestUsers: {
    alignSelf: 'flex-start'
  },
  testButtonsContainer: {
    alignItems: 'flex-start'
  },
  testButtonsStyle: {
    borderColor: '#ffca18',
    borderEndColor: '#ffca18',
    borderBottomWidth: 2,
    backgroundColor: '#F9FAF5',
    borderRadius: 10,
    width: '100%'
  },
});