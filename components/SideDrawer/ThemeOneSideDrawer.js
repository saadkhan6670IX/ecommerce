import React from 'react';
import {StyleSheet, View} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  colors,
  commonstyles,
  fonts,
  metrics,
  scaleFont,
} from '../../utils/Theme';
import {FastImage} from '..';
import ImageConst from '../../constants/ImageConst';
import LanguageSwitch from '../../components/LanguageSwitch';
import ScreenConst from '../../constants/ScreenConst';
import {loggedInDrawer} from '../../navigation/ThemeOne/AppStack/index';
import Navigator from '../../utils/Navigator';
import {useTranslation} from 'react-i18next';
import {Text} from '../../components';
import {useSelector, useDispatch} from 'react-redux';

export default function ThemeOneSideDrawer(props) {
  const {onLogoutPress} = props;
  const {t} = useTranslation();

  const guestUserString = t('guestUser');
  const logoutString = t('logout');
  const signupString = t('signup');
  const termsAndConditionString = t('termsAndConditionString');
  const homeString = t('Home');
  const ordersString = t('orders');
  const addresses = t('addresses');
  const userImage = useSelector((state) => state.userReducer.user?.image);

  return (
    <>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            alignItems: 'center',
            paddingBottom: metrics.defaultMargin * 3,
          }}>
          <View style={{...styles.oval, backgroundColor: colors.primaryBtnBackcolor+'15'}}>
            <View
              style={{
                ...styles.oval,
                backgroundColor: colors.primaryBtnBackcolor + '25',
                transform: [
                  {scaleX: 1.4},
                  {scaleY: 1.5},
                  {translateY: metrics.defaultMargin},
                ],
              }}></View>
          </View>
          <View
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FastImage
              cover
              style={{
                width: metrics.height * 0.14,
                height: metrics.height * 0.14,
                borderRadius: (metrics.height * 0.14) / 2,
              }}
              source={
                props.isLoggedIn
                  ? userImage
                    ? {uri: userImage}
                    : ImageConst.guestUserIcon
                  : ImageConst.guestUserIcon
              }></FastImage>
            <Text
              style={{
                ...commonstyles.smallText,
                marginTop: metrics.smallMargin,
              }}>
              {props.isLoggedIn
                ? `Hi ${
                    props.user?.first_name ? props.user?.first_name : 'User!'
                  }`
                : guestUserString}
            </Text>
          </View>
        </View>

        {props.drawerToShow.map((val, index) => (
          <DrawerItem
            key={index}
            {...props}
            icon={({size, color, focused}) => {
              return (
                <FastImage
                  source={val.icon}
                  style={{width: size, height: size}}></FastImage>
              );
            }}
            labelStyle={[
              styles.drawerItemStyle,
              {fontFamily: fonts.medium, color: 'black'},
            ]}
            label={t(val.drawerLabel)}
            onPress={() => {
              if (val.name === ScreenConst.home) {
                Navigator.navigate(val.name);
                Navigator.closeDrawer();
              } else {
                Navigator.closeDrawer();
                Navigator.push(val.name);
              }
            }}></DrawerItem>
        ))}

        {/* <DrawerItemList {...props} /> */}

        {props.isLoggedIn ? (
          <DrawerItem
            {...props}
            icon={({size, color, focused}) => {
              return (
                <FastImage
                  source={ImageConst.logoutIcon}
                  style={{width: size, height: size}}></FastImage>
              );
            }}
            labelStyle={[
              styles.drawerItemStyle,
              {fontFamily: fonts.medium, color: 'black'},
            ]}
            label={logoutString}
            onPress={onLogoutPress}
          />
        ) : (
          <DrawerItem
            {...props}
            icon={({size, color, focused}) => {
              return (
                <FastImage
                  source={ImageConst.signUp}
                  style={{width: size, height: size}}></FastImage>
              );
            }}
            label={signupString}
            labelStyle={[
              styles.drawerItemStyle,
              {fontFamily: fonts.medium, color: 'black'},
            ]}
            onPress={() => {
              Navigator.closeDrawer();
              Navigator.navigate(ScreenConst.login);
            }}
          />
        )}
      </DrawerContentScrollView>
      <View
        style={{
          marginBottom: metrics.defaultMargin,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LanguageSwitch screenName={ScreenConst.home} />
      </View>
      <View
        style={{
          padding: 0,
          width: '100%',
          backgroundColor: colors.primaryBtnBackcolor + 25,
          justifyContent: 'center',
          alignItems: 'center',
          height: 100,
          borderTopEndRadius: 100,
          borderTopLeftRadius: 100,
          alignSelf: 'center',
        }}>
        <DrawerItem
          style={{width: '80%'}}
          {...props}
          icon={({size, color, focused}) => {
            return (
              <FastImage
                source={ImageConst.termsAndConditionIcon}
                style={{width: size, height: size}}></FastImage>
            );
          }}
          label={termsAndConditionString}
          labelStyle={[
            styles.drawerItemStyle,
            {fontFamily: fonts.medium, color: 'black'},
          ]}
          onPress={() => {}}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  oval: {
    width: metrics.width * 0.5,
    backgroundColor: colors.primaryLight,
    height: metrics.width * 0.5,
    borderRadius: (metrics.width * 0.5) / 2,

    transform: [
      {scaleX: 1},
      {rotateZ: '100deg'},
      {scaleY: 2},
      {translateY: metrics.defaultMargin},
    ],
  },
  drawerItemStyle: {
    textAlign: 'left',
    fontSize: scaleFont(14),
    // fontWeight: '600'
  },
});
