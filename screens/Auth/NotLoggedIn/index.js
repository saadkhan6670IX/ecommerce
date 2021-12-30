import React from 'react';
import ThemeOneNotLoggedIn from './ThemeOneNotLoggedIn';
import Navigator from '../../../utils/Navigator';
import ScreenConst from '../../../constants/ScreenConst'

export default function index(props) {

  const onClickHereButtonPress = () => {
    Navigator.navigate(ScreenConst.login);
  };

  return (
    <ThemeOneNotLoggedIn
      onClickHereButtonPress = {onClickHereButtonPress}
      {...props}></ThemeOneNotLoggedIn>
  );
}
