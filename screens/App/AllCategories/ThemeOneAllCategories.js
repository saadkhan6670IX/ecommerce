import React from 'react';
import {StyleSheet, View, TouchableOpacity, RefreshControl} from 'react-native';
import {
  VerticalList,
  RootView,
  Header,
  Text,
  Loader,
} from '../../../components';
import {commonstyles, metrics} from '../../../utils/Theme';
import {categories} from '../../../data';
import NothingFound from '../../../components/NothingFound';

import CategoryCard from '../../../components/CateogryCard';
export default function ThemeOneAllCategories(props) {
  const {data, onPullToRefresh, refreshing} = props;

  if (data === null) {
    return (
      <RootView bottom={0}>
        <Header showDrawer showNotification title={'Categories'}></Header>
        <View style={{padding: metrics.defaultMargin, flex: 1}}>
          <Loader></Loader>
        </View>
      </RootView>
    );
  }

  return (
    <RootView bottom={0}>
      <Header title={'Categories'}></Header>
      <View style={{padding: metrics.defaultMargin, flex: 1}}>
        <VerticalList
          numColumns={2}
          scrollEnabled={true}
          data={data}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onPullToRefresh}
            />
          }
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  marginVertical: metrics.largeMargin,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <NothingFound style={{marginBottom: metrics.largeMargin}}>
                  <Text>No Categories Found</Text>
                </NothingFound>
              </View>
            );
          }}
          renderItem={({item}) => (
            <TouchableOpacity
              // onPress={() => Navigator.navigate('ProductDetail', {item})}
              style={{
                ...commonstyles.VerticalListContainer,

                // ...commonstyles.shadow,
                flex: 1 / 2,
              }}>
              <CategoryCard
                style={{width: '100%'}}
                imageStyle={{width: '100%', height: metrics.height * 0.18}}
                item={item}></CategoryCard>
            </TouchableOpacity>
          )}></VerticalList>
      </View>
    </RootView>
  );
}

const styles = StyleSheet.create({});
