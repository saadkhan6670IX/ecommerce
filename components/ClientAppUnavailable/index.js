import React from 'react';
import ThemeOneClientAppUnavailable from './ThemeOneClientAppUnavailable';
import {useSelector} from 'react-redux';

export default function index() {
  const themeNumber = useSelector((state) => state.themeReducer.themeNumber);

  switch (themeNumber) {
    case 1:
      return <ThemeOneClientAppUnavailable />;

    default:
      return <ThemeOneClientAppUnavailable />;
  }
}

