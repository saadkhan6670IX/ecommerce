import React from 'react';
import {View} from 'react-native';
import {metrics} from '../../utils/Theme';

import LottieView from 'lottie-react-native';

export default function NothingFound(props) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <LottieView
        source={require('../../resources/lottieFiles/notResultsFound.json')}
        style={{
          height: metrics.height * 0.25,
          width: metrics.width * 0.2,
          marginBottom: metrics.height * 0.2,
          ...props.style,
        }}
        autoPlay
        loop
      />
      {props.children}
    </View>
  );
}
// const styles = StyleSheet.create({});
