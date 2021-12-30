import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { metrics, colors, scaleFont, commonstyles } from '../../utils/Theme';
import { FastImage, Text } from '..';
import ImageConst from '../../constants/ImageConst';

export default function index(props) {
  const { item, language, onPress } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={[styles.mainContainer, props.style]}>
      <View style={[styles.imageContainer, props.imageContainer]}>
        <FastImage
          cover
          style={[styles.image, props.imageStyle]}
          source={{ uri: item.image[language] }}
        ></FastImage>
      </View>
      <View style={styles.textContainer}>
        <Text
          medium
          numberOfLines={props.numberOfLines ? props.numberOfLines : 1}
          style={[styles.text, props.textStyle]}>
          {item.name[language]}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginRight: metrics.defaultMargin,
    // marginVertical: metrics.defaultMargin,
    width: metrics.width * 0.2,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 5,

    // padding: 15,

    marginBottom: 10,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...commonstyles.xsText,
    // fontWeight: '600',
    textAlign: 'center',
  },
  image: {
    height: metrics.width * 0.2,
    width: '100%',
    borderRadius: 20,
  },
});
