import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ThemeOnePaymentCard from './ThemeOnePaymentCard';

export default function index(props) {
  //this file will work as a wrapper around cart's itemcard
  //this will work like controller
  //place all bussiness logic here

  return <ThemeOnePaymentCard {...props}></ThemeOnePaymentCard>;
}
