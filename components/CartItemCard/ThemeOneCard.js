import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {FastImage, QuantityView} from '..';
import {colors, metrics, scaleFont} from '../../utils/Theme';
import ImageConst from '../../constants/ImageConst';
import {addItem, deleteItem} from '../../store/Cart/action';
import {useSelector} from 'react-redux';
import Navigator from '../../utils/Navigator';
import ScreenConst from '../../constants/ScreenConst';
import {Text} from '../../components';
import {formateNumber} from '../../utils/Helpers';

export default function ItemCard(props) {
  const {
    item,
    onPlusIconPress,
    onMinusIconPress,
    onCrossIconPress,
    onItemPress,
    quantity,
    appLoading,
    summedProductPrice,
  } = props;

  console.log('SUmmed PRICE:', summedProductPrice);

  const language = useSelector((state) => state.userReducer.language);

  return (
    <TouchableOpacity onPress={onItemPress} activeOpacity={0.8}>
      <View style={{...styles.container}}>
        <View style={{...styles.left}}>
          <FastImage
            cover
            style={styles.image}
            source={{uri: item.image[language]}}></FastImage>
        </View>
        <View style={{...styles.right}}>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 5,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text
                  style={{
                    ...styles.text,
                    width: metrics.width / 2,
                  }}>
                  {item.name[language]}
                </Text>
              </View>
              <TouchableOpacity
                onPress={onCrossIconPress}
                // style={{justifyContent: 'center'}}
              >
                <FastImage
                  style={{
                    width: metrics.width * 0.06,
                    height: metrics.width * 0.06,
                  }}
                  source={ImageConst.crossIcon}></FastImage>
              </TouchableOpacity>
            </View>

            {item?.type &&
              (item?.type == 'combo' ? (
                <Text
                  // numberOfLines={6}
                  regular
                  style={{
                    ...styles.text2,
                    width: metrics.width / 2.5,
                    color: colors.primaryLight,
                  }}>
                  {item.products ? item.products?.toString() : ''}
                </Text>
              ) : (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    paddingTop: metrics.height / 100,
                  }}>
                  <Text
                    regular
                    style={{
                      ...styles.text2,
                      width: metrics.width / 2.5,
                      color: colors.primaryLight,
                    }}>
                    {item?.variation?.name
                      ? item?.variation?.name[language]
                      : 'combo'}
                  </Text>
                  {/* </View> */}
                  <Text
                    regular
                    style={{
                      ...styles.text2,
                      color: colors.primaryLight,
                    }}>
                    {item?.variation?.sale_price == 0
                      ? 'Free'
                      : `SR ${formateNumber(item?.variation?.sale_price)}`}
                  </Text>
                </View>
              ))}
            {item.add_ons.map((v) => (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}>
                {/* <View style={{ flex: 1, justifyContent: 'center' }}> */}
                <Text
                  regular
                  style={{
                    ...styles.text2,
                    width: metrics.width / 2.5,
                    color: colors.primaryLight,
                  }}>
                  {v.title[language]}
                </Text>
                {/* </View> */}
                <Text
                  regular
                  style={{
                    ...styles.text2,
                    color: colors.primaryLight,
                  }}>
                  {v.price == 0 ? 'Free' : `SR ${formateNumber(v.price)}`}
                </Text>
              </View>
            ))}
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                paddingTop: metrics.height / 100,
              }}>
              {/* <Text style={{ ...styles.amountStyle, color: 'gray', textDecorationLine: 'line-through', marginRight: 10 }}>
                {item?.total_product_price != 0 ? `SR ${formateNumber(item?.total_product_price)}` : 'Free'}
              </Text> */}

              {/* <Text style={{...styles.text, color: 'black'}}>
                {item.product_price != 0
                  ? `SR ${formateNumber(item.product_price)}`
                  : 'Free'}
              </Text> */}

              <Text style={{...styles.text, color: 'black'}}>
                {item.product_price != 0
                  ? `SR ${formateNumber(summedProductPrice)}`
                  : 'Free'}
              </Text>
            </View>
            <Text style={styles.text}>{item?.discount_text}</Text>

            {item?.product_price !== 0 ? (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  paddingTop: metrics.height / 100,
                }}>
                <QuantityView
                  onMinus={onMinusIconPress}
                  onAdd={onPlusIconPress}
                  value={item.quantity}></QuantityView>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {flexDirection: 'row', backgroundColor: 'white'},
  left: {flex: 2, zIndex: 10, padding: 10},
  right: {
    paddingVertical: 10,
    flex: 4,
    backgroundColor: 'white',
    // marginLeft: -metrics.width * 0.25,
    borderRadius: 10,
    flexDirection: 'row',
    paddingRight: 10,
    // paddingLeft: metrics.width * 0.25,
  },
  image: {
    width: '100%',
    height: metrics.height * 0.13,
    borderRadius: metrics.width / 60,
  },
  text: {
    fontSize: scaleFont(15),
    textAlign: 'left',
  },
  amountStyle: {
    fontSize: scaleFont(15),
    textAlign: 'left',
  },
  text2: {
    fontSize: scaleFont(14),
    textAlign: 'left',
    color: colors.primaryLight,
  },
});
