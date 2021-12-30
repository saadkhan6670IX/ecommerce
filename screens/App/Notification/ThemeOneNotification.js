import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Header,
  VerticalList,
  RootView,
  Text,
  Loader,
} from '../../../components';
import NotificationCard from '../../../components/NotificationCard';
import { colors, metrics, scaleFont } from '../../../utils/Theme';

export default function ThemeOneNotification(props) {
  const { data, isLoggedIn, loader, paginationLoader,
    totalPages,
    pageNo,
    setpageNo,
  } = props;

  console.log({
      totalPages,
      pageNo,
      setpageNo,
    });

  const RenderNoNotification = () => {
    return (
      <View style={styles.emptyContentContainer}>
        <Text style={styles.textStyle}>NO notifications to Show</Text>
      </View>
    );
  };

  return (
    <RootView>
      <Header title={'Notifications'} />
      <View style={{ flex: 1 }}>
        {loader && !data.length ? (
          <Loader />
        ) : (
            <VerticalList
              ListEmptyComponent={RenderNoNotification}
              onEndReachedThreshold={0}
              onEndReached={() => {
                if (pageNo <= totalPages) {
                  console.log('incrementing page');
                  setpageNo((prev) => prev + 1);
                }
              }}
              data={!isLoggedIn ? [] : data}
              contentContainerStyle={{
                paddingHorizontal: metrics.defaultMargin,
                paddingVertical: metrics.smallMargin,
              }}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      marginBottom: metrics.defaultMargin,
                    }}>
                    <NotificationCard item={item}></NotificationCard>
                  </View>
                );
              }}

              ListFooterComponent={() => {
                return (
                  <View style={{ marginBottom: metrics.defaultMargin }}>
                    {paginationLoader && <Loader size={'small'}></Loader>}
                  </View>
                );
              }}
            />
          )}
      </View>
    </RootView>
  );
}

const styles = StyleSheet.create({
  emptyContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: metrics.height / 1.4,
  },
  textStyle: {
    fontSize: scaleFont(20),
    textTransform: 'capitalize',
    color: colors.grey,
    textAlign: 'center',
  },
});
