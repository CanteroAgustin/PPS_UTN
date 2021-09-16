import { StatusBar } from 'expo-status-bar';
import { Formik, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ErrorMessage, IconButton, InputField } from '../components';
import Firebase from '../config/firebase';
import { loginValidationSchema } from '../schemas/loginSchema';


const auth = Firebase.auth();
const { validateForm } = useFormikContext;
export default function LoginScreen({ navigation }) {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState('');

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
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Ingreso a la app</Text>
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
              handlePasswordVisibility={handlePasswordVisibility}
              onChangeText={props.handleChange('password')}
              onBlur={props.handleBlur('password')}
              value={props.values.password}
            />
            {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}
            {props.errors.email &&
              <Text style={styles.errorMsg}>{props.errors.email}</Text>
            }
            {props.errors.password &&
              <Text style={styles.errorMsg}>{props.errors.password}</Text>
            }

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setTimeout(() => {
                  props.resetForm();
                }, 1000)
                navigation.navigate('Signup');
              }}
            >
              <Text style={styles.textButton}>Registrarme.</Text>
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
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 50,
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    alignSelf: 'center',
    paddingBottom: 24,
  },
  errorMsg: {
    color: '#fdca40',
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '600'
  },
  button: {
    alignItems: "center",
  },
  textButton: {
    color: "#0000FF",
    fontSize: 18
  },
});