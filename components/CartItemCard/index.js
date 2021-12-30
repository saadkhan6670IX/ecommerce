import React, {useState, useEffect, useCallback} from 'react';
import ThemeOneCard from './ThemeOneCard';
import {useSelector, useDispatch} from 'react-redux';
import {updateCart} from '../../services/Cart';
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItemFromCart,
} from '../../store/Cart/action';
import Navigator from '../../utils/Navigator';
import ScreenConst from '../../constants/ScreenConst';
import {formateNumber} from '../../utils/Helpers';

// const DebouncedUpdateCartApiCall = debounce(updateCart, 2000);

export default function index(props) {
  //this file will work as a wrapper around cart's itemcard
  //this will work like controller
  //place all bussiness logic here

  const {appLoading} = props;

  const themeNumber = useSelector((state) => state.themeReducer.themeNumber);

  const dispatch = useDispatch();

  const onCrossIconPress = () => {
    if (appLoading) {
      return false;
    }
    dispatch(removeItemFromCart(props.item));
  };

  const onPlusIconPress = () => {
    if (appLoading) {
      return false;
    }
    dispatch(incrementQuantity(props.item));
  };

  const onMinusIconPress = () => {
    if (appLoading) {
      return false;
    }
    dispatch(decrementQuantity(props.item));
  };

  const onItemPress = () => {
    if (appLoading) {
      return false;
    }
    Navigator.push(ScreenConst.itemDetails, {
      item: props.item,
      isFromCombo: props?.item?.type === 'combo' ? true : false,
    });
  };

  const [summedProductPrice, setSummedProductPrice] = useState(0);

  const calculateProductPrice = () => {
    let item = props.item;
    let price = item?.sale_price ? item?.sale_price : 0;
    let itemVariationPrice = item?.variation?.sale_price
      ? item?.variation?.sale_price
      : 0;
    let quantity = item?.quantity;

    let sumAddonPrice = item?.add_ons?.reduce(function (sum, addOn) {
      console.log(`SUM PRICE:${sum} - Add On: ${addOn}`);
      return sum + formateNumber(addOn.price);
    }, 0);

    setSummedProductPrice(
      formateNumber(price) +
        formateNumber(itemVariationPrice) +
        formateNumber(sumAddonPrice),
    );
    item.summedProductPrice = summedProductPrice;
  };

  useEffect(() => {
    calculateProductPrice();
  }, [summedProductPrice]);

  //this is to stop api call on first render and only call when quantity is change
  // const firstUpdate = useRef(true);
  // useEffect(() => {
  //   if (firstUpdate.current) {
  //     firstUpdate.current = false;
  //     return;
  //   }
  //   console.log({quantity});
  //   DebouncedUpdateCartApiCall({
  //     item_id: props.item.id,
  //     quantity: quantity,
  //   });
  // }, [quantity]);

  switch (themeNumber) {
    case 1:
      return (
        <ThemeOneCard
          onItemPress={onItemPress}
          onPlusIconPress={onPlusIconPress}
          onMinusIconPress={onMinusIconPress}
          onCrossIconPress={onCrossIconPress}
          summedProductPrice={summedProductPrice}
          {...props}></ThemeOneCard>
      );

    default:
      return (
        <ThemeOneCard
          onItemPress={onItemPress}
          onMinusIconPress={onMinusIconPress}
          onPlusIconPress={onPlusIconPress}
          onCrossIconPress={onCrossIconPress}
          summedProductPrice={summedProductPrice}
          {...props}></ThemeOneCard>
      );
  }
}
