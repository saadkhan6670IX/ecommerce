import React from 'react';
import {StyleSheet, View} from 'react-native';
import {RootView, Header, VerticalList, Loader} from '../../../components';

import PromotionCard from '../../../components/PromotionCard';
import {metrics} from '../../../utils/Theme';
import {useTranslation} from 'react-i18next';

export default function ThemeOneCombos(props) {
  const {page, setPage, totalPages, paginationLoader} = props;
  const {t} = useTranslation();

  const {combos} = props;
  return (
    <RootView bottom={0}>
      <Header showNotification title={t('Combos')}></Header>
      <View style={{flex: 1}}>
        <VerticalList
          data={combos}
          contentContainerStyle={{
            paddingHorizontal: metrics.defaultMargin,
            paddingVertical: metrics.smallMargin,
          }}
          ListFooterComponent={() => {
            return (
              <View style={{marginBottom: metrics.defaultMargin}}>
                {paginationLoader && <Loader size={'small'}></Loader>}
              </View>
            );
          }}
          onEndReached={() => {
            if (page <= totalPages && !paginationLoader) {
              console.log('incrementing page');
              setPage((prev) => prev + 1);
            }
          }}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  marginBottom: metrics.defaultMargin,
                  height: metrics.height * 0.18,
                }}>
                <PromotionCard
                  isCombo={true}
                  cardType={2}
                  item={item}></PromotionCard>
              </View>
            );
          }}
        />
      </View>
    </RootView>
  );
}

const styles = StyleSheet.create({});
