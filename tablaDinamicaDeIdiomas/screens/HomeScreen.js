import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import FloatButton from '../components/FloatButton';
import Firebase from '../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { margin } from 'styled-system';

const auth = Firebase.auth();

export default function HomeScreen() {
  const { user } = useContext(AuthenticatedUserContext);
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };
  const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  };
  const [orientation, setOrientation] = useState('');
  useEffect(() => {
    setOrientation(isPortrait() ? 'portrait' : 'landscape');
    Dimensions.addEventListener('change', () => {
      setOrientation(isPortrait() ? 'portrait' : 'landscape');
    });
  }, [])
  return (
    <>
      {orientation === 'portrait' &&
        <View style={styles.container}>
          <StatusBar style='dark-content' />
          <View style={styles.exitButton}>
            <TouchableOpacity style={styles.iconExitContainerStyle} onPress={handleSignOut}>
              <MaterialCommunityIcons style={styles.iconStyle} name="door-closed-lock" size={28} color='#757ce8' />
            </TouchableOpacity>
          </View>
          <View style={styles.cardContainer}>
          </View>
          <View style={styles.langButtomContainer}>
            <FloatButton imgStyle={styles.langImgStyle} width={50} containerStyle={styles.fBtnStyle} backgroundColor='red' imageSrc={require('../assets/espaniol.png')} />
            <FloatButton imgStyle={styles.langImgStyle} width={50} containerStyle={styles.fBtnStyle} backgroundColor='red' imageSrc={require('../assets/ingles.png')} />
            <FloatButton imgStyle={styles.langImgStyle} width={50} containerStyle={styles.fBtnStyle} backgroundColor='red' imageSrc={require('../assets/portuges.png')} />
          </View>
          <View>
            <FloatButton imgStyle={styles.topicImgStyle} width={'100%'} height={100} containerStyle={styles.btnContainerStyle} backgroundColor='red' imageSrc={require('../assets/numeros.jpg')} />
            <FloatButton imgStyle={styles.topicImgStyle} width={'100%'} height={100} containerStyle={styles.btnContainerStyle} backgroundColor='red' imageSrc={require('../assets/colores.jpg')} />
            <FloatButton imgStyle={styles.topicImgStyle} width={'100%'} height={100} containerStyle={styles.btnContainerStyle} backgroundColor='red' imageSrc={require('../assets/animales.jpg')} />
          </View>
        </View>
      }
      {orientation === 'landscape' &&
        <View style={styles.containerL}>
          <StatusBar style='dark-content' />
          <View style={styles.exitButtonL}>
            <TouchableOpacity style={styles.iconExitContainerStyle} onPress={handleSignOut}>
              <MaterialCommunityIcons style={styles.iconStyle} name="door-closed-lock" size={28} color='#757ce8' />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <View>
              <FloatButton imgStyle={styles.topicImgStyleL} width={'100%'} height={100} containerStyle={styles.btnContainerStyle} backgroundColor='red' imageSrc={require('../assets/numeros.jpg')} />
              <FloatButton imgStyle={styles.topicImgStyleL} width={'100%'} height={100} containerStyle={styles.btnContainerStyle} backgroundColor='red' imageSrc={require('../assets/colores.jpg')} />
              <FloatButton imgStyle={styles.topicImgStyleL} width={'100%'} height={100} containerStyle={styles.btnContainerStyle} backgroundColor='red' imageSrc={require('../assets/animales.jpg')} />
            </View>

            <View style={styles.langButtomContainerL}>
              <FloatButton imgStyle={styles.langImgStyle} width={50} containerStyle={styles.fBtnStyle} backgroundColor='red' imageSrc={require('../assets/espaniol.png')} />
              <FloatButton imgStyle={styles.langImgStyle} width={50} containerStyle={styles.fBtnStyle} backgroundColor='red' imageSrc={require('../assets/ingles.png')} />
              <FloatButton imgStyle={styles.langImgStyle} width={50} containerStyle={styles.fBtnStyle} backgroundColor='red' imageSrc={require('../assets/portuges.png')} />
            </View>
            <View style={styles.cardContainerL}>
            </View>
          </View>

        </View>
      }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8eaf6',
    paddingTop: 50,
    paddingHorizontal: 12
  },
  containerL: {
    flex: 1,
    backgroundColor: '#e8eaf6',
    paddingTop: 50,
    paddingHorizontal: 12
  },
  content: {
    flexDirection: 'row'
  },
  exitButton: {
    paddingTop: 5,
    paddingEnd: 20,
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  exitButtonL: {
    alignSelf: 'flex-end',
    bottom: 15
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    paddingBottom: 20
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#000'
  },
  textBottom: {
    marginTop: 250,
    fontSize: 12,
    fontWeight: 'normal',
    color: 'gray',
    marginBottom: 0
  },
  textContainer: {
    borderWidth: 1,
    borderStyle: 'dashed',
    padding: 5,
    marginBottom: 20
  },
  fBtnStyle: {
    borderRadius: 100,
    margin: 10
  },
  textLogout: {
    color: '#757ce8',
    fontSize: 10,
    position: 'absolute',
    top: 27,
  },
  btnContainerStyle: {
    marginTop: 2,
    alignSelf: 'center',
    borderRadius: 15,
    width: 320
  },
  cardContainer: {
    width: '100%',
    height: '40%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
    marginBottom: 10
  },
  cardContainerL: {
    width: '45%',
    height: '99%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
  },
  langButtomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },
  langButtomContainerL: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 13
  },
  langImgStyle: {
    width: 50,
    height: 50
  },
  topicImgStyle: {
    width: 320,
    height: 100,
    borderRadius: 15,
    borderColor: 'pink',
    borderWidth: 1
  },
  topicImgStyleL: {
    width: 320,
    height: 100,
    borderRadius: 15,
    borderColor: 'pink',
    borderWidth: 1,
    padding: 5
  }
});