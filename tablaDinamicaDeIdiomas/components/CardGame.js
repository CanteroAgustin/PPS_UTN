import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

const CardGame = ({
  imgUrl,
  textStyle,
  cardStyle,
  imgStyle,
  text,
  borderTopLeftRadius,
  borderBottomLeftRadius,
  borderTopRightRadius,
  borderBottomRightRadius,
  onPress,
}) => {
  return (
    <View style={[cardStyle, { borderTopLeftRadius, borderBottomLeftRadius, borderBottomRightRadius, borderTopRightRadius }]}>
      <TouchableOpacity onPress={onPress}>
        <Image source={imgUrl} style={imgStyle} />
        <Text style={textStyle}>{text}</Text>
      </TouchableOpacity>

    </View >
  );
};

const styles = StyleSheet.create({

});

export default CardGame;