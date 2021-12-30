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
      <Header title={'I did not get my promotion discount'}></Header>
      <View style={{ margin: metrics.defaultMargin }}>
        <Text regular style={{
          ...commonstyles.customerSupportText,
          marginVertical: metrics.defaultMargin,
        }}>
          This is our process if you eligible for discount in
24 hours approx.        </Text>

        <Text regular style={{
          ...commonstyles.customerSupportText,
          marginVertical: metrics.defaultMargin,
        }}>
          You will receive you promotion discount in next
          24 hours our team will notify you through email
as well        </Text>

        <Text regular style={{
          ...commonstyles.customerSupportText,
          marginVertical: metrics.defaultMargin,
        }}>
          After that you will receive two extra discount deals
in promotion as well         </Text>

      </View>
    </RootView>
  );
}

const styles = StyleSheet.create({
});
