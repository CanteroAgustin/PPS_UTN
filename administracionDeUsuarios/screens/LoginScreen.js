import { StatusBar } from 'expo-status-bar';
import { Formik, useFormikContext } from 'formik';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { Button, ErrorMessage, InputField } from '../components';
import Firebase from '../config/firebase';
import { loginValidationSchema } from '../schemas/loginSchema';

const auth = Firebase.auth();

export default function LoginScreen({ navigation }) {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { validateForm } = useFormikContext;
  const [isMockLogin, setIsMockLogin] = useState(false);

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
      <StatusBar style='dark-content' />
      <Text style={styles.title}>Ingreso</Text>
      {/* {(isLoading) ?
        <ActivityIndicator size='large' color="#bc2b78" style={styles.activityIndicator} /> : null} */}
      {(isLoading) ?
        <Progress.Pie size={60} indeterminate={true} style={styles.spinner} color='#17a2b8' /> : null}
      {/* <Spinner
        size='large'
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
        animation='slide'
      /> */}
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, { resetForm }) => {
          if (values.email !== '' && values.password !== '') {
            setIsLoading(true);
            auth.signInWithEmailAndPassword(values.email, values.password)
              .then(() => {
                setTimeout(function () {
                  setIsLoading(false);
                  resetForm();
                }, 5000)
              }).catch(error => {
                resetForm();
                setIsLoading(false);
                setLoginError(error)
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
              value={props.values.email} />
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
              onChangeText={props.handleChange('password')}
              onBlur={props.handleBlur('password')}
              value={props.values.password} />
            {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}
            {props.errors.email && props.dirty && props.touched.email &&
              <Text style={styles.errorMsg}>{props.errors.email}</Text>}
            {props.errors.password && props.dirty && props.touched.password &&
              <Text style={styles.errorMsg}>{props.errors.password}</Text>}
            <Button
              onPress={props.handleSubmit}
              backgroundColor='#17a2b8'
              title='Ingresar'
              tileColor='#fff'
              titleSize={20}
              containerStyle={{
                marginBottom: 24
              }}
              disabled={!props.isValid && !isMockLogin} />
            <View style={styles.inline}>
              <Text style={styles.textButton}>No tengo una cuenta, </Text>
              <TouchableOpacity
                onPress={() => {
                  props.resetForm();
                  setLoginError('');
                  navigation.navigate('Signup');
                }}
              >
                <Text style={styles.textButtonLink}>Registrarme.</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonsContainer}>
              <Button
                onPress={() => {
                  props.resetForm();
                  setLoginError('')
                  props.setFieldValue('email', 'administrador@prueba.com');
                  props.setFieldValue('password', '123456')
                  setIsMockLogin(true);
                }}
                title='* Prueba Administrador *'
                backgroundColor='#e8eaf6'
                titleSize={24}
                titleColor='#17a2b8'
                textStyle={{
                  textAlign: 'center'
                }}
                containerStyle={{
                  height: 90
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
                title='* Prueba usuario *'
                backgroundColor='#e8eaf6'
                titleSize={24}
                titleColor='#17a2b8'
                textStyle={{
                  textAlign: 'center'
                }}
                containerStyle={{
                  height: 90,
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
                title='* Prueba desarrollador *'
                backgroundColor='#e8eaf6'
                titleSize={24}
                titleColor='#17a2b8'
                textStyle={{
                  textAlign: 'center'
                }}
                containerStyle={{
                  height: 90
                }}
              />
            </View>
          </View>
        )}
      </Formik >

    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8eaf6',
    paddingTop: 50,
    paddingHorizontal: 12
  },
  title: {
    fontSize: 48,
    fontWeight: '600',
    color: '#17a2b8',
    alignSelf: 'center',
    paddingBottom: 24
  },
  errorMsg: {
    color: '#dc3545',
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '600'
  },
  button: {
    alignItems: "center",
  },
  textButton: {
    color: 'black',
    fontSize: 18
  },
  textButtonLink: {
    color: "#0000FF",
    fontSize: 18,
  },
  inline: {
    flexDirection: 'row'
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  spinner: {
    alignItems: 'center',
    padding: 5
  },
  buttonsContainer: {
    marginTop: 20,
  }
});