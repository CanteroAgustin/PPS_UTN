import React from 'react';
import { StyleSheet, Pressable, Image, Dimensions } from 'react-native';

const win = Dimensions.get('window');

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
  img: {
    width: win.width / 2 - 4,
    height: win.height / 2,
    marginLeft: 2,
    marginRight: 2,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10
  }
});

export default BotonCosas;