import {AuthAPI} from '../../utils/Axios';
import {
  SET_LANGUAGE,
  SET_USERS_HAS_SELECTED_LANGUAGE,
  SET_USER_HAS_SEEN_INTRO,
  SET_USER_LOGGED_IN,
  SET_LOCATION,
  SET_ADDRESS,
  SET_BRANCH,
  SET_USER,
  LOGOUT,
  LOGIN,
  SET_OPTION,
  SET_NOTIFICATION_COUNT,
  INCREMENT_NOTIFICATION_COUNT,
  SET_NOTIFICATION_TOKEN,
} from './types';

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const setUserLanguage = (language) => {
  return {
    type: SET_LANGUAGE,
    payload: language,
  };
};

export const setIsLoggedIn = (bool) => {
  return {
    type: SET_USER_LOGGED_IN,
    payload: bool,
  };
};

export const login = (data) => {
  return {
    type: LOGIN,
    payload: data,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
    payload: true, //fazol
  };
};

export const userHasSeenIntro = () => {
  return {
    type: SET_USER_HAS_SEEN_INTRO,
    payload: true,
  };
};

export const setUserSelectedOption = (option) => {
  return {
    type: SET_OPTION,
    payload: option,
  };
};

export const setUserHasSelectedLanguage = () => {
  return {
    type: SET_USERS_HAS_SELECTED_LANGUAGE,
    payload: true,
  };
};

// export const setUserLocation = (locationObject) => {
//   return {
//     type: SET_LOCATION,
//     payload: locationObject,
//   };
// };

export const setOrderAddress = (locationObject) => {
  return {
    type: SET_ADDRESS,
    payload: locationObject,
  };
};

export const setPickupBranch = (locationObject) => {
  return {
    type: SET_BRANCH,
    payload: locationObject,
  };
};

export const setNotificationCount = (count = 0) => {
  console.log('calling setNotification');
  return {
    type: SET_NOTIFICATION_COUNT,
    payload: count,
  };
};

export const incrementNotificationCount = () => {
  console.log('incrementing setNotification');
  return {
    type: INCREMENT_NOTIFICATION_COUNT,
    payload: null,
  };
};

export const setNotificationToken = (token) => {
  return {
    type: SET_NOTIFICATION_TOKEN,
    payload: token,
  };
};
