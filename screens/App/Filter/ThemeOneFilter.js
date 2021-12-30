import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  LayoutAnimation,
} from 'react-native';
import {Text} from '../../../components';
import {Button, Header, Input, RootView, SearchBar} from '../../../components';
import Navigator from '../../../utils/Navigator';
import {colors, commonstyles, metrics, scaleFont} from '../../../utils/Theme';
import ImageConst from '../../../constants/ImageConst';

import FilterCheckBox from '../../../components/FilterCheckBox/ThemeOneFilterCheckBox';
import NothingFound from '../../../components/NothingFound';

import {useTranslation} from 'react-i18next';

const height = metrics.height / 18;

export default function Filter(props) {
  const [searchText, setSearchText] = useState('');

  const [filters, setFilters] = useState([]);

  const {t} = useTranslation();
 

  useEffect(() => {
   // clearing filter selection to default and setting it to default
    setFilters(clearFilteredSelectionWithAlteredFilter());

    // clearing filter selection when user close filter screen.
    return () => {
      clearFilteredSelectionWithAlteredFilter()
    };

  }, []);

  // Clearing selection to default none selection and returning the result.
  function clearFilteredSelectionWithAlteredFilter() {
    var alteredFilters = props.categories;
   
    alteredFilters = alteredFilters.map((element, index) => {
      element[`show${element.name.en}`] = false;
      (element[`isMainSelected`] = false),
        element.sub_filter.map((v) => {
          v[`isSelected`] = false;
        });
      return element;
    });

    return alteredFilters
  }

  const handleAccordian = (mainId, mainCategory) => {
    let index = filters.findIndex((v) => v.id == mainId);

    filters[index][`show${mainCategory}`] =
      !filters[index][`show${mainCategory}`];
    setFilters([...filters]);
  };

  const handleCheckBoxPressed = (mainId, subCatId, key) => {
    let index = filters.findIndex((v) => v.id == mainId);
    let subCatIndex = null;
    if (subCatId != null) {
      subCatIndex = filters[index].sub_filter.findIndex(
        (v) => v.id == subCatId,
      );
    }

    if (subCatIndex != null) {
      filters[index].sub_filter[subCatIndex][key] =
        !filters[index].sub_filter[subCatIndex][key];

      var filteredArray = filters[index].sub_filter.filter(
        (v) => v.isSelected == true,
      );

      if (filteredArray.length == filters[index].sub_filter.length) {
        filters[index][`isMainSelected`] = true;
      } else {
        filters[index][`isMainSelected`] = false;
      }

      setFilters([...filters]);

      return;
    } else {
      filters[index][key] = !filters[index][key];
      filters[index][`isSubCatSelected`] = false;

      filters[index].sub_filter.map((v) => {
        if (filters[index][key] == true) {
          v[`isSelected`] = true;
        } else {
          v[`isSelected`] = false;
        }
      });

      setFilters([...filters]);
    }
  };

  const sortFiltersBySearch = (text) => {
    setSearchText(text);
  };

  const getData = () => {
    if (searchText.length > 0) {
      let sortedData = [];
      filters.map((v) => {
        if (
          v.name[props.language]
            .toLowerCase()
            .includes(searchText.toLowerCase())
        ) {
          sortedData.push(v);
        } else {
          let Subcat = v.sub_filter.filter((v) =>
            v.name[props.language]
              .toLowerCase()
              .includes(searchText.toLowerCase()),
          );
          if (Subcat.length > 0) {
            sortedData.push({
              ...v,
              sub_filter: Subcat,
            });
          }
        }
      });
      return sortedData;
    } else {
      return filters;
    }
  };
  return (
    <RootView bottom={0}>
      <Header
        leftComponent={() => (
          <TouchableOpacity onPress={() => Navigator.goBack()}>
            <Image
              resizeMode={'contain'}
              style={{
                width: metrics.height * 0.02,
                height: metrics.height * 0.02,
              }}
              source={ImageConst.Cancel}></Image>
          </TouchableOpacity>
        )}
        title={'Filter'}></Header>

      <View style={{marginHorizontal: metrics.defaultMargin}}>
        <SearchBar
          onChangeText={(text) => sortFiltersBySearch(text)}
          value={searchText}
        />
      </View>

      {getData().length == 0 ? (
        <NothingFound />
      ) : (
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          {getData().map((v, i) => {
            return (
              <View key={v.id}>
                <FilterCheckBox
                  key={v.id}
                  onLeftIconPressed={() =>
                    handleCheckBoxPressed(v.id, null, 'isMainSelected')
                  }
                  checked={v[`isMainSelected`]}
                  onRightIconPressed={() => handleAccordian(v.id, v.name.en)}
                  showRightIcon={true}
                  rightIcon={v[`show${v.name.en}`]}
                  data={{title: v.name[props.language]}}
                />
                {v[`show${v.name.en}`] &&
                  v.sub_filter.map((subV, subI) => (
                    <FilterCheckBox
                      key={subV.id}
                      checked={subV[`isSelected`]}
                      onLeftIconPressed={() =>
                        handleCheckBoxPressed(v.id, subV.id, 'isSelected')
                      }
                      showRightIcon={false}
                      textStyle={{
                        marginLeft: metrics.width / 15,
                        color: colors.primaryLight,
                      }}
                      data={{title: subV.name[props.language]}}
                    />
                  ))}
              </View>
            );
          })}

          <Button
            style={{
              width: metrics.width / 2,
              alignSelf: 'center',
              margin: metrics.largeMargin,
            }}
            text={t('Apply')}
            onPress={
              () => {
                console.log('FILTER', filters);
                props.applyFilter(filters);
              }
              // props.applyFilter(filters)
            }
          />
        </ScrollView>
      )}
    </RootView>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    ...commonstyles.xsText,
    // fontWeight: 'bold',
    color: 'black',
    marginLeft: metrics.smallMargin,
  },
});
