import React from 'react';
import ThemeOneBottomTabBar from './ThemeOneBottomTabBar';

import {useSelector} from 'react-redux';

export default function index(props) {
  const themeNumber = useSelector((state) => state.themeReducer.themeNumber);

  switch (themeNumber) {
    case 1:
      return <ThemeOneBottomTabBar {...props}></ThemeOneBottomTabBar>;

    default:
      return <ThemeOneBottomTabBar {...props}></ThemeOneBottomTabBar>;
  }
}
