import React from 'react';
import ThemeOneLocationChangeAlert from './ThemeOneLocationChangeAlert';

import {useSelector} from 'react-redux';

export default function index(props) {
  const themeNumber = useSelector((state) => state.themeReducer.themeNumber);

  switch (themeNumber) {
    case 1:
      return <ThemeOneLocationChangeAlert {...props}></ThemeOneLocationChangeAlert>;

    default:
      return <ThemeOneLocationChangeAlert {...props}></ThemeOneLocationChangeAlert>;
  }
}
