import React from 'react';
import {StyleSheet, View} from 'react-native';
import {RootView, Header, FastImage, Loader, Button} from '../../../components';
import {colors, metrics, commonstyles, scaleFont} from '../../../utils/Theme';
import CallCard from '../../../components/CallCard';
import Navigator from '../../../utils/Navigator';
import ScreenConst from '../../../constants/ScreenConst';
import {Text} from '../../../components';
import {useTranslation} from 'react-i18next';

export default function ThemeOneTrackOrder(props) {
  const {
    loader,
    trackOrderDetails,
    language,
    commingFrom,
    onCencelButtonPress,
    cencelButtonLoader,
  } = props;

  var data = [1, 2, 3, 4];
  const {t} = useTranslation();

  // creating dash --- views programatically
  const trackingTimeline = (count) => {
    var timelinearray = [];
    for (let index = 1; index <= count; index++) {
      timelinearray.push(
        <View
          key={index}
          style={[
            styles.pager,
            index == trackOrderDetails.current_step
              ? {backgroundColor: colors.primaryBtnBackcolor}
              : {backgroundColor: 'black'},
          ]}></View>,
      );
    }
    return timelinearray;
  };

  const trackOrderView = () => {
    if (trackOrderDetails) {
      return (
        <>
          <View style={commonstyles.coloumnCenter}>
            <Text medium style={styles.estimatedDeliveryTime}>
              {trackOrderDetails?.estimate_time
                ? trackOrderDetails?.estimate_time > 0
                  ? trackOrderDetails.name[language]
                  : ''
                : ''}
            </Text>
            <Text
              medium
              style={[
                commonstyles.smallheading,
                {marginVertical: 20, marginHorizontal: 10},
              ]}>
              {trackOrderDetails?.estimate_time > 0
                ? trackOrderDetails?.estimate_time + ' ' + t('minutes')
                : t('ThankYouForPlacingOrder')}
            </Text>
            <FastImage
              style={{height: metrics.height * 0.35, width: metrics.width}}
              source={{uri: trackOrderDetails.image[language]}}
            />

            <View style={commonstyles.rowCenter}>
              {trackingTimeline(trackOrderDetails.total_steps)}
            </View>

            <Text regular style={styles.deliveryDiscussion}>
              {trackOrderDetails.description[language]}
            </Text>
          </View>

          {Number(trackOrderDetails.current_step) < 3 && (
            <View style={{margin: metrics.defaultMargin}}>
              <Button
                loading={cencelButtonLoader}
                onPress={onCencelButtonPress}
                text="Cancel Order"></Button>
            </View>
          )}

          {/* {trackOrderDetails.contact_number && (
            <View
              style={{
                position: 'absolute',
                bottom: metrics.height * 0.05,
                alignSelf: 'center',
              }}>
              <CallCard
                contactNumber={trackOrderDetails.contact_number}
                contactName={trackOrderDetails.contact_name}
              />
            </View>
          )} */}
        </>
      );
    }
  };

  const onBackPress = () => {
    if (
      commingFrom === 'pushNotification' ||
      commingFrom !== ScreenConst.thankYou
    ) {
      Navigator.goBack();
      return;
    }
    //default
    Navigator.navigateAndReset(ScreenConst.home);
  };

  return (
    <RootView>
      <Header
        onBackPress={() => onBackPress()}
        title={t('trackYourOrder')}></Header>
      {loader ? <Loader></Loader> : trackOrderView()}
    </RootView>
  );
}

const styles = StyleSheet.create({
  estimatedDeliveryTime: {
    fontSize: scaleFont(16),
    // fontWeight: '300',
    textAlign: 'center',
    marginTop: scaleFont(25),
  },
  pager: {
    width: metrics.width / 9,
    height: metrics.height * 0.01,
    backgroundColor: colors.primary,
    borderRadius: scaleFont(10),
    marginVertical: scaleFont(10),
    marginHorizontal: 5,
  },
  deliveryDiscussion: {
    fontSize: scaleFont(16),
    // fontWeight: '600',
    textAlign: 'center',
    marginTop: scaleFont(25),
    marginHorizontal: metrics.width * 0.15,
  },
});
