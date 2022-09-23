import { StatusBar } from 'expo-status-bar';
import React, { createContext, useEffect, useState, useContext } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image } from 'react-native';

import { Button, InputField, ErrorMessage } from '../components';
import Firebase from '../config/firebase';
import { Formik, useFormikContext } from 'formik';
import { loginValidationSchema } from '../schemas/loginSchema'
import { FAB, Portal, Provider } from 'react-native-paper';

const auth = Firebase.auth();
export const FormContext = createContext();

export default function LoginScreen({ navigation }) {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState('');
  const [isMockLogin, setIsMockLogin] = useState(false);
  const { validateForm } = useFormikContext;
  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  const setFieldValue = useContext(FormContext);

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
          <FormContext.Provider value={props.setFieldValue}>
            <View>
              <InputField
                inputStyle={{
                  fontSize: 14,
                }}
                containerStyle={{
                  backgroundColor: '#D9B9AF',
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
                  backgroundColor: '#D9B9AF',
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
              <Button
                onPress={props.handleSubmit}
                backgroundColor='#4E9FAB'
                title='Ingresar'
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
                backgroundColor='#FB85AA'
                titleSize={20}
              />

              <View style={styles.buttonsContainer}>

                {/* <Button
                onPress={() => {
                  props.resetForm();
                  setLoginError('')
                  props.setFieldValue('email', 'administrador@prueba.com');
                  props.setFieldValue('password', '123456')
                  setIsMockLogin(true);
                }}
                title='Prueba Administrador'
                backgroundColor='#FDB5A8'
                titleColor='#4E9FAB'
                titleSize={14}
                textStyle={{
                  textAlign: 'center',
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
                  props.resetForm();
                  setLoginError('')
                  props.setFieldValue('email', 'prueba@prueba.com');
                  props.setFieldValue('password', '123456')
                  setIsMockLogin(true);
                }}
                title='Prueba usuario'
                backgroundColor='#FDB5A8'
                titleSize={14}
                titleColor='#4E9FAB'
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
                  props.resetForm();
                  setLoginError('')
                  props.setFieldValue('email', 'prueba1@prueba.com');
                  props.setFieldValue('password', '123456')
                  setIsMockLogin(true);
                }}
                title='Prueba desarrollador'
                backgroundColor='#FDB5A8'
                titleSize={14}
                titleColor='#4E9FAB'
                textStyle={{
                  textAlign: 'center'
                }}
                containerStyle={{
                  borderWidth: 1,
                  borderColor: 'gray',
                  width: '33%',
                  height: 100
                }}
              /> */}
              </View>

            </View>
            <Provider>
              <Portal>
                <FAB.Group
                  open={open}
                  icon={open ? 'minus' : 'plus'}
                  actions={[
                    {
                      icon: 'account-cog',
                      label: 'Administrador',
                      onPress: () => {
                        props.resetForm();
                        setLoginError('')
                        props.setFieldValue('email', 'administrador@prueba.com');
                        props.setFieldValue('password', '123456')
                        setIsMockLogin(true);
                      },
                    },
                    {
                      icon: 'account',
                      label: 'Usuario',
                      onPress: () => {
                        props.resetForm();
                        setLoginError('')
                        props.setFieldValue('email', 'prueba@prueba.com');
                        props.setFieldValue('password', '123456')
                        setIsMockLogin(true);
                      },
                    },
                    {
                      icon: 'code-tags',
                      label: 'Desarrollador',
                      onPress: () => {
                        props.resetForm();
                        setLoginError('')
                        props.setFieldValue('email', 'prueba1@prueba.com');
                        props.setFieldValue('password', '123456')
                        setIsMockLogin(true);
                      },
                    },
                  ]}
                  onStateChange={onStateChange}
                  onPress={() => {
                    if (open) {
                    }
                  }}
                  style={styles.fab}
                />
              </Portal>
            </Provider>
          </FormContext.Provider>
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
    backgroundColor: '#FBD9A1',
    paddingTop: 50,
    paddingHorizontal: 12,

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
  },
});