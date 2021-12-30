import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View } from 'react-native';
import { Loader } from '../../../components';
import ThemeOneViewCart from './ThemeOneViewCart';
import { useSelector, useDispatch } from 'react-redux';
import { verifyCart } from '../../../services/Order';
import { setCart, emptyCart } from '../../../store/Cart/action';
import { setAppLoader } from '../../../store/Theme/action';
import { debounce } from '../../../utils/Helpers';
import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const delayCall = debounce((callback) => {
  callback();
}, 700);

export default function index(props) {
  const themeNumber = useSelector((state) => state.themeReducer.themeNumber);
  const language = useSelector((state) => state.userReducer.language);
  const userSelectedOption = useSelector((state) => state.userReducer.userSelectedOption);

  const userId = useSelector((state) => state.userReducer.user?.id);

  const cart = useSelector((state) => state.cartReducer);
  const randomId = useSelector((state) => state.cartReducer.randomId);
  const appLoading = useSelector((state) => state.themeReducer.appLoading);

  const dispatch = useDispatch();
  const [calculationloading, setcalculationloading] = useState(false);
  const [promoAlert, setPromoAlert] = useState(false);

  const [couponMessage, setCouponMessage] = useState('')

  const isFocused = useIsFocused();
  const { t } = useTranslation();


  useEffect(() => {
    // 
    delayCall(() => {
      let isActive = true;
      dispatch(setAppLoader(true));
      if (isFocused) {
        const VerifyCart = () => {
          setcalculationloading(true);
          verifyCart({ ...cart, customer_id: userId ? userId : "", order_type: userSelectedOption })
            .then((res) => {
              setcalculationloading(false);
              dispatch(setAppLoader(false));
              if (isActive) {
                const show_popup = res.data.data?.show_popup;
                const popup_text = res.data.data?.popup_text;
                const showPromoError = res.data?.data?.error_flag ? res.data?.data?.error_flag : 0


                if (show_popup) {
                  alert(popup_text[language]);
                }

                // if(showPromoError === 1){
                //   setPromoAlert(true)
                // }
                // if(meesaege === 'limit wa;a messgae'){
                //   setPromoAlert(true)
                // }

                // // to show coupon code error
                // switch (showPromoError) {

                //   case 0:
                //     setCouponMessage('')
                //     setPromoAlert(false)
                //     break;

                //   case 1:
                //     setCouponMessage(t('promoRemovalString'))
                //     setPromoAlert(true)
                //     break;

                //   case 2:
                //     setCouponMessage(t('promoValidItemError'))
                //     setPromoAlert(true)
                //     break;

                //   default:
                //     setCouponMessage('')
                //     setPromoAlert(false)
                //     break
                // }

                dispatch(setCart(res.data.data));
              }
            })
            .catch((err) => {
              setcalculationloading(false);
              dispatch(setAppLoader(false));
              console.error(err);
            });
        };
        if (cart.items.length > 0) {
          delayCall(() => {
            VerifyCart();
          });
        }
      }
      return () => {
        isActive = false;
        dispatch(setAppLoader(false));
      };
    });
  }, [isFocused, cart.totalItemsInCart]);

  //this usage is how it is mentioned in the documentation of useFocusEffect
  // useFocusEffect(
  //   React.useCallback(() => {

  //   }, [randomId]),
  // );

  // const emptyCart = () => {
  //   alert('Empty Cart')
  //   dispatch(emptyCart())
  // }

  const closePromoRemovalModal = (value) => {
    setPromoAlert(value)
  }

  return (
    <>
      <ThemeOneViewCart
        appLoading={appLoading}
        closePromoRemovalModal={closePromoRemovalModal}
        calculationloading={calculationloading}
        data={cart}
        userSelectedOption={userSelectedOption}
        promoAlert={promoAlert}
        language={language}
        couponMessage={couponMessage}
      ></ThemeOneViewCart>
      {/* {appLoading && (
        <View
          style={{
            flex: 1,
            height: '100%',
            width: '100%',
            position: 'absolute',
            zIndex: 10000,
            backgroundColor: 'rgba(0,0,0,0.1)',
          }}>
          <Loader></Loader>
        </View>
      )} */}
    </>
  );
}
