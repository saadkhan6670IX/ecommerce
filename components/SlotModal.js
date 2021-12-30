import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import cities from '../data/cities';
import { colors, metrics, scaleFont } from '../utils/Theme';
import { Text } from '../components';

export default function SlotModal(props) {
  const { isVisible, onDismiss, onItemSelect, items, title } = props;

  const handleCitySelection = (city, cities) => {
    cities.map((cityObj) => {
      cityObj.is_selected = city.id === cityObj.id ? true : false;
    });
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onDismiss}>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 12,
          overflow: 'hidden',
          maxHeight: metrics.width
        }}>
        <View
          style={{
            backgroundColor: colors.primaryBtnBackcolor,
            justifyContent: 'center',
            alignItems: 'center',
            padding: metrics.width / 29,
            borderBottomWidth: metrics.width / 300, borderBottomColor: colors.grey 
          }}>
          <Text style={{ fontSize: scaleFont(17) }}>{title}</Text>
        </View>
        {/* <View style={{ height: 1, backgroundColor: colors }}></View> */}
        <FlatList
          data={items}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={({ item }) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
            style={{ borderBottomWidth: metrics.width / 300, borderBottomColor: colors.grey }}
              onPress={() => {
                onItemSelect(item);
              }}>
          
                <Text
                  style={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    padding: metrics.width / 29,
                    backgroundColor: item.is_selected
                      ? colors.darkGray
                      : 'white',
                  }}>
                  {item.slots}
                </Text>
            </TouchableOpacity>
          )}></FlatList>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  content: {
    maxHeight: metrics.height * 0.7,
    width: '100%',
    height: '80%',
    marginTop: metrics.height * 0.02,
  },
});
