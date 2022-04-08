import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import FloatButton from '../components/FloatButton';
import Firebase from '../config/firebase';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CardGame from '../components/CardGame';
import { Audio } from 'expo-av';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-ico-flags';
import { alignSelf, fontWeight, width } from 'styled-system';

const auth = Firebase.auth();

export default function HomeScreen() {

  const [language, setLanguage] = useState('esp');
  const [topic, setTopic] = useState('numeros');

  const [sound, setSound] = React.useState();

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
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound])

  async function playSound(audio, languaje) {
    switch (languaje) {
      case "esp":
        if (audio == 'uno') {
          const { sound } = await Audio.Sound.createAsync(
            require('../assets/audios/esp/Uno.wav')
          );
          setSound(sound);
          await sound.playAsync();
        }
        if (audio == 'dos') {
          const { sound } = await Audio.Sound.createAsync(
            require('../assets/audios/esp/Dos.wav')
          );
          setSound(sound);
          await sound.playAsync();
        }
        if (audio == 'tres') {
          const { sound } = await Audio.Sound.createAsync(
            require('../assets/audios/esp/Tres.wav')
          );
          setSound(sound);
          await sound.playAsync();
        }
        if (audio == 'cuatro') {
          const { sound } = await Audio.Sound.createAsync(
            require('../assets/audios/esp/Cuatro.wav')
          );
          setSound(sound);
          await sound.playAsync();
        }
        if (audio == 'leon') {
          const { sound } = await Audio.Sound.createAsync(
            require('../assets/audios/esp/Leon.wav')
          );
          setSound(sound);
          await sound.playAsync();
        }
        if (audio == 'elefante') {
          const { sound } = await Audio.Sound.createAsync(
            require('../assets/audios/esp/Elefante.wav')
          );
          setSound(sound);
          await sound.playAsync();
        }
        if (audio == 'cebra') {
          const { sound } = await Audio.Sound.createAsync(
            require('../assets/audios/esp/Cebra.wav')
          );
          setSound(sound);
          await sound.playAsync();
        }
        if (audio == 'gorila') {
          const { sound } = await Audio.Sound.createAsync(
            require('../assets/audios/esp/Gorila.wav')
          );
          setSound(sound);
          await sound.playAsync();
        }
        if (audio == 'rojo') {
          const { sound } = await Audio.Sound.createAsync(
            require('../assets/audios/esp/Rojo.wav')
          );
          setSound(sound);
          await sound.playAsync();
        }
        if (audio == 'amarillo') {
          const { sound } = await Audio.Sound.createAsync(
            require('../assets/audios/esp/Amarillo.wav')
          );
          setSound(sound);
          await sound.playAsync();
        }
        if (audio == 'azul') {
          const { sound } = await Audio.Sound.createAsync(
            require('../assets/audios/esp/Azul.wav')
          );
          setSound(sound);
          await sound.playAsync();
        }
        if (audio == 'verde') {
          const { sound } = await Audio.Sound.createAsync(
            require('../assets/audios/esp/Verde.wav')
          );
          setSound(sound);
          await sound.playAsync();
        }
        break;
      case "ing":
        if (audio == 'uno') {
          const { sound } = await Audio.Sound.createAsync(
            require('../assets/audios/ing/Uno.wav')
          );
          setSound(sound);
          await sound.playAsync();
        }
        if (audio == 'dos') {
          const { sound } = await Audio.Sound.createAsync(
            require('../assets/audios/ing/Dos.wav')
          );
          setSound(sound);
          await sound.playAsync();
        }
        if (audio == 'tres') {
          const { sound } = await Audio.Sound.createAsync(
            require('../assets/audios/ing/Tres.wav')
          );
          setSound(sound);
          await sound.playAsync();
        }
        if (audio == 'cuatro') {
          const { sound } = await Audio.Sound.createAsync(
            require('../assets/audios/ing/Cuatro.wav')
          );
          setSound(sound);
          await sound.playAsync();
        }
        if (audio == 'leon') {
          const { sound } = await Audio.Sound.createAsync(
            require('../assets/audios/ing/Leon.wav')
          );
          setSound(sound);
          await sound.playAsync();
        }
        if (audio == 'elefante') {
          const { sound } = await Audio.Sound.createAsync(
            require('../assets/audios/ing/Elefante.wav')
          );
          setSound(sound);
          await sound.playAsync();
        }
        if (audio == 'cebra') {
          const { sound } = await Audio.Sound.createAsync(
            require('../assets/audios/ing/Cebra.wav')
          );
          setSound(sound);
          await sound.playAsync();
        }
        if (audio == 'gorila') {
          const { sound } = await Audio.Sound.createAsync(
            require('../assets/audios/ing/Gorila.wav')
          );
          setSound(sound);
          await sound.playAsync();
        }
        if (audio == 'rojo') {
          const { sound } = await Audio.Sound.createAsync(
            require('../assets/audios/ing/Rojo.wav')
          );
          setSound(sound);
          await sound.playAsync();
        }
        if (audio == 'amarillo') {
          const { sound } = await Audio.Sound.createAsync(
            require('../assets/audios/ing/Amarillo.wav')
          );
          setSound(sound);
          await sound.playAsync();
        }
        if (audio == 'azul') {
          const { sound } = await Audio.Sound.createAsync(
            require('../assets/audios/ing/Azul.wav')
          );
          setSound(sound);
          await sound.playAsync();
        }
        if (audio == 'verde') {
          const { sound } = await Audio.Sound.createAsync(
            require('../assets/audios/ing/Verde.wav')
          );
          setSound(sound);
          await sound.playAsync();
        }
        break;
      case "por":
        if (audio == 'uno') {
          const { sound } = await Audio.Sound.createAsync(
            require('../assets/audios/por/Uno.wav')
          );
          setSound(sound);
          await sound.playAsync();
        }
        if (audio == 'dos') {
          const { sound } = await Audio.Sound.createAsync(
            require('../assets/audios/por/Dos.wav')
          );
          setSound(sound);
          await sound.playAsync();
        }
        if (audio == 'tres') {
          const { sound } = await Audio.Sound.createAsync(
            require('../assets/audios/por/Tres.wav')
          );
          setSound(sound);
          await sound.playAsync();
        }
        if (audio == 'cuatro') {
          const { sound } = await Audio.Sound.createAsync(
            require('../assets/audios/por/Cuatro.wav')
          );
          setSound(sound);
          await sound.playAsync();
        }
        if (audio == 'leon') {
          const { sound } = await Audio.Sound.createAsync(
            require('../assets/audios/por/Leon.wav')
          );
          setSound(sound);
          await sound.playAsync();
        }
        if (audio == 'elefante') {
          const { sound } = await Audio.Sound.createAsync(
            require('../assets/audios/por/Elefante.wav')
          );
          setSound(sound);
          await sound.playAsync();
        }
        if (audio == 'cebra') {
          const { sound } = await Audio.Sound.createAsync(
            require('../assets/audios/por/Cebra.wav')
          );
          setSound(sound);
          await sound.playAsync();
        }
        if (audio == 'gorila') {
          const { sound } = await Audio.Sound.createAsync(
            require('../assets/audios/por/Gorila.wav')
          );
          setSound(sound);
          await sound.playAsync();
        }
        if (audio == 'rojo') {
          const { sound } = await Audio.Sound.createAsync(
            require('../assets/audios/por/Rojo.wav')
          );
          setSound(sound);
          await sound.playAsync();
        }
        if (audio == 'amarillo') {
          const { sound } = await Audio.Sound.createAsync(
            require('../assets/audios/por/Amarillo.wav')
          );
          setSound(sound);
          await sound.playAsync();
        }
        if (audio == 'azul') {
          const { sound } = await Audio.Sound.createAsync(
            require('../assets/audios/por/Azul.wav')
          );
          setSound(sound);
          await sound.playAsync();
        }
        if (audio == 'verde') {
          const { sound } = await Audio.Sound.createAsync(
            require('../assets/audios/por/Verde.wav')
          );
          setSound(sound);
          await sound.playAsync();
        }
        break;
    }

  }

  return (
    <>
      {orientation === 'portrait' &&
        <View style={styles.container}>
          <StatusBar style='dark-content' />
          <View style={styles.exitButton}>
            <View style={styles.langButtomContainer}>
              <TouchableOpacity onPress={() => setLanguage('esp')}>
                <Icon name="spain" height="50" width="50" marginRight={10} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setLanguage('ing')}>
                <Icon name="united-kingdom" height="50" width="50" marginRight={10} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setLanguage('por')}>
                <Icon name="portugal" height="50" width="50" marginRight={30} />
              </TouchableOpacity>
            </View>
            <Text style={{ alignSelf: 'flex-start', marginRight: 20 }}>{language === 'esp' ? 'Idioma: Español' : language === 'ing' ? 'Language: English' : 'Língua: Português'}</Text>
            <TouchableOpacity onPress={handleSignOut}>
              <MaterialCommunityIcons name="door-closed-lock" size={28} color='#757ce8' />
            </TouchableOpacity>
          </View>
          <View style={styles.cardContainer}>
            {topic === 'numeros' && <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row' }}>
                <CardGame borderTopLeftRadius={15} text={language === 'esp' ? 'Uno' : language === 'ing' ? 'One' : 'Um'} imgUrl={require('../assets/uno.png')} imgStyle={styles.imgStyle} cardStyle={styles.cardStyle} textStyle={styles.textStyle} onPress={() => { playSound("uno", language) }} />
                <CardGame borderTopRightRadius={15} text={language === 'esp' ? 'Dos' : language === 'ing' ? 'Two' : 'Dois'} imgUrl={require('../assets/dos.png')} imgStyle={styles.imgStyle} cardStyle={styles.cardStyle} textStyle={styles.textStyle} onPress={() => { playSound("dos", language) }} />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <CardGame borderBottomLeftRadius={15} text={language === 'esp' ? 'Tres' : language === 'ing' ? 'Three' : 'Três'} imgUrl={require('../assets/tres.png')} cardStyle={styles.cardStyle} imgStyle={styles.imgStyle} textStyle={styles.textStyle} onPress={() => { playSound("tres", language) }} />
                <CardGame borderBottomRightRadius={15} text={language === 'esp' ? 'Cuatro' : language === 'ing' ? 'Four' : 'Quatro'} imgUrl={require('../assets/cuatro.png')} cardStyle={styles.cardStyle} imgStyle={styles.imgStyle} textStyle={styles.textStyle} onPress={() => { playSound("cuatro", language) }} />
              </View>
            </View>}
            {topic === 'animales' && <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row' }}>
                <CardGame borderTopLeftRadius={15} text={language === 'esp' ? 'Leon' : language === 'ing' ? 'Lion' : 'Leão'} imgUrl={require('../assets/leon.png')} imgStyle={styles.imgStyle} cardStyle={styles.cardStyle} textStyle={styles.textStyle} onPress={() => { playSound("leon", language) }} />
                <CardGame borderTopRightRadius={15} text={language === 'esp' ? 'Gorila' : language === 'ing' ? 'Gorilla' : 'Gorila'} imgUrl={require('../assets/gorila.png')} imgStyle={styles.imgStyle} cardStyle={styles.cardStyle} textStyle={styles.textStyle} onPress={() => { playSound("gorila", language) }} />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <CardGame borderBottomLeftRadius={15} text={language === 'esp' ? 'Cebra' : language === 'ing' ? 'Zebra' : 'Zebra'} imgUrl={require('../assets/cebra.png')} cardStyle={styles.cardStyle} imgStyle={styles.imgStyle} textStyle={styles.textStyle} onPress={() => { playSound("cebra", language) }} />
                <CardGame borderBottomRightRadius={15} text={language === 'esp' ? 'Elefante' : language === 'ing' ? 'Elephant' : 'Elefante'} imgUrl={require('../assets/elefante.png')} cardStyle={styles.cardStyle} imgStyle={styles.imgStyle} textStyle={styles.textStyle} onPress={() => { playSound("elefante", language) }} />
              </View>
            </View>}
            {topic === 'colores' && <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row' }}>
                <CardGame borderTopLeftRadius={15} text={language === 'esp' ? 'Amarillo' : language === 'ing' ? 'Yellow' : 'Amarelo'} imgUrl={require('../assets/circuloamarillo.png')} imgStyle={styles.imgStyle} cardStyle={styles.cardStyle} textStyle={styles.textStyle} onPress={() => { playSound("amarillo", language) }} />
                <CardGame borderTopRightRadius={15} text={language === 'esp' ? 'Rojo' : language === 'ing' ? 'Red' : 'Vermelho'} imgUrl={require('../assets/circulorojo.png')} imgStyle={styles.imgStyle} cardStyle={styles.cardStyle} textStyle={styles.textStyle} onPress={() => { playSound("rojo", language) }} />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <CardGame borderBottomLeftRadius={15} text={language === 'esp' ? 'Azul' : language === 'ing' ? 'Blue' : 'Azul'} imgUrl={require('../assets/circuloazul.png')} cardStyle={styles.cardStyle} imgStyle={styles.imgStyle} textStyle={styles.textStyle} onPress={() => { playSound("azul", language) }} />
                <CardGame borderBottomRightRadius={15} text={language === 'esp' ? 'Verde' : language === 'ing' ? 'Green' : 'Verde'} imgUrl={require('../assets/circuloverde.png')} cardStyle={styles.cardStyle} imgStyle={styles.imgStyle} textStyle={styles.textStyle} onPress={() => { playSound("verde", language) }} />
              </View>
            </View>}
          </View>
          <View>
            <FloatButton imgStyle={styles.topicImgStyle} width={'100%'} height={100} containerStyle={styles.btnContainerStyle} backgroundColor='red' imageSrc={require('../assets/numeros.jpg')} onPress={() => setTopic('numeros')} />
            <FloatButton imgStyle={styles.topicImgStyle} width={'100%'} height={100} containerStyle={styles.btnContainerStyle} backgroundColor='red' imageSrc={require('../assets/colours.jpg')} onPress={() => setTopic('colores')} />
            <FloatButton imgStyle={styles.topicImgStyle} width={'100%'} height={100} containerStyle={styles.btnContainerStyle} backgroundColor='red' imageSrc={require('../assets/banner-animales2.png')} onPress={() => setTopic('animales')} />
          </View>
        </View>
      }
      {orientation === 'landscape' &&
        <View style={styles.containerL}>
          <StatusBar style='dark-content' />
          <View style={styles.exitButtonL}>
            <View style={styles.langButtomContainerL}>
              <TouchableOpacity onPress={() => setLanguage('esp')}>
                <Icon name="spain" height="50" width="50" marginRight={10} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setLanguage('ing')}>
                <Icon name="united-kingdom" height="50" width="50" marginRight={10} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setLanguage('por')}>
                <Icon name="portugal" height="50" width="50" marginRight={30} />
              </TouchableOpacity>
            </View>
            <Text style={{ alignSelf: 'flex-start', marginRight: 20 }}>{language === 'esp' ? 'Idioma: Español' : language === 'ing' ? 'Language: English' : 'Língua: Português'}</Text>
            <TouchableOpacity onPress={handleSignOut}>
              <MaterialCommunityIcons name="door-closed-lock" size={28} color='#757ce8' />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <View>
              <FloatButton imgStyle={styles.topicImgStyleL} width={'100%'} height={50} containerStyle={styles.btnContainerStyle1} backgroundColor='red' imageSrc={require('../assets/numeros.jpg')} onPress={() => setTopic('numeros')} />
              <FloatButton imgStyle={styles.topicImgStyleL} width={'100%'} height={50} containerStyle={styles.btnContainerStyle2} backgroundColor='red' imageSrc={require('../assets/colours.jpg')} onPress={() => setTopic('colores')} />
              <FloatButton imgStyle={styles.topicImgStyleL} width={'100%'} height={50} containerStyle={styles.btnContainerStyle2} backgroundColor='red' imageSrc={require('../assets/banner-animales2.png')} onPress={() => setTopic('animales')} />
            </View>
            <View style={styles.cardContainerL}>
              {topic === 'numeros' && <View style={{ flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row' }}>
                  <CardGame borderTopLeftRadius={15} text={language === 'esp' ? 'uno' : language === 'ing' ? 'one' : 'um'} imgUrl={require('../assets/uno.png')} imgStyle={styles.imgStyle} cardStyle={styles.cardStyle} textStyle={styles.textStyle} onPress={() => { playSound("uno", language) }} />
                  <CardGame borderTopRightRadius={15} text={language === 'esp' ? 'dos' : language === 'ing' ? 'two' : 'dois'} imgUrl={require('../assets/dos.png')} imgStyle={styles.imgStyle} cardStyle={styles.cardStyle} textStyle={styles.textStyle} onPress={() => { playSound("dos", language) }} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <CardGame borderBottomLeftRadius={15} text={language === 'esp' ? 'tres' : language === 'ing' ? 'three' : 'três'} imgUrl={require('../assets/tres.png')} cardStyle={styles.cardStyle} imgStyle={styles.imgStyle} textStyle={styles.textStyle} onPress={() => { playSound("tres", language) }} />
                  <CardGame borderBottomRightRadius={15} text={language === 'esp' ? 'cuatro' : language === 'ing' ? 'four' : 'quatro'} imgUrl={require('../assets/cuatro.png')} cardStyle={styles.cardStyle} imgStyle={styles.imgStyle} textStyle={styles.textStyle} onPress={() => { playSound("cuatro", language) }} />
                </View>
              </View>}
              {topic === 'animales' && <View style={{ flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row' }}>
                  <CardGame borderTopLeftRadius={15} text={language === 'esp' ? 'Leon' : language === 'ing' ? 'Lion' : 'Leão'} imgUrl={require('../assets/leon.png')} imgStyle={styles.imgStyle} cardStyle={styles.cardStyle} textStyle={styles.textStyle} onPress={() => { playSound("leon", language) }} />
                  <CardGame borderTopRightRadius={15} text={language === 'esp' ? 'Gorila' : language === 'ing' ? 'Gorilla' : 'Gorila'} imgUrl={require('../assets/gorila.png')} imgStyle={styles.imgStyle} cardStyle={styles.cardStyle} textStyle={styles.textStyle} onPress={() => { playSound("gorila", language) }} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <CardGame borderBottomLeftRadius={15} text={language === 'esp' ? 'Cebra' : language === 'ing' ? 'Zebra' : 'Zebra'} imgUrl={require('../assets/cebra.png')} cardStyle={styles.cardStyle} imgStyle={styles.imgStyle} textStyle={styles.textStyle} onPress={() => { playSound("cebra", language) }} />
                  <CardGame borderBottomRightRadius={15} text={language === 'esp' ? 'Elefante' : language === 'ing' ? 'Elephant' : 'Elefante'} imgUrl={require('../assets/elefante.png')} cardStyle={styles.cardStyle} imgStyle={styles.imgStyle} textStyle={styles.textStyle} onPress={() => { playSound("elefante", language) }} />
                </View>
              </View>}
              {topic === 'colores' && <View style={{ flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row' }}>
                  <CardGame borderTopLeftRadius={15} text={language === 'esp' ? 'Amarillo' : language === 'ing' ? 'Yellow' : 'Amarelo'} imgUrl={require('../assets/circuloamarillo.png')} imgStyle={styles.imgStyle} cardStyle={styles.cardStyle} textStyle={styles.textStyle} onPress={() => { playSound("amarillo", language) }} />
                  <CardGame borderTopRightRadius={15} text={language === 'esp' ? 'Rojo' : language === 'ing' ? 'Red' : 'Vermelho'} imgUrl={require('../assets/circulorojo.png')} imgStyle={styles.imgStyle} cardStyle={styles.cardStyle} textStyle={styles.textStyle} onPress={() => { playSound("rojo", language) }} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <CardGame borderBottomLeftRadius={15} text={language === 'esp' ? 'Azul' : language === 'ing' ? 'Blue' : 'Azul'} imgUrl={require('../assets/circuloazul.png')} cardStyle={styles.cardStyle} imgStyle={styles.imgStyle} textStyle={styles.textStyle} onPress={() => { playSound("azul", language) }} />
                  <CardGame borderBottomRightRadius={15} text={language === 'esp' ? 'Verde' : language === 'ing' ? 'Green' : 'Verde'} imgUrl={require('../assets/circuloverde.png')} cardStyle={styles.cardStyle} imgStyle={styles.imgStyle} textStyle={styles.textStyle} onPress={() => { playSound("verde", language) }} />
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
    paddingTop: 30,
    paddingHorizontal: 12
  },
  content: {
    flexDirection: 'row',
  },
  exitButton: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    marginBottom: 30
  },
  exitButtonL: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    margin: 5
  },
  textLogout: {
    color: '#757ce8',
    fontSize: 10,
    position: 'absolute',
    top: 27,
  },
  btnContainerStyle: {
    marginTop: 5,
    height: 110,
    alignSelf: 'center',
    borderRadius: 15,
    width: 360
  },
  btnContainerStyle1: {
    marginTop: 26,
    marginRight: 20,
    alignSelf: 'center',
    borderRadius: 15,
    width: 380
  },
  btnContainerStyle2: {
    marginTop: 50,
    marginRight: 20,
    alignSelf: 'center',
    borderRadius: 15,
    width: 380
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
  },
  langButtomContainerL: {
    flexDirection: 'row',
    marginRight: 300,
    alignSelf: 'flex-start'
  },
  langImgStyle: {
    width: 50,
    height: 50
  },
  topicImgStyle: {
    width: 360,
    height: 110,
    borderRadius: 15,
    borderColor: 'grey',
    borderWidth: 1
  },
  topicImgStyleL: {
    width: 380,
    height: 100,
    borderRadius: 15,
    borderColor: 'grey',
    borderWidth: 1,
    padding: 5,
  },
  cardStyle: {
    width: '50%',
    height: '100%',
    borderColor: 'grey',
    borderWidth: 1,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  imgStyle: {
    width: 115,
    height: 115
  },
  textStyle: {
    color: '#726539',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});