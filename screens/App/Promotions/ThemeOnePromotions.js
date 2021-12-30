import React from 'react';
import {StyleSheet, View} from 'react-native';
import {RootView, Header, VerticalList} from '../../../components';

import PromotionCard from '../../../components/PromotionCard';
import {Text} from '../../../components';
import {metrics} from '../../../utils/Theme';
import {useTranslation} from 'react-i18next';

const data = [
  {
    id: '1',
    productname: 'Sushi Dish',
    image: require('../../../resources/assets/Promo1.png'),
    discount: 15,
  },
  {
    id: '2',
    image: require('../../../resources/assets/Promo2.png'),
    discount: 25,
    productname: 'Burger Item',
  },
  {
    id: '3',
    image: require('../../../resources/assets/Promo3.png'),
    discount: 30,
    productname: 'Bar B Que',
  },
  {
    id: '4',
    image: require('../../../resources/assets/Promo4.png'),
    discount: 10,
    productname: 'Pizza Party',
  },
];

export default function ThemeOnePromotions(props) {
  const {t} = useTranslation();

  const {promotions} = props;
  return (
    <RootView bottom={0}>
      <Header showDrawer showNotification title={t('Promotion')}></Header>
      <View style={{flex: 1}}>
        <VerticalList
          data={promotions}
          contentContainerStyle={{
            paddingHorizontal: metrics.defaultMargin,
            paddingVertical: metrics.smallMargin,
          }}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  marginBottom: metrics.defaultMargin,
                  height: metrics.height * 0.18,
                }}>
                <PromotionCard cardType={2} item={item}></PromotionCard>
              </View>
            );
          }}
        />
      </View>
    </RootView>
  );
}

const styles = StyleSheet.create({});
