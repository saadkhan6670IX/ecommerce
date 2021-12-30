import React, {useState, useEffect} from 'react';
import {StyleSheet, View, I18nManager} from 'react-native';
import {RootView, FastImage, Input, Button} from '../../../components';
import ImageConst from '../../../constants/ImageConst';
import {colors, commonstyles, metrics} from '../../../utils/Theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Navigator from '../../../utils/Navigator';
import ScreenConst from '../../../constants/ScreenConst';
import {localizedString} from '../../../translations';
import Validation from '../../../utils/Validation';
import {errorMessage} from '../../../utils/Toast';
import {Text} from '../../../components';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import color from 'color';

export default function ThemeOneLogin(props) {
  const countryCode = '+966';
  const [phoneNumber, setPhoneNumber] = useState('');
  const prevScreen = props.route.params?.commingFrom;

  const {t} = useTranslation();
  const logo = useSelector((state) => state.themeReducer.logo);
  const lang = useSelector((state) => state.userReducer.language);

  function onLoginPress() {
    let params = {
      country_code: countryCode.replace('+', ''),
      phone_no: phoneNumber.replace(countryCode, ''),
      commingFrom: prevScreen,
    };

    // validating phone number
    if (Validation.isValidPhoneNumber(countryCode + phoneNumber)) {
      props.onLoginButtonPress && props.onLoginButtonPress(params);
    } else {
      errorMessage(t('phoneNumberLimitError'));
    }
  }

  // adding a condition to handle not to remove country code
  const phoneNumberValidation = (value) => {
    setPhoneNumber(value);
  };

  return (
    <RootView
      style={{
        paddingHorizontal: metrics.defaultMargin * 2,
        backgroundColor: colors.authBackground,
      }}>
      <KeyboardAwareScrollView>
        <FastImage
          style={commonstyles.logoStyle}
          source={logo ? {uri: logo[lang]} : ImageConst.logo}></FastImage>
        <View style={{marginBottom: metrics.smallMargin}}>
          <Text
            style={{
              ...commonstyles.heading,
              textAlign: 'left',
              marginVertical: metrics.defaultMargin,
            }}>
            {t('enterPhoneNumber')}
          </Text>
        </View>
        <Input
          textStyle={{color: colors.primaryLight}}
          ignoreRTL={true}
          label={t('phoneNumber')}
          keyboardType="numeric"
          code={countryCode}
          inputStyle={{
            paddingVertical: 0,
            paddingHorizontal: 0,
            // color: colors.primary,
          }}
          // placeholder={'Phone number'}
          maxNumbers={11}
          value={phoneNumber}
          onChangeText={(value) => {
            phoneNumberValidation(value);
          }}></Input>
        <View>
          <Button
            loading={props.isFetching}
            onPress={onLoginPress}
            text={t('login')}></Button>
        </View>
      </KeyboardAwareScrollView>
    </RootView>
  );
}

const styles = StyleSheet.create({});
