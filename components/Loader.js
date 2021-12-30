import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {colors} from '../utils/Theme';

export default function Loader(props) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        ...props.containerStyle,
      }}>
      <ActivityIndicator
        size={'large'}
        color={colors.primaryBtnBackcolor}
        {...props}></ActivityIndicator>
    </View>
  );
}

const styles = StyleSheet.create({});
