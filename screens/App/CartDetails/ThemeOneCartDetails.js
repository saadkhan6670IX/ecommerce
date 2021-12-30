import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  LayoutAnimation,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {RootView, Header, Button, Loader} from '../../../components';
import {Text, Input} from '../../../components';
import {colors, metrics, scaleFont, commonstyles} from '../../../utils/Theme';
import StringConst from '../../../constants/StringConst';

import CartCalculation from '../../../components/CartCalculation';
import PaymentMethod from '../../../components/PaymentMethodGroup';
import Navigator from '../../../utils/Navigator';
import ScreenConst from '../../../constants/ScreenConst';
import {useDispatch, useSelector} from 'react-redux';
import {setUserSelectedOption} from '../../../store/User/action';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {getType} from '../../../utils/Helpers';
import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTranslation} from 'react-i18next';
import GeneralConst from '../../../constants/General';
import SlotsModal from '../../../components/SlotModal';
import {errorMessage} from '../../../utils/Toast';
import {getBranchSlots} from '../../../services/Branch';
import PaymentModalWebView from '../../../components/PaymentModalWebView';
import PromoRemovalAlert from '../../../components/PromoRemovalAlert';
import PromoAlert from '../../../components/PromoAlert';
import ImageConst from '../../../constants/ImageConst';

export default function ThemeOneCartDetails(props) {
  const {
    loader,
    setloader,
    language,
    placeOrderAPI,
    checkoutResponse,
    checkoutLoader,
    onDeliveryOptionPress,
    onOrderTypePress,
    selectedAddress,
    selectedBranch,
    selectedPaymentMethod,
    setselectedPaymentMethod,
    applyCoupon,
    showCouponCodeError,
    setShowCouponCodeError,
    couponMessage,
    promotions,
    setpromotions,
    applyPromo,
    promoAlert,
    setShowPromoAlert,
    isInteractive,
    setToggleInteraction,
  } = props;

  // const [selectedAddress, setselectedAddress] = useState();

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartReducer.items);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [date, setdate] = useState('');
  const [timeSlot, settimeSlot] = useState([]);
  const [selectedTimeSlot, setselectedTimeSlot] = useState(null);
  const [showSlotModal, setshowSlotModal] = useState(false);
  const [showPaymentModal, setshowPaymentModal] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState('now');
  const [loadingSlots, setloadingSlots] = useState(false);
  const [dateValue, setdateValue] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [couponCodeRemovable, setCouponCodeRemovable] = useState(false);
  const [isCouponError, setIsCouponError] = useState(false);

  // const [deliveryType, setDeliveryType] = useState('pickup');
  const userSelectedOption = useSelector(
    (state) => state.userReducer.userSelectedOption,
  );

  //whenever the date changes , call get schedule api
  useEffect(() => {
    if (deliveryOption === 'schedule' && date !== '') {
      setloadingSlots(true);
      setselectedTimeSlot(null);
      settimeSlot([]);
      let data = {
        type: userSelectedOption,
        date: date,
        time: moment().format('hh:mm A'),
      };
      getBranchSlots(data)
        .then((res) => {
          console.log('getBranchSlots', res);
          setloadingSlots(false);
          settimeSlot(res.data.data);
        })
        .catch((err) => {
          setloadingSlots(false);
          console.log(err);
        });
    }
  }, [date, userSelectedOption]);

  const {t} = useTranslation();
  console.log({checkoutResponse});

  useEffect(() => {
    if (checkoutResponse?.coupon_code && checkoutResponse.coupon_code !== '') {
      setCouponCodeRemovable(true);
      setCouponCode(checkoutResponse?.coupon_code);
    } else {
      setCouponCode('');
      setCouponCodeRemovable(false);
    }
    setIsCouponError(showCouponCodeError);
  }, [checkoutResponse]);

  const onPlaceOrderPress = () => {
    setloader(true);

    setTimeout(() => {
      const selectedDeliveryOption = checkoutResponse.delivery_option.find(
        (val) => val.isSelected === true,
      );

      if (selectedDeliveryOption.id === 2) {
        if (date === '') {
          setloader(false);
          return alert('Select Date Firsst');
        }

        if (!selectedTimeSlot) {
          setloader(false);
          return alert('Select time Firsst');
        }
      }

      const selectedOrderType = checkoutResponse.order_type.find(
        (val) => val.isOrderTypeSelected === true,
      );

      let params = {
        items: cartItems,
        branch_id: selectedBranch ? selectedBranch.id : null,
        branch_name: selectedBranch ? selectedBranch.name.en : null,
        delivery_option: selectedDeliveryOption.id,
        order_type: selectedOrderType.id,
        payment_method: selectedPaymentMethod.id,
        delivery_address: selectedAddress,
        address_id: !selectedAddress?.id ? '' : selectedAddress.id,
        allergens: 'none',
        date: date,
        slot_id: selectedTimeSlot ? selectedTimeSlot.id : null,
        order_date:
          deliveryOption === 'schedule' ? date : moment().format('MM-DD-YYYY'),
        order_time: moment().format('hh:mm A'),
        transaction_id: '',
        discount: checkoutResponse?.discount ? checkoutResponse?.discount : 0,
      };
      //delivery hai tw address must ho
      if (selectedOrderType.id === 2) {
        if (!selectedAddress) {
          setloader(false);
          return alert('No Address Selected');
        }
      }
      //pickup hai tw branchid must ho
      if (selectedOrderType.id === 1) {
        if (!selectedBranch?.id) {
          setloader(false);
          return alert('No branch Selected');
        }
      }

      if (selectedPaymentMethod.id === 2) {
        return setshowPaymentModal(true);
      } else {
        placeOrderAPI(params);
      }
    }, 500);
  };

  const showDatePicker = (type) => {
    setDatePickerVisibility(true);

    // setpickerType(type);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (data) => {
    // if (pickerType == 'date') {
    //   let date = moment(data).format('DD-MM-YYYY');
    //   setDateTime({...dateTime, date: date});
    // } else if (pickerType == 'time') {
    //   let time = moment(data).format('hh:mm a');
    //   setDateTime({...dateTime, time: time});
    // }
    console.log({date});
    setdateValue(date);
    let date = moment(data).format('MM-DD-YYYY');
    // setDateTime({...dateTime, date: date});
    setdate(date);
    hideDatePicker();
  };

  const onPaymentSuccess = (trackId) => {
    const selectedDeliveryOption = checkoutResponse.delivery_option.find(
      (val) => val.isSelected === true,
    );

    const selectedOrderType = checkoutResponse.order_type.find(
      (val) => val.isOrderTypeSelected === true,
    );

    let params = {
      items: cartItems,
      branch_id: selectedBranch ? selectedBranch.id : null,
      branch_name: selectedBranch ? selectedBranch.name.en : null,
      delivery_option: selectedDeliveryOption.id,
      order_type: selectedOrderType.id,
      payment_method: selectedPaymentMethod.id,
      delivery_address: selectedAddress,
      address_id: selectedAddress.id == undefined ? '' : selectedAddress.id,
      allergens: 'none',
      date: date,
      slot_id: selectedTimeSlot ? selectedTimeSlot.id : null,
      order_date:
        deliveryOption === 'schedule' ? date : moment().format('MM-DD-YYYY'),
      order_time: moment().format('hh:mm A'),
      transaction_id: trackId,
      // time: dateTime.time,
    };

    console.log('prams', params);

    placeOrderAPI(params);
  };

  const Renderdot = (props) => {
    const {fill} = props;
    return (
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          ...props.style,
        }}>
        <View
          style={{
            width: scaleFont(14),
            height: scaleFont(14),
            borderRadius: scaleFont(8),
            borderWidth: 2,
            borderColor: 'black',
            ...commonstyles.coloumnCenter,
          }}>
          {/* inner dot  */}
          {fill && (
            <View
              style={{
                borderWidth: 1,
                width: scaleFont(6),
                height: scaleFont(6),
                borderRadius: scaleFont(3),
                borderColor: 'black',
                backgroundColor: 'black',
              }}></View>
          )}
        </View>
      </View>
    );
  };

  const renderCheckout = () => {
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <View style={{paddingHorizontal: metrics.defaultMargin}}>
          <PromoRemovalAlert
            couponMessage={couponMessage}
            isVisible={showCouponCodeError}
            toggleVisible={() => {
              setShowCouponCodeError(!showCouponCodeError);
            }}
            onPress={() => {
              setShowCouponCodeError(false);
              setCouponCode('');
              setCouponCodeRemovable(false);
              setIsCouponError('');
            }}
          />
          <PromoAlert
            data={promoAlert}
            toggleVisible={() => {
              setShowPromoAlert({
                showAlert: false,
                promoName: '',
                promoText: '',
              });
            }}
          />
          <PaymentMethod
            data={checkoutResponse?.payment_methods}
            value={selectedPaymentMethod}
            getSelectedValue={(value) => {
              console.log(value);
              setselectedPaymentMethod(value);
            }}
          />

          {/* Delivery address compoent  */}
          <View>
            <View
              style={{
                marginVertical: metrics.defaultMargin,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  ...commonstyles.xsText,
                  // fontWeight: 'bold'
                }}>
                {userSelectedOption === GeneralConst.optionType.Pickup
                  ? t('pickupAddress')
                  : t('deliveryAddress')}
              </Text>

              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  if (userSelectedOption === GeneralConst.optionType.Pickup) {
                    Navigator.push(ScreenConst.selectBranch);
                  } else {
                    Navigator.push(ScreenConst.allAddresses);
                  }
                }}>
                <Text
                  style={{
                    ...commonstyles.xsText,
                    // fontWeight: 'bold'
                  }}>
                  {userSelectedOption === GeneralConst.optionType.Delivery &&
                  !selectedAddress
                    ? 'Select Address'
                    : userSelectedOption === GeneralConst.optionType.Pickup &&
                      !selectedBranch
                    ? 'Select Branch'
                    : userSelectedOption === GeneralConst.optionType.Pickup
                    ? t('changeBranch')
                    : t('changeAddress')}
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginBottom: metrics.defaultMargin,
              }}>
              <View
                style={{
                  flex: 3,
                  borderRadius: 10,
                  backgroundColor: 'white',
                  padding: metrics.defaultMargin,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}>
                  <Text semiBold style={styles.title}>
                    {userSelectedOption === GeneralConst.optionType.Delivery &&
                    !selectedAddress
                      ? 'No Address Selected'
                      : userSelectedOption === GeneralConst.optionType.Pickup &&
                        !selectedBranch
                      ? 'No Branch Selected'
                      : userSelectedOption === GeneralConst.optionType.Delivery
                      ? getType(selectedAddress?.type)
                      : selectedBranch?.name.en}
                  </Text>
                </View>
                <View style={{marginTop: metrics.smallMargin}}>
                  <Text
                    regular
                    style={{
                      ...styles.description,
                      color: colors.greyText,
                    }}>
                    {userSelectedOption === GeneralConst.optionType.Delivery &&
                    !selectedAddress
                      ? 'Please Select your Delivery Address'
                      : userSelectedOption === GeneralConst.optionType.Pickup &&
                        !selectedBranch
                      ? 'Please Select your pickup branch'
                      : userSelectedOption === GeneralConst.optionType.Delivery
                      ? selectedAddress?.full_address
                      : selectedBranch?.address}
                  </Text>
                </View>
              </View>
            </View>
            {/* )} */}
          </View>

          {/* Delivery address compoent end */}

          {/* Delivery Option compoent */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <View
              style={{
                width: metrics.width / 2.9,
              }}>
              <Text
                style={{
                  ...commonstyles.xsText,
                  textAlign: 'left',
                  //  fontWeight: 'bold'
                }}>
                {userSelectedOption === GeneralConst.optionType.Pickup
                  ? t('pickupOptions')
                  : t('deliveryOptions')}
              </Text>
            </View>

            {checkoutResponse?.delivery_option?.map((v, i) => (
              <TouchableOpacity
                key={i}
                activeOpacity={1}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: metrics.defaultMargin * 1,
                  flex: 1,
                }}
                onPress={() => {
                  v.id == 2
                    ? setDeliveryOption('schedule')
                    : setDeliveryOption('now');

                  // handling it in index
                  onDeliveryOptionPress(i);

                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut,
                  );
                }}>
                <Renderdot fill={v.isSelected}></Renderdot>
                <Text
                  style={{
                    paddingHorizontal: metrics.width * 0.02,
                    color: colors.primaryLight,
                  }}>
                  {v.name[props.language]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Delivery Option compoent end */}

          {/* date and time compoenet */}

          {deliveryOption == 'schedule' && (
            <>
              <DateTimePickerModal
                date={dateValue ? new Date(dateValue) : new Date()}
                isVisible={isDatePickerVisible}
                mode={'date'}
                minimumDate={Date.now()}
                // onChange={(event, date) => setdateValue(date)}
                // onConfirm={handleConfirm}
                onConfirm={(date) => {
                  setdateValue(date);
                  let formateddate = moment(date).format('MM-DD-YYYY');
                  // setDateTime({...dateTime, date: date});
                  setdate(formateddate);
                  hideDatePicker();
                }}
                onCancel={hideDatePicker}
                // headerTextIOS={
                //   pickerType == 'date' ? t('pickADate') : t('pickATime')
                // }
                headerTextIOS={t('pickADate')}
                isDarkModeEnabled={false}
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: metrics.defaultMargin,
                }}>
                <TouchableOpacity
                  onPress={() => showDatePicker('date')}
                  style={{
                    // flex: .5,
                    width: metrics.width / 2.25,
                    borderRadius: 6,
                    backgroundColor: 'white',
                    padding: metrics.smallMargin,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      ...styles.description,
                      color: colors.placeHolder,
                    }}>
                    {date ? date : t('date')}
                  </Text>

                  <Image
                    resizeMode={'contain'}
                    style={{
                      height: metrics.width / 25,
                      width: metrics.width / 25,
                    }}
                    source={require('../../../resources/assets/calender.png')}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => {
                    if (date === '') {
                      return errorMessage('Please select a date first');
                    }
                    if (timeSlot.length === 0) {
                      return errorMessage('No Slots Available at this date');
                    }
                    setshowSlotModal(true);
                  }}
                  style={{
                    // flex: .5,
                    width: metrics.width / 2.25,
                    overflow: 'hidden',
                    borderRadius: 6,
                    backgroundColor: 'white',
                    padding: metrics.smallMargin,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  {loadingSlots ? (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                      }}>
                      <ActivityIndicator
                        color={colors.primaryBtnBackcolor}></ActivityIndicator>
                    </View>
                  ) : (
                    <Text
                      style={{
                        ...styles.description,
                        color: colors.placeHolder,
                      }}>
                      {selectedTimeSlot
                        ? selectedTimeSlot?.slots
                        : timeSlot.length === 0
                        ? 'No Slots Available'
                        : 'Select Slot'}
                    </Text>
                  )}

                  <Image
                    resizeMode={'contain'}
                    style={{
                      height: metrics.width / 25,
                      width: metrics.width / 25,
                    }}
                    source={require('../../../resources/assets/time.png')}
                  />
                </TouchableOpacity>
              </View>
            </>
          )}

          {/* date and time componemet end */}

          {/* Order type compoent */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <View
              style={{
                // marginRight: metrics.defaultMargin * 4.4,
                width: metrics.width / 2.9,
              }}>
              <Text
                style={{
                  ...commonstyles.xsText,
                  textAlign: 'left',
                  //  fontWeight: 'bold'
                }}>
                {t('orderType')}
              </Text>
            </View>

            {checkoutResponse?.order_type?.map((v, i) => (
              <TouchableOpacity
                key={i}
                activeOpacity={1}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: metrics.defaultMargin * 1,
                  flex: 1,
                }}
                onPress={() => {
                  // handling it in index
                  dispatch(setUserSelectedOption(v.id));
                  onOrderTypePress(v.id);
                }}>
                <Renderdot fill={v.isOrderTypeSelected}></Renderdot>
                <Text
                  style={{
                    paddingHorizontal: metrics.width * 0.02,
                    color: colors.primaryLight,
                  }}>
                  {v.name[props.language]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Order type compoent  end*/}

          {/* promo View */}
          <View>
            {promotions.length > 0 && <Text
              medium
              style={[
                styles.discountText,
                {textAlign: 'left', color: colors.primary},
              ]}>
              Discount Offers
            </Text>}
            
            <ScrollView horizontal={true} style={{flexDirection: 'row'}}>
              {promotions.map((value, index) => (
                <View style={{flexDirection: 'row'}} key={index}>
                  <TouchableOpacity
                    disabled={!isInteractive}
                    activeOpacity={0.5}
                    onPress={() => {
                      let selectedPromo = '';
                      let promos = [];
                      promos = promotions.map((InnerValue, InnerIndex) => {
                        if (InnerIndex === index) {
                          if (checkoutResponse.promotion_id === InnerValue.id) {
                            selectedPromo = '';
                            return {...InnerValue, selected: false};
                          } else {
                            selectedPromo = InnerValue;
                            return {...InnerValue, selected: true};
                          }
                        } else {
                          return {...InnerValue, selected: false};
                        }
                      });
                      // promotions[index].selected = true

                      applyPromo(promos, selectedPromo);
                    }}
                    style={[styles.discountContainer]}>
                    <Text
                      regular
                      style={[
                        styles.discountCode,
                        {
                          paddingTop: metrics.width * 0.001,
                          color: value.selected
                            ? colors.placeHolder
                            : colors.greyText,
                        },
                      ]}>
                      {value?.description ? value?.description[language] : ''}
                    </Text>
                  </TouchableOpacity>
                  <Image
                    resizeMode={'contain'}
                    style={{
                      width: metrics.height * 0.025,
                      height: metrics.height * 0.025,
                      right: metrics.height * 0.015,
                    }}
                    source={
                      value.selected
                        ? ImageConst.greenTick
                        : ImageConst.grayTick
                    }></Image>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* promo view end */}

          {/* Apply coupon compoent */}

          <View
            style={{
              marginVertical: metrics.defaultMargin,
            }}>
            <Text
              style={{
                ...commonstyles.xsText,
                textAlign: 'left',
                // fontWeight: 'bold'
              }}>
              {t('applyCoupon')}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Input
                onChangeText={(text) => {
                  setCouponCode(text);
                }}
                value={couponCode}
                style={styles.inputField(isCouponError)}
                placeholder={t('enterCouponCode')}
              />

              <Button
                disabled={!isInteractive}
                loading={loader}
                onPress={() => {
                  applyCoupon(!couponCodeRemovable ? couponCode : '');
                }}
                style={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  right: metrics.width / 100,
                  height: metrics.height / 18,
                }}
                text={t(couponCodeRemovable ? 'remove' : 'apply')}></Button>
            </View>
          </View>
          {/* Apply coupon compoent end */}

          {/* <CartCalculation /> */}
          <CartCalculation
            userSelectedOption={userSelectedOption}
            orderDetails={{
              sub_total: checkoutResponse?.sub_total,
              discount: checkoutResponse?.discount,
              delivery: checkoutResponse?.delivery,
              VAT: checkoutResponse?.VAT,
              // freeDeliveryMessage: text[language],
              total: checkoutResponse?.total,
            }}
          />

          <View
            style={{
              width: '60%',
              alignSelf: 'center',
              marginVertical: metrics.defaultMargin,
            }}>
            <Button
              disabled={isCouponError || !isInteractive}
              loading={loader}
              onPress={onPlaceOrderPress}
              text={t('placeOrder')}></Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  };

  return (
    <RootView>
      <Header
        onBackPress={() => {
          Navigator.navigate(ScreenConst.home, {
            screen: ScreenConst.viewCart,
          });
        }}
        title={StringConst.paymentAndAdress}></Header>

      {checkoutLoader ? <Loader></Loader> : renderCheckout()}
      <SlotsModal
        title={'Select Slot'}
        isVisible={showSlotModal}
        onDismiss={() => {
          setshowSlotModal(false);
        }}
        items={timeSlot}
        onItemSelect={(selectedItem) => {
          setselectedTimeSlot(selectedItem);
          setshowSlotModal(false);
        }}
      />
      <PaymentModalWebView
        // title={'Select Slot'}
        isVisible={showPaymentModal}
        onDismiss={() => {
          setshowPaymentModal(false);
        }}
        onSuccess={onPaymentSuccess}
        // items={timeSlot}
        // onItemSelect={(selectedItem) => {
        //   setselectedTimeSlot(selectedItem);
        //   setshowSlotModal(false);
        // }}
      />
    </RootView>
  );
}

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: scaleFont(17),
    // fontWeight: '500',
    marginTop: metrics.height * 0.02,
  },
  paymentDetails: {paddingHorizontal: metrics.smallMargin},
  paymentDetailText: {
    fontSize: scaleFont(15),
    // fontWeight: '300',
    marginRight: metrics.largeMargin,
  },
  amountStyle: {
    fontSize: scaleFont(15),
    // fontWeight: '300',
    flex: 1,
    textAlign: 'right',
  },
  totalText: {
    fontSize: scaleFont(16),
    // fontWeight: '500',
    textAlign: 'right',
  },

  title: {
    // fontWeight: 'bold',
    fontSize: scaleFont(13),
  },

  description: {
    fontSize: scaleFont(12),
    // fontWeight: '400',
    color: colors.greyText,
    // textTransform: 'capitalize',
  },

  inputField: (error) => ({
    marginVertical: metrics.defaultMargin,
    width: metrics.width / 1.45,
    height: metrics.height / 18,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    top: 2,
    borderColor: error ? 'red' : null,
    borderWidth: 1,
  }),

  discountText: {
    fontSize: scaleFont(13),
    // fontFamily: fonts.primary,
    color: colors.primaryLight,
    marginVertical: 10,
  },

  discountContainer: {
    // width: '20%',
    height: 45,
    marginBottom: 20,
    backgroundColor: colors.inputGreyBg,
    borderRadius: 10,
    paddingHorizontal: metrics.width * 0.03,
    // marginRight: metrics.width * 0.040,
    justifyContent: 'center',
  },
  discountCode: {
    // paddingHorizontal: metrics.width * 0.01,
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
