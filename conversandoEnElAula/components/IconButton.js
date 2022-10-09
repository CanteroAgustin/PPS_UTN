import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const IconButton = ({ color, size, onPress, name, disabled, backgroundColor = 'transparent' }) => {
  return (
    <Pressable
      style={args => {
        if (args.pressed) {
          return [
            styles.base,
            {
              opacity: 0.5,
              backgroundColor
            }
          ];
        }

        return [styles.base, { opacity: 1, backgroundColor }];
      }}
      onPress={onPress}
      disabled={disabled}
    >
      <AntDesign name={name} size={size} color={color} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-end',
    borderRadius: 100,
    marginBottom: 24,
    width: 60,
    alignItems: 'center'
  }
});

export default IconButton;