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
import {myAccount} from '../../../data/index';
import CustomerSupportCard from '../../../components/CustomerSupportCard'


export default function MyAccount() {
  return (
    <RootView>
      <Header title={'My Account'}></Header>
      <View>
        <VerticalList
          bounces={false}
          //   ListEmptyComponent={ListEmptyComponent}
          data={myAccount}
          contentContainerStyle={{
            paddingHorizontal: metrics.defaultMargin,
            paddingVertical: metrics.smallMargin,
          }}
          renderItem={({item}) => {
            return (
             <CustomerSupportCard item = {item}/>
            );
          }}
        />
      </View>
    </RootView>
  );
}
