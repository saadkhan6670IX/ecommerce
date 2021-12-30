import React from 'react';
import {StyleSheet, View} from 'react-native';
import {metrics, colors, commonstyles, scaleFont} from '../../utils/Theme';
import Icon from 'react-native-vector-icons/AntDesign';
import {Text} from '../../components';
export default function ThemeOneNotificationCard(props) {
  const {item} = props;
  const {title, time, description} = item;
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Icon size={scaleFont(11)} name={'caretright'}></Icon>
      </View>
      <View style={styles.middle}>
        <Text semiBold style={[styles.title]}>
          {title}
        </Text>
        <Text
          regular
          style={[styles.description, {color: colors.primaryLight}]}>
          {description}
        </Text>
      </View>
      <View style={styles.right}>
        <Text regular style={[styles.time, {color: colors.primaryLight}]}>
          {time}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: metrics.smallMargin,
    borderRadius: 10,
  },
  left: {
    // paddingTop: metrics.height * 0.005,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  middle: {flex: 5},
  right: {flex: 3},
  title: {fontSize: scaleFont(13), textAlign: 'left'},
  description: {
    fontSize: scaleFont(12),
    textAlign: 'left',
    color: colors.greyText,
    marginTop: metrics.smallMargin,
  },
  time: {
    fontSize: scaleFont(12),

    color: colors.greyText,
    fontStyle: 'italic',
    alignSelf: 'center',
  },
});
