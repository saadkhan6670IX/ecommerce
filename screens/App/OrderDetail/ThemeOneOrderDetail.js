import React, { useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { RootView, Header, Button, Loader } from '../../../components';

import { colors, metrics, commonstyles, scaleFont } from '../../../utils/Theme';
import { Text } from '../../../components';
// import CartItem from '../../../components/CartItemCard';

import CartCalculation from '../../../components/CartCalculation';
import { useSelector } from 'react-redux';
import ThemeOneOrderDetailItem from '../../../components/OrderDetailItem';
import { useTranslation } from 'react-i18next';
import GeneralConst from '../../../constants/General';
import color from 'color';
import Navigator from '../../../utils/Navigator';
import ScreenConst from '../../../constants/ScreenConst';

export default function ThemeOneViewCart(props) {
  // const cartItems = useSelector((state) => state.cartReducer.items);
  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);
  const language = useSelector((state) => state.userReducer.language);

  const { orderDetails, buttonLoader, orderID } = props;
  const { t } = useTranslation();

  console.log('orderDetails', orderDetails);

  const ListCartItems = () => {
    if (orderDetails) {
      return (
        <>
          <Header title={t('orderNo') + ': ' + orderDetails.view_order_id}></Header>
          <ScrollView style={{ ...commonstyles.container }}
            contentContainerStyle={{ paddingBottom: metrics.height / 20 }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: metrics.height * 0.01,
                marginHorizontal: metrics.width * 0.03,
              }}>
              <Text style={styles.labelStyle}>{t('items')}</Text>

              <View
                style={[
                  styles.orderStatus,
                  {
                    backgroundColor: orderDetails.order_type === GeneralConst.optionType.Delivery ? GeneralConst.orderStatus[orderDetails.status.id].color : GeneralConst.orderStatusPickup[orderDetails.status.id].color
                  },

                ]}>
                <Text style={styles.status}>
                  {orderDetails.order_type === GeneralConst.optionType.Delivery ? GeneralConst.orderStatus[orderDetails.status.id].title[language] : GeneralConst.orderStatusPickup[orderDetails.status.id].title[language]}
                </Text>
              </View>
            </View>

            {props.orderDetails.items.map((val, index) => (
              <View
                key={index}
                style={{
                  marginRight: metrics.width * 0.02,
                  marginVertical: metrics.width * 0.02,
                }}>
                <ThemeOneOrderDetailItem item={val} />
              </View>
            ))}

            <CartCalculation orderDetails={orderDetails} />

            <View
              style={[
                commonstyles.spaceBetween,
                { marginVertical: metrics.height * 0.02 },
              ]}>
              <Button
                loading={buttonLoader}
                onPress={props.onReorderPress}
                style={{
                  ...styles.button,
                  backgroundColor: colors.secondaryBtnBackcolor,
                }}
                textStyle={{ ...styles.buttonTextStyle, color: colors.secondaryBtnTextcolor }}
                text={t('reOrder')}></Button>
              {
                <Button
                  disabled={
                    Number(orderDetails.status.id) === 5 ||
                    orderDetails.delivery_option == 2 || Number(orderDetails.status.id) === 0
                  }
                  onPress={props.onTrackOrderPress}
                  style={styles.button}
                  textStyle={styles.buttonTextStyle}
                  text={t('trackOrder')}></Button>
              }
            </View>

            <Button
              // loading={buttonLoader}
              onPress={() => {
                Navigator.push(ScreenConst.customerSupport, { screen: ScreenConst.mySupportTickets, params: { 'order_no': props.route.params?.order_no} })
              }}
              style={{
                // ...styles.button,
                backgroundColor: colors.secondaryBtnBackcolor,
              }}
              textStyle={{ ...styles.buttonTextStyle, color: colors.secondaryBtnTextcolor }}
              text={t('customerSupport')}></Button>


            {Number(orderDetails.status.id) === 0 ? <Text medium style={styles.totalText}>Your order is not accepted by the merchant yet</Text> : orderDetails.delivery_option == 2 ? <Text medium style={styles.totalText}>
              Your Order will be delivered on {orderDetails.order_date} between {orderDetails.order_time} time slot
              </Text> : null
            }

          </ScrollView >
        </>
      );
    }
  };

  return (
    <RootView bottom={0}>
      {props.loader ? <Loader></Loader> : ListCartItems()}
    </RootView>
  );
}

const styles = StyleSheet.create({
  button: { width: metrics.width * 0.46 },
  buttonTextStyle: { fontSize: scaleFont(14), fontWeight: '500' },
  labelStyle: {
    fontSize: scaleFont(17),
    // fontWeight: '500',
  },
  orderStatus: {
    marginVertical: 5,
    backgroundColor: 'orange',
    width: metrics.width / 2.5,
    height: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  status: {
    fontSize: scaleFont(12),
    // fontWeight: '300',
    margin: 5,
    textAlign: 'center',
    color: 'white',
    alignSelf: 'center',
  },
  totalText: {
    fontSize: scaleFont(16),
    // fontWeight: '500',
    textAlign: 'center',
    margin: metrics.width * 0.025,
  },
});
