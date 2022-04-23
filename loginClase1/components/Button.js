import React from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';

const Button = ({
  title,
  backgroundColor = '#000',
  titleColor = '#fff',
  titleSize = 14,
  titleWeight = '600',
  onPress,
  width = '100%',
  containerStyle,
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
      <Text style={[{ color: titleColor, fontSize: titleSize, fontWeight: titleWeight }]}>
        {title}
      </Text>
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