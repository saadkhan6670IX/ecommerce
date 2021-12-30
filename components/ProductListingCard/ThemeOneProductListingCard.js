import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Button, FastImage, QuantityView } from '..';
import { colors, commonstyles, metrics, scaleFont } from '../../utils/Theme';
import { Rating, AirbnbRating } from 'react-native-elements';

import { useSelector, useDispatch } from 'react-redux';
import Navigator from '../../utils/Navigator';
import ScreenConst from '../../constants/ScreenConst';
import { Text } from '../../components';
import { getTranslatedText } from '../../services/General';
import { useTranslation } from 'react-i18next';
import ImageConst from '../../constants/ImageConst';
import { formateNumber } from '../../utils/Helpers';

export default function Card1(props) {
  const {
    id,
    image,
    name,
    description,
    price,
    hasaddon,
    offer_text,
    rating,
    sale_price,
  } = props.item;

  const language = useSelector((state) => state.userReducer.language);
  const dispatch = useDispatch();

  const [quantity, setquantity] = useState(0);

  const [addToCart, setAddToCart] = useState(getTranslatedText('addToCart'));

  const onPlusIconPress = () => { };

  const onMinusIconPress = () => { };

  const { t } = useTranslation();

  const NavigateToDetails = () => {
    Navigator.navigate(ScreenConst.itemDetails, { item: props.item });
  };

  const onAddToCartPress = () => {
    NavigateToDetails();
    // setquantity((prev) => prev + 1);
  };

  const hasDiscount = Number(sale_price) !== Number(price);

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => NavigateToDetails()}
        style={[styles.container, props.style]}>
        <FastImage cover style={styles.image} source={{ uri: image[language] }}>
          {/* {offer_text[language] && (
            <View
              style={{
                backgroundColor: colors.primary,
                bottom: '15%',
                padding: scaleFont(3),
                position: 'absolute',
                borderTopRightRadius: 6,
                borderBottomRightRadius: 6,
              }}>
              <Text
                style={{
                  // fontWeight: '600',
                  fontSize: scaleFont(12),
                }}>
                {offer_text[language]}
              </Text>
            </View>
          )} */}
        </FastImage>
        <View style={{ flexDirection: 'row', paddingTop: 10 }}>
          <View style={{ flex: 4 }}>
            <Text
              numberOfLines={1}
              style={{
                ...commonstyles.xsText,
                // marginBottom: metrics.height * 0.01,
                // fontWeight: 'bold',
                textAlign: 'left',
              }}>
              {name[language]}
            </Text>

            <View style={commonstyles.spaceBetween}>
              <View>
                <Text
                  numberOfLines={1}
                  style={[
                    {
                      fontSize: scaleFont(12),
                      textTransform: 'uppercase',
                      color: 'black'
                    },

                    hasDiscount && {
                      textDecorationLine: 'line-through',
                      color: colors.grey,
                    },
                  ]}>
                  {t('SR') + ' ' + formateNumber(price)}
                </Text>
                {hasDiscount ? (
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: scaleFont(12),
                      textTransform: 'uppercase',
                      color: 'black'

                    }}>
                    {t('SR') + ' ' + formateNumber(sale_price)}
                  </Text>
                ) : null}
              </View>
              <Rating
                type={'custom'}
                ratingColor={colors.primaryBtnBackcolor}
                tintColor={colors.background}
                ratingBackgroundColor={colors.darkGray}
                ratingCount={5}
                imageSize={scaleFont(16)}
                minValue={1}
                startingValue={rating}
                readonly={true}
                style={{ paddingVertical: 10 }}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <View
        style={{
          height: metrics.height * 0.04,
          marginTop: metrics.height * 0.002,
        }}>
        {quantity === 0 ? (
          <Button
            onPress={onAddToCartPress}
            textStyle={{ fontSize: scaleFont(13) }}
            text={addToCart}></Button>
        ) : (
            <QuantityView
              quantityStyle={{ fontSize: scaleFont(15) }}
              iconSize={26}
              onMinus={onMinusIconPress}
              onAdd={onPlusIconPress}
              value={quantity}></QuantityView>
          )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white',

    width: '100%',
    marginRight: metrics.defaultMargin,
    borderRadius: 20,
    // overflow: 'hidden',
    // ...commonstyles.shadow,
  },
  image: {
    height: metrics.width / 2.3,
    // width: metrics.width / 2.3 ,
    // backgroundColor: colors.primary,
    borderRadius: 20,
  },
});
