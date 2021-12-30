import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {VerticalList, RootView, Header} from '../../../components';
import {commonstyles, metrics} from '../../../utils/Theme';

import CategoryCard from '../../../components/CateogryCard';

export default function ThemeOneSubCategories(props) {
  const {data, headerTitle} = props;
  return (
    <RootView bottom={0}>
      <Header showNotification title={headerTitle}></Header>
      <View style={{paddingHorizontal: metrics.defaultMargin, flex: 1}}>
        <VerticalList
          numColumns={3}
          scrollEnabled={true}
          data={data}
          contentContainerStyle={{paddingTop: metrics.defaultMargin}}
          renderItem={({item}) => (
            <TouchableOpacity
              // onPress={() => ProductDetail', {item})}
              style={{
                ...commonstyles.VerticalListContainer,
                flex: 1 / 3,
              }}>
              <CategoryCard
                style={{
                  width: '100%',
                  marginBottom: 0,
                  marginTop: 0,
                }}
                numberOfLines={2}
                imageStyle={{width: '100%', height: metrics.height * 0.12}}
                item={item}></CategoryCard>
            </TouchableOpacity>
          )}></VerticalList>
      </View>
    </RootView>
  );
}

const styles = StyleSheet.create({});
