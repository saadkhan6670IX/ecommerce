import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Header, VerticalList, RootView, FastImage , Text} from '../../components';
import {colors, commonstyles, metrics, scaleFont} from '../../utils/Theme';
import ImageConst from '../../constants/ImageConst';
import CardItemCard from '../../components/CartItemCard';
import {useSelector, useDispatch} from 'react-redux';

export default function ItemAdd() {
  const cartItems = useSelector((state) => state.cartReducer.items);
  //this component will be rendered if flatlish is empty
  const ListEmptyComponent = () => {
    return (
      <View
        style={{
          paddingTop: metrics.height * 0.1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FastImage
          style={{
            height: metrics.height * 0.5,
            width: '100%',
          }}
          source={ImageConst.emptyCart}></FastImage>
      </View>
    );
  };

  return (
    <RootView bottom={0}>
      <Header showDrawer showNotification title={'Item Add'}></Header>
      <View style={{flex: 1}}>
        <VerticalList
          bounces={false}
          ListEmptyComponent={ListEmptyComponent}
          data={cartItems}
          contentContainerStyle={{
            paddingHorizontal: metrics.defaultMargin,
            paddingVertical: metrics.smallMargin,
          }}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  marginBottom: metrics.defaultMargin,
                }}>
                <CardItemCard item={item}></CardItemCard>
              </View>
            );
          }}
        />
      </View>
      <View style={{...styles.bottomView}}>
        <Text style={{
          // fontWeight: '300',
           fontSize: scaleFont(14)}}>
          Want free delivery? Add SR 4 more
        </Text>
        <View style={styles.totalPriceContainer}>
          <View style={[styles.cartIcon]}>
            <FastImage
              style={styles.icon}
              source={ImageConst.addToCartIcon}></FastImage>
          </View>
          <View style={[styles.price]}>
            <Text style={styles.text}>SR 900</Text>
          </View>
          <View style={[styles.arrow]}>
            <FastImage
              style={styles.icon}
              source={ImageConst.arrorRightCircle}></FastImage>
          </View>
        </View>
      </View>
    </RootView>
  );
}

const styles = StyleSheet.create({
  bottomView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: metrics.smallMargin,
  },
  totalPriceContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: metrics.smallMargin,
  },
  cartIcon: {
    height: metrics.height * 0.07,
    width: metrics.height * 0.07,
  },
  price: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: metrics.width * 0.07,
  },
  text: {
    fontWeight: '600',
    fontSize: scaleFont(15),
  },
  icon: {width: '100%', height: '100%'},
  arrow: {
    height: metrics.height * 0.07,
    width: metrics.height * 0.07,
  },
});
