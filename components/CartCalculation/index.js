import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ThemeOneCartCalculation from './ThemeOneCartCalculation';

export default function index(props) {
  const {orderDetails} = props;
  return (
    <ThemeOneCartCalculation
      sub_total={orderDetails.sub_total}
      discount={orderDetails.discount}
      delivery={orderDetails.delivery}
      VAT={orderDetails.VAT}
      freeDeliveryMessage={orderDetails.freeDeliveryMessage}
      total={orderDetails.total}
      {...props}></ThemeOneCartCalculation>
  );
}
