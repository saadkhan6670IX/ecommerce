import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  VerticalList,
  RootView,
  Header,
  SearchBar,
  HorizontalList,
  Loader,
} from '../../../components';
import {colors, commonstyles, metrics} from '../../../utils/Theme';
import data from '../../../data';

//for testing
import ProductListinCard from '../../../components/ProductListingCard';
import NothingFound from '../../../components/NothingFound';

import Navigator from '../../../utils/Navigator';
import ScreenConst from '../../../constants/ScreenConst';

const SIZE = 10;

export default function ThemeOneAllProducts(props) {
  const {
    products,
    isSearching,
    isLoading,
    totalPages,
    pageNo,
    setpageNo,
    paginationLoader,
    searchText,
    setSearchText,
    settotalPages,
  } = props;

  const HeaderTitle = props?.route?.params?.headerTitle || 'Product Listing';

  const [selectedFilterArray, setselectedFilterArray] = useState([]);

  // console.log("CATEGORY", props?.route?.params?.category)

  //filters jo dikha rae horizontal list
  useEffect(() => {
    setselectedFilterArray(props?.route?.params?.Selected_Array);
  }, []);

  return (
    <RootView bottom={0}>
      <Header showNotification title={HeaderTitle}></Header>
      <View
        style={{
          marginHorizontal: metrics.defaultMargin,
          marginTop: metrics.smallMargin,
        }}>
        <SearchBar
          hideRightIcon
          onRightIconPress={() => {
            Navigator.navigate(ScreenConst.filter);
          }}
          onChangeText={(text) => {
            setSearchText(text.trimStart());
          }}
          value={searchText}></SearchBar>

        {(isSearching || isLoading) && (
          <ActivityIndicator
            color={colors.primaryBtnBackcolor}
            animating={isSearching || isLoading}></ActivityIndicator>
        )}

        {selectedFilterArray?.length > 0 && (
          <View style={commonstyles.rowCenter}>
            <Text style = {{color: colors.primary}}>{'Showing results for: '}</Text>

            <HorizontalList
              contentContainerStyle={
                {
                  // paddingLeft: metrics.smallMargin,
                }
              }
              data={selectedFilterArray}
              renderItem={({item}) => (
                <View
                  style={{
                    paddingHorizontal: metrics.width * 0.02,
                    paddingVertical: metrics.width * 0.01,
                    // borderWidth: 1,
                    // borderRadius: 5,
                    borderRightWidth: 1,
                    borderColor: colors.grey,
                    marginHorizontal: metrics.width * 0.01,
                  }}>
                  <Text style = {{color: colors.primary}}>{item}</Text>
                </View>
              )}></HorizontalList>
          </View>
        )}
      </View>
      {/* // checking nothing found should be shown when its not loading and items */}
      {/* are ==0 */}
      {products === null ? (
        <Loader></Loader>
      ) : (
        <View
          style={{
            paddingHorizontal: metrics.smallMargin,
            flex: 1,
            paddingTop: metrics.defaultMargin,
          }}>
          <VerticalList
            numColumns={2}
            scrollEnabled={true}
            data={products}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={() => {
              return (
                <View style={{marginVertical: metrics.largeMargin}}>
                  <NothingFound style={{marginBottom: metrics.largeMargin}}>
                    <Text>No Products Found</Text>
                  </NothingFound>
                </View>
              );
            }}
            onEndReached={() => {
              console.log(products.length, {size: SIZE});
              console.log(
                'products.length % SIZE === 0',
                products.length % SIZE === 0,
              );
              console.log('!paginationLoader', !paginationLoader);
              if (pageNo <= totalPages && !paginationLoader) {
                console.log('incrementing page');
                setpageNo((prev) => prev + 1);
              }
            }}
            ListFooterComponent={() => {
              return (
                <View style={{marginBottom: metrics.defaultMargin}}>
                  {paginationLoader && <Loader size={'small'}></Loader>}
                </View>
              );
            }}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{
                  ...commonstyles.VerticalListContainer,
                }}>
                <ProductListinCard
                  style={{width: '100%'}}
                  imageContainer={{
                    width: '100%',
                    height: metrics.height * 0.18,
                  }}
                  item={item}></ProductListinCard>
              </TouchableOpacity>
            )}></VerticalList>
        </View>
      )}
    </RootView>
  );
}

const styles = StyleSheet.create({});
