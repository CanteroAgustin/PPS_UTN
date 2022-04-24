// components/ErrorMessage.js

import React from 'react';
import { StyleSheet, Text } from 'react-native';
import * as constants from '../config/constants';

const { authErrors } = constants.errors;
let mensaje = '';
const ErrorMessage = ({ error, visible }) => {
  console.log(`Error de autenticacion` + JSON.stringify(error));
  if (!error || !visible) {
    return null;
  }
  switch (error.code) {
    case 'auth/invalid-email': {
      mensaje = authErrors.authInvalidEmail;
      console.log("Mensaje de error: ", mensaje);
      break;
    }
    case 'auth/wrong-password': {
      mensaje = authErrors.authWrongPassword;
      break;
    }
    case 'auth/user-not-found': {
      mensaje = authErrors.authUserNotFound;
      break;
    }
    case 'auth/email-already-in-use': {
      mensaje = authErrors.authEmailAlreadyInUse;
      break;
    }
    case 'auth/weak-password': {
      mensaje = authErrors.authWeakPassword;
      break;
    }
    case 'auth/too-many-requests': {
      mensaje = authErrors.authTooManyRequests;
      break;
    }
  }
  return <Text style={styles.errorText}>🚨 {mensaje} 🚨</Text>;
};

const styles = StyleSheet.create({
  errorText: {
    color: '#ff0e0e',
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '600'
  }
});

export default ErrorMessage;