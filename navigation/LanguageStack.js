import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import SelectLanguage from '../screens/SelectLanguage';
import ScreenConst from '../constants/ScreenConst';


const Stack = createStackNavigator();

export default function LanguageStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        name={ScreenConst.selectLanguage}
        component={SelectLanguage}
      />
    </Stack.Navigator>
  );
}
