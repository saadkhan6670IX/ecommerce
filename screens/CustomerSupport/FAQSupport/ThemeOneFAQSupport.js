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

export default function FAQSupport() {
  return (
    <RootView>
      <Header title={'Frequently Asked Questions'}></Header>
      <View style={{ margin: metrics.defaultMargin }}>
        <Text regular style={{
          ...commonstyles.customerSupportText, 
          marginVertical: metrics.defaultMargin,
        }}>
          {StringConst.FaqDisclaimer}
        </Text>
        <VerticalList
          bounces={false}
          //   ListEmptyComponent={ListEmptyComponent}
          data={FAQ}
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
