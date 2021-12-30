import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import ImageConst from '../../constants/ImageConst';
import { FastImage, RootView } from '../../components';
import { colors, metrics } from '../../utils/Theme';
import { useSelector } from 'react-redux';
import { Text } from '../../components';
import { RFValue } from 'react-native-responsive-fontsize';

export default function ThemeOneSplashLoader() {
  const theme = useSelector((state) => state.themeReducer);
  const lang = useSelector((state) => state.userReducer.language);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeIn();
  }, []);

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.mainContainer,
        {
          // Bind opacity to animated value
          opacity: fadeAnim,
        },
      ]}>
      <FastImage source={theme.logo ? { uri: theme.logo[lang] } : ImageConst.ShftrLogo} />
      <Text semiBold style={{
        ...styles.brandName, color: theme.primaryColor
      }}>
        {theme.appName}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: { position: 'absolute', bottom: '40%', alignSelf: 'center' },
  brandName: {
    fontSize: RFValue(25),
    paddingTop: metrics.height / 60,
    textAlign: 'center',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
