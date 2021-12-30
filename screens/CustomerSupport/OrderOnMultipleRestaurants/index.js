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
      <Header title={`Order on multiple restaurants`}></Header>
      <ScrollView showsVerticalScrollIndicator ={false} style={{ margin: metrics.defaultMargin }}>
        <Text regular style={{
          ...commonstyles.customerSupportText,
          marginVertical: metrics.defaultMargin,
        }}>Unfortunately, you can't order from multiple 
        restaurants in the same order.</Text>

        <Text regular style={{
          ...commonstyles.customerSupportText,
          marginVertical: metrics.defaultMargin,
        }}>However, you can place a separate order from 
        a different restaurant while your current order
         is being prepared and delivered.</Text>
         
        <Text regular style={{
          ...commonstyles.customerSupportText,
          marginVertical: metrics.defaultMargin,
        }}>Note that each order will have a separate delivery
        fee.</Text>

      </ScrollView>
    </RootView>
  );
}

const styles = StyleSheet.create({
});
