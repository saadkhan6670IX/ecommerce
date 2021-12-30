import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { RootView, FastImage, Button, Loader } from '../../components';
import ImageConst from '../../constants/ImageConst';
import { metrics, colors, commonstyles } from '../../utils/Theme';
import { Text } from '../../../src/components';

import { useDispatch, useSelector } from 'react-redux';

import LanguageSwtich from '../../components/LanguageSwitch';

import { setUserHasSelectedLanguage } from '../../store/User/action';

import { useTranslation } from 'react-i18next';
import { RFValue } from 'react-native-responsive-fontsize';

export default function index() {
  const dispatchAction = useDispatch();

  const language = useSelector((state) => state.userReducer.language);

  const onButtonPress = () => {
    dispatchAction(setUserHasSelectedLanguage());
  };

  const logo = useSelector((state) => state.themeReducer.logo);
  const appName = useSelector((state) => state.themeReducer.appName);

  const { t } = useTranslation();

  return (
    <RootView
      top={0}
      bottom={0}
      style={{ backgroundColor: colors.authBackground }}>
      <View style={styles.dividedPortion}>
        <FastImage
          style={styles.logoStyle}
          source={logo ? { uri: logo[language] } : ImageConst.logo}
        />
        <Text semiBold style={styles.brandName}>
          {appName}
        </Text>
      </View>

      <View
        style={{
          ...styles.dividedPortion,
          flex: 0.5,
          justifyContent: 'space-around',
        }}>
        <Text medium style={{ ...commonstyles.smallText }}>
          {t('selectLanguage')}
        </Text>
        <LanguageSwtich></LanguageSwtich>
      </View>

      <View style={{ ...styles.dividedPortion }}>
        <Button onPress={onButtonPress} text={t('go')}></Button>
      </View>
    </RootView>
  );
}

const styles = StyleSheet.create({
  logoStyle: {
    height: metrics.height * 0.2,
    width: metrics.height * 0.3,
  },
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
  brandName: {
    fontSize: RFValue(22),
    textAlign: 'center',
  }
});
