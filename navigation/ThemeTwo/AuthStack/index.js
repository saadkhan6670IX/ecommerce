import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import ScreenConst from '../../../constants/ScreenConst';
import VerificationCode from '../../../screens/Auth/VerificationCode';
import Login from '../../../screens/Auth/Login';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name={ScreenConst.login} component={Login} />
      <Stack.Screen
        name={ScreenConst.verificationCode}
        component={VerificationCode}
      />
    </Stack.Navigator>
  );
}
