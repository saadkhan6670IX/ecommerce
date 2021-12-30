import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RootView, Header, Button } from '../../../components';
import { metrics, commonstyles, scaleFont } from '../../../utils/Theme';
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
      <Header title={`The checkout button doesn't work`}></Header>
      <View style={{ margin: metrics.defaultMargin }}>
        <Text
          regular
          style={styles.text}>You can pay cash on delivery or pay online while ordering using a credit or debit card.</Text>
      </View>
    </RootView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: scaleFont(13),
    marginVertical: metrics.defaultMargin,
    lineHeight: metrics.width / 15,
  }
});
