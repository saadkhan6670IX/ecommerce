import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootView, Header, Button } from '../../../components';
import { metrics, commonstyles } from '../../../utils/Theme';
import StepsTimeLine from '../../../components/StepsTimeline';

const data = [
  {
    id: '1',
    details: 'Check with your bank about adjusting daily withdrawal or purchase limits.',
  },
  {
    id: '2',
    details: 'Make sure your bank has your most recent contact information.',
  },
  {
    id: '3',
    details: 'Check you have your current payment details stored in your Diwan account.',
  }
];

export default function index() {
  return (
    <RootView>
      <Header title={'My payment was declined'}></Header>
      <View style={{ margin: metrics.defaultMargin }}>
        <Text regular
          style={{
            ...commonstyles.customerSupportText,
            marginTop: metrics.defaultMargin,
          }}>An online payment can be declined for a variety of reasons. You may have incorrectly entered your payment details or you've reached your credit card limit.</Text>
        <Text regular
          style={{
            ...commonstyles.customerSupportText,
            marginTop: metrics.largeMargin,
          }}>To solve this, try one of the following steps:</Text>

<View style={{marginVertical: metrics.largeMargin}}>
          <StepsTimeLine data={data}></StepsTimeLine>
        </View>

      </View>
    </RootView>
  );
}

const styles = StyleSheet.create({});
