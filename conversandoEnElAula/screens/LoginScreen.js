import { StatusBar } from 'expo-status-bar';
import { Formik, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import { Button, ErrorMessage, IconButton, InputField } from '../components';
import Firebase from '../config/firebase';
import { loginValidationSchema } from '../schemas/loginSchema';
import { RadioButton } from 'react-native-paper';

const auth = Firebase.auth();

export default function LoginScreen({ navigation }) {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMockLogin, setIsMockLogin] = useState(false);
  const { validateForm } = useFormikContext;
  const [value, setValue] = useState('');

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
                setLoginError(error)
              }, 3000)
            });
          }
        }}>
        {(props) => (
          <View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Ingreso a la app</Text>
              <IconButton
                onPress={props.handleSubmit}
                color='#FFF'
                backgroundColor='#1c8155'
                size={40}
                name='arrowright'
                disabled={!props.isValid && !isMockLogin}
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
              handlePasswordVisibility={handlePasswordVisibility}
              onChangeText={props.handleChange('password')}
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

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                props.resetForm();
                navigation.navigate('Signup');
                setLoginError('');
              }}
            >
              <Text style={styles.textButton}>Registrarme.</Text>
            </TouchableOpacity>

            <View style={styles.buttonsContainer}>
              <RadioButton.Group onValueChange={value => {
                setValue(value);
                props.resetForm();
                console.log(value);
                if (value == 'first') {
                  props.setFieldValue('email', 'administrador@prueba.com');
                  props.setFieldValue('password', '123456');
                }
                if (value == 'second') {
                  props.setFieldValue('email', 'prueba@prueba.com');
                  props.setFieldValue('password', '123456');
                }
                if (value == 'third') {
                  props.setFieldValue('email', 'prueba1@prueba.com');
                  props.setFieldValue('password', '123456');
                }


                setLoginError('')
                setIsMockLogin(true);
              }
              } value={value}>
                <RadioButton.Item label="Prueba Administrador" value="first" labelStyle={styles.label} />
                <RadioButton.Item label="Prueba usuario" value="second" labelStyle={styles.label} />
                <RadioButton.Item label="Prueba desarrollador" value="third" labelStyle={styles.label} />
              </RadioButton.Group>
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
  },
  container: {
    flex: 1,
    backgroundColor: '#FFEE9C',
    paddingTop: 50,
    paddingHorizontal: 12
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 50,
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: '#0000FF',
    alignSelf: 'center',
    paddingBottom: 24,
    paddingEnd: 20,
  },
  errorMsg: {
    color: '#ff0e0e',
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '600'
  },
  button: {
    alignItems: "center",
  },
  textButton: {
    color: "#0000FF",
    fontSize: 24,
    paddingTop: 20,
    paddingBottom: 20
  },
  spinnerTextStyle: {
    color: '#1c8155',
  },
  label: {
    color: '#1c8155',
    fontSize: 24,
  }
});