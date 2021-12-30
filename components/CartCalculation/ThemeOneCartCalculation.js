import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, metrics, scaleFont, commonstyles } from '../../utils/Theme';
import { Text } from '../../components';
import { useTranslation } from 'react-i18next';
import { formateNumber } from '../../utils/Helpers';
import color from 'color';

export default function ThemeOneCartCalculation(props) {
  const {
    sub_total,
    discount,
    delivery,
    VAT,
    freeDeliveryMessage,
    total,
    loader,
    userSelectedOption
  } = props;
  const { t } = useTranslation();

  // converting data into array so that we can map the data
  const cartCalculationsArray = () => {
    let discoutObjArray = [{
      title: 'discount',
      amount: discount ? discount : 0.0,
      currency: 'SR',
    }]
    let cartObjArray =
      [
        {
          title: 'subTotal',
          amount: sub_total ? sub_total : 0.0,
          currency: 'SR',
        },
        {
          title: 'delivery',
          amount: delivery ? delivery : 0.0,
          currency: 'SR',
        },
        {
          title: 'VAT',
          amount: VAT ? VAT : 0.0,
          currency: 'SR',
        },
      ];

    if (discount != null) {
      cartObjArray = [...cartObjArray, ...discoutObjArray]
    }

    return cartObjArray
  };

  return (
    <View style={{ marginTop: metrics.smallMargin }}>
      <View>
        {cartCalculationsArray().map((val, index) => (
          <View key={index}>
            {userSelectedOption === 1 && val.title === "delivery" ? null :
              <>
                <View style={{ flexDirection: 'row', margin: metrics.width * 0.025 }}>
                  <Text regular style={styles.paymentDetailText}>
                    {'>>'}
                  </Text>
                  <Text regular style={styles.paymentDetailText}>
                    {t(val.title)}
                  </Text>
                  <Text regular style={{ ...styles.amountStyle, color: 'black' }}>
                    {loader
                      ? t(val.currency) + ' ' + 0
                      : val.amount === 'Free Delivery'
                        ? val.amount
                        : t(val.currency) + ' ' + formateNumber(val.amount)}
                  </Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    height: 0.5,
                    backgroundColor: colors.darkGray,
                    marginVertical: metrics.width * 0.02,
                  }}></View>
              </>}
          </View>
        ))}
      </View>
      {/* adding free delivery text option on cart base on data */}
      {freeDeliveryMessage ? (
        <View style={styles.wantFreeDelivery}>
          <Text regular style={styles.wantFreeDeliveryText}>
            {freeDeliveryMessage}
          </Text>
        </View>
      ) : null}
      <Text medium style={styles.totalText}>
        {t('total') + ' : '}
        <Text style={{ textDecorationLine: 'underline', color: 'black' }}>
          {loader ? t('SR') + ' ' + 0 : t('SR') + ' ' + formateNumber(total)}
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  paymentDetails: { paddingHorizontal: metrics.smallMargin },
  paymentDetailText: {
    fontSize: scaleFont(14),
    // fontWeight: '400',
    marginRight: metrics.largeMargin,
  },
  amountStyle: {
    fontSize: scaleFont(14),
    // fontWeight: '700',
    flex: 1,
    textAlign: 'right',
  },
  totalText: {
    fontSize: scaleFont(16),
    // fontWeight: '500',
    textAlign: 'right',
    margin: metrics.width * 0.025,
  },
  wantFreeDelivery: {
    alignSelf: 'flex-end',
    marginTop: metrics.width * 0.08,
    marginBottom: metrics.width * 0.02,
    marginHorizontal: metrics.width * 0.025,
  },
  wantFreeDeliveryText: {
    fontSize: scaleFont(13),
    // fontWeight: '500',
    color: colors.primaryLight,
  },
});
