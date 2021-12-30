import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { colors, metrics } from '../../utils/Theme';
import { Button, Text } from '../../components';
import ImageConst from '../../constants/ImageConst';
import Modal from 'react-native-modal';
import { Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { emptyCart } from '../../store/Cart/action';
import { useTranslation } from 'react-i18next';


export default function ThemeOnePromoRemovalAlert(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <Modal
      testID={'locationChangeAlert'}
      onBackdropPress={props.toggleVisible}
      isVisible={props.isVisible}
      animationIn="fadeIn"
      animationOut="fadeOut">
      <View
        style={{
          backgroundColor: 'white',
          padding: metrics.height * 0.02,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
        }}>
        <Image
          source={ImageConst.caution}
          resizeMode={'contain'}
          style={{ height: metrics.height * 0.12, width: metrics.width * 0.3 }}
        />

        <Text
          style={{
            fontSize: 17,
            paddingVertical: 7,
            color: colors.primary,
            textAlign: 'center',
          }}>
          {props?.couponMessage}
        </Text>

        <Button
          onPress={() => {
            // dispatch(emptyCart());
            props.onPress && props.onPress();
          }}
          style={{
            width: metrics.width / 2,
            alignSelf: 'center',
            marginVertical: metrics.smallMargin,
          }}
          text={t('continue')}
        />
      </View>
    </Modal>
  );
}
