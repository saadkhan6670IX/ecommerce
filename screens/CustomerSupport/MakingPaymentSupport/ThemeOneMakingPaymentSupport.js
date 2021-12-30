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
import { makingAPayment } from '../../../data/index';
import CustomerSupportCard from '../../../components/CustomerSupportCard';
import { Text } from '../../../components'

export default function MakingPaymentSupport() {
  return (
    <RootView>
      <Header title={'Making A Payment'}></Header>
      <View style={{ margin: metrics.defaultMargin }}>
        <Text regular style={{
          ...commonstyles.customerSupportText, 
          marginVertical: metrics.defaultMargin,
        }}>
          {StringConst.MakingAPaymentDisclaimer}
        </Text>
        <VerticalList
          bounces={false}
          //   ListEmptyComponent={ListEmptyComponent}
          data={makingAPayment}
          contentContainerStyle={{
            // paddingHorizontal: metrics.defaultMargin,
            paddingVertical: metrics.smallMargin,
          }}
          renderItem={({ item }) => {
            return <CustomerSupportCard item={item} />;
          }}
        />
      </View>
    </RootView>
  );
}

const styles = StyleSheet.create({
});
