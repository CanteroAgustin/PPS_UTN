import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image } from 'react-native';

import { Button, InputField, ErrorMessage } from '../components';
import Firebase from '../config/firebase';
import { Formik, useFormikContext } from 'formik';
import { loginValidationSchema } from '../schemas/loginSchema'

const auth = Firebase.auth();

export default function LoginScreen({ navigation }) {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState('');
  const [isMockLogin, setIsMockLogin] = useState(false);
  const { validateForm } = useFormikContext;

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

  return (
    <View style={styles.container}>
      <Image
        style={styles.loginImg}
        source={require('../assets/login.png')}
      />
      <StatusBar style='dark-content' />
      {(isLoading) ?
        <ActivityIndicator size='large' color="#0004ff" /> : null}
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
              setTimeout(() => {
                resetForm();
                setIsLoading(false);
                setLoginError(error);
              }, 3000)
            });
          }
        }}>
        {(props) => (
          <View>
            <InputField
              inputStyle={{
                fontSize: 14
              }}
              containerStyle={{
                backgroundColor: '#f0e7c5',
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
                backgroundColor: '#f0e7c5',
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
              backgroundColor='#757ce8'
              title='Login'
              tileColor='#fff'
              titleSize={20}
              containerStyle={{
                marginBottom: 24
              }}
              disabled={!props.isValid && !isMockLogin}
            />
            <Button
              onPress={() => {
                props.resetForm();
                navigation.navigate('Signup');
                setLoginError('');
              }}
              title='Registrarme'
              backgroundColor='#ff7961'
              titleSize={20}
            />
            <View style={styles.buttonsContainer}>
              <Button
                onPress={() => {
                  props.setFieldValue('email', 'admin@admin.com');
                  props.setFieldValue('password', '123456')
                  setIsMockLogin(true);
                }}
                title='Prueba Administrador'
                backgroundColor='green'
                titleSize={14}
                textStyle={{
                  textAlign: 'center'
                }}
                containerStyle={{
                  borderWidth: 1,
                  borderColor: 'gray',
                  width: '33%',
                  height: 100
                }}
              />
              <Button
                onPress={() => {
                  props.setFieldValue('email', 'invitado@invitado.com');
                  props.setFieldValue('password', '123456')
                  setIsMockLogin(true);
                }}
                title='Prueba usuario'
                backgroundColor='green'
                titleSize={14}
                textStyle={{
                  textAlign: 'center'
                }}
                containerStyle={{
                  borderWidth: 1,
                  borderColor: 'gray',
                  width: '33%',
                  height: 100,
                }}
              />
              <Button
                onPress={() => {
                  props.setFieldValue('email', 'tester@tester.com');
                  props.setFieldValue('password', '123456')
                  setIsMockLogin(true);
                }}
                title='Prueba desarrollador'
                backgroundColor='green'
                titleSize={14}
                textStyle={{
                  textAlign: 'center'
                }}
                containerStyle={{
                  borderWidth: 1,
                  borderColor: 'gray',
                  width: '33%',
                  height: 100
                }}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    marginTop: 20,
    flexDirection: "row", justifyContent: 'space-evenly',
    alignItems: 'center'
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
    color: '#fff',
    alignSelf: 'center',
    paddingBottom: 24
  },
  errorMsg: {
    color: '#ff0e0e',
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '600'
  },
  loginImg: {
    height: 120,
    margin: 20,
    width: 120,
    alignSelf: 'center'
  }
});