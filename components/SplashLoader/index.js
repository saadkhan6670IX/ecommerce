import React from 'react';
import ThemeOneSplash from './ThemeOneSplashLoader';
import {useSelector} from 'react-redux';

export default function index(props) {
  const themeNumber = useSelector((state) => state.themeReducer.themeNumber);

  switch (themeNumber) {
    case 1:
      return <ThemeOneSplash {...props}></ThemeOneSplash>;

    default:
      return <ThemeOneSplash {...props}></ThemeOneSplash>;
  }
}
