import React from 'react';
import {useSelector} from 'react-redux';

import ThemeOneUserProfile from './ThemeOneUserProfile';
export default function index(props) {
  const themeNumber = useSelector((state) => state.themeReducer.themeNumber);

  switch (themeNumber) {
    case 1:
      return <ThemeOneUserProfile {...props}></ThemeOneUserProfile>;

    default:
      return <ThemeOneUserProfile {...props}></ThemeOneUserProfile>;
  }
}
