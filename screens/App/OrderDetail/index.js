import React, { useEffect, useState } from 'react';
import ThemeOneOrderDetail from './ThemeOneOrderDetail';
import { getOrderDetailbyID, reOrderByOrderID, getOrderDetailbyIDAndTimeZone } from '../../../services/Order';
import { setCart } from '../../../store/Cart/action';
import Navigator from '../../../utils/Navigator';
import ScreenConst from '../../../constants/ScreenConst';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import * as RNLocalize from 'react-native-localize';

export default function index(props) {
  const [orderDetail, setorderDetail] = useState(null);
  const [loader, setloader] = useState(true);
  const [buttonLoader, setButtonLoader] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (props.route.params != null && props.route.params.order_no != null) {
      // API Call
      setloader(true);

      // get device timezone eg. -> "Asia/Shanghai"
      const deviceTimeZone = RNLocalize.getTimeZone();

      let data = {
        order_no: props.route.params?.order_no,
        timezone : deviceTimeZone
      }

      getOrderDetailbyIDAndTimeZone(data)
        .then((response) => {
          if (response.status == 200) {
            setorderDetail(response.data.data);
            setloader(false);
          }
        })
        .catch((error) => {
          setloader(false);
          console.log('ORDER DETAIL ERROR:', error);
        });
    }
  }, []);

  const onTrackOrderPress = () => {
    Navigator.navigate(ScreenConst.trackOrder, {
      order_no: props.route.params?.order_no,
    });
  };

  const onReorderPress = () => {
    setButtonLoader(true);

    reOrderByOrderID(props.route.params?.order_no)
      .then((response) => {
        setButtonLoader(false);
        console.log('reOrderByOrderID', response);
        if (response.status == 200) {
          dispatch(setCart(response.data.data));
          Navigator.navigate(ScreenConst.home, {
            screen: ScreenConst.home,
            params: {
              screen: ScreenConst.addToCart,
              refresh: true,
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setButtonLoader(false);
      });
  };

  return (
    <ThemeOneOrderDetail
      orderID={props.route.params?.order_no}
      onTrackOrderPress={onTrackOrderPress}
      onReorderPress={onReorderPress}
      loader={loader}
      buttonLoader={buttonLoader}
      orderDetails={orderDetail}
      {...props}></ThemeOneOrderDetail>
  );
}
