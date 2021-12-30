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
      <Header title={`Will meals be labelled?`}></Header>
      <ScrollView showsVerticalScrollIndicator ={false} style={{ margin: metrics.defaultMargin }}>
        <Text regular style={{
          ...commonstyles.customerSupportText,
          marginVertical: metrics.defaultMargin,
        }}>You can request that your meals be labeled in `
        special instructions`. However, depending on the 
        restaurant and how busy they are, they might not
         be able to carry out your request.</Text>

        <Text regular style={{
          ...commonstyles.customerSupportText,
          marginVertical: metrics.defaultMargin,
        }}>If you want your meals labeled for allergy reasons, 
        specify this in your instructions.</Text>

      </ScrollView>
    </RootView>
  );
}

const styles = StyleSheet.create({
});
