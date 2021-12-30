import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RootView, Header, FastImage, Button } from '../../../components';
import StringConst from '../../../constants/StringConst';
import ImageConst from '../../../constants/ImageConst';
import { colors, metrics, commonstyles, scaleFont } from '../../../utils/Theme';
import CallCard from '../../../components/CallCard';
import Navigator from '../../../utils/Navigator';
import ScreenConst from '../../../constants/ScreenConst';
import { Text } from '../../../components';
export default function ThemeOneThankYou(props) {
  console.log(props.route.params);
  const onTrackOrderPress = () => {
    // doing this because we are in an inner screen 3 level deep and we have to go to main tab bar screen as navigation has been changed
    Navigator.navigateAndReset(ScreenConst.home)
    Navigator.navigateAndReset(ScreenConst.orderStatus)

    Navigator.navigate(ScreenConst.trackOrder, {
      order_no: props.route.params.order_no,
      // commingFrom: ScreenConst.thankYou,
    });
  };

  return (
    <RootView>
      <Header
        onBackPress={() => Navigator.navigateAndReset(ScreenConst.home)}
        title={StringConst.OrderConfirmation}></Header>

      <View style={commonstyles.coloumnCenter}>
        <FastImage
          style={{ height: metrics.height * 0.3, width: metrics.width * 0.85 }}
          source={ImageConst.thankYou}
        />

        <Text style={styles.text}>{StringConst.orderDetailsText}</Text>

        <Text style={styles.text}>Your order is not accepted by the merchant yet</Text>

        {/* {props.route.params.delivery_option === 2 ? null : <View>
          <Button onPress={onTrackOrderPress} text={StringConst.TrackOrder} />
        </View>} */}
        <View style={{ marginTop: metrics.defaultMargin }}>
          <Button
            onPress={() => Navigator.navigateAndReset(ScreenConst.home)}
            text={'Continue Shopping'}
          />
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: metrics.height * 0.05,
          alignSelf: 'center',
        }}>
        <CallCard />
      </View>
    </RootView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: scaleFont(16),
    // fontWeight: '600',
    textAlign: 'center',
    marginVertical: metrics.height * 0.03,
    marginTop: metrics.height * 0.02,
  },
});
