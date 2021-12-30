import React from 'react';
import { StyleSheet, View, TouchableOpacity, I18nManager } from 'react-native';
import { FastImage, Text } from '..';
import { colors, commonstyles, metrics, scaleFont } from '../../utils/Theme';
import Icon from 'react-native-vector-icons/Feather';
import ImageConst from '../../constants/ImageConst';
import { formateNumber } from '../../utils/Helpers';

export default function Card2(props) {
  const { language, onPress, item, style } = props;
  const { id, image, name, price, sale_price, description, rating, offer_text } =
    item;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.container, { ...style }]}>
      <FastImage cover style={styles.image} source={{ uri: image[language] }}
      >
        {/* <View
          style={{
            backgroundColor: colors.primary,
            position: 'absolute',
            bottom: 10,
            left: 10,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 20,
          }}>
          <Text style={{fontSize:scaleFont(10)}}>{offer_text[language]}</Text>
        </View> */}
      </FastImage>
      <View style={{ flexDirection: 'row', padding: 10 }}>
        <View style={{ flex: 4, alignItems: 'flex-start' }}>
          <Text
            numberOfLines={1}
            style={{
              ...commonstyles.xsText,
              marginBottom: 5,
              // fontWeight: 'bold',
            }}>
            {name[language]}
          </Text>
          <Text
            medium
            numberOfLines={1}
            style={{
              marginBottom: 5,
              color: colors.greyText,
            }}>
            {description[language]}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              numberOfLines={1}
              style={[
                {
                  fontSize: scaleFont(13),
                  // fontWeight: '600',
                  color: 'black',
                  marginRight: 5,
                },
                Number(sale_price) !== 0 && {
                  textDecorationLine: 'line-through',
                  color: 'black',
                  fontSize: scaleFont(13),
                },
              ]}>
              SR {formateNumber(price)}
            </Text>
            {Number(sale_price) !== 0 ? (
              <Text
                numberOfLines={1}
                style={[
                  {
                    fontSize: scaleFont(13),
                    // fontWeight: '600',
                    color: 'black',
                  },
                ]}>
                SR {formateNumber(sale_price)}
              </Text>
            ) : null}
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <View
            style={{
              padding: 5,
              backgroundColor: colors.primary,
              borderRadius: 50,
            }}>
            <Icon
              size={scaleFont(18)}
              style={{
                // fontWeight: 'bold',
                transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
              }}
              name={'chevron-right'}></Icon>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',

    width: '100%',
    marginRight: metrics.defaultMargin,
    // borderRadius: 20,
    // overflow: 'hidden',
    ...commonstyles.shadow,
  },
  image: {
    height: metrics.height * 0.3,
    backgroundColor: colors.primary,
    // borderRadius: 20,
  },
});
