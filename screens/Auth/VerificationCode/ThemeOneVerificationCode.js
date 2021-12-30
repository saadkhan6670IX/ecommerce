import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import {Text} from '../../../components';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {RootView, FastImage, Button} from '../../../components';
import {metrics, scaleFont, commonstyles, colors} from '../../../utils/Theme';
import ImageConst from '../../../constants/ImageConst';

import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import {useTranslation} from 'react-i18next';
import OneSignal from 'react-native-onesignal';

const CELL_COUNT = 4;

export default ThemeOneVerificationCode = (prop) => {
  const dispatch = useDispatch();

  const isRTL = I18nManager.isRTL;

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const notificationToken = useSelector(
    (state) => state.userReducer.notificationToken,
  );
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  // thats to show if timer of 30secs passed or not.
  const [showResendCode, setShowResendCode] = useState(false);

  const [resendCodeCount, setResendCodeCount] = useState(0);
  const [invalidCodeAttempt, setInvalidCodeAttempt] = useState(0);

  // for timer
  const [seconds, setSeconds] = useState(30);

  const {t} = useTranslation();
  const logo = useSelector((state) => state.themeReducer.logo);
  const lang = useSelector((state) => state.userReducer.language);

  useEffect(() => {
    setInvalidCodeAttempt(prop.invalidCodeAttempt);
  }, [prop.invalidCodeAttempt]);

  useEffect(() => {
    // this is to start timer after 30 seconds to stop the timer and start it again after submit button is pressed
    let timer;
    if (seconds > 0) {
      timer = setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      resetCounter('00', true);
    }
    // need to remove it when user goes back ... because of memory leakage.
    return () => clearInterval(timer);
  }, [seconds]);

  //converting secs to formatted seconds
  function convertTime(sec) {
    var hours = Math.floor(sec / 3600);
    hours >= 1 ? (sec = sec - hours * 3600) : (hours = '00');
    var min = Math.floor(sec / 60);
    min >= 1 ? (sec = sec - min * 60) : (min = '00');
    sec < 1 ? (sec = '00') : void 0;

    min.toString().length == 1 ? (min = '0' + min) : void 0;
    sec.toString().length == 1 ? (sec = '0' + sec) : void 0;

    return min + ':' + sec;
  }

  // funtion to reset the value to default.
  function resetCounter(count, showResendCode) {
    setSeconds(count);
    setShowResendCode(showResendCode);
  }

  const onConfirmButtonPress = async () => {
    if (value.length < 3) {
      return;
    }

    const deviceState = await OneSignal.getDeviceState();
    let userPushDeviceState = deviceState.userId;

    let params = {
      country_code: prop.route.params.country_code,
      phone_no: prop.route.params.phone_no,
      code: value,
      token: userPushDeviceState,
    };

    prop.onVerifyButtonPressed(params);
  };

  const onResendButtonPress = async () => {
    //show loader
    //call api
    const deviceState = await OneSignal.getDeviceState();
    let userPushDeviceState = deviceState.userId;

    let params = {
      country_code: prop.route.params.country_code,
      phone_no: prop.route.params.phone_no,
      token: userPushDeviceState,
    };

    if (resendCodeCount < 5) {
      if (showResendCode) {
        setValue('');
        prop.onResendButtonPressed(params);
        setResendCodeCount(resendCodeCount + 1);
        resetCounter('30');
      }
    } else {
      if (showResendCode) {
        setValue('');
        prop.onResendButtonPressed(params);
        setResendCodeCount(0);
        resetCounter('120');
      }
    }
  };

  const showResendComponent = () => {
    return (
      <TouchableOpacity
        activeOpacity={showResendCode ? 0 : 1}
        onPress={onResendButtonPress}>
        <View style={styles.resendView}>
          <Text
            style={[
              styles.resendButton,
              {color: showResendCode ? colors.primaryBtnBackcolor : 'gray'},
            ]}>
            {t('resendCode')}
          </Text>
          <Icon
            name="refresh-ccw"
            color={showResendCode ? colors.primaryBtnBackcolor : 'gray'}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const maskNumber = (num) => {
    var formatedNumber = '';
    for (let index = 0; index < num.length; index++) {
      if (index < num.length - 2) {
        formatedNumber = formatedNumber.concat('X');
      } else {
        formatedNumber = formatedNumber.concat(num[index]);
      }
    }
    return formatedNumber;
  };

  return (
    <RootView style={{backgroundColor: colors.authBackground}}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={styles.root}>
        <FastImage
          style={styles.logo}
          source={logo ? {uri: logo[lang]} : ImageConst.logo}></FastImage>
        <Text medium style={styles.title}>
          {t('verificationCode')}
        </Text>
        <Text regular style={[styles.description, {color:colors.primaryLight}]}>
          {t('pleaseEnterTheOtp') +
            ' ' +
            prop.route.params.country_code +
            maskNumber(prop.route.params.phone_no)}
        </Text>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          autoFocus={true}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={[
            styles.codeFieldRoot,
            isRTL && {flexDirection: 'row-reverse'},
          ]}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <View
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              <Text style={styles.textStyle}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />
        <View
          style={{
            // ...commonstyles.spaceBetween,
            marginTop: metrics.defaultMargin * 2,
            paddingHorizontal: '5%',
            alignSelf: 'center',
          }}>
          <Button
            loading={prop.isFetching}
            disabled={value.length !== 4 || invalidCodeAttempt == 5}
            onPress={onConfirmButtonPress}
            text={t('confirm')}></Button>

          <Text style={styles.timer}>{convertTime(seconds)}</Text>
          {showResendComponent()}
        </View>
        {invalidCodeAttempt == 5 && (
          <Text regular style={styles.invalidAttempts}>
            You have been temporarily blocked because of too many invalid
            attempts
          </Text>
        )}
      </KeyboardAwareScrollView>
    </RootView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginHorizontal: metrics.defaultMargin * 2,
  },
  resendView: {
    height: metrics.largeMargin,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  resendButton: {
    fontSize: scaleFont(12),
    // fontWeight: '400',
    color: 'gray',
    marginHorizontal: 5,
  },
  timer: {
    fontSize: scaleFont(15),
    // fontWeight: '600',
    color: 'black',
    alignSelf: 'center',
    marginTop: metrics.defaultMargin,
    marginBottom: 5,
  },
  title: {textAlign: 'center', ...commonstyles.heading},
  codeFieldRoot: {margin: 10},
  cell: {
    width: metrics.width * 0.15,
    height: metrics.width * 0.15,
    borderRadius: 10,
    fontSize: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#00000030',
    backgroundColor: 'white',
    ...commonstyles.shadow,
  },
  focusCell: {
    borderColor: '#000',
  },
  textStyle: {
    fontSize: scaleFont(23),
    textAlign: 'center',
    color : colors.placeHolder
  },
  logo: {
    ...commonstyles.logoStyle,
  },
  description: {
    fontSize: scaleFont(18),
    color: colors.primaryLight,
    margin: metrics.defaultMargin,
    textAlign: 'center',
  },

  invalidAttempts: {
    fontSize: scaleFont(15),
    color: colors.greyText,
    marginTop: metrics.defaultMargin,
    textAlign: 'center',
  },
});
