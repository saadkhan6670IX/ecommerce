import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, TouchableWithoutFeedback} from 'react-native';
import {Text} from '../../components';
import {colors, commonstyles, metrics, scaleFont} from '../../utils/Theme';
import ImageConst from '../../constants/ImageConst';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getIconType} from 'react-native-elements';
import Navigator from '../../utils/Navigator';
import ScreenConst from '../../constants/ScreenConst';
import {setOrderAddress} from '../../store/User/action';
import {useDispatch, useSelector} from 'react-redux';
import {getType} from '../../utils/Helpers';
import {useTranslation} from 'react-i18next';

import LocationChangeAlert from '../../components/LocationChangeAlert';

export default function ThemeOneShippingAddressGroup({
  data,
  value,
  getSelectedValue,
  showChangeAddressButton,
  editDisable,
  selectedAddress,
  onChangeAddress,
  previousSelectedAddress,
}) {
  // const [selectedValue, setselectedValue] = useState(value);

  const [locationAlert, setLocationAlert] = useState(false);

  // const [tempAddressIndex, setTempAddressIndex] = useState(selectedValue);

  const {t} = useTranslation();

  // const dispatchAction = useDispatch();

  const navigateToEditAddress = (addressDetail) => {
    Navigator.navigate(ScreenConst.selectAddress, {
      addressDetail: addressDetail,
    });
  };

  // const cartItem = useSelector((state) => state.cartReducer.items);

  // useEffect(() => {
  //   setselectedValue(value);
  // }, [value]);

  return (
    <View>
      <LocationChangeAlert
        isVisible={locationAlert}
        toggleVisible={() => {
          setLocationAlert(!locationAlert);
        }}
        onPress={() => {
          setLocationAlert(!locationAlert);
          // setselectedValue(tempAddressIndex);
          // dispatchAction(setOrderAddress(data[tempAddressIndex]));
        }}
      />

      <View
        style={{
          marginVertical: metrics.defaultMargin,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{...commonstyles.xsText}}>{t('deliveryAddress')}</Text>
        {showChangeAddressButton == true ? (
          <TouchableOpacity activeOpacity={0.6}>
            <Text style={{...commonstyles.xsText}}>{t('changeAddress')}</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {/* {console.log('DATA OF VALUES:', data)} */}

      {data.map((val, index) => (
        <TouchableWithoutFeedback
          key={index}
          onPress={() => {
            onChangeAddress(val);
            // if (previousSelectedAddress?.id != data[index].id) {
            //   if (cartItem.length > 0) {
            //     setLocationAlert(!locationAlert);
            //     setTempAddressIndex(index);
            //   } else {
            //     setselectedValue(index);
            //     dispatchAction(setOrderAddress(data[index]));
            //   }
            // }
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: metrics.defaultMargin,
            }}>
            {/* checkbox icon */}
            <View
              style={{
                flex: 0.3,
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingTop: '3%',
              }}>
              <View
                style={{
                  width: scaleFont(14),
                  height: scaleFont(14),
                  borderRadius: scaleFont(8),
                  borderWidth: 2,
                  ...commonstyles.coloumnCenter,
                }}>
                {/* inner dot  */}
                {val.id == selectedAddress?.id && (
                  <View
                    style={{
                      borderWidth: 1,
                      width: scaleFont(6),
                      height: scaleFont(6),
                      borderRadius: scaleFont(3),
                      backgroundColor: 'black',
                    }}></View>
                )}
              </View>
            </View>
            {/* checkbox text view */}
            <View
              style={{
                flex: 3,
                borderRadius: 10,
                backgroundColor: 'white',
                padding: metrics.smallMargin,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}>
                <Text semiBold style={styles.title}>
                  {t(getType(val.type))}
                </Text>
                {val.type !== 4 && (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      navigateToEditAddress(val);
                    }}>
                    <Image
                      style={{width: scaleFont(15), height: scaleFont(15)}}
                      source={ImageConst.pencilIcon}></Image>
                  </TouchableWithoutFeedback>
                )}
              </View>
              <View style={{marginTop: metrics.smallMargin}}>
                <Text regular style={styles.description}>
                  {val.full_address}
                </Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    // fontWeight: 'bold',
    fontSize: scaleFont(13),
  },

  description: {
    fontSize: scaleFont(13),
    // fontWeight: '400',
    color: colors.greyText,
  },
});
