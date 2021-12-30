import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FastImage, Button, Text} from '../../components';
import ImageConst from '../../constants/ImageConst';
import {colors, commonstyles, metrics, scaleFont} from '../../utils/Theme';

export default function ThemeOneClientAppUnavailable(props) {
  const {onButtonPress, buttonLoader} = props;
  return (
    <View style={styles.container}>
      <FastImage style={{width : '100%' , height : metrics.height / 3}} source={ImageConst.AppError}></FastImage>
      <View style={{margin: metrics.largeMargin}}>
        <Text style={commonstyles.smallheading}>Something went wrong!</Text>
        <Text
          regular
          style={{
            fontSize: scaleFont(14),
            color: colors.greyText,
            marginVertical: metrics.largeMargin,
            textAlign: 'center',
          }}>
         An unexpected error has occurred. Kindly contact administrator
        </Text>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
