import React from 'react';
import ThemeOneSideDrawer from './ThemeOneSideDrawer';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../../store/User/action';
import Navigator from '../../utils/Navigator';
import {logoutFromServer} from '../../services/User';

export default function index(props) {
  const themeNumber = useSelector((state) => state.themeReducer.themeNumber);
  const user = useSelector((state) => state.userReducer.user);

  const dispatch = useDispatch();

  const onLogoutPress = () => {
    logoutFromServer()
      .then((res) => {
        dispatch(logout());
      })
      .catch((error) => {
      });

      
  };

  switch (themeNumber) {
    case 1:
      return (
        <ThemeOneSideDrawer
          user={user}
          onLogoutPress={onLogoutPress}
          {...props}></ThemeOneSideDrawer>
      );

    default:
      return (
        <ThemeOneSideDrawer
          user={user}
          onLogoutPress={onLogoutPress}
          {...props}></ThemeOneSideDrawer>
      );
  }
}
