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
      <Header title={'What is pick-up?'}></Header>
      <View style={{ margin: metrics.defaultMargin }}>
        <Text regular style={{
          ...commonstyles.customerSupportText,
          marginVertical: metrics.defaultMargin,
        }}>
          Some restaurants allow you to place your order online and then collect your meal yourself (instead of having a rider deliver it to you).
        </Text>

        <Text regular style={{
          ...commonstyles.customerSupportText,
          marginVertical: metrics.defaultMargin,
        }}>
          This can be convenient if you are driving home from work and will pass by the restaurant on your way.
        </Text>

        <Text regular style={{
          ...commonstyles.customerSupportText,
          marginVertical: metrics.defaultMargin,
        }}>
          It also saves you money, as you don't pay any delivery fees when you choose pick-up.
        </Text>

      </View>
    </RootView>
  );
}

const styles = StyleSheet.create({
});
