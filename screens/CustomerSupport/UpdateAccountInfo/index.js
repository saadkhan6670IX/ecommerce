import React from 'react';
import {StyleSheet, View} from 'react-native';
import {RootView, Header, Button} from '../../../components';
import {metrics, commonstyles} from '../../../utils/Theme';
import StepsTimeLine from '../../../components/StepsTimeline';
import { Text } from '../../../components'

const data = [
  {
    id: '1',
    details: 'Go to profile section in the app , located at bototm tab bar',
  },
  {
    id: '2',
    details: 'Simply Edit the text feild by clicking on it',
  },
  {
    id: '3',
    details: 'Press the Save Button',
  },
];

export default function index() {
  return (
    <RootView>
      <Header title={'Update Account Info'}></Header>
      <View style={{margin: metrics.defaultMargin}}>
        <Text regular
          style={{
            ...commonstyles.customerSupportText,
            marginTop: metrics.defaultMargin,
          }}>
          To change your phone number or other information associated with your
          account, follow these steps:
        </Text>
        <View style={{marginVertical: metrics.largeMargin}}>
          <StepsTimeLine data={data}></StepsTimeLine>
        </View>
        <Text regular style={{...commonstyles.customerSupportText}}>
          Note: to change your email address, you'll need to do it in the
          profile sectio on the web.Log in on profile and click on your profile.
        </Text>

        {/* <View
          style={{
            marginVertical: metrics.defaultMargin,
            ...commonstyles.coloumnCenter,
          }}>
          <Text
            style={{
              ...commonstyles.customerSupportText,
              color: 'black',
            }}>
            Was this helpful?
          </Text>
          <View
            style={{
              ...commonstyles.spaceBetween,
              width: '100%',
              marginTop: metrics.defaultMargin,
            }}>
            <Button text={'Got your answer'}></Button>
            <Button text={'Add more info'}></Button>
          </View>
        </View> */}
      </View>
    </RootView>
  );
}

const styles = StyleSheet.create({});
