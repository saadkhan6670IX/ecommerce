import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import ThemeOneCustomerSupportCard from './ThemeOneCustomerSupportCard';
import Navigator from '../../utils/Navigator';
import ScreenConst from '../../constants/ScreenConst';

export default function index(props) {
  const onPressItem = () => {
    if (props.item.navigateToScreen) {
      Navigator.navigate(props.item.navigateToScreen);
    }
  };

  return (
    <TouchableOpacity onPress={() => onPressItem()}>
      <ThemeOneCustomerSupportCard {...props}></ThemeOneCustomerSupportCard>
    </TouchableOpacity>
  );
}
