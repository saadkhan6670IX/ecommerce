import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import {
  VerticalList,
  RootView,
  Header,
  FastImage,
  Text,
  Loader,
} from '../../../components';
import {commonstyles, metrics, colors, scaleFont} from '../../../utils/Theme';
import ShippingAddressGroup from '../../../components/ShippingAddressGroup';
import Button from '../../../components/Button';
import {shippingAddress} from '../../../data/index';
import ImageConst from '../../../constants/ImageConst';
import Navigator from '../../../utils/Navigator';
import ScreenConst from '../../../constants/ScreenConst';
import GeneralConst from '../../../constants/General';
import {useTranslation} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';
import {getBranchForDelivery} from '../../../services/Branch';
import {setPickupBranch, setOrderAddress} from '../../../store/User/action';
import {errorMessage} from '../../../utils/Toast';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ThemeOneAllAddresses(props) {
  const {t} = useTranslation();
  const userAddress = useSelector(
    (state) => state.userReducer.userSelectedAddress,
  );

  const userSelectedOption = useSelector(
    (state) => state.userReducer.userSelectedOption,
  );

  const cart = useSelector((state) => state.cartReducer);

  const [userSelectedAddress, setuserSelectedAddress] = useState(userAddress);

  const dispatchAction = useDispatch();

  const [verifyAddressLoader, setverifyAddressLoader] = useState(false);
  const onDoneButtonPress = () => {
    if (userSelectedOption === GeneralConst.optionType.Delivery) {
      //agar delivery hai tw on change address api call hogi
      //check krega nearest branch nahi ai response me tw  error ajaega we do not operate at this address
      //change nahi krne dena phir redux me address
      //  if branch return hojae
      //  set that address to redux
      //set that branch to selected branch
      // navigate and reset to home to refresh the app
      setverifyAddressLoader(true);
      console.log({userSelectedAddress});
      getBranchForDelivery({
        lat: userSelectedAddress.lat,
        lng: userSelectedAddress.lng,
        distance: '1000',
      }).then((response) => {
        //name should be setUserSelectedBranch // its for delivery
        setverifyAddressLoader(false);
        const data = response.data.data;
        if (data.length > 0) {
          dispatchAction(setPickupBranch(data[0]));
          dispatchAction(setOrderAddress(userSelectedAddress));
          Navigator.navigateAndReset(ScreenConst.home);
          return true;
        } else {
          errorMessage('Currently We do not operate in your area');
          return false;
        }
      });
    } else {
      setverifyAddressLoader(false);
      //agar pickup se aya hun tw normal flow
      Navigator.navigate(ScreenConst.home);
    }
  };

  return (
    <RootView>
      <Header title={t('Addresses')}></Header>

      {props.loader ? (
        <Loader></Loader>
      ) : (
        <ScrollView>
          <View style={{padding: metrics.defaultMargin}}>
            <ShippingAddressGroup
              selectedAddress={userSelectedAddress}
              onChangeAddress={(selectedAddress) => {
                setuserSelectedAddress(selectedAddress);
              }}
              showChangeAddressButton={false}
              data={props.address}
            />

            <TouchableOpacity
              onPress={() => {
                Navigator.navigate(ScreenConst.selectAddress);
              }}>
              <View style={styles.buttonContainer}>
                <View style={[styles.iconView(22)]}>
                  <Icon
                    name="add"
                    style={{...styles.icon, color: colors.primaryBtnTextcolor}}
                  />
                </View>
                <Text regular style={styles.text}>
                  {t('addNewAddress')}
                </Text>
              </View>
            </TouchableOpacity>

            <Button
              loading={verifyAddressLoader}
              style={{magrin: 20}}
              text={'Done'}
              onPress={onDoneButtonPress}
            />
          </View>
        </ScrollView>
      )}
    </RootView>
  );
}

const styles = StyleSheet.create({
  iconView: (size = 22) => {
    return {
      width: scaleFont(size),
      height: scaleFont(size),
      borderRadius: scaleFont(size / 2),
      backgroundColor: colors.primaryBtnBackcolor,
      alignItems: 'center',
      marginHorizontal: metrics.smallMargin,
      justifyContent: 'center',
    };
  },
  buttonContainer: {
    ...commonstyles.coloumnCenter,
    marginVertical: metrics.defaultMargin,
    flexDirection: 'row',
    alignSelf: 'center',
  },
   icon: {
    fontSize: scaleFont(20),
    alignSelf:'center',
    marginLeft: metrics.width * 0.005
  },
  text: {
    fontSize: scaleFont(14),
    // fontWeight: '300',
  },
  image: {
    width: metrics.width * 0.1,
    height: metrics.height * 0.035,
    marginRight: metrics.width * 0.03,
  },
});
