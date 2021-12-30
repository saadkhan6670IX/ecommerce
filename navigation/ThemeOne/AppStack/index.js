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
import {FastImage} from '../../../components';
//screens
import Home from '../../../screens/App/Home';
import ItemDetails from '../../../screens/App/ItemDetails';
import Filter from '../../../screens/App/Filter';
import AllCategories from '../../../screens/App/AllCategories';
import Promotions from '../../../screens/App/Promotions';
import Combos from '../../../screens/App/Combos';

import UserProfille from '../../../screens/App/UserProfile';
import Notification from '../../../screens/App/Notification';
import AllProducts from '../../../screens/App/AllProducts';
import OrderStatus from '../../../screens/App/OrderStatus';
import TrackOrder from '../../../screens/App/TrackOrder';
import Thankyou from '../../../screens/App/ThankYou';
import CartDetails from '../../../screens/App/CartDetails';
import ViewCart from '../../../screens/App/ViewCart';
import Map from '../../../screens/App/Maps';
import AllAddresses from '../../../screens/App/AllAddresses';
import CustomerSupport from '../../../screens/CustomerSupport/CustomerSupport';
import MyAccount from '../../../screens/CustomerSupport/MyAccount';
import PromotionsSupport from '../../../screens/CustomerSupport/PromotionSupport';
import MakingPaymentSupport from '../../../screens/CustomerSupport/MakingPaymentSupport';
import FAQSupport from '../../../screens/CustomerSupport/FAQSupport';
import MakingSupportRequest from '../../../screens/CustomerSupport//MySupportRequests';
import MySupportTickets from '../../../screens/CustomerSupport/MySupportTickets';
import SelectOption from '../../../screens/App/SelectOption';
import SelectBranch from '../../../screens/App/SelectBranch';
import EditProfile from '../../../screens/App/Profile';
import SubCategories from '../../../screens/App/SubCategories';
import OrderDetail from '../../../screens/App/OrderDetail';
import UpdateAccountInfo from '../../../screens/CustomerSupport/UpdateAccountInfo';
import OtpCodeDidntWork from '../../../screens/CustomerSupport/OtpCodeDidntWork';
import CanIUseOtherNumber from '../../../screens/CustomerSupport/CanIUseOtherNumber';
import ICantSignup from '../../../screens/CustomerSupport/ICantSignup';
import AddOrDeletePaymentMethod from '../../../screens/CustomerSupport/AddOrDeletePaymentMethod';
import MyPaymentWasDeclined from '../../../screens/CustomerSupport/MyPaymentWasDeclined';
import CheckoutButtonDoesntWork from '../../../screens/CustomerSupport/CheckoutButtonDoesntWork';
import PaymentMethodsAvailable from '../../../screens/CustomerSupport/PaymentMethodsAvailable';
import DidntRecieveMyPromoCode from '../../../screens/CustomerSupport/DidntRecieveMyPromoCode';
import HowNextPromoWillCome from '../../../screens/CustomerSupport/HowNextPromoWillCome';
import IdidntGetMyPromoDiscount from '../../../screens/CustomerSupport/IdidntGetMyPromoDiscount';
import WhatIsPickUp from '../../../screens/CustomerSupport/WhatIsPickUp';
import ICantEnterMyAddress from '../../../screens/CustomerSupport/ICantEnterMyAddress';
import OrderOnMultipleRestaurants from '../../../screens/CustomerSupport/OrderOnMultipleRestaurants';
import WillMealsBeLabelled from '../../../screens/CustomerSupport/WillMealsBeLabelled';
import {colors, scaleFont} from '../../../utils/Theme';
import Icon from 'react-native-vector-icons/Ionicons';

import CustomDrawer from '../../../components/SideDrawer';
import SearchPlaces from '../../../screens/App/SearchPlaces/SearchPlaces';
import VerificationCode from '../../../screens/Auth/VerificationCode';
import Login from '../../../screens/Auth/Login';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

// const {t} = useTranslation();

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
  },
  {
    id: 1,
    activeIcon: ImageConst.orderActive,
    inactiveIcon: ImageConst.order,
    name: ScreenConst.orderStatus,
    component: OrderStatus,
  },
  {
    id: 2,
    activeIcon: ImageConst.addToCartIcon,
    inactiveIcon: ImageConst.addToCartIcon,
    name: ScreenConst.addToCart,
    component: ViewCart,
  },
  {
    id: 3,
    activeIcon: ImageConst.promoActive,
    inactiveIcon: ImageConst.promoIcon,
    name: ScreenConst.promo,
    component: Promotions,
  },
  {
    id: 4,
    activeIcon: ImageConst.userNavIcon,
    inactiveIcon: ImageConst.userNavIcon,
    name: ScreenConst.userProfile,
    component: EditProfile,
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

export default function AppStack(props) {
  const {initialRouteName} = props;
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name={ScreenConst.selectOption} component={SelectOption} />
      <Stack.Screen name={ScreenConst.home} component={DrawerNavigator} />
      <Stack.Screen name={ScreenConst.allProducts} component={AllProducts} />
      <Stack.Screen name={ScreenConst.Combos} component={Combos} />
      <Stack.Screen name={ScreenConst.userProfile} component={EditProfile} />
      <Stack.Screen name={ScreenConst.notification} component={Notification} />
      <Stack.Screen name={ScreenConst.orderStatus} component={OrderStatus} />
      <Stack.Screen name={ScreenConst.trackOrder} component={TrackOrder} />
      <Stack.Screen name={ScreenConst.thankYou} component={Thankyou} />
      <Stack.Screen name={ScreenConst.cartDetails} component={CartDetails} />
      <Stack.Screen name={ScreenConst.viewCart} component={ViewCart} />
      <Stack.Screen name={ScreenConst.selectAddress} component={Map} />
      <Stack.Screen name={ScreenConst.searchPlacess} component={SearchPlaces} />
      <Stack.Screen name={ScreenConst.selectBranch} component={SelectBranch} />
      <Stack.Screen name={ScreenConst.orderDetails} component={OrderDetail} />
      <Stack.Screen name={ScreenConst.allAddresses} component={AllAddresses} />
      <Stack.Screen
        name={ScreenConst.allCategories}
        component={AllCategories}
      />

      <Stack.Screen
        initialParams={{icon: ImageConst.englandFlag}}
        name={ScreenConst.itemDetails}
        component={ItemDetails}
      />
      <Stack.Screen
        name={ScreenConst.subCategories}
        component={SubCategories}
      />
      <Stack.Screen
        name={ScreenConst.customerSupport}
        component={CustomerSupportStack}
      />

      <Stack.Screen name={ScreenConst.filter} component={Filter} />
      <Stack.Screen name={ScreenConst.profile} component={EditProfile} />
      {/* //authentication screens */}
      <Stack.Screen name={ScreenConst.login} component={Login} />
      <Stack.Screen
        name={ScreenConst.verificationCode}
        component={VerificationCode}
      />
    </Stack.Navigator>
  );
}

function CustomerSupportStack() {
  return (
    <Stack.Navigator
      // initialRouteName= {ScreenConst.cartDetails}
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        name={ScreenConst.customerSupport}
        component={CustomerSupport}
      />
      <Stack.Screen name={ScreenConst.myAccount} component={MyAccount} />
      <Stack.Screen
        name={ScreenConst.promotionSupport}
        component={PromotionsSupport}
      />
      <Stack.Screen
        name={ScreenConst.makingPaymentSupport}
        component={MakingPaymentSupport}
      />
      <Stack.Screen name={ScreenConst.FAQSupport} component={FAQSupport} />
      <Stack.Screen
        name={ScreenConst.makingSupportRequest}
        component={MakingSupportRequest}
      />
      <Stack.Screen
        name={ScreenConst.mySupportTickets}
        component={MySupportTickets}
      />
      <Stack.Screen
        name={ScreenConst.updateAccountInfo}
        component={UpdateAccountInfo}
      />

      <Stack.Screen
        name={ScreenConst.OtpCodeDidntWork}
        component={OtpCodeDidntWork}
      />

      <Stack.Screen name={ScreenConst.cantSignUp} component={ICantSignup} />

      <Stack.Screen
        name={ScreenConst.canIUseOtherNumber}
        component={CanIUseOtherNumber}
      />

      <Stack.Screen
        name={ScreenConst.AddOrDeletePaymentMethod}
        component={AddOrDeletePaymentMethod}
      />

      <Stack.Screen
        name={ScreenConst.MyPaymentWasDeclined}
        component={MyPaymentWasDeclined}
      />

      <Stack.Screen
        name={ScreenConst.CheckoutButtonDoesntWork}
        component={CheckoutButtonDoesntWork}
      />

      <Stack.Screen
        name={ScreenConst.PaymentMethodsAvailable}
        component={PaymentMethodsAvailable}
      />

      <Stack.Screen
        name={ScreenConst.DidntRecievePromoCode}
        component={DidntRecieveMyPromoCode}
      />

      <Stack.Screen
        name={ScreenConst.HowNextPromoWillCome}
        component={HowNextPromoWillCome}
      />

      <Stack.Screen
        name={ScreenConst.DidntGetMyPromoDiscount}
        component={IdidntGetMyPromoDiscount}
      />

      <Stack.Screen name={ScreenConst.WhatIsPickup} component={WhatIsPickUp} />

      <Stack.Screen
        name={ScreenConst.CantEnterMyAddress}
        component={ICantEnterMyAddress}
      />

      <Stack.Screen
        name={ScreenConst.OrderOnMultipleRestaurants}
        component={OrderOnMultipleRestaurants}
      />

      <Stack.Screen
        name={ScreenConst.WillMealsBeLabelled}
        component={WillMealsBeLabelled}
      />
    </Stack.Navigator>
  );
}

export const loggedInDrawer = [
  {
    id: 0,
    drawerLabel: 'Home',
    icon: ImageConst.homeDrawer,
    name: ScreenConst.home,
    component: HomeTabs,
  },

  // {
  //   id: 1,
  //   drawerLabel: 'Orders',
  //   icon: ImageConst.ordersIcon,
  //   name: ScreenConst.orderStatus,
  //   component: OrderStatus,
  // },

  {
    id: 2,
    drawerLabel: 'Addresses',
    icon: ImageConst.AddressIcon,
    name: ScreenConst.allAddresses,
    component: AllAddresses,
  },

  {
    id: 3,
    drawerLabel: 'Customer Support',
    icon: ImageConst.customerSupportIcon,
    name: ScreenConst.customerSupport,
    component: CustomerSupportStack,
  },
];

const guestDrawer = [
  {
    id: 0,
    drawerLabel: 'Home',
    icon: ImageConst.homeDrawer,
    name: ScreenConst.home,
    component: HomeTabs,
  },

  {
    id: 1,
    drawerLabel: 'Customer Support',
    icon: ImageConst.customerSupportIcon,
    name: ScreenConst.customerSupport,
    component: CustomerSupportStack,
  },
];

function DrawerNavigator() {
  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);
  let drawerToShow = guestDrawer;
  if (isLoggedIn) {
    drawerToShow = loggedInDrawer;
  }
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeBackgroundColor: 'white',
        activeTintColor: colors.primary,
        itemStyle: {borderBottomColor: colors.lightGrey, borderBottomWidth: 2},
        labelStyle: {
          fontSize: scaleFont(14),
          color: 'black',
        },
      }}
      drawerStyle={{width: '80%'}}
      drawerContent={(props) => (
        <CustomDrawer
          isLoggedIn={isLoggedIn}
          {...props}
          drawerToShow={drawerToShow}
        />
      )}>
      {drawerToShow.map((item, index) => (
        <Drawer.Screen
          options={{
            drawerLabel: item.drawerLabel,
            drawerIcon: ({size, color, focused}) => {
              return (
                <FastImage
                  source={item.icon}
                  style={{width: size, height: size}}></FastImage>
              );
            },
          }}
          key={index}
          name={item.name}
          component={item.component}
        />
      ))}
    </Drawer.Navigator>
  );
}
