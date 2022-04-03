import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

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
}) => {
  return (
    <View style={[cardStyle, { borderTopLeftRadius, borderBottomLeftRadius, borderBottomRightRadius, borderTopRightRadius }]}>
      <Image source={imgUrl} style={imgStyle} />
      <Text style={textStyle}>{text}</Text>
    </View >
  );
};

const styles = StyleSheet.create({

});

export default CardGame;