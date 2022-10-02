import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, ImageBackground } from 'react-native';

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
  containerStyle,
  fondoUrl
}) => {
  return (
    <View style={containerStyle}>
      <TouchableOpacity style={[cardStyle, { borderTopLeftRadius, borderBottomLeftRadius, borderBottomRightRadius, borderTopRightRadius }]} onPress={onPress}>
        <ImageBackground source={fondoUrl} resizeMode="cover" style={styles.fondoStyle}>
          <Image source={imgUrl} style={imgStyle} />
          <Text style={textStyle}>{text}</Text>
        </ImageBackground>

      </TouchableOpacity>
    </View>

  );
};

const styles = StyleSheet.create({
  fondoStyle: {
    height: '100%',
    width: '100%',
  }
});

export default CardGame;