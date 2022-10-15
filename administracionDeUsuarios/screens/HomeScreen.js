import React, { useContext, useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import Firebase from '../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import { DataTable } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
  const { user } = useContext(AuthenticatedUserContext);
  const [users, setUsers] = useState([]);
  const db = Firebase.firestore();

  useLayoutEffect(() => {
    const unsubscribe = db.collection('users').orderBy('createdAt', 'desc').onSnapshot(snapshot => setUsers(
      snapshot.docs.map(doc => ({
        _id: doc.data()._id,
        createdAt: doc.data().createdAt,
        name: doc.data().name,
        lastName: doc.data().lastName,
        dni: doc.data().dni,
        photoUrl: doc.data().photoUrl
      }))
    ))
    return unsubscribe;
  }, [])

  return (

    <View style={styles.scrollView}>
      <ScrollView horizontal contentContainerStyle={styles.scrollViewContainer}>

        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={styles.cellPhotoStyle}></DataTable.Title>
            <DataTable.Title style={styles.cellFlex2Style}>Nombre</DataTable.Title>
            <DataTable.Title style={styles.cellFlex2Style}>Apellido</DataTable.Title>
            <DataTable.Title style={styles.cellFlex2Style}>DNI</DataTable.Title>
            <DataTable.Title style={styles.cellFlex2Style}>F. Creacion</DataTable.Title>
          </DataTable.Header>

          {users.map((user) => {
            return (
              <DataTable.Row key={JSON.stringify(user)} style={styles.rowStyle}>
                <DataTable.Cell style={styles.cellPhotoStyle} textStyle={styles.dataTableTextStyle}>
                  {user.photoUrl ? <Image style={styles.photo} source={{ uri: user.photoUrl }} /> : null}
                </DataTable.Cell>
                <DataTable.Cell style={styles.cellFlex2Style}>{user.name}</DataTable.Cell>
                <DataTable.Cell style={styles.cellFlex2Style}>{user.lastName}</DataTable.Cell>
                <DataTable.Cell style={styles.cellFlex2Style}>{user.dni}</DataTable.Cell>
                <DataTable.Cell style={styles.cellFlex2Style}>{user.createdAt.toLocaleString()}</DataTable.Cell>
              </DataTable.Row>
            );
          })}
        </DataTable>
      </ScrollView>
      {(user.rol === 'admin') ?
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Nuevo usuario');
          }}
          style={styles.btnNewUser} >
          <Text style={styles.btnNewUserTextStyle}>Nuevo usuario</Text>
        </TouchableOpacity>
        : null
      }
    </View>


  );
}

const styles = StyleSheet.create({
  btnNewUserTextStyle: {
    backgroundColor: '#17a2b8',
    borderRadius: 5,
    height: 50,
    margin: 20,
    textAlign: 'center',
    fontSize: 34,
    color: 'white'
  },
  btnNewUser: {
  },
  cellFlex2Style: {
    flex: 4,
    width: 150
  },
  cellPhotoStyle: {
    width: 60,
    height: 60
  },
  scrollView: {
  },
  scrollViewContainer: {
  },
  photo: {
    width: 50,
    height: 50,
  },
  rowStyle: {
    height: 75
  },
  dataTableTextStyle: {
  }
});