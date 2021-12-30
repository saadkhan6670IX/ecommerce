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
import { Text } from '../../../components'

export default function index() {
  return (
    <RootView>
      <Header title={'Did not receive promotion code'}></Header>
      <View style={{ margin: metrics.defaultMargin }}>
        <Text regular style={{
          ...commonstyles.customerSupportText,
          marginVertical: metrics.defaultMargin,
        }}>These promotional codes (promo code) are for new
          users only. If you already have Google account and
          now trying to get the promotional code by clicking
          any promotion from app, then either you may not
          receive the promo code or it will not work with
your account.</Text>

        <Text regular style={{
          ...commonstyles.customerSupportText,
          marginVertical: metrics.defaultMargin,
        }}>
          These special offers can be used to redeem amazing
deals & offers that gets applied to your account.        </Text>

        <Text regular style={{
          ...commonstyles.customerSupportText,
          marginVertical: metrics.defaultMargin,
        }}>
          As such, you'd be contacted directly by them if your
account is eligible for a promotional code.        </Text>

      </View>
    </RootView>
  );
}

const styles = StyleSheet.create({
});
