import {
  SET_LANGUAGE,
  SET_USER_HAS_SEEN_INTRO,
  SET_USERS_HAS_SELECTED_LANGUAGE,
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

//ar
//en
const initialState = {
  user: null,
  token: null,
  notificationToken: null,
  isLoggedIn: false,
  language: 'en',
  hasSeenIntro: false,
  hasSelectedLanguage: false,
  // userLocation: null,
  userSelectedAddress: null,
  userSelectedBranch: null,
  userSelectedOption: null,
  notification_count: 0,
};

export default function user(state = initialState, action) {

  console.log('selectedAddress From staesssss', state);

  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    case SET_USERS_HAS_SELECTED_LANGUAGE:
      return {
        ...state,
        hasSelectedLanguage: true,
      };
    case SET_USER_HAS_SEEN_INTRO:
      return {
        ...state,
        hasSeenIntro: true,
      };
    case SET_USER_LOGGED_IN:
      if (typeof action.payload === 'boolean') {
        return {
          ...state,
          isLoggedIn: action.payload,
        };
      }
    // case SET_LOCATION:
    //   return {
    //     ...state,
    //     userLocation: action.payload,
    //   };

    case SET_ADDRESS:
      return {
        ...state,
        userSelectedAddress: action.payload,
      };

    case SET_BRANCH:
      return {
        ...state,
        userSelectedBranch: action.payload,
      };
    case SET_NOTIFICATION_TOKEN:
      return {
        ...state,
        notificationToken: action.payload,
      };
    case SET_OPTION:
      return {
        ...state,
        userSelectedOption: action.payload,
      };
    case SET_NOTIFICATION_COUNT:
      return {
        ...state,
        notification_count: action.payload,
      };

    case INCREMENT_NOTIFICATION_COUNT:
      return {
        ...state,
        notification_count: state.notification_count + 1,
      };

    case LOGOUT: {

      if (state.userSelectedAddress != null) {
        return {
          ...state,
          isLoggedIn: false,
          token: null,
          user: null,
          //if user object exist, make it null
          //remove token also
          notification_count: 0,
          userSelectedAddress: {
            ...state.userSelectedAddress,
            type: 4,
          },
        };
      }

      else {
        return {
          ...state,
          isLoggedIn: false,
          token: null,
          user: null,
          //if user object exist, make it null
          //remove token also
          notification_count: 0,
          userSelectedAddress: null,
        };
      }
    }
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        token: action.payload.access_token,

        //if user object exist, make it null
        //remove token also
      };

    default:
      return state;
  }
}
