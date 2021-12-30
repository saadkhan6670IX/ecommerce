import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Text} from '../../components';

import {metrics, colors, scaleFont} from '../../utils/Theme';

import FastImage from 'react-native-fast-image';
import {useTranslation} from 'react-i18next';
import GeneralConst from '../../constants/General';
import ImageConst from '../../constants/ImageConst';
import {formateNumber} from '../../utils/Helpers';

export default function ThemeOneOrderStatusCard(props) {
  const {item, language} = props;
  const {t} = useTranslation();
  const {orderStatus, orderStatusPickup, optionType} = GeneralConst;

  console.log('item card for order', item);
  return (
    <View>
      <View style={styles.mainContainer}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.imageContainer}>
            <FastImage
              style={styles.image}
              source={
                item.image[language] == ''
                  ? ImageConst.Imgplaceholder
                  : {uri: item.image[language]}
              }
            />
          </View>

          <View style={styles.textContainer}>
            <View style={styles.orderAndIconContainerView}>
              <Text style={[styles.orderNumber, {color: colors.primary}]}>
                {t('orderNo') + ' : ' + item.view_order_id}
              </Text>
              {/* <TouchableOpacity onPress={() => {}}>
                <Icon
                  size={scaleFont(18)}
                  name="dots-three-vertical"
                  style={styles.icon}
                />
              </TouchableOpacity> */}
            </View>
            <Text
              regular
              style={[styles.orderDate, {color: colors.primaryLight}]}>
              {' '}
              {item.date}
            </Text>
            <Text
              regular
              style={[styles.orderPrice, {color: colors.primaryLight}]}>
              {t('total') + ': ' + t('SR') + ' ' + formateNumber(item.total)}
            </Text>

            <View
              style={[
                styles.orderStatus,
                {
                  backgroundColor:
                    item.order_type === optionType.Delivery
                      ? orderStatus[item.status.id].color
                      : orderStatusPickup[item.status.id].color,
                },
              ]}
              // style = {{backgroundColor:'red'}}
            >
              <Text style={styles.status}>
                {item.order_type === optionType.Delivery
                  ? orderStatus[item.status.id].title[language]
                  : orderStatusPickup[item.status.id].title[language]}
              </Text>
            </View>
          </View>
        </View>
        {item.orderScheduleTime && (
          <Text style={styles.reschedule}>
            Scheduled for tomorrow 10:00 AM{' '}
          </Text>
        )}
      </View>
      {item.orderStatus == 'Cancelled' && (
        <View
          style={{
            ...styles.mainContainer,
            position: 'absolute',
            backgroundColor: 'rgba(220,220,220,0.35)',
            width: '100%',
            height: '100%',
          }}></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    borderRadius: metrics.defaultMargin,
    paddingHorizontal: metrics.defaultMargin,
    paddingVertical: metrics.defaultMargin,
    // borderWidth: 1
  },
  imageContainer: {
    flex: 2,
    marginRight: metrics.defaultMargin,
  },

  image: {
    height: metrics.width * 0.3,
    borderRadius: 10,
  },
  textContainer: {
    flex: 3,
    justifyContent: 'space-between',
  },

  orderNumber: {
    fontSize: scaleFont(14),
    // fontWeight: '600',
    color: 'black',
  },

  orderAndIconContainerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  icon: {
    color: colors.greyText,
  },

  orderPrice: {
    fontSize: scaleFont(13),
    // fontWeight: '300',
    color: colors.greyText,
    textAlign: 'left',
  },

  orderDate: {
    fontSize: scaleFont(13),
    // fontWeight: '300',
    color: colors.greyText,
    textAlign: 'left',
  },

  status: {
    fontSize: scaleFont(12),
    // fontWeight: '300',
    textAlign: 'center',
    color: 'white',
  },

  orderStatus: {
    backgroundColor: 'orange',
    width: metrics.width / 2.5,
    height: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    // marginVertical: 5,
  },

  reschedule: {
    textAlign: 'center',
    marginTop: metrics.smallMargin,
  },
});
