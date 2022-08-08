import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Button, InputField, ErrorMessage } from '../components';
import Firebase from '../config/firebase';
import { Formik, useFormikContext } from 'formik';
import { signupValidationSchema } from '../schemas/signupSchema'

const auth = Firebase.auth();
const db = Firebase.firestore();

export default function SignupScreen({ navigation }) {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [signupError, setSignupError] = useState('');
  const [isLoading, setIsLoading] = useState('');
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
      <Image
        style={styles.loginImg}
        source={require('../assets/register.png')}
      />
      {(isLoading) ?
        <ActivityIndicator size='large' color="#0004ff" /> : null}
      <Formik
        validationSchema={signupValidationSchema}
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, { resetForm }) => {
          if (values.email !== '' && values.password !== '') {
            setIsLoading(true);
            auth.createUserWithEmailAndPassword(values.email, values.password)
              .then(data => {
                db.collection("usuarios").doc(data.user.uid).set({
                  email: values.email,
                  password: values.password,
                  rol: 'invitado'
                });
                setTimeout(() => {
                  setIsLoading(false);
                  resetForm();
                }, 3000)
              })
              .catch(error => {
                setTimeout(() => {
                  resetForm();
                  setIsLoading(false);
                  setSignupError(error);
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
              placeholder='Enter email'
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
                fontSize: 14,
              }}
              containerStyle={{
                backgroundColor: '#f0e7c5',
                marginBottom: 20
              }}
              leftIcon='lock'
              placeholder='Enter password'
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
            <Button
              onPress={props.handleSubmit}
              backgroundColor='#ff7961'
              title='Signup'
              tileColor='#fff'
              titleSize={20}
              containerStyle={{
                marginBottom: 24
              }}
              disabled={!props.isValid}
            />
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
  loginImg: {
    height: 122,
    margin: 10,
    width: 100,
    alignSelf: 'center'
  }
});