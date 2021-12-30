import React, { useEffect, useState } from 'react';
import ThemeOneCartDetails from './ThemeOneCartDetails';
import { placeOrder, checkout, verifyCart } from '../../../services/Order';

import { emptyCart, setCart } from '../../../store/Cart/action';
import { useDispatch, useSelector } from 'react-redux';
import Navigator from '../../../utils/Navigator';
import ScreenConst from '../../../constants/ScreenConst';
import { getPromotion } from '../../../services/Discount';

import { useTranslation } from 'react-i18next';
import { LayoutAnimation } from 'react-native';

export default function index() {
  const [loader, setloader] = useState(false);
  // use this key to block touches in a lodaing state
  const [isInteractive, setToggleInteraction] = useState(true);

  const [checkoutLoader, setCheckoutLoader] = useState(true);
  const dispatch = useDispatch();
  const [checkoutResponse, setCheckoutResponse] = useState(null);

  const [currentSelectedIndex, setCurrentSelectedIndex] = useState(0);
  const [currentOrderTypeSelectedIndex, setcurrentOrderTypeSelectedIndex] =
    useState(0);

  const [showCouponCodeError, setShowCouponCodeError] = useState(false);

  const [selectedPaymentMethod, setselectedPaymentMethod] = useState(null);
  const [couponMessage, setCouponMessage] = useState('');

  const language = useSelector((state) => state.userReducer.language);

  const selectedAddress = useSelector(
    (state) => state.userReducer.userSelectedAddress,
  );
  const selectedBranch = useSelector(
    (state) => state.userReducer.userSelectedBranch,
  );

  const cart = useSelector((state) => state.cartReducer);
  const userSelectedOption = useSelector(
    (state) => state.userReducer.userSelectedOption,
  );

  const [promoAlert, setShowPromoAlert] = useState({
    showAlert: false,
    promoName: '',
    promoText: '',
  });

  const [promotions, setpromotions] = useState([]);

  const userId = useSelector((state) => state.userReducer.user?.id);
  const { t } = useTranslation();

  useEffect(() => {
    console.log('CART RESPONSE: -->', cart);
  }, []);

  // handling delivery options
  const onDeliveryOptionPress = (index) => {
    const checkoutData = checkoutResponse;
    checkoutData.delivery_option[currentSelectedIndex].isSelected = false;

    setCurrentSelectedIndex(index);
    checkoutData.delivery_option[index].isSelected = true;
    setCheckoutResponse(checkoutData);
  };

  //handling order type
  const onOrderTypePress = (selectedId) => {
    const checkoutData = checkoutResponse;
    checkoutData.order_type.map((v, i) => {
      if (v.id === selectedId) {
        v['isOrderTypeSelected'] = true;
      } else {
        v['isOrderTypeSelected'] = false;
      }
    });

    setCheckoutResponse(checkoutData);
    // const checkoutData = checkoutResponse;
    // checkoutData.order_type[
    //   currentOrderTypeSelectedIndex
    // ].isOrderTypeSelected = false;

    // setcurrentOrderTypeSelectedIndex(index);

    // checkoutData.order_type[index].isOrderTypeSelected = true;

    // setCheckoutResponse(checkoutData);
  };

  const handleShowCouponError = (couponCodeErrorFlag) => {
    // to show coupon code error
    switch (couponCodeErrorFlag) {
      case 0:
        setCouponMessage('');
        setShowCouponCodeError(false);
        break;

      case 1:
        setCouponMessage(t('promoRemovalString'));
        setShowCouponCodeError(true);
        break;

      case 2:
        setCouponMessage(t('promoValidItemError'));
        setShowCouponCodeError(true);
        break;

      default:
        setCouponMessage('');
        setShowCouponCodeError(false);
        break;
    }
  };

  useEffect(() => {
    //calling checkout API
    setCheckoutLoader(true);
    checkoutApiCall();
  }, [userSelectedOption]);

  const checkoutApiCall = (coupon_code, selectedPromo) => {
    // coupon_code => doing this check to set coupon code coming from applyCoupon fucntion and it not than set the coupon_code from cart obejct
    checkout({
      ...cart,
      order_type: userSelectedOption,
      coupon_code:
        coupon_code !== undefined
          ? coupon_code
          : cart.coupon_code
            ? cart.coupon_code
            : '',
      promotion_id:
        selectedPromo !== undefined
          ? selectedPromo.id
          : cart.promotion_id
            ? cart.promotion_id
            : '',
    })
      .then((response) => {
        if (response.status == 200) {
          // to manipulate response data
          let responseData = response.data.data;

          const cart = {
            VAT: responseData.VAT,
            delivery: responseData.delivery,
            discount: responseData.discount,
            items: responseData.items,
            sub_total: responseData.sub_total,
            text: responseData.text,
            total: responseData.total,
            coupon_code: responseData.coupon_code,
            applied_coupon_id: responseData.applied_coupon_id,
            promotion_id: responseData.promotion_id,
          };

          dispatch(setCart(cart));

          const popup_text = responseData?.popup_text;
          const show_popup = responseData?.show_popup;
          const couponCodeErrorFlag = responseData?.error_flag
            ? responseData?.error_flag
            : 0;

          if (show_popup) {
            alert(popup_text[language]);
          }

          // this is to handle coupon code error... if coupon has expired or end to limit usage.
          // setShowCouponCodeError(couponCodeErrorFlag === 1 ? true : false)

          setselectedPaymentMethod(responseData?.payment_methods[0]);
          // selection handling for delivery options
          responseData.delivery_option.map((v, i) => {
            if (i == 0) {
              v['isSelected'] = true;
            } else {
              v['isSelected'] = false;
            }
          });

          responseData.order_type.map((v, i) => {
            if (v.id === userSelectedOption) {
              v['isOrderTypeSelected'] = true;
            } else {
              v['isOrderTypeSelected'] = false;
            }
          });
          console.log('====>', responseData.order_type);
          // handleShowCouponError(couponCodeErrorFlag);

          if (responseData.error_text && responseData.error_text[language]) {
            setCouponMessage(responseData.error_text[language]);
            setShowCouponCodeError(true);
          }


          // getting promos list
          getPromotion().then((response) => {
            let promos = [];
            responseData.items.map((itemValue, itemIndex) => {
              response.data.data
                .filter((v) => v.type == 4)
                .map((promoValues, promoIndex) => {

                  if (
                    promoValues.cat_id.length === 0 &&
                    promoValues.products.length === 0
                  ) {
                    promos.push(promoValues);
                  }

                  if (promoValues.products.some(
                    (element) => element === itemValue.id,
                  )) {
                    promos.push(promoValues);
                  }
                  if (
                    promoValues.cat_id.some(
                      (element) =>
                        element === itemValue.category_id ||
                        element === itemValue.sub_category_id,
                    ) && promoValues.products.length === 0) {
                    promos.push(promoValues);
                  }
                });
            });

            if (responseData.promotion_id === '') {
              promos = [...new Set(promos)].map((value) => {
                return { ...value, selected: false };
              });
            } else {
              promos = [...new Set(promos)].map((value) => {
                if (Number(responseData.promotion_id) === value.id) {
                  return { ...value, selected: true };
                } else {
                  return { ...value, selected: false };
                }
              });
            }

            setpromotions(promos);
            console.log('promos', promos);
            setToggleInteraction(true);
          });

          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

          setCheckoutResponse({ ...responseData });

          // if (
          //   selectedPromo !== undefined &&
          //   responseData.promotion_alert !== ''
          // ) {
          //   setShowPromoAlert({
          //     showAlert: true,
          //     promoName: selectedPromo.name,
          //     promoText: responseData.promotion_alert,
          //   });
          // }
        }

        setCheckoutLoader(false);
        setloader(false);
      })
      .catch((error) => {
        console.log('Checkout Error:', error);
        setCheckoutLoader(false);
      });
  };

  // calling Place order API
  const placeOrderAPI = (params) => {
    setloader(true);

    placeOrder({
      ...params,
      coupon_code: cart.coupon_code,
      applied_coupon_id: cart.applied_coupon_id,
      subtotal: cart?.sub_total ? cart?.sub_total : 0,
      delivery_charges: cart?.delivery
        ? cart?.delivery === 'Free Delivery'
          ? 0
          : cart?.delivery
        : 0,
    })
      .then((response) => {
        // console.log('PLACE ORDER RESP:', response.data);
        setloader(false);
        if (response.status == 200) {
          // successMessage(response.data?.data?.message[language]);
          dispatch(emptyCart());
          Navigator.navigate(ScreenConst.thankYou, {
            order_no: response?.data?.data?.order_id,
            delivery_option: params.delivery_option,
          });
        }
      })
      .catch((error) => {
        console.log('PLACE ORDER ERROR:', error);
        setloader(false);
      });
  };

  const applyCoupon = (coupon_code) => {
    setToggleInteraction(false);
    console.log('coupon_code', coupon_code);
    checkoutApiCall(coupon_code);
  };

  const applyPromo = (promos, selectedPromo) => {
    setToggleInteraction(false);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    // setpromotions([...promos])
    // setting undefined on first argumwnt because first is for coupon code and here we done wnat to update the coupon
    checkoutApiCall(undefined, selectedPromo);
  };

  return (
    <ThemeOneCartDetails
      promotions={promotions}
      setpromotions={setpromotions}
      loader={loader}
      setloader={setloader}
      isInteractive={isInteractive}
      setToggleInteraction={setToggleInteraction}
      applyCoupon={applyCoupon}
      applyPromo={applyPromo}
      onDeliveryOptionPress={onDeliveryOptionPress}
      onOrderTypePress={onOrderTypePress}
      checkoutLoader={checkoutLoader}
      checkoutResponse={checkoutResponse}
      language={language}
      selectedAddress={selectedAddress}
      selectedBranch={selectedBranch}
      selectedPaymentMethod={selectedPaymentMethod}
      setselectedPaymentMethod={setselectedPaymentMethod}
      showCouponCodeError={showCouponCodeError}
      setShowCouponCodeError={setShowCouponCodeError}
      couponMessage={couponMessage}
      promoAlert={promoAlert}
      setShowPromoAlert={setShowPromoAlert}
      placeOrderAPI={placeOrderAPI}></ThemeOneCartDetails>
  );
}
