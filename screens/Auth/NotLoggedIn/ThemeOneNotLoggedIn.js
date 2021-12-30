import React from 'react';
import {StyleSheet, View} from 'react-native';
import {RootView, Header, Button, Loader, FastImage} from '../../../components';
import ImageConst from '../../../constants/ImageConst';
import {metrics, colors, scaleFont, commonstyles} from '../../../utils/Theme';
import {Text} from '../../../components';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

export default function ThemeOneNotLoggedIn({onClickHereButtonPress}) {
  const {t} = useTranslation();
  const logo = useSelector((state) => state.themeReducer.logo);
  const lang = useSelector((state) => state.userReducer.language);

  return (
    <RootView bottom={0}>
      <Header title={t('profile')} showNotification showDrawer></Header>
      <View style={[commonstyles.container, {alignItems: 'center', flex: 1}]}>
        <FastImage
          style={styles.logo}
          source={logo ? {uri: logo[lang]} : ImageConst.logo}
        />

        <FastImage style={styles.profileIcon} source={ImageConst.user} />

        <Text style={[styles.textStyle, {color: colors.primary}]}>
          {t('signupToContinue')}
        </Text>

        <Button
          style={styles.button}
          text={t('signup')}
          onPress={onClickHereButtonPress}
        />
      </View>
    </RootView>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: metrics.width * 0.15,
    width: metrics.width * 0.15,
    margin: metrics.height * 0.02,
  },
  profileIcon: {
    height: metrics.width * 0.3,
    width: metrics.width * 0.3,
    marginTop: metrics.height * 0.1,
    marginBottom: metrics.height * 0.05,

    borderRadius: (metrics.width * 0.3) / 2,
  },
  textStyle: {
    fontSize: scaleFont(18),
    // fontWeight: '600',
    color: colors.primary,
    marginHorizontal: metrics.width * 0.05,
    textAlign: 'center',
  },

  button: {
    marginVertical: metrics.height * 0.02,
  },
});
