import React, {useState, useCallback} from 'react';
import {View, ScrollView, RefreshControl} from 'react-native';
import {
  Header,
  HorizontalList,
  RootView,
  SearchBar,
  Text,
  VerticalList,
} from '../../../components';
import Navigator from '../../../utils/Navigator';
import ScreenConst from '../../../constants/ScreenConst';
import ItemCard from '../../../components/ItemCard';
import PromotionCard from '../../../components/PromotionCard/index.js';
import CategoryCard from '../../../components/CateogryCard/index.js';
import {useSelector} from 'react-redux';

import {colors, commonstyles, metrics} from '../../../utils/Theme';

import {useTranslation} from 'react-i18next';

export default function Home(props) {
  const {t} = useTranslation();
  const {promotions, categories, products, refreshing, onRefresh} = props;

  const RenderHeading = ({title, onPress, style}) => {
    return (
      <View
        style={{
          ...commonstyles.spaceBetween,
          marginVertical: metrics.smallMargin,
          ...style,
        }}>
        <Text
          medium
          style={{
            ...commonstyles.smallText16,
            // fontWeight: '600'
          }}>
          {title}
        </Text>
        <Text
          regular
          onPress={onPress}
          style={[
            commonstyles.xsText,
            // {fontWeight: '400'}
          ]}>
          {t('viewAll')}
        </Text>
      </View>
    );
  };

  const renderPromotions = () => {
    return (
      <>
        <RenderHeading
          style={{marginHorizontal: metrics.defaultMargin}}
          onPress={() => {
            Navigator.navigate(ScreenConst.promo);
          }}
          title={t('promotions')}></RenderHeading>

        <HorizontalList
          contentContainerStyle={{
            paddingLeft: metrics.defaultMargin,
            paddingVertical: 10,
          }}
          data={promotions}
          renderItem={({item}) => (
            <View
              style={{
                width: metrics.width * 0.6,
                // height: metrics.height * 0.18,
                marginRight: 10,
              }}>
              <PromotionCard cartType={1} item={item}></PromotionCard>
            </View>
          )}></HorizontalList>
      </>
    );
  };

  const renderCategories = () => {
    return (
      <View>
        <RenderHeading
          style={{marginHorizontal: metrics.defaultMargin}}
          onPress={() => {
            Navigator.navigate(ScreenConst.allCategories, {
              categories: categories,
            });
          }}
          title={t('exploreCategories')}></RenderHeading>

        <HorizontalList
          data={categories}
          contentContainerStyle={{
            marginLeft: metrics.defaultMargin,
            marginVertical: metrics.smallMargin,
          }}
          renderItem={({item}) => {
            return <CategoryCard item={item}></CategoryCard>;
          }}
        />
      </View>
    );
  };

  const renderProducts = () => {
    return (
      <>
        <RenderHeading
          onPress={() => {
            Navigator.navigate(ScreenConst.allProducts);
          }}
          style={{marginHorizontal: metrics.defaultMargin}}
          title={t('ourProducs')}></RenderHeading>

        <VerticalList
          contentContainerStyle={{
            paddingLeft: metrics.defaultMargin,
            paddingVertical: 10,
          }}
          data={products}
          renderItem={({item}) => (
            <ItemCard
              style={{width: metrics.width * 0.9, marginBottom: 20}}
              item={item}></ItemCard>
          )}></VerticalList>
      </>
    );
  };

  return (
    <RootView bottom={0}>
      <Header showDrawer showNotification title={'Theme 2'}></Header>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{
            marginHorizontal: metrics.defaultMargin,
            marginTop: metrics.smallMargin,
          }}>
          {/* <SearchBar
            disable
            onPress={() => {
              Navigator.navigate(ScreenConst.allProducts);
            }}
            onRightIconPress={() => {
              // alert('Icon Press');
              Navigator.navigate(ScreenConst.filter);
            }}></SearchBar> */}
        </View>
        {/* {promotions?.length > 0 && renderPromotions()} */}

        {categories?.length > 0 && renderCategories()}
        {products?.length > 0 && renderProducts()}
      </ScrollView>
    </RootView>
  );
}
