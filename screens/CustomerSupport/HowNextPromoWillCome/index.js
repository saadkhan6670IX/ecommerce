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
      <Header title={'How next promotion will come'}></Header>
      <View style={{ margin: metrics.defaultMargin }}>
        <Text regular style={{
          ...commonstyles.customerSupportText,
          marginVertical: metrics.defaultMargin,
        }}>
          The next promotion appear when you spent more
than "1000SAR" in a week.        </Text>


        <Text regular style={{
          ...commonstyles.customerSupportText,
          marginVertical: metrics.defaultMargin,
        }}>
          If you will spent that amount more than three
          promotion will give you also email you and
          notify on your app account through notification
panel        </Text>

      </View>
    </RootView>
  );
}

const styles = StyleSheet.create({
});
