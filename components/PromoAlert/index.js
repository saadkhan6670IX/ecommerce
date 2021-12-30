import React from 'react';
import ThemeOnePromoAlert from './ThemeOnePromoAlert';

import { useSelector } from 'react-redux';

export default function index(props) {
  const themeNumber = useSelector((state) => state.themeReducer.themeNumber);
  const language = useSelector((state) => state.userReducer.language);

  switch (themeNumber) {
    case 1:
      return <ThemeOnePromoAlert language={language} {...props}></ThemeOnePromoAlert>;

    default:
      return <ThemeOnePromoAlert language={language}  {...props}></ThemeOnePromoAlert>;
  }
}
