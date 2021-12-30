import React, {useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {RootView, Header, FastImage, Button, Loader} from '../../../components';
import StringConst from '../../../constants/StringConst';
import {Text, Input} from '../../../components';
import {colors, metrics, commonstyles, scaleFont} from '../../../utils/Theme';

import CartItem from '../../../components/CartItemCard';
import PromoRemovalAlert from '../../../components/PromoRemovalAlert';

import CartCalculation from '../../../components/CartCalculation';
import Navigator from '../../../utils/Navigator';
import ScreenConst from '../../../constants/ScreenConst';
import {useDispatch, useSelector} from 'react-redux';
import ImageConst from '../../../constants/ImageConst';
import {useTranslation} from 'react-i18next';
import {removeDiscounts,emptyCart} from '../../../store/Cart/action';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ThemeOneViewCart(props) {
  const {appLoading, userSelectedOption, promoAlert, couponMessage} = props;
  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);
  const cartItems = useSelector((state) => state.cartReducer.items);
  const language = useSelector((state) => state.userReducer.language);

  const {t} = useTranslation();
  const {data, calculationloading, closePromoRemovalModal} = props;

  const dispatch = useDispatch();

  // to remove coupon code when there is no item on the cart.
  useEffect(() => {
    removeCouponCode();
    // alert('item removed')
  }, [cartItems.length === 0]);

  const onCheckoutPress = () => {
    if (isLoggedIn) {
      Navigator.navigate(ScreenConst.cartDetails);
    } else {
      Navigator.navigate(ScreenConst.login, {
        commingFrom: ScreenConst.viewCart,
      });
    }
  };

  const onContinueShoppingPress = () => {
    Navigator.navigate(ScreenConst.home);
  };

  const removeCouponCode = () => {
    dispatch(removeDiscounts());
  };

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
  
  const clearCart = () => {
    dispatch(emptyCart());
  }

  const ListCartItems = () => {
    return (
      <>
        <PromoRemovalAlert
          isVisible={promoAlert}
          couponMessage={couponMessage}
          toggleVisible={() => {
            closePromoRemovalModal(!promoAlert);
          }}
          onPress={() => {
            closePromoRemovalModal(false);
          }}
        />
        <ScrollView style={{flex: 1}}>
          <View>
            {appLoading ? (
              <View style={{height: metrics.height / 1.5}}>
                <Loader></Loader>
              </View>
            ) : (
              data && (
                <>
                  <View style={styles.headerRow}>
                      <Text style={styles.labelStyle}>{StringConst.Items}</Text>
                      <TouchableOpacity onPress={clearCart} activeOpacity={0.4}>
                        <Text style={styles.clearLabel}>{StringConst.ClearCart}</Text>
                      </TouchableOpacity>
                  </View>

                  {cartItems.map((val, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          marginRight: metrics.width * 0.02,
                          marginVertical: metrics.width * 0.02,
                        }}>
                        <CartItem appLoading={appLoading} item={val} />
                      </View>
                    );
                  })}
                  <CartCalculation
                    loader={calculationloading}
                    userSelectedOption={userSelectedOption}
                    orderDetails={{
                      sub_total: data?.sub_total,
                      // discount: data.discount,
                      delivery: data?.delivery,
                      VAT: data?.VAT,
                      freeDeliveryMessage: data?.text
                        ? data?.text[language]
                        : '',
                      total: data?.total,
                    }}
                  />
                </>
              )
            )}
          </View>
        </ScrollView>
        <View
          style={[
            commonstyles.spaceBetween,
            commonstyles.container,
            {paddingVertical: metrics.width * 0.02},
          ]}>
          <Button
            disabled={appLoading}
            onPress={onContinueShoppingPress}
            style={{
              ...styles.button,
              backgroundColor: colors.secondaryBtnBackcolor,
            }}
            textStyle={{
              ...styles.buttonTextStyle,
              color: colors.secondaryBtnTextcolor,
            }}
            text={t('continueShopping')}></Button>
          <Button
            disabled={appLoading}
            onPress={onCheckoutPress}
            style={{
              ...styles.button,
              backgroundColor: colors.primaryBtnBackcolor,
            }}
            textStyle={{
              ...styles.buttonTextStyle,
              color: colors.primaryBtnTextcolor,
            }}
            text={t('checkout')}></Button>
        </View>
      </>
    );
  };

  return (
    <RootView bottom={0}>
      <Header showDrawer showNotification title={StringConst.cart}></Header>
      {cartItems.length > 0 ? ListCartItems() : ListEmptyComponent()}
    </RootView>
  );
}

const styles = StyleSheet.create({
  button: {width: metrics.width * 0.46},
  buttonTextStyle: {
    fontSize: scaleFont(13),
    //  fontWeight: '500'
  },
  labelStyle: {
    fontSize: scaleFont(17),
    // fontWeight: '500',
    marginTop: metrics.height * 0.02,
    marginHorizontal: 20,
  },
  clearLabel :{
    fontSize: scaleFont(14),
    marginTop: metrics.height * 0.02,
    marginHorizontal: 20,
  },
  headerRow: {
    flexDirection : "row",
    justifyContent : 'space-between',
    alignItems : 'center'
  },
  inputField: {
    marginVertical: metrics.defaultMargin,
    width: metrics.width / 1.45,
    height: metrics.height / 21,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderColor: colors.grey,
    borderWidth: 0.2,
    top: 2,
  },
});
