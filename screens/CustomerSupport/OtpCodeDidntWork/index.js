import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RootView, Header, Button} from '../../../components';
import {metrics, commonstyles} from '../../../utils/Theme';
import StepsTimeLine from '../../../components/StepsTimeline';

const data = [
  {
    id: '1',
    details: 'I think you have facing an issue through service provider',
  },
  {
    id: '2',
    details: 'Please "restart you phone" and send the no. for OTP code again',
  },
  {
    id: '3',
    details: 'and if you received "new code"',
  },
  {
    id: '4',
    details: 'You can click on button "Confirm" below',
  },
  {
    id: '5',
    details: 'Your code is successfully "Confirmed"',
  },
];

export default function index() {
  return (
    <RootView>
      <Header title={'Update Account Info'}></Header>
      <View style={{margin: metrics.defaultMargin}}>
        <View style={{marginVertical: metrics.largeMargin}}>
          <StepsTimeLine data={data}></StepsTimeLine>
        </View>
      </View>
    </RootView>
  );
}

const styles = StyleSheet.create({});
