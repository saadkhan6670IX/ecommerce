import Toast from 'react-native-root-toast';
import {colors} from './Theme';

export const successMessage = (msg) => {
  Toast.show(msg, {
    // backgroundColor: colors.primary,
    textColor: 'white',
    opacity: 1,
    position: -60,
    shadow: false,
  });
};

export const errorMessage = (msg, options) => {
  Toast.show(msg, {
    backgroundColor: colors.error,
    textColor: 'white',
    opacity: 1,
    position: -60,
    shadow: false,
    ...options,
  });
};
