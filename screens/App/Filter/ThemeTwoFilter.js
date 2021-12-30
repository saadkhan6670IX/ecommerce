import React, {useState} from 'react';
import { View, ScrollView, TouchableOpacity} from 'react-native';
import {Header, HorizontalList, RootView , VerticalList} from '../../../components';
import Navigator from '../../../utils/Navigator';
import ScreenConst from '../../../constants/ScreenConst';
import ItemCard from '../../../components/ItemCard';
import PromotionCard from '../../../components/PromotionCard/index.js';
import CategoryCard from '../../../components/CateogryCard/index.js';
import {useSelector} from 'react-redux';
import {categories} from '../../../data';
import {useRtlContext} from 'react-native-easy-localization-and-rtl';
import {colors, commonstyles, metrics} from '../../../utils/Theme';
import {Text} from '../../../components';
export default function Filter() {
  const products = useSelector((state) => state.products);
  const {RtlStyles, isRtl, language, setLanguage} = useRtlContext();

  const RenderHeading = ({title, onPress, style}) => {
    return (
      <View
        style={{
          ...commonstyles.spaceBetween,
          marginVertical: metrics.smallMargin,
          ...style,
        }}>
        <Text style={{...commonstyles.smallText16,
          //  fontWeight: '600'
           }}>
          {title}
        </Text>
        <Text
          onPress={onPress}
          style={[commonstyles.xsText, 
          // {fontWeight: '400'}
          ]}>
          View all
        </Text>
      </View>
    );
  };

  return (
    <RootView bottom={0}>
      <Header showDrawer showNotification title={'Dewan Restaurant'}></Header>
      <ScrollView showsVerticalScrollIndicator={false}>

      </ScrollView>
    </RootView>
  );
}
