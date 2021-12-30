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
import {promotions} from '../../../data/index';
import CustomerSupportCard from '../../../components/CustomerSupportCard';

export default function ThemeOnePromotionSupport() {
  return (
    <RootView>
      <Header title={'Promotions'}></Header>
      <View>
        <VerticalList
          bounces={false}
          //   ListEmptyComponent={ListEmptyComponent}
          data={promotions}
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