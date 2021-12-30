import React from 'react';
import ThemeOnePromoRemovalAlert from './ThemeOnePromoRemovalAlert';

import {useSelector} from 'react-redux';

export default function index(props) {
  const themeNumber = useSelector((state) => state.themeReducer.themeNumber);

  switch (themeNumber) {
    case 1:
      return <ThemeOnePromoRemovalAlert {...props}></ThemeOnePromoRemovalAlert>;

    default:
      return <ThemeOnePromoRemovalAlert {...props}></ThemeOnePromoRemovalAlert>;
  }
}
