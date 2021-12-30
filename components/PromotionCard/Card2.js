import React from 'react';
import {StyleSheet, View} from 'react-native';
import { Text } from '../../components'
import {colors, commonstyles, metrics, scaleFont} from '../../utils/Theme';
import {FastImage} from '../../components';
import Icon from 'react-native-vector-icons/Feather';

export default function Card2(props) {
  const {image, productname, description, discount} = props.item;
  return (
    <View>
      <FastImage style={{width: '100%', height: '100%'}} cover source={image}>
        <View style={{...styles.container}}>
          <Text numberOfLines={1} style={{...styles.discountText}}>
            {discount || 0} % off on
          </Text>
          <Text numberOfLines={2} style={{...styles.title}}>
            {productname}
          </Text>
        </View>
      </FastImage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '50%',
    padding: metrics.defaultMargin,
  },
  title: {
    fontSize: scaleFont(22),
    // fontWeight: 'bold',
    color: 'white',
  },
  discountText: {
    fontSize: scaleFont(15),
    // fontWeight: '600',
    color: 'white',
  },
});
