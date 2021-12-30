import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootView, Header, Button } from '../../../components';
import { metrics, commonstyles } from '../../../utils/Theme';
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
      <Header title={'Add or Delete payment method'}></Header>
      <View style={{ margin: metrics.defaultMargin }}>
        <Text regular
          style={{
            ...commonstyles.customerSupportText,
            marginTop: metrics.defaultMargin,
          }}>
         During the order process you get asked to choose a payment method. By entering the payment details you can find the checkbox asking if you would like to store the payment details for future orders.
        </Text>

        <Text regular
          style={{
            ...commonstyles.customerSupportText,
            marginTop: metrics.largeMargin,
          }}>If you have already stored payment details and you want to remove them you can go to your account and in section MY PAYMENTS you can delete it.</Text>
      </View>
    </RootView>
  );
}

const styles = StyleSheet.create({});
