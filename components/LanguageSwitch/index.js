import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Switch,
  LayoutAnimation,
  I18nManager,
  Platform,
} from 'react-native';

import { FastImage, Text } from '../../components';

import { metrics, colors, scaleFont, commonstyles } from '../../utils/Theme';

import { setUserLanguage } from '../../store/User/action';
import ImageConst from '../../constants/ImageConst';
import { useDispatch } from 'react-redux';
import RNRestart from 'react-native-restart';

import { useTranslation } from 'react-i18next';
import ScreenConst from '../../constants/ScreenConst';
import { storeData } from '../../utils/AsyncStorage';

export default function index(props) {
  const { disableRestart, screenName } = props;

  const [isSwitchOn, setisSwitchOn] = useState(false);
  const dispatchAction = useDispatch();

  const toggleSwitch = async () => {
    if (screenName === ScreenConst.home) {
      console.log('setting languageChangeLocation to Home');
      await storeData('languageChangeLocation', ScreenConst.home);
    }

    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    i18n
      .changeLanguage(i18n.language === 'en' ? 'ar' : 'en')
      .then(I18nManager.forceRTL(i18n.language === 'ar'))
      .then(() => {
        setisSwitchOn((prev) => !prev);
        !disableRestart && RNRestart.Restart();
      });
  };

  const { t, i18n } = useTranslation();

  const _renderCountry = (country) => {
    return (
      <View style={[commonstyles.rowCenter]}>
        <FastImage
          style={{ width: 30, height: 30, marginHorizontal: 5 }}
          source={country.flag}
        />
        <Text regular style={{ fontSize: scaleFont(15), color: colors.primaryLight }}>
          {country.name}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={{
        ...styles.languageSwitchContainer,
        flexDirection:
          I18nManager.isRTL
            ? 'row-reverse'
            : 'row'
      }}>
      {_renderCountry({
        flag: ImageConst.englandFlag,
        name: t('english'),
      })}
      <Switch
        trackColor={{ false: '#767577', true: '#767577' }}
        thumbColor={'#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        style={{
          transform: [{
            scaleX: Platform.OS === 'android' && I18nManager.isRTL
              ? -1
              : 1
          }]
        }}
        value={isSwitchOn} //using ! because the position of english is at switch = off
      />
      {_renderCountry({
        flag: ImageConst.arabicFlag,
        name: t('arabic'),
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  dividedPortion: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
});
