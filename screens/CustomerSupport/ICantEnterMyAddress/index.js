import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { VerticalList, RootView, Header } from '../../../components';
import { colors, commonstyles, metrics, scaleFont } from '../../../utils/Theme';
import StringConst from '../../../constants/StringConst';
import { FAQ } from '../../../data/index';
import CustomerSupportCard from '../../../components/CustomerSupportCard';
import { Text } from '../../../components'

export default function index() {
  return (
    <RootView>
      <Header title={`I can't enter my address`}></Header>
      <ScrollView showsVerticalScrollIndicator ={false} style={{ margin: metrics.defaultMargin }}>
        <Text regular style={{
          ...commonstyles.customerSupportText,
          marginVertical: metrics.defaultMargin,
        }}>
          If you can't enter your address, it's possible that
          your address is not yet listed on Google Maps. In
          this case, just enter your postal code or a nearby
address.        </Text>

        <Text regular style={{
          ...commonstyles.customerSupportText,
          marginVertical: metrics.defaultMargin,
        }}>
          You can also auto-fill your address using your
current location:</Text>



        <Text regular style={{
          ...commonstyles.customerSupportText,
          marginVertical: metrics.defaultMargin,
        }}>
          On our website: Use the icon on the address bar
          to auto-fill the nearest address to your current
          location. You may need to grant extra permissions
to allow us to access your location.</Text>

        <Text regular style={{
          ...commonstyles.customerSupportText,
          marginVertical: metrics.defaultMargin,
        }}>
          In our app: When using our app, your gps signal
          might be too weak to locate you properly. If you are
          unable to use your gps to select the address, input
          it manually. Make sure your phone's location
settings are turned on.</Text>


        <Text regular style={{
          ...commonstyles.customerSupportText,
          marginVertical: metrics.defaultMargin,
        }}>
          On iOS: Go to your settings and tap on Privacy.
          Select Location service and toggle it on for our
app.</Text>

        <Text regular style={{
          ...commonstyles.customerSupportText,
          marginVertical: metrics.defaultMargin,
        }}>
          On Android: Go to your settings and then tap on
 Location. Make sure Mode is set to High Accuracy.</Text>

      </ScrollView>
    </RootView>
  );
}

const styles = StyleSheet.create({
});
