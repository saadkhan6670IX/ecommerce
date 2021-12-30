import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {colors, metrics} from '../../utils/Theme';
import {FastImage, RootView, Text} from '../../components';
import ScreenConst from '../../constants/ScreenConst';
import {useSelector} from 'react-redux';
import ImageConst from '../../constants/ImageConst';

import CartSVG from '../../resources/svg/Cart';
import HomeSVG from '../../resources/svg/Home';
import PromotionSVG from '../../resources/svg/Promotion';
import OrderSVG from '../../resources/svg/Orders';

export default function ThemeOneBottomTabBar({state, descriptors, navigation}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  const totalItemsInCart = useSelector((state) => {
    var quantity = 0;
    state.cartReducer.items.map((val) => (quantity += val.quantity));
    return quantity;
  });
  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);
  const user = useSelector((state) => state.userReducer.user);

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View
      style={{
        backgroundColor: colors.background,
        height: metrics.height * 0.12,
        paddingHorizontal: metrics.defaultMargin,
        justifyContent: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          borderRadius: 30,
          paddingVertical: metrics.height * 0.01,
        }}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const {activeIcon, inactiveIcon} = route.params;

          const isFocused = state.index === index;

          const onPress = () => {
            // if (route.name != ScreenConst.promo) {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            }
          // };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const isCartIcon = route.name === ScreenConst.addToCart;
          const cartScale = metrics.height * 0.08;
          const isProfileIcon = route.name === ScreenConst.userProfile;
          const renderImage = () => {
            var image = inactiveIcon;
            if (route.name === ScreenConst.userProfile) {
              image = isLoggedIn
                ? user?.image
                  ? {uri: user?.image}
                  : ImageConst.guestUserIconGray
                : ImageConst.guestUserIconGray;
            } else {
              isFocused && (image = activeIcon);
            }
            return image;
          };
          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              activeOpacity={1}
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: isCartIcon ? 2 : 1,
                backgroundColor: null,
                justifyContent: 'center',
                alignItems: 'center',
                height: metrics.height * 0.05,
              }}>
              <View
                style={[
                  {
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: isCartIcon ? 15 : 0,
                    borderColor: colors.background,
                    borderRadius: cartScale / 2,
                  },
                ]}>
                <View>
                  {index == 0 ? (
                    <HomeSVG
                      width={30}
                      height={30}
                      fillColor={
                        isFocused ? colors.primaryBtnBackcolor : '#fff'
                      }
                    />
                  ) : index == 1 ? (
                    <OrderSVG
                      width={30}
                      height={30}
                      fillColor={
                        isFocused ? colors.primaryBtnBackcolor : '#fff'
                      }
                    />
                  ) : index == 2 ? (
                    <CartSVG
                      width={30}
                      height={30}
                      fillColor={colors.primaryBtnBackcolor}
                    />
                  ) : index == 3 ? (
                    <PromotionSVG
                      width={30}
                      height={30}
                      fillColor={
                        isFocused ? colors.primaryBtnBackcolor : '#fff'
                      }
                    />
                  ) : (
                    <FastImage
                      // cover
                      style={[
                        {
                          width: isCartIcon ? cartScale : metrics.height * 0.03,
                          height: isCartIcon
                            ? cartScale
                            : metrics.height * 0.03,
                        },
                        isProfileIcon && {
                          borderRadius: (metrics.height * 0.03) / 2,
                          borderWidth: 1,
                        },
                      ]}
                      source={renderImage()}></FastImage>
                  )}
                  {isCartIcon && totalItemsInCart > 0 ? (
                    <View
                      style={{
                        backgroundColor: 'red',
                        minWidth: metrics.width / 20,
                        height: metrics.width / 20,
                        padding: 3,
                        borderRadius: metrics.width / 20 / 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'flex-end',
                        position: 'absolute',
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                        }}>
                        {totalItemsInCart > 999 ? '999+' : totalItemsInCart}
                      </Text>
                    </View>
                  ) : null}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
// const styles = StyleSheet.create({});
