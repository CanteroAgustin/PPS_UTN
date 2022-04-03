import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import FloatButton from '../components/FloatButton';
import Firebase from '../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CardGame from '../components/CardGame';
import { marginTop } from 'styled-system';

const auth = Firebase.auth();

export default function HomeScreen() {

  const { user } = useContext(AuthenticatedUserContext);
  const [language, setLanguage] = useState('esp');
  const [topic, setTopic] = useState('numeros');

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
            <Text style={{ alignSelf: 'flex-start', marginRight: 20 }}>{language === 'esp' ? 'Idioma: Español' : language === 'ing' ? 'Language: English' : 'Língua: Português'}</Text>
            <TouchableOpacity onPress={handleSignOut}>
              <MaterialCommunityIcons name="door-closed-lock" size={28} color='#757ce8' />
            </TouchableOpacity>
          </View>
          <View style={styles.cardContainer}>
            {topic === 'numeros' && <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row' }}>
                <CardGame borderTopLeftRadius={15} text={language === 'esp' ? 'uno' : language === 'ing' ? 'one' : 'um'} imgUrl={require('../assets/uno.png')} imgStyle={styles.imgStyle} cardStyle={styles.cardStyle} textStyle={styles.textStyle} />
                <CardGame borderTopRightRadius={15} text={language === 'esp' ? 'dos' : language === 'ing' ? 'two' : 'dois'} imgUrl={require('../assets/dos.png')} imgStyle={styles.imgStyle} cardStyle={styles.cardStyle} textStyle={styles.textStyle} />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <CardGame borderBottomLeftRadius={15} text={language === 'esp' ? 'tres' : language === 'ing' ? 'three' : 'três'} imgUrl={require('../assets/tres.png')} cardStyle={styles.cardStyle} imgStyle={styles.imgStyle} textStyle={styles.textStyle} />
                <CardGame borderBottomRightRadius={15} text={language === 'esp' ? 'cuatro' : language === 'ing' ? 'four' : 'quatro'} imgUrl={require('../assets/cuatro.png')} cardStyle={styles.cardStyle} imgStyle={styles.imgStyle} textStyle={styles.textStyle} />
              </View>
            </View>}
            {topic === 'animales' && <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row' }}>
                <CardGame borderTopLeftRadius={15} text={language === 'esp' ? 'Leon' : language === 'ing' ? 'Lion' : 'Leão'} imgUrl={require('../assets/leon.png')} imgStyle={styles.imgStyle} cardStyle={styles.cardStyle} textStyle={styles.textStyle} />
                <CardGame borderTopRightRadius={15} text={language === 'esp' ? 'Gorila' : language === 'ing' ? 'Gorilla' : 'Gorila'} imgUrl={require('../assets/gorila.png')} imgStyle={styles.imgStyle} cardStyle={styles.cardStyle} textStyle={styles.textStyle} />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <CardGame borderBottomLeftRadius={15} text={language === 'esp' ? 'Cebra' : language === 'ing' ? 'Zebra' : 'Zebra'} imgUrl={require('../assets/cebra.png')} cardStyle={styles.cardStyle} imgStyle={styles.imgStyle} textStyle={styles.textStyle} />
                <CardGame borderBottomRightRadius={15} text={language === 'esp' ? 'Elefante' : language === 'ing' ? 'Elephant' : 'Elefante'} imgUrl={require('../assets/elefante.png')} cardStyle={styles.cardStyle} imgStyle={styles.imgStyle} textStyle={styles.textStyle} />
              </View>
            </View>}
          </View>
          <View style={styles.langButtomContainer}>
            <FloatButton imgStyle={styles.langImgStyle} width={50} containerStyle={styles.fBtnStyle} backgroundColor='red' imageSrc={require('../assets/espaniol.png')} onPress={() => setLanguage('esp')} />
            <FloatButton imgStyle={styles.langImgStyle} width={50} containerStyle={styles.fBtnStyle} backgroundColor='red' imageSrc={require('../assets/ingles.png')} onPress={() => setLanguage('ing')} />
            <FloatButton imgStyle={styles.langImgStyle} width={50} containerStyle={styles.fBtnStyle} backgroundColor='red' imageSrc={require('../assets/portuges.png')} onPress={() => setLanguage('por')} />
          </View>
          <View>
            <FloatButton imgStyle={styles.topicImgStyle} width={'100%'} height={100} containerStyle={styles.btnContainerStyle} backgroundColor='red' imageSrc={require('../assets/numeros.jpg')} onPress={() => setTopic('numeros')} />
            <FloatButton imgStyle={styles.topicImgStyle} width={'100%'} height={100} containerStyle={styles.btnContainerStyle} backgroundColor='red' imageSrc={require('../assets/colores.jpg')} onPress={() => setTopic('colores')} />
            <FloatButton imgStyle={styles.topicImgStyle} width={'100%'} height={100} containerStyle={styles.btnContainerStyle} backgroundColor='red' imageSrc={require('../assets/animales.jpg')} onPress={() => setTopic('animales')} />
          </View>
        </View>
      }
      {orientation === 'landscape' &&
        <View style={styles.containerL}>
          <StatusBar style='dark-content' />
          <View style={styles.exitButtonL}>
            <Text style={{ alignSelf: 'flex-start', marginRight: 20 }}>{language === 'esp' ? 'Idioma: Español' : language === 'ing' ? 'Language: English' : 'Língua: Português'}</Text>
            <TouchableOpacity onPress={handleSignOut}>
              <MaterialCommunityIcons name="door-closed-lock" size={28} color='#757ce8' />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <View>
              <FloatButton imgStyle={styles.topicImgStyleL} width={'100%'} height={100} containerStyle={styles.btnContainerStyle} backgroundColor='red' imageSrc={require('../assets/numeros.jpg')} onPress={() => setTopic('numeros')} />
              <FloatButton imgStyle={styles.topicImgStyleL} width={'100%'} height={100} containerStyle={styles.btnContainerStyle} backgroundColor='red' imageSrc={require('../assets/colores.jpg')} onPress={() => setTopic('colores')} />
              <FloatButton imgStyle={styles.topicImgStyleL} width={'100%'} height={100} containerStyle={styles.btnContainerStyle} backgroundColor='red' imageSrc={require('../assets/animales.jpg')} onPress={() => setTopic('animales')} />
            </View>

            <View style={styles.langButtomContainerL}>
              <FloatButton imgStyle={styles.langImgStyle} width={50} containerStyle={styles.fBtnStyle} backgroundColor='red' imageSrc={require('../assets/espaniol.png')} onPress={() => setLanguage('esp')} />
              <FloatButton imgStyle={styles.langImgStyle} width={50} containerStyle={styles.fBtnStyle} backgroundColor='red' imageSrc={require('../assets/ingles.png')} onPress={() => setLanguage('ing')} />
              <FloatButton imgStyle={styles.langImgStyle} width={50} containerStyle={styles.fBtnStyle} backgroundColor='red' imageSrc={require('../assets/portuges.png')} onPress={() => setLanguage('por')} />
            </View>
            <View style={styles.cardContainerL}>
              {topic === 'numeros' && <View style={{ flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row' }}>
                  <CardGame borderTopLeftRadius={15} text={language === 'esp' ? 'uno' : language === 'ing' ? 'one' : 'um'} imgUrl={require('../assets/uno.png')} imgStyle={styles.imgStyle} cardStyle={styles.cardStyle} textStyle={styles.textStyle} />
                  <CardGame borderTopRightRadius={15} text={language === 'esp' ? 'dos' : language === 'ing' ? 'two' : 'dois'} imgUrl={require('../assets/dos.png')} imgStyle={styles.imgStyle} cardStyle={styles.cardStyle} textStyle={styles.textStyle} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <CardGame borderBottomLeftRadius={15} text={language === 'esp' ? 'tres' : language === 'ing' ? 'three' : 'três'} imgUrl={require('../assets/tres.png')} cardStyle={styles.cardStyle} imgStyle={styles.imgStyle} textStyle={styles.textStyle} />
                  <CardGame borderBottomRightRadius={15} text={language === 'esp' ? 'cuatro' : language === 'ing' ? 'four' : 'quatro'} imgUrl={require('../assets/cuatro.png')} cardStyle={styles.cardStyle} imgStyle={styles.imgStyle} textStyle={styles.textStyle} />
                </View>
              </View>}
              {topic === 'animales' && <View style={{ flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row' }}>
                  <CardGame borderTopLeftRadius={15} text={language === 'esp' ? 'Leon' : language === 'ing' ? 'Lion' : 'Leão'} imgUrl={require('../assets/leon.png')} imgStyle={styles.imgStyle} cardStyle={styles.cardStyle} textStyle={styles.textStyle} />
                  <CardGame borderTopRightRadius={15} text={language === 'esp' ? 'Gorila' : language === 'ing' ? 'Gorilla' : 'Gorila'} imgUrl={require('../assets/gorila.png')} imgStyle={styles.imgStyle} cardStyle={styles.cardStyle} textStyle={styles.textStyle} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <CardGame borderBottomLeftRadius={15} text={language === 'esp' ? 'Cebra' : language === 'ing' ? 'Zebra' : 'Zebra'} imgUrl={require('../assets/cebra.png')} cardStyle={styles.cardStyle} imgStyle={styles.imgStyle} textStyle={styles.textStyle} />
                  <CardGame borderBottomRightRadius={15} text={language === 'esp' ? 'Elefante' : language === 'ing' ? 'Elephant' : 'Elefante'} imgUrl={require('../assets/elefante.png')} cardStyle={styles.cardStyle} imgStyle={styles.imgStyle} textStyle={styles.textStyle} />
                </View>
              </View>}
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
    flexDirection: 'row',
    height: 50,
    justifyContent: 'flex-end'
  },
  exitButtonL: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
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
    marginBottom: 10
  },
  cardContainerL: {
    width: '45%',
    height: '99%',
    alignSelf: 'center',
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
  },
  cardStyle: {
    width: '50%',
    height: '100%',
    borderColor: 'pink',
    borderWidth: 1,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  imgStyle: {
    width: 115,
    height: 115
  },
  textStyle: {
    color: 'blue',
    fontSize: 24
  }
});