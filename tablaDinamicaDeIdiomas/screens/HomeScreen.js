import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Dimensions, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import FloatButton from '../components/FloatButton';
import Firebase from '../config/firebase';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CardGame from '../components/CardGame';
import { Audio } from 'expo-av';

const auth = Firebase.auth();

export default function HomeScreen() {

  const [language, setLanguage] = useState('esp');
  const [topic, setTopic] = useState('animales');
  const [sound, setSound] = useState();
  const [activeLanguage, setActiveLanguage] = useState('esp');
  const [allLanguageActive, setAllLanguageActive] = useState(false);
  const [activeTopic, setActiveTopic] = useState('animales');
  const [allTopicActive, setAllTopicActive] = useState(false);

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

  const handleEsp = () => {
    setLanguage('esp')
    setActiveLanguage('esp')
    setAllLanguageActive(!allLanguageActive);
  }

  const handlePor = () => {
    setLanguage('por')
    setActiveLanguage('por')
    setAllLanguageActive(!allLanguageActive);
  }

  const handleEng = () => {
    setLanguage('ing')
    setActiveLanguage('eng')
    setAllLanguageActive(!allLanguageActive);
  }

  const handleAnimales = () => {
    setTopic('animales')
    setActiveTopic('animales')
    setAllTopicActive(!allTopicActive);
  }

  const handleNumeros = () => {
    setTopic('numeros')
    setActiveTopic('numeros')
    setAllTopicActive(!allTopicActive);
  }

  const handleColores = () => {
    setTopic('colores')
    setActiveTopic('colores')
    setAllTopicActive(!allTopicActive);
  }

  return (
    <>
      {orientation === 'portrait' &&
        <View style={styles.container}>
          <StatusBar style='dark-content' />
          <View style={styles.exitButton}>
            <View style={styles.touchableOpacityStyle}>
              <View style={styles.touchableOpacityStyle1}>
                {(activeLanguage == 'esp' || allLanguageActive) && <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleEsp}
                  style={styles.touchableOpacityStyle}>
                  <Image source={require('../assets/espaniol.png')}
                    style={styles.floatingButtonStyle}
                  />
                </TouchableOpacity>}
                {(activeLanguage == 'por' || allLanguageActive) && < TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handlePor}
                  style={styles.touchableOpacityStyle}>
                  <Image source={require('../assets/portuges.png')}
                    style={styles.floatingButtonStyle}
                  />
                </TouchableOpacity>}
                {(activeLanguage == 'eng' || allLanguageActive) && <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleEng}
                  style={styles.touchableOpacityStyle}>
                  <Image source={require('../assets/ingles.png')}
                    style={styles.floatingButtonStyle}
                  />
                </TouchableOpacity>}
              </View>
              <View style={styles.touchableOpacityStyle2}>
                {(activeTopic == 'animales' || allTopicActive) && <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleAnimales}
                  style={styles.touchableOpacityStyle}>
                  <Image source={require('../assets/animales-ic.png')}
                    style={styles.floatingButtonStyle}
                  />
                </TouchableOpacity>}
                {(activeTopic == 'numeros' || allTopicActive) && < TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleNumeros}
                  style={styles.touchableOpacityStyle}>
                  <Image source={require('../assets/numeros-ic.png')}
                    style={styles.floatingButtonStyle}
                  />
                </TouchableOpacity>}
                {(activeTopic == 'colores' || allTopicActive) && <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleColores}
                  style={styles.touchableOpacityStyle}>
                  <Image source={require('../assets/colores-ic.png')}
                    style={styles.floatingButtonStyle}
                  />
                </TouchableOpacity>}
              </View>
            </View>
            <View style={styles.doorStyle}>
              <TouchableOpacity onPress={handleSignOut}>
                <MaterialCommunityIcons name="door-closed-lock" size={38} color='#757ce8' />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.cardContainer}>
            {topic === 'numeros' && <View>
              <CardGame text={language === 'esp' ? 'Uno' : language === 'ing' ? 'One' : 'Um'} imgUrl={require('../assets/uno.png')} cardStyle={styles.cardStyle} imgStyle={styles.imgStyle} textStyle={styles.textStyle} onPress={() => { playSound("uno", language) }} />
              <CardGame text={language === 'esp' ? 'Dos' : language === 'ing' ? 'Two' : 'Dois'} imgUrl={require('../assets/dos.png')} cardStyle={styles.cardStyle} imgStyle={styles.imgStyle} textStyle={styles.textStyle} onPress={() => { playSound("dos", language) }} />
              <CardGame text={language === 'esp' ? 'Tres' : language === 'ing' ? 'Three' : 'Três'} imgUrl={require('../assets/tres.png')} cardStyle={styles.cardStyle} imgStyle={styles.imgStyle} textStyle={styles.textStyle} onPress={() => { playSound("tres", language) }} />
              <CardGame text={language === 'esp' ? 'Cuatro' : language === 'ing' ? 'Four' : 'Quatro'} imgUrl={require('../assets/cuatro.png')} cardStyle={styles.cardStyle} imgStyle={styles.imgStyle} textStyle={styles.textStyle} onPress={() => { playSound("cuatro", language) }} />
              <CardGame text={language === 'esp' ? 'Cuatro' : language === 'ing' ? 'Four' : 'Quatro'} imgUrl={require('../assets/cuatro.png')} cardStyle={styles.cardStyle} imgStyle={styles.imgStyle} textStyle={styles.textStyle} onPress={() => { playSound("cuatro", language) }} />
            </View>}
            {topic === 'animales' && <View>
              <CardGame text={language === 'esp' ? 'Leon' : language === 'ing' ? 'Lion' : 'Leão'} imgUrl={require('../assets/leon.png')} imgStyle={styles.imgStyle} cardStyle={styles.cardStyle} textStyle={styles.textStyle} onPress={() => { playSound("leon", language) }} />
              <CardGame text={language === 'esp' ? 'Gorila' : language === 'ing' ? 'Gorilla' : 'Gorila'} imgUrl={require('../assets/gorila.png')} imgStyle={styles.imgStyle} cardStyle={styles.cardStyle} textStyle={styles.textStyle} onPress={() => { playSound("gorila", language) }} />
              <CardGame text={language === 'esp' ? 'Cebra' : language === 'ing' ? 'Zebra' : 'Zebra'} imgUrl={require('../assets/cebra.png')} cardStyle={styles.cardStyle} imgStyle={styles.imgStyle} textStyle={styles.textStyle} onPress={() => { playSound("cebra", language) }} />
              <CardGame text={language === 'esp' ? 'Elefante' : language === 'ing' ? 'Elephant' : 'Elefante'} imgUrl={require('../assets/elefante.png')} cardStyle={styles.cardStyle} imgStyle={styles.imgStyle} textStyle={styles.textStyle} onPress={() => { playSound("elefante", language) }} />
              <CardGame text={language === 'esp' ? 'Elefante' : language === 'ing' ? 'Elephant' : 'Elefante'} imgUrl={require('../assets/elefante.png')} cardStyle={styles.cardStyle} imgStyle={styles.imgStyle} textStyle={styles.textStyle} onPress={() => { playSound("elefante", language) }} />
            </View>}
            {topic === 'colores' && <View>
              <CardGame text={language === 'esp' ? 'Amarillo' : language === 'ing' ? 'Yellow' : 'Amarelo'} imgUrl={require('../assets/circuloamarillo.png')} imgStyle={styles.imgStyle} cardStyle={styles.cardStyle} textStyle={styles.textStyle} onPress={() => { playSound("amarillo", language) }} />
              <CardGame text={language === 'esp' ? 'Rojo' : language === 'ing' ? 'Red' : 'Vermelho'} imgUrl={require('../assets/circulorojo.png')} imgStyle={styles.imgStyle} cardStyle={styles.cardStyle} textStyle={styles.textStyle} onPress={() => { playSound("rojo", language) }} />
              <CardGame text={language === 'esp' ? 'Azul' : language === 'ing' ? 'Blue' : 'Azul'} imgUrl={require('../assets/circuloazul.png')} cardStyle={styles.cardStyle} imgStyle={styles.imgStyle} textStyle={styles.textStyle} onPress={() => { playSound("azul", language) }} />
              <CardGame text={language === 'esp' ? 'Verde' : language === 'ing' ? 'Green' : 'Verde'} imgUrl={require('../assets/circuloverde.png')} cardStyle={styles.cardStyle} imgStyle={styles.imgStyle} textStyle={styles.textStyle} onPress={() => { playSound("verde", language) }} />
              <CardGame text={language === 'esp' ? 'Verde' : language === 'ing' ? 'Green' : 'Verde'} imgUrl={require('../assets/circuloverde.png')} cardStyle={styles.cardStyle} imgStyle={styles.imgStyle} textStyle={styles.textStyle} onPress={() => { playSound("verde", language) }} />
            </View>}
          </View>
        </View>
      }
      {
        orientation === 'landscape' &&
        <View style={styles.containerL}>
          <StatusBar style='dark-content' />
          <View style={styles.exitButtonL}>
            <View>
              <View style={styles.touchableOpacityStyle1}>
                {(activeLanguage == 'esp' || allLanguageActive) && <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleEsp}
                  style={styles.touchableOpacityStyle}>
                  <Image source={require('../assets/espaniol.png')}
                    style={styles.floatingButtonStyle}
                  />
                </TouchableOpacity>}
                {(activeLanguage == 'por' || allLanguageActive) && < TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handlePor}
                  style={styles.touchableOpacityStyle}>
                  <Image source={require('../assets/portuges.png')}
                    style={styles.floatingButtonStyle}
                  />
                </TouchableOpacity>}
                {(activeLanguage == 'eng' || allLanguageActive) && <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleEng}
                  style={styles.touchableOpacityStyle}>
                  <Image source={require('../assets/ingles.png')}
                    style={styles.floatingButtonStyle}
                  />
                </TouchableOpacity>}
              </View>
              <View style={styles.touchableOpacityStyle2}>
                {(activeTopic == 'animales' || allTopicActive) && <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleAnimales}
                  style={styles.touchableOpacityStyle}>
                  <Image source={require('../assets/animales-ic.png')}
                    style={styles.floatingButtonStyle}
                  />
                </TouchableOpacity>}
                {(activeTopic == 'numeros' || allTopicActive) && < TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleNumeros}
                  style={styles.touchableOpacityStyle}>
                  <Image source={require('../assets/numeros-ic.png')}
                    style={styles.floatingButtonStyle}
                  />
                </TouchableOpacity>}
                {(activeTopic == 'colores' || allTopicActive) && <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleColores}
                  style={styles.touchableOpacityStyle}>
                  <Image source={require('../assets/colores-ic.png')}
                    style={styles.floatingButtonStyle}
                  />
                </TouchableOpacity>}
              </View>
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
    paddingHorizontal: 5
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
    marginBottom: 3,
    justifyContent: 'space-between',
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
    height: 135,
    borderColor: 'grey',
    borderWidth: 2,
    backgroundColor: '#fbffd7',
    alignItems: 'center',
    borderRadius: 5,
    margin: 0.5
  },
  imgStyle: {
    //width: 115,
  },
  textStyle: {
    color: '#726539',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  touchableOpacityStyle: {
    flexDirection: 'row',
  },
  touchableOpacityStyle1: {
    flexDirection: 'row',
    marginRight: 10
  },
  touchableOpacityStyle2: {
    flexDirection: 'row',
  },
  floatingButtonStyle: {
    width: 50,
    height: 50,
  }
});