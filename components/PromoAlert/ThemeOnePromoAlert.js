import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { colors, metrics, scaleFont } from '../../utils/Theme';
import { Button, Text } from '../../components';
import ImageConst from '../../constants/ImageConst';
import Modal from 'react-native-modal';
import { Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { emptyCart } from '../../store/Cart/action';
import { useTranslation } from 'react-i18next';


export default function ThemeOnePromoAlert(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {language} = props;
  return (
    <Modal
      testID={'locationChangeAlert'}
      onBackdropPress={props.toggleVisible}
      isVisible={props.data.showAlert}
      animationIn="slideInUp"
      animationOut="slideOutDown">
      <View
        style={{
          backgroundColor: 'white',
          padding: metrics.height * 0.02,
          justifyContent: 'center',
          // alignItems: 'center',
          borderRadius: 5,
        }}>

        <View style={{flexDirection:'row' , justifyContent:'space-between' , alignItems: 'center', width : '100%'}}>

          <Text bold
            style={{
              fontSize: scaleFont(15),
              // paddingVertical: 7,
              color: colors.primary,
              textAlign: 'center',
            }}>
            Discount Offers
        </Text>

        <Button
            // onPress={() => {
            //   // dispatch(emptyCart());
            //   props.onPress && props.onPress();
            // }}
            style={{
              // width: metrics.width / 2,
              alignSelf: 'center',
              marginVertical: metrics.smallMargin,
            }}

            textStyle={{
              fontSize: scaleFont(12),
            }}
          
            text={props.data.promoName[language]}
          />

        </View>

        <Text
          style={{
            fontSize: scaleFont(15),
            paddingVertical: 15,
            color: colors.primary,
            // textAlign: 'center',
          }}>
          {props.data.promoText}
        </Text>
      </View>
    </Modal>
  );
}
