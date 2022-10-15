import React, { useContext, useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import Firebase from '../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import { DataTable } from 'react-native-paper';
import { Col, Row, Grid } from "react-native-easy-grid";

export default function HomeScreen({ navigation }) {
  const { user } = useContext(AuthenticatedUserContext);
  const [users, setUsers] = useState([]);
  const db = Firebase.firestore();

  useLayoutEffect(() => {
    const unsubscribe = db.collection('users').onSnapshot(snapshot => setUsers(
      snapshot.docs.map(doc => ({
        _id: doc.data()._id,
        createdAt: doc.data().createdAt,
        name: doc.data().name,
        lastName: doc.data().lastName,
        dni: doc.data().dni,
        photoUrl: doc.data().photoUrl,
        rol: doc.data().rol
      })).sort(function (a, b) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
      })
    ))
    return unsubscribe;
  }, [])

  return (

    <View style={styles.scrollView}>
      <ScrollView horizontal contentContainerStyle={styles.scrollViewContainer}>
        <Grid style={{ paddingLeft: 10, paddingTop: 30 }}>
          <Row style={{ height: 30, backgroundColor: '#D9D8D5' }}>
            <Col style={{ width: 70 }}>
            </Col>
            <Col style={{ width: 170 }}>
              <Text style={{ fontWeight: 'bold' }}>Nombre</Text>
            </Col>
            <Col style={{ width: 170 }}>
              <Text style={{ fontWeight: 'bold' }}>Apellido</Text>
            </Col>
            <Col style={{ width: 100 }}>
              <Text style={{ fontWeight: 'bold' }}>DNI</Text>
            </Col>
            <Col style={{ width: 150 }}>
              <Text style={{ fontWeight: 'bold' }}>F. creacion</Text>
            </Col>
            <Col style={{ width: 150 }}>
              <Text style={{ fontWeight: 'bold' }}>Rol</Text>
            </Col>
          </Row>
          {users.map((user) => {
            return (
              <Row style={{ height: 50, backgroundColor: '#EDECE6' }} key={JSON.stringify(user)}>
                <Col style={{ width: 70 }}>
                  {user.photoUrl ? <Image style={styles.photo} source={{ uri: user.photoUrl }} /> : null}
                </Col>
                <Col style={{ width: 170 }}>
                  <Text>{user.name}</Text>
                </Col>
                <Col style={{ width: 170 }}>
                  <Text>{user.lastName}</Text>
                </Col>
                <Col style={{ width: 100 }}>
                  <Text>{user.dni}</Text>
                </Col>
                <Col style={{ width: 150 }}>
                  <Text>{user.createdAt.toLocaleString()}</Text>
                </Col>
                <Col style={{ width: 150 }}>
                  <Text>{user.rol}</Text>
                </Col>
              </Row>
            );
          })}
        </Grid>
        {/* <DataTable>
          <DataTable.Header>
            <DataTable.Title style={styles.cellPhotoStyle}></DataTable.Title>
            <DataTable.Title style={styles.cellFlex2Style}>Nombre</DataTable.Title>
            <DataTable.Title style={styles.cellFlex2Style}>Apellido</DataTable.Title>
            <DataTable.Title style={styles.cellDNIStyle}>DNI</DataTable.Title>
            <DataTable.Title style={styles.cellFlex2Style}>F. Creacion</DataTable.Title>
          </DataTable.Header>

          {users.map((user) => {
            return (
              <DataTable.Row key={JSON.stringify(user)} style={styles.rowStyle} >
                <DataTable.Cell style={styles.cellPhotoStyle} textStyle={styles.dataTableTextStyle}>
                  {user.photoUrl ? <Image style={styles.photo} source={{ uri: user.photoUrl }} /> : null}
                </DataTable.Cell>
                <DataTable.Cell style={styles.cellFlex2Style}>{user.name}</DataTable.Cell>
                <DataTable.Cell style={styles.cellFlex2Style}>{user.lastName}</DataTable.Cell>
                <DataTable.Cell style={styles.cellDNIStyle}>{user.dni}</DataTable.Cell>
                <DataTable.Cell style={styles.cellFlex2Style}>{user.createdAt.toLocaleString()}</DataTable.Cell>
              </DataTable.Row>
            );
          })}
        </DataTable> */}
      </ScrollView>
      {(user.rol === 'administrador') ?
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
    width: 170
  },
  cellPhotoStyle: {
    width: 100
  },
  cellDNIStyle: {
    width: 100
  },
  scrollView: {
  },
  scrollViewContainer: {
  },
  photo: {
    width: 40,
    height: 40,
  },
  rowStyle: {
    alignSelf: 'flex-start'
  },
  dataTableTextStyle: {
  }
});