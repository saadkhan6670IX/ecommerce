import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {VerticalList, RootView, Header} from '../../../components';
import {colors, metrics, scaleFont} from '../../../utils/Theme';
import StringConst from '../../../constants/StringConst';
import {customerSupport} from '../../../data/index';
import CustomerSupportCard from '../../../components/CustomerSupportCard';

export default function ThemeOneCustomerSupport() {
  console.log('customerSupport',customerSupport);
  return (
    <RootView>
      <Header title={'Customer Support'}></Header>
      <View>
        <VerticalList
          bounces={false}
            // ListEmptyComponent={ListEmptyComponent}
          data={customerSupport}
          contentContainerStyle={{
            paddingHorizontal: metrics.defaultMargin,
            paddingVertical: metrics.smallMargin,
          }}
          renderItem={({item, index}) => {
            return <CustomerSupportCard item={item} index= {index} />;
          }}
        />
      </View>
    </RootView>
  );
}

const styles = StyleSheet.create({});

