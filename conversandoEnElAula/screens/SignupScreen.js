import { StatusBar } from 'expo-status-bar';
import { Formik, useFormikContext } from 'formik';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ErrorMessage, IconButton, InputField } from '../components';
import Firebase from '../config/firebase';
import { signupValidationSchema } from '../schemas/signupSchema';
import Spinner from 'react-native-loading-spinner-overlay';

const auth = Firebase.auth();
const db = Firebase.firestore();

export default function SignupScreen({ navigation }) {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [signupError, setSignupError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
      <StatusBar style='dark-content' />
      <Spinner
        visible={isLoading}
        textContent={'Cargando...'}
        textStyle={styles.spinnerTextStyle}
      />
      <Formik
        validationSchema={signupValidationSchema}
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, { resetForm }) => {
          if (values.email !== '' && values.password !== '') {
            setIsLoading(true);
            auth.createUserWithEmailAndPassword(values.email, values.password)
              .then(() => {
                db.collection('usuarios').add({
                  email: values.email,
                  password: values.password,
                  rol: 'admin'
                });
                setTimeout(() => {
                  setIsLoading(false);
                  resetForm();
                }, 3000)
              })
              .catch(error => {
                resetForm();
                setIsLoading(false);
                setSignupError(error);
              });
          }
        }}>
        {(props) => (
          <View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Crear una cuenta</Text>
              <IconButton
                onPress={props.handleSubmit}
                color='#FFF'
                backgroundColor='#1c8155'
                size={40}
                name='arrowright'
                disabled={!props.isValid}
              />
            </View>
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
              handlePasswordVisibility={handlePasswordVisibility}
            />
            {signupError ? <ErrorMessage error={signupError} visible={true} /> : null}
            {props.errors.email && props.dirty && props.touched.email &&
              <Text style={styles.errorMsg}>{props.errors.email}</Text>
            }
            {props.errors.password && props.dirty && props.touched.password &&
              <Text style={styles.errorMsg}>{props.errors.password}</Text>
            }
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                props.resetForm();
                navigation.navigate('Login');
                setSignupError('');
              }}
            >
              <Text style={styles.textButton}>Ya tengo una cuenta.</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEE9C',
    paddingTop: 50,
    paddingHorizontal: 12
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: '#0000FF',
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
    color: '#ff0e0e',
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '600'
  },
  titleContainer: {
    flex: 0,
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between'
  },
  spinnerTextStyle: {
    color: '#1c8155',
  }
});