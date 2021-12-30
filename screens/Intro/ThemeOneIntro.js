import React from 'react';
import { Platform, StyleSheet, View, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { FastImage, RootView, Button } from '../../components';
import {
  commonstyles,
  metrics,
  text,
  colors,
  scaleFont,
} from '../../utils/Theme';
import { userHasSeenIntro } from '../../store/User/action';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from '../../../src/components';
import { useTranslation } from 'react-i18next';
import ImageConst from '../../constants/ImageConst';
import { RFValue } from 'react-native-responsive-fontsize';

export default function ThemeOneIntro(props) {
  const { data } = props;

  const appName = useSelector((state) => state.themeReducer.appName);

  const theme = useSelector((state) => state.themeReducer);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const _renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.imageContainer}>
          <FastImage source={item.image} style={{ flex: 1 }} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ ...styles.title, color: theme.primaryColor, }}>{item.title}</Text>
          <Text style={{ ...styles.description, color: theme.secondaryColor }}>{item.text}</Text>
        </View>
      </View>
    );
  };
  const _onDone = () => {
    dispatch(userHasSeenIntro());
    // Navigator.navigate(ScreenConst.selectLanguage);
  };

  const _renderNextButton = () => {
    return (
      <TouchableOpacity onPress={() => _onDone()} style={[styles.button]}>
        <Text style={styles.buttonText}>{t('skip')}</Text>
      </TouchableOpacity>
    );
  };

  const _renderDoneButton = () => {
    return (
      <View style={[styles.button]}>
        <Text style={styles.buttonText}>{t('done')}</Text>
      </View>
    );
  };

  return (
    <RootView style={styles.slide}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FastImage
          style={{
            width: '100%',
            height: metrics.width * 0.31,
          }}
          source={
            props.logo ? { uri: props.logo[props.language] } : ImageConst.logo
          }></FastImage>

        <Text semiBold style={styles.brandName}>
          {appName}
        </Text>
      </View>
      <View style={{ flex: 6 }}>
        <AppIntroSlider
          renderItem={_renderItem}
          data={data}
          dotStyle={{ borderWidth: 1 }}
          onDone={_onDone}
          activeDotStyle={{ backgroundColor: colors.primaryBtnBackcolor }}
          renderDoneButton={_renderDoneButton}
          renderNextButton={_renderNextButton}
        />
      </View>
    </RootView>
  );
}

const styles = StyleSheet.create({
  slide: {
    padding: metrics.defaultMargin,
    backgroundColor: colors.authBackground,
  },
  titleAndLogoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  imageContainer: {
    flex: 1,
  },
  title: {
    // ...commonstyles.smallText,
    alignSelf: 'center',
    textAlign: 'center',
    marginVertical: metrics.defaultMargin,
    fontSize: scaleFont(19),
    fontWeight: '600',
  },
  description: {
    // ...commonstyles.subheading,
    alignSelf: 'center',
    // color: colors.primaryLight,
    fontSize: scaleFont(17),
    fontWeight: '400',
    textAlign: 'center',
  },
  button: {
    width: metrics.width * 0.24,
    height: metrics.height * 0.054,
    // borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    ...commonstyles.smallText,
    fontWeight: '500',
  },
  brandName: {
    fontSize: RFValue(20),
    textAlign: 'center',
  }
});
