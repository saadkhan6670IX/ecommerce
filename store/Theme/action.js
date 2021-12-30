import { SET_THEME, SET_THEME_COLORS, SET_APP_LOADER, SET_CLIENT_INACTIVE } from './types';

export const setTheme = (themeObj = {}) => {
  return {
    type: SET_THEME,
    payload: themeObj,
  };
};

export const setThemeColors = (themeColors = {}) => {
  return {
    type: SET_THEME,
    payload: themeColors,
  };
};

export const setAppLoader = (bool) => {
  return {
    type: SET_APP_LOADER,
    payload: bool,
  };
};

export const setClientInactive = (bool) => {
  return {
    type: SET_CLIENT_INACTIVE,
    payload: bool,
  };
};