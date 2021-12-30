import React from 'react';

import ThemeOneCartAddress from './ThemeOneAddressGroup';
import {useDispatch, useSelector} from 'react-redux';

export default function index(props) {
  const selectedAddress = useSelector(
    (state) => state.userReducer.userSelectedAddress,
  );

  // NEED TO DO SELECTION LOGIC HERE IF THERE IS ANY SELECT LOCATION.
  // let selectedAddressIndex = 0;

  // if (props.data && selectedAddress) {
  //   selectedAddressIndex = props.data.findIndex(
  //     (item) => item.id === selectedAddress.id,
  //   );
  // }

  // console.log('INDEX:', selectedAddressIndex);

  return (
    <ThemeOneCartAddress
      // value={2}
      // previousSelectedAddress={selectedAddress}
      {...props}></ThemeOneCartAddress>
  );
}
