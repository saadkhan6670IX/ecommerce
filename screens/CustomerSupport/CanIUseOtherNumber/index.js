import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RootView, Header, Button} from '../../../components';
import {metrics, commonstyles} from '../../../utils/Theme';
import StepsTimeLine from '../../../components/StepsTimeline';

const data = [
  {
    id: '1',
    details: 'Go to the Edit profile in the app',
  },
  {
    id: '2',
    details: 'You can now change your phone number from there by clicking on the field',
  },
  {
    id: '3',
    details: 'and then click on "update"',
  },
  {
    id: '4',
    details: 'Your number is successfully updated',
  }
];

export default function index() {
  return (
    <RootView>
      <Header title={'Can I Use other number for login'}></Header>
      <View style={{margin: metrics.defaultMargin}}>
        <View style={{marginVertical: metrics.largeMargin}}>
          <StepsTimeLine data={data}></StepsTimeLine>
        </View>
      </View>
    </RootView>
  );
}

const styles = StyleSheet.create({});
