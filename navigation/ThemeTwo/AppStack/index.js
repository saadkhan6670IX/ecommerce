import React from 'react';

import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ScreenConst from '../../../constants/ScreenConst';
import ImageConst from '../../../constants/ImageConst';
import BottomTabBar from '../../../components/BottomTabBar';

//screens
import Home from '../../../screens/App/Home';
import ItemDetails from '../../../screens/App/ItemDetails';
import AllCategories from '../../../screens/App/AllCategories';
import Promotions from '../../../screens/App/Promotions';
import UserProfille from '../../../screens/App/UserProfile';
import Notification from '../../../screens/App/Notification';
import AllProducts from '../../../screens/App/AllProducts';
import VerificationCode from '../../../screens/Auth/VerificationCode';
import Login from '../../../screens/Auth/Login';

import ItemAdd from '../../../screens/App/ItemAdd';
import {colors, scaleFont} from '../../../utils/Theme';
import Icon from 'react-native-vector-icons/Ionicons';

import CustomDrawer from '../../../components/SideDrawer';
import {FastImage} from '../../../components';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const Drawer = createDrawerNavigator();

const tabs = [
  {
    id: 0,
    activeIcon: ImageConst.homeActive,
    inactiveIcon: ImageConst.homeIcon,
    name: ScreenConst.home,
    component: Home,
    label: 'Home',
  },
  {
    id: 1,
    activeIcon: ImageConst.categoriesActive,
    inactiveIcon: ImageConst.categories,
    name: ScreenConst.allCategories,
    component: AllCategories,
    label: 'Categories',
  },
  {
    id: 2,
    activeIcon: ImageConst.addToCartIcon,
    inactiveIcon: ImageConst.addToCartIcon,
    name: ScreenConst.addToCart,
    component: ItemAdd,
    label: 'Cart',
  },
  {
    id: 3,
    activeIcon: ImageConst.promoActive,
    inactiveIcon: ImageConst.promoIcon,
    name: ScreenConst.promo,
    component: Promotions,
    label: 'Prmotions',
  },
  {
    id: 4,
    activeIcon: ImageConst.userNavIcon,
    inactiveIcon: ImageConst.userNavIcon,
    name: ScreenConst.userProfile,
    component: UserProfille,
    label: 'View Profile',
  },
];

function HomeTabs() {
  return (
    <Tab.Navigator
      options={{
        tabBarVisible: false,
      }}
      tabBar={(props) => <BottomTabBar {...props} />}>
      {tabs.map((item, index) => (
        <Tab.Screen
          key={index}
          initialParams={{
            activeIcon: item.activeIcon,
            inactiveIcon: item.inactiveIcon,
          }}
          name={item.name}
          component={item.component}
        />
      ))}
    </Tab.Navigator>
  );
}

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name={ScreenConst.home} component={DrawerNavigator} />
      <Stack.Screen name={ScreenConst.allProducts} component={AllProducts} />
      <Stack.Screen name={ScreenConst.userProfile} component={UserProfille} />
      <Stack.Screen name={ScreenConst.notification} component={Notification} />
      <Stack.Screen name={ScreenConst.login} component={Login} />
      <Stack.Screen
        name={ScreenConst.verificationCode}
        component={VerificationCode}
      />
      <Stack.Screen
        initialParams={{icon: ImageConst.englandFlag}}
        name={ScreenConst.itemDetails}
        component={ItemDetails}
      />
    </Stack.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeBackgroundColor: 'white',
        activeTintColor: colors.primary,
        itemStyle: {borderBottomColor: colors.lightGrey, borderBottomWidth: 2},
        labelStyle: {
          fontSize: scaleFont(16),
        },
      }}
      drawerStyle={{width: '80%'}}
      drawerContent={(props) => <CustomDrawer {...props} />}>
      {tabs.map((item, index) => {
        return (
          <Drawer.Screen
            key={index}
            options={{
              drawerLabel: item.label,
              drawerIcon: ({size, color, focused}) => {
                return (
                  <FastImage
                    style={{width: size, height: size}}
                    source={
                      focused ? item.activeIcon : item.inactiveIcon
                    }></FastImage>
                );
              },
            }}
            name={item.name}
            component={item.component}
          />
        );
      })}
    </Drawer.Navigator>
  );
}
