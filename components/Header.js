import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  I18nManager,
} from 'react-native';
import { colors, commonstyles, metrics, scaleFont } from '../utils/Theme';
import Icon from 'react-native-vector-icons/AntDesign';
import Navigator from '../utils/Navigator';
import ImageConst from '../constants/ImageConst';
import ScreenConst from '../constants/ScreenConst';
import { FastImage, Text } from '../components';
import { useSelector } from 'react-redux';

export default function Header(props) {
  const totalItemsInCart = useSelector((state) => {
    var quantity = 0;
    state.cartReducer.items.map((val) => (quantity += val.quantity));
    return quantity;
  });

  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);
  const notification_count = useSelector(
    (state) => state.userReducer.notification_count,
  );

  const _renderOnLeft = () => {
    if (props.hideLeft) {
      return null;
    }
    if (props.leftComponent) {
      return props.leftComponent();
    }

    if (props.showDrawer) {
      return (
        <TouchableOpacity hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
          onPress={() => Navigator.toggleDrawer()}>
          <Image
            resizeMode={'contain'}
            style={{
              width: metrics.height * 0.03,
              height: metrics.height * 0.03,
            }}
            source={ImageConst.drawerIcon}></Image>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
        onPress={() => {
          if (props.onBackPress) {
            props.onBackPress();
          } else {
            Navigator.goBack();
          }
        }}>
        <Icon
          style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}
          name={'left'}
          size={metrics.height * 0.03}></Icon>
      </TouchableOpacity>
    );
  };

  const _renderInMiddle = () => {
    return (
      <Text medium style={{ fontSize: scaleFont(18), textAlign: 'center' }}>
        {props.title}
      </Text>
    );
  };

  const _renderOnRight = () => {
    if (props.rightComponent) {
      return props.rightComponent();
    }

    if (props.showNotification) {
      return (
        <View
          style={[
            commonstyles.rowCenter,
            {
              justifyContent: 'space-between',
              // flex: 1,
              margin: 0,
              padding: 0,
            },
          ]}>
          <View>
            {props.showCartIcon && (
              <TouchableOpacity
                hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
                style={{}}
                onPress={() => {
                  Navigator.navigate(ScreenConst.home, {
                    screen: ScreenConst.home,
                    params: {
                      screen: ScreenConst.addToCart,
                    },
                  });
                }}>
                <FastImage
                  style={{
                    width: metrics.height * 0.03,
                    height: metrics.height * 0.03,
                  }}
                  source={ImageConst.cartBasket}></FastImage>

                {totalItemsInCart > 0 && (
                  <View
                    style={{
                      position: 'absolute',
                      right: -5,
                      top: -5,
                      backgroundColor: 'red',
                      borderRadius: 10,
                      minWidth: metrics.height * 0.02,
                      height: metrics.height * 0.02,
                      padding: 3,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: metrics.height * 0.01,
                        alignSelf: 'center',
                        color: 'white',
                        // fontWeight: 'bold',
                      }}>
                          {totalItemsInCart > 999 ? '999+' : totalItemsInCart}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => Navigator.navigate(ScreenConst.notification)}>
            <FastImage
              resizeMode={'contain'}
              style={{
                width: metrics.height * 0.03,
                height: metrics.height * 0.03,
              }}
              source={ImageConst.notificationIcon}></FastImage>

            {isLoggedIn && notification_count > 0 && (
              <View
                style={{
                  position: 'absolute',
                  right: -5,
                  top: -5,
                  backgroundColor: 'red',
                  borderRadius: 10,
                  width: metrics.height * 0.02,
                  height: metrics.height * 0.02,
                  padding: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: metrics.height * 0.01,
                    alignSelf: 'center',
                    color: 'white',
                    // fontWeight: 'bold',
                  }}>
                  {notification_count}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <View
      style={[
        styles.container,
        props.transparent && {
          position: 'absolute',
          zIndex: 100,
          width: '100%',
          backgroundColor: null,
        },
        props.containerStyle,
      ]}>
      <View style={[styles.leftRight, { marginHorizontal: metrics.smallMargin }]}>
        {_renderOnLeft()}
      </View>
      <View style={[styles.leftRight, { flex: 5, alignItems: 'center' }]}>
        {_renderInMiddle()}
      </View>
      <View style={[styles.leftRight, { marginHorizontal: metrics.smallMargin }]}>
        {_renderOnRight()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: metrics.height * 0.08,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  leftRight: {
    flex: 2,
    justifyContent: 'center',
  },
});
