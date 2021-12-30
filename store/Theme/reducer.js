import { SET_THEME, SET_THEME_COLORS, SET_APP_LOADER, SET_CLIENT_INACTIVE } from './types';

const initialState = {
  themeNumber: null,
  themeColors: {},
  splashScreen: null,
  logo: null,
  appColor: null,
  appFont: null,
  appLoading: false,
  appName: "",
  primaryColor: '#000000',
  secondaryColor: '#000000',
  fontFamily: null,
  ClientAppUnavailable: false
};

export default function theme(state = initialState, action) {
  switch (action.type) {
    case SET_THEME:
      const { app_color, app_font, logo, app_splash_image, theme_number, app_name, primary_color, app_font_en, sec_color } =
        action.payload;

      return {
        ...state,
        themeNumber: parseInt(theme_number),
        logo: logo,
        appColor: app_color,
        appFont: app_font,
        splashScreen: app_splash_image,
        appName: app_name,
        primaryColor: primary_color,
        secondaryColor: sec_color,
        fontFamily: app_font_en
      };
    case SET_THEME_COLORS:
      return {
        ...state,
        themeColors: action.payload,
      };
    case SET_APP_LOADER:
      return {
        ...state,
        appLoading: action.payload,
      };
    case SET_CLIENT_INACTIVE: 
      return {
        ...state,
        ClientAppUnavailable: action.payload,
      };
    default:
      return state;
  }
}
