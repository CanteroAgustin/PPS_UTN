import React from 'react';
import { StyleSheet, Pressable, Image } from 'react-native';

const BotonCosas = ({
  imgSrc,
  onPress,
  disabled
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
  base: { alignItems: 'center' },
  img: {
    height: 351,
    width: 385,
    borderWidth: 2,
    borderColor: 'black',
  }
});

export default BotonCosas;