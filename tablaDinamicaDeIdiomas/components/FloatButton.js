import React from 'react';
import { StyleSheet, Pressable, Text, Image } from 'react-native';

const FloatButton = ({
  title,
  backgroundColor = '#000',
  titleColor = '#fff',
  titleSize = 14,
  onPress,
  containerStyle,
  disabled,
  imageSrc,
  width,
  height,
  imgStyle
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
              opacity: 0.5,
              backgroundColor,
              width,
              height
            },
            containerStyle
          ];
        }

        return [
          styles.base,
          {
            opacity: 1,
            backgroundColor,
            width,
            height,
          },
          containerStyle
        ];
      }}
    >
      {imageSrc && <Image style={imgStyle} source={imageSrc} />}
      {title && <Text style={[styles.text, { color: titleColor, fontSize: titleSize }]}>
        {title}
      </Text>}
    </Pressable >
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: '600'
  },
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
    minWidth: 50,
    paddingHorizontal: 12,
  },
  imgStyle: {
    width: 50,
    height: 50
  }
});

export default FloatButton;