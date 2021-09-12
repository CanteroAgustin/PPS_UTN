import React, { useEffect, useRef } from 'react';
import {
  SafeAreaView,
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Animated,
  ImageBackground
} from 'react-native';

export default function SplashScreen({ navigation }) {

  const moveAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnimText = useRef(new Animated.Value(0)).current;
  const moveLeftAnim = useRef(new Animated.Value(0)).current;
  const movebottomTextAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(moveAnim, {
        duration: 2000,
        toValue: Dimensions.get('window').width / 1.6,
        delay: 0,
        useNativeDriver: false,
      }),
      Animated.timing(moveAnim, {
        duration: 2000,
        toValue: 0,
        delay: 0,
        useNativeDriver: false,
      }),
    ]).start();
    Animated.timing(fadeAnim, {
      duration: 2000,
      toValue: 1,
      delay: 2000,
      useNativeDriver: false,
    }).start();
    Animated.timing(fadeAnimText, {
      duration: 2000,
      toValue: 1,
      delay: 1000,
      useNativeDriver: false,
    }).start();
    Animated.timing(moveLeftAnim, {
      duration: 1000,
      toValue: Dimensions.get('window').width / 4,
      delay: 0,
      useNativeDriver: false,
    }).start();
    Animated.timing(movebottomTextAnim, {
      duration: 1000,
      toValue: Dimensions.get('window').width / 2.4,
      delay: 0,
      useNativeDriver: false,
    }).start();
  }, [moveAnim, fadeAnim, fadeAnimText, moveLeftAnim, movebottomTextAnim]);

  setTimeout(() => {
    navigation.navigate('Login');
  }, 5000)
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../assets/fondo.jpg')} resizeMode="cover" style={styles.fondo}>
        <Animated.View style={[styles.logoContainer, { marginLeft: moveLeftAnim }]}>
          <Text style={[styles.nameText]}>Cantero Agustin</Text>
        </Animated.View>
        <View style={styles.contentContainer}>
          <Animated.Text style={[styles.text, { opacity: fadeAnimText }]}>
            Administracion
          </Animated.Text>
          <Animated.Text style={[styles.text, { opacity: fadeAnimText }]}>
            de
          </Animated.Text>
          <Animated.Text style={[styles.text, { opacity: fadeAnimText }]}>
            usuarios.
          </Animated.Text>
          <Animated.Image
            style={[styles.image, { opacity: fadeAnim }]}
            source={require('../assets/adaptive-icon.png')}
          />
          <Animated.View style={[styles.logoContainer, { marginLeft: moveAnim }]}>
            <Text style={[styles.logoText]}>P</Text>
            <Animated.Text style={[styles.logoText, { opacity: fadeAnim }]}>
              psDev
            </Animated.Text>
          </Animated.View>
        </View>
        <Animated.View style={[styles.logoContainer, { marginLeft: movebottomTextAnim }]}>
          <Text style={[styles.bottomText]}>4° ‘B’</Text>
        </Animated.View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  fondo: {
    flex: 1,
    justifyContent: "center"
  },
  logoText: {
    fontSize: 35,
    color: '#DEFF12',
    fontWeight: '700',
  },
  contentContainer: {
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  logoContainer: {
    top: 0,
    flexDirection: 'row',
  },
  text: {
    alignItems: 'center',
    fontSize: 35,
    color: '#DEFF12',
    fontWeight: '700',
  },
  nameText: {
    marginBottom: 100,
    alignItems: 'center',
    fontSize: 26,
    color: '#FFF',
    fontWeight: '700',
  },
  bottomText: {
    paddingTop: 100,
    alignItems: 'center',
    fontSize: 26,
    color: '#FFF',
    fontWeight: '700',
  }
});