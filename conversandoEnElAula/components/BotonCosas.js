import React from 'react';
import { StyleSheet, Pressable, Image, Text } from 'react-native';

const BotonCosas = ({
  imgSrc,
  onPress,
  disabled,
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
    </Pressable >
  );
};

const styles = StyleSheet.create({
  base: {
    margin: 5,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
    height: 340,
    width: 370,
    borderRadius: 25
  },
  img: {
    height: 336,
    width: 366,
    borderRadius: 23
  }
});

export default BotonCosas;