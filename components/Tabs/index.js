import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {colors, commonstyles, metrics, scaleFont} from '../../utils/Theme';
import {Text} from '../../components';
//this component receives array of objects
// [{ id:0 , title:'tab name' }]

export default function index(props) {
  const tabs = props.tabs;

  const activeTab = props.activeTab;

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        ...props.containerStyle,
      }}>
      {tabs.map((val) => (
        <TouchableOpacity
          onPress={() => {
            props.onTabPress && props.onTabPress(val.id);
          }}
          key={val.id}
          style={{
            borderBottomColor:
              activeTab == val.id
                ? colors.primaryBtnBackcolor
                : colors.secondaryBtnBackcolor,
            width: metrics.width * 0.3,
            height: metrics.height * 0.04,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 2,
          }}>
          <Text
            style={{
              fontSize: scaleFont(14),
              // fontWeight: 'bold',
              color: activeTab == val.id ? colors.primaryBtnBackcolor : colors.secondaryBtnBackcolor,
            }}>
            {val.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({});
