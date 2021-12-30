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
      <Header title={`I can't sign up using my phone number`}></Header>
      <View style={{ margin: metrics.defaultMargin }}>
        <Text
          regular
          style={styles.text}>
          <Text bold>Can I use a landline?</Text> It's not possible to use landline numbers as we may need to send important order information via text message.
        </Text>

        <Text
          regular
          style={styles.text}>
          <Text bold>I got a message that says “Please enter a valid phone number”</Text> Make sure you are inputting a cell phone number with no special characters or spaces.
        </Text>

        <Text
          regular
          style={styles.text}>
          <Text bold>I got a message that says “Your phone number is already in use”</Text> Write a message below and we'll try to resolve this for you.
        </Text>

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
