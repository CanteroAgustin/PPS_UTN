import React from 'react';
import { StyleSheet, Pressable, Text, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Button = ({
  title,
  iconColor = '#000',
  backgroundColor = '#000',
  titleColor = '#fff',
  titleSize = 14,
  onPress,
  width = '100%',
  containerStyle,
  disabled,
  image,
  leftIcon,
  textStyle,
  imageStyle,
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
              width
            },
            containerStyle
          ];
        }

        return [
          styles.base,
          {
            opacity: 1,
            backgroundColor,
            width
          },
          containerStyle
        ];
      }}
    >
      {leftIcon ? (
        <MaterialCommunityIcons
          name={leftIcon}
          size={20}
          color={iconColor}
          style={styles.leftIcon}
        />
      ) : null}
      <Text style={[textStyle, { color: titleColor, fontSize: titleSize }]}>
        {title}
      </Text>
      {image && <Image value={image} source={{ uri: image }} style={imageStyle} />}
    </Pressable >
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 42,
    borderRadius: 4,
    paddingHorizontal: 12
  }
});

export default Button;