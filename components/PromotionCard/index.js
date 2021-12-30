import React from 'react';
import {useSelector} from 'react-redux';
import Card1 from './Card1';
import Navigator from '../../utils/Navigator';
import {TouchableOpacity} from 'react-native';
import ScreenConst from '../../constants/ScreenConst';

export default function index(props) {
  const themeNumber = useSelector((state) => state.themeReducer.themeNumber);
  const {isCombo} = props;
  const onPress = (props) => {
    if (isCombo) {
      Navigator.navigate(ScreenConst.itemDetails, {
        item: props.item,
        isFromCombo: true,
      });
    } else {
      Navigator.navigate(ScreenConst.allProducts, {
        discountId: props?.item?.id,
      });
    }
  };

  switch (themeNumber) {
    case 1:
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            onPress(props);
          }}>
          <Card1 {...props}></Card1>
        </TouchableOpacity>
      );
    default:
      return (
        <TouchableOpacity onPress={onPress}>
          <Card1 {...props}></Card1>
        </TouchableOpacity>
      );
  }
}
