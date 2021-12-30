import React, {useEffect, useState} from 'react';
import ThemeOnePromotion from './ThemeOnePromotions';
import {useSelector} from 'react-redux';
import {getPromotion} from '../../../services/Discount';

import { useIsFocused } from '@react-navigation/native';
import { LayoutAnimation } from 'react-native';


export default function index(props) {
  const isFocused = useIsFocused();
  const [promotions, setpromotions] = useState([]);
  const themeNumber = useSelector((state) => state.themeReducer.themeNumber);
    const language = useSelector((state) => state.userReducer.language);

  useEffect(() => {
    if (isFocused) {
    getPromotion().then((response) => {
      // filtering data to only when we have image...
      let promotions = response?.data?.data.filter((item) => (item?.image != null && item?.image[language] != null && item?.image[language] !== '' )) 

      setpromotions(promotions);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    });
  }
  }, [isFocused]);

  switch (themeNumber) {
    case 1:
      return (
        <ThemeOnePromotion
          promotions={promotions}
          {...props}></ThemeOnePromotion>
      );

    default:
      return (
        <ThemeOnePromotion
          promotions={promotions}
          {...props}></ThemeOnePromotion>
      );
  }
}
