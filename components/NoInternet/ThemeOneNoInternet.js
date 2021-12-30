import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FastImage, Button, Text} from '../../components';
import ImageConst from '../../constants/ImageConst';
import {colors, commonstyles, metrics, scaleFont} from '../../utils/Theme';

export default function ThemeOneNoInternet(props) {
  const {onButtonPress, buttonLoader} = props;
  return (
    <View style={styles.container}>
      <FastImage style={{width : '100%' , height : metrics.height / 3}} source={ImageConst.noInternet}></FastImage>
      <View style={{marginHorizontal: metrics.largeMargin}}>
        <Text style={commonstyles.smallheading}>No Internet Connection</Text>
        <Text
          regular
          style={{
            fontSize: scaleFont(14),
            color: colors.greyText,
            marginVertical: metrics.largeMargin,
            textAlign: 'center',
          }}>
          You are not connected to the internet.Make sure your Wi-Fi is on and
          Airplane mode is off.
        </Text>
        <Button
          loading={buttonLoader}
          onPress={() => {
            onButtonPress && onButtonPress();
          }}
          text="Retry"></Button>
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
