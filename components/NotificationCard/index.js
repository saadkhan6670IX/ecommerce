import React from 'react';
import ThemeOneNotificationCard from './ThemeOneNotificationCard';
import {useSelector} from 'react-redux';

export default function index(props) {
  const themeNumber = useSelector((state) => state.themeReducer.themeNumber);

  switch (themeNumber) {
    case 1:
      return <ThemeOneNotificationCard {...props}></ThemeOneNotificationCard>;

    default:
      return <ThemeOneNotificationCard {...props}></ThemeOneNotificationCard>;
  }
}
