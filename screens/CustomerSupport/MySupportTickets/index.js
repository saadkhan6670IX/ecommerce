import React from 'react';
import {TouchableOpacity} from 'react-native';
import ScreenConst from '../../../constants/ScreenConst';
import ThemeOneMySupportRequest from './ThemeOneMySupportTickets';
import Navigator from '../../../utils/Navigator'

export default function index(props) {
 
  return (
      <ThemeOneMySupportRequest {...props}></ThemeOneMySupportRequest>
  );
}
