import React from 'react';
import {TouchableOpacity} from 'react-native';
import ThemeOneOrderStatusCard from './ThemeOneOrderStatusCard';
import {useSelector} from 'react-redux';
import ScreenConst from '../../constants/ScreenConst';
import Navigator from '../../utils/Navigator';

export default function index(props) {
  const themeNumber = useSelector((state) => state.themeReducer.themeNumber);
  const language = useSelector((state) => state.userReducer.language);

  const onPressItem = () => {
    Navigator.navigate(ScreenConst.orderDetails, props.item);
  };

  switch (themeNumber) {
    case 1:
      return (
        <TouchableOpacity onPress={onPressItem}>
          <ThemeOneOrderStatusCard
            language={language}
            {...props}></ThemeOneOrderStatusCard>
        </TouchableOpacity>
      );
    default:
      return (
        <TouchableOpacity onPress={onPressItem}>
          <ThemeOneOrderStatusCard
            language={language}
            {...props}></ThemeOneOrderStatusCard>
        </TouchableOpacity>
      );
  }
}
