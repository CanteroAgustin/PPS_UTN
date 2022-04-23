import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, ActivityIndicator, View, Image } from 'react-native'
import { auth } from '../firebase'
import { Formik, useFormikContext } from 'formik';
import { loginValidationSchema } from '../schemas/loginSchema'
import { Button, ErrorMessage } from '../components';

const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState('');
  const [loginError, setLoginError] = useState('');
  const [action, setAction] = useState('');

  const navigation = useNavigation()
  const { validateForm } = useFormikContext;

  useEffect(() => {
    validateForm;
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Pagina principal")
      }
    })

    return unsubscribe
  }, [])

  const handleSignUp = (email, password) => {
    console.log(email, password)
    console.log('handle registro')
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        handleSuccess(userCredentials.user);
      })
      .catch(error => {
        handleError(error);
      }
      )
  }

  const handleLogin = (email, password) => {

    console.log('handle login')
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        handleSuccess(userCredentials.user);
      })
      .catch(error => {
        handleError(error);
      })
  }

  const handleSuccess = (firebaseUser) => {
    const user = firebaseUser;
    console.log('Logged in with:', user.email);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000)
  }

  const handleError = (error) => {
    setIsLoading(false);
    setLoginError(error)
  }

  return (
    <View>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, { resetForm }) => {
          console.log(values)
          setIsLoading(true);
          if (action === 'login') {
            handleLogin(values.email, values.password);
          } else {
            handleSignUp(values.email, values.password);
          }
          resetForm();
        }}>
        {(props) => (
          <View>
            <KeyboardAvoidingView
              style={styles.container}
              behavior="padding"
            >
              <Image
                style={styles.imgStyle}
                source={require('../assets/adaptive-icon.png')}
              />
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Correo electronico"
                  placeholderTextColor={'black'}
                  onChangeText={props.handleChange('email')}
                  onBlur={props.handleBlur('email')}
                  value={props.values.email}
                  style={props.values.email ? styles.input : styles.placeholder}
                />
                <TextInput
                  placeholder="Contraseña"
                  style={props.values.password ? styles.input : styles.placeholder}
                  secureTextEntry
                  onChangeText={props.handleChange('password')}
                  value={props.values.password}
                  onBlur={props.handleBlur('password')}
                  placeholderTextColor={'black'}
                />
                {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}
                {props.errors.email && props.dirty && props.touched.email &&
                  <Text style={styles.errorMsg}>{props.errors.email}</Text>
                }
                {props.errors.password && props.dirty && props.touched.password &&
                  <Text style={styles.errorMsg}>{props.errors.password}</Text>
                }
              </View>

              <View style={styles.buttonContainer}>
                <Button
                  onPress={() => {
                    setAction('login')
                    props.handleSubmit()
                  }}
                  title='Ingresar'
                  containerStyle={styles.button}
                  titleSize={20}
                  titleWeight='700'
                  disabled={!props.isValid}
                />
                <Button
                  onPress={() => {
                    setAction('registro')
                    props.handleSubmit()
                  }}
                  title='Registrarme'
                  containerStyle={[styles.button, styles.buttonOutline]}
                  titleColor='#0782F9'
                  titleSize={20}
                  titleWeight='700'
                  disabled={!props.isValid}
                />
              </View>
              {(isLoading) ?
                <ActivityIndicator size='large' color="#00ff00" /> : null}
            </KeyboardAvoidingView>
            <View style={styles.testUsersContainerStyle}>
              <Text style={styles.testUsersTextStyle}>**** USUARIOS DE PRUEBA ****</Text>
              <Button
                onPress={() => {
                  props.setFieldValue('email', 'admin@admin.com');
                  props.setFieldValue('password', '111111')
                }}
                title='Admin'
                backgroundColor='rgba(150, 250, 0, .3)'
                titleColor='#000'
                titleSize={20}
                containerStyle={{
                  marginBottom: 1,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: 'gray'
                }}
              />
              <Button
                onPress={() => {
                  props.setFieldValue('email', 'invitado@invitado.com');
                  props.setFieldValue('password', '222222')
                }}
                title='Invitado'
                backgroundColor='rgba(150, 250, 0, .3)'
                titleColor='#000'
                titleSize={20}
                containerStyle={{
                  marginBottom: 1,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: 'gray',
                }}
              />
              <Button
                onPress={() => {
                  props.setFieldValue('email', 'usuario@usuario.com');
                  props.setFieldValue('password', '333333')
                }}
                title='Usuario'
                backgroundColor='rgba(150, 250, 0, .3)'
                titleColor='#000'
                titleSize={20}
                containerStyle={{
                  marginBottom: 1,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: 'gray'
                }}
              />
              <Button
                onPress={() => {
                  props.setFieldValue('email', 'anonimo@anonimo.com');
                  props.setFieldValue('password', '444444')
                }}
                title='Anonimo'
                backgroundColor='rgba(150, 250, 0, .3)'
                titleColor='#000'
                titleSize={20}
                containerStyle={{
                  marginBottom: 1,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: 'gray'
                }}
              />
              <Button
                onPress={() => {
                  props.setFieldValue('email', 'tester@tester.com');
                  props.setFieldValue('password', '555555')
                }}
                title='Tester'
                backgroundColor='rgba(150, 250, 0, .3)'
                titleColor='#000'
                titleSize={20}
                containerStyle={{
                  marginBottom: 1,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: 'gray'
                }}
              />
            </View>
          </View>
        )}
      </Formik >
    </View >
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    fontWeight: '700',
    paddingBottom: 20
  },
  container: {
    top: '7%',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: '#F7FF93',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  placeholder: {
    backgroundColor: '#F7FF93',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    fontSize: 18,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%'
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
    width: '80%'
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
  testUsersContainerStyle: {
    paddingTop: 50,
    margin: 37
  },
  testUsersTextStyle: {
    paddingBottom: 5,
    alignSelf: 'center',
    fontSize: 20
  },
  imgStyle: {
    height: 150,
    width: 150,
  }
})