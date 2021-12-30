import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import ScreenConst from '../constants/ScreenConst';
import IntroSlider from '../screens/Intro';


const Stack = createStackNavigator();

export default function IntroStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name={ScreenConst.introSlider} component={IntroSlider} />
   
    </Stack.Navigator>
  );
}
