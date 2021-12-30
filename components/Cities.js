import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import cities from '../data/cities';
import { colors, metrics, scaleFont } from '../utils/Theme';
import { Text } from '../components';
import { getCities } from '../services/AppSettings';
import { useDispatch, useSelector } from 'react-redux';

export default function Cities(props) {
  const { isVisible, onDismiss, onCitySelect } = props;

  const [cities, setCities] = useState([])
  const language = useSelector((state) => state.userReducer.language);

  useEffect(() => {
    getCities()
      .then((response) => {
        let d = response.data.data.map(v => {
          return {
            ...v,
            is_selected: false
          }
        })
        setCities(d)
      })
      .catch((err) => {
      });
  }, [isVisible])

  const handleCitySelection = (city, cities) => {
    cities.map((cityObj) => {
      cityObj.is_selected = city.id === cityObj.id ? true : false;
    });
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onDismiss}>
      <View
        style={{
          flex: 0.5,
          backgroundColor: 'white',
          borderRadius: 12,
          paddingVertical: 10,
        }}>
        <View
          style={{
            backgroundColor: 'white',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: scaleFont(14) }}>CITIES</Text>
        </View>
        <View style={{ height: 1, backgroundColor: 'black' }}></View>
        <FlatList
          data={cities}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={({ item }) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                handleCitySelection(item, cities);
                onCitySelect(item.name_en);
              }}>
              <View style={{ borderBottomWidth: .8, borderBottomColor: 'black' }}>
                <Text
                  style={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    padding: 10,
                    color: colors.placeHolder,
                  }}>
                  {item[`name_${language}`]}
                </Text>
              </View>
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
