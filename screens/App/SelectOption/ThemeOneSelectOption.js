import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { RootView, FastImage, Button, Loader } from '../../../components';
import ImageConst from '../../../constants/ImageConst';
import ScreenConst from '../../../constants/ScreenConst';
import Navigator from '../../../utils/Navigator';
import {
  metrics,
  colors,
  scaleFont,
  text,
  commonstyles,
} from '../../../utils/Theme';
import { Text } from '../../../components';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RFValue } from 'react-native-responsive-fontsize';

// import {translate} from '../../config/localization';
// import {localizedString} from '../../translations';
// import {useDispatch} from 'react-redux';

// import {useRtlContext} from 'react-native-easy-localization-and-rtl';

export default function ThemeOneSelectOption() {
  const logo = useSelector((state) => state.themeReducer.logo);
  const lang = useSelector((state) => state.userReducer.language);
  const appName = useSelector((state) => state.themeReducer.appName);

  const { t } = useTranslation();

  const Card = (props) => {
    return (
      <TouchableOpacity
        onPress={props.onPress}
        style={{ ...commonstyles.coloumnCenter }}>
        <FastImage
          cover
          style={styles.imageStyle}
          source={props.image}></FastImage>
        <Text style={styles.cardText}>{props.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <RootView style={{ backgroundColor: colors.authBackground }}>
      <View
        style={{ ...commonstyles.coloumnCenter, marginTop: metrics.largeMargin }}>
        <FastImage
          style={{ width: metrics.width * 0.55, height: metrics.height * 0.15 }}
          source={logo ? { uri: logo[lang] } : ImageConst.logo}
        />

        <Text semiBold style={styles.brandName}>
          {appName}
        </Text>
      </View>
      <View
        style={{
          ...commonstyles.coloumnCenter,
          marginTop: metrics.largeMargin,
        }}>
        <Text
          medium
          style={{
            fontSize: scaleFont(18),
            //  fontWeight: 'bold'
          }}>
          {t('selectOption')}
        </Text>
      </View>
      <View
        style={{
          ...commonstyles.spaceBetween,
          marginHorizontal: metrics.defaultMargin,
          marginTop: metrics.largeMargin,
        }}>
        <Card
          onPress={() => Navigator.navigate(ScreenConst.selectBranch)}
          image={ImageConst.pickup}
          title={t('pickup')}></Card>
        <Card
          onPress={() => Navigator.navigate(ScreenConst.selectAddress)}
          image={ImageConst.delivery}
          title={t('delivery')}></Card>
      </View>
    </RootView>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    width: metrics.width * 0.43,
    height: metrics.height * 0.21,
    borderRadius: 10,
  },
  cardText: {
    ...commonstyles.xsText,
    // fontWeight: 'bold',
    marginTop: metrics.smallMargin,
  },
  brandName: {
    fontSize: RFValue(22),
    textAlign: 'center',
  }
});
