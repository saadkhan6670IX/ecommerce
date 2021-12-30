import React, {useState, useEffect} from 'react';
import {LayoutAnimation, StyleSheet, View, RefreshControl} from 'react-native';
import ThemeOneOrderStatusCard from '../../../components/OrderStatusCard';
import {
  RootView,
  Header,
  VerticalList,
  Loader,
  Text,
} from '../../../components';
import Tab from '../../../components/Tabs';
import {colors, metrics, scaleFont} from '../../../utils/Theme';
import StringConst from '../../../constants/StringConst';
// import {orderStatus, orderHistory} from '../../../data';

import {useTranslation} from 'react-i18next';

export default function ThemeOneOrderStatus(props) {
  const [activeTab, setactiveTab] = useState(0);
  const {
    currentOrders,
    historyOrders,
    onCurrentOrderListEndReach,
    onHistoryOrderListEndReach,
    currentOrderLoader,
    historyLoader,
    onCurrentOrderRefreshControl,
    onHistoryOrderRefreshControl,
    currentRefreshControl,
    historyRefreshControl,
  } = props;
  const {t} = useTranslation();

  const current = t('current');
  const history = t('history');

  const isCurrentActive = activeTab === 0;

  const footerLoader = () => {
    if (
      (isCurrentActive && currentOrderLoader) ||
      (!isCurrentActive && historyLoader)
    ) {
      return (
        <View>
          <Loader size={'small'}></Loader>
        </View>
      );
    } else {
      return null;
    }
  };

  _renderEmptyComponent = (text) => {
    return (
      <View
        style={{
          height: metrics.height * 0.5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: colors.primaryLight,
            fontSize: scaleFont(16),
            textAlign: 'center',
          }}>
          {text}
        </Text>
      </View>
    );
  };

  const _renderCurrentOrders = () => {
    return (
      <VerticalList
        // bounces={false}
        data={currentOrders}
        contentContainerStyle={{
          paddingHorizontal: metrics.defaultMargin,
          paddingVertical: metrics.smallMargin,
        }}
        refreshControl={
          <RefreshControl
            refreshing={currentRefreshControl}
            onRefresh={onCurrentOrderRefreshControl}
          />
        }
        onEndReachedThreshold={0.7}
        onEndReached={onCurrentOrderListEndReach}
        ListEmptyComponent={() => {
          return _renderEmptyComponent(`You Don't Have Any Current Orders`);
        }}
        ListFooterComponent={footerLoader}
        renderItem={({item}) => {
          return (
            <View
              style={{
                marginBottom: metrics.defaultMargin,
              }}>
              <ThemeOneOrderStatusCard item={item}></ThemeOneOrderStatusCard>
            </View>
          );
        }}
      />
    );
  };

  const _renderHistoryOrders = () => {
    return (
      <VerticalList
        // bounces={false}
        data={historyOrders}
        contentContainerStyle={{
          paddingHorizontal: metrics.defaultMargin,
          paddingVertical: metrics.smallMargin,
        }}
        refreshControl={
          <RefreshControl
            refreshing={historyRefreshControl}
            onRefresh={onHistoryOrderRefreshControl}
          />
        }
        onEndReachedThreshold={0.7}
        onEndReached={onHistoryOrderListEndReach}
        ListFooterComponent={footerLoader}
        ListEmptyComponent={() => {
          return _renderEmptyComponent(`You Don't Have Any Orders in History`);
        }}
        renderItem={({item}) => {
          return (
            <View
              style={{
                marginBottom: metrics.defaultMargin,
              }}>
              <ThemeOneOrderStatusCard item={item}></ThemeOneOrderStatusCard>
            </View>
          );
        }}
      />
    );
  };

  return (
    <RootView bottom={0}>
      <Header showDrawer showNotification title={'Orders'}></Header>
      <Tab
        containerStyle={{marginVertical: metrics.defaultMargin}}
        onTabPress={(tabId) => {
          setactiveTab(tabId);
        }}
        activeTab={activeTab}
        tabs={[
          {id: 0, title: current},
          {id: 1, title: history},
        ]}></Tab>
      <View style={{flex: 1}}>
        {(isCurrentActive && !currentOrders) ||
        (!isCurrentActive && !historyOrders) ? (
          <Loader></Loader>
        ) : isCurrentActive ? (
          _renderCurrentOrders()
        ) : (
          _renderHistoryOrders()
        )}
      </View>
    </RootView>
  );
}

const styles = StyleSheet.create({});
