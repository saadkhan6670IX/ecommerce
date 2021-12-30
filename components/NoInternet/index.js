import React from 'react';
import ThemeOneNoInternet from './ThemeOneNoInternet';
import {useSelector} from 'react-redux';

export default function index() {
  const themeNumber = useSelector((state) => state.themeReducer.themeNumber);

  switch (themeNumber) {
    case 1:
      return <ThemeOneNoInternet />;

    default:
      return <ThemeOneNoInternet />;
  }
}

