import React from 'react';
import { StyleSheet, Pressable, Image, Text } from 'react-native';

const BotonCosas = ({
  imgSrc,
  onPress,
  disabled,
  texto
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={args => {
        if (args.pressed) {
          return [
            styles.base,
            {
              opacity: 0.5
            }
          ];
        }

        return [
          styles.base,
          {
            opacity: 1
          }
        ];
      }}
    >
      <Image
        style={styles.img}
        source={imgSrc}
      />
      <Text
        style={styles.text}>
        {texto}
      </Text>
    </Pressable >
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
    height: 351,
    width: 385,
  },
  img: {
    height: 280,
    width: 325,
  },
  text: {
    flex: 1,
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2979ff',
    backgroundColor: 'lightblue',
    alignSelf: 'center',
    borderRadius: 20,
    marginBottom: 5,
    marginTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 5
  }
});

export default BotonCosas;