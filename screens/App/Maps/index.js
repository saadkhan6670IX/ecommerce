import ThemeOneMaps from './ThemeOneMaps';

import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {addAddress, updateAnAddress} from '../../../services/Account';
import {useDispatch} from 'react-redux';
import ScreenConst from '../../../constants/ScreenConst';
// import {setUserLocation} from '../../../store/User/action';
import {
  setOrderAddress,
  setPickupBranch,
  setUserSelectedOption,
} from '../../../store/User/action';

import Navigator from '../../../utils/Navigator';
import GeneralConst from '../../../constants/General';

export default function index(props) {
  const themeNumber = useSelector((state) => state.themeReducer.themeNumber);
  const dispatchAction = useDispatch();

  const [isEditAddressLoading, setIsEditAddressLoading] = useState(false);

  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);

  const addressToEdit = props.route.params?.addressDetail;

  const saveAddress = (params, success, fail) => {
    if (props.route.params?.addressDetail === undefined) {
      console.log('IF CHALRAHA HAI');
      setIsEditAddressLoading(true);
      addAddress(params.data)
        .then((response) => {
          setIsEditAddressLoading(false);
          // params.region.id = response.data.id;
          setLocationToGlobalStore(response.data.data, response.data.data);
          //  etLocationToGlobalStore(params.region, params.data); s
          success(response);
        })
        .catch((err) => {
          setIsEditAddressLoading(false);
          fail(err);
        });
    } else {
      console.log('ELSE CHALRAHA HAI');
      setIsEditAddressLoading(true);
      updateAnAddress(params.data)
        .then((response) => {
          console.log('API RESPONSE');
          setIsEditAddressLoading(false);
          setLocationToGlobalStore(params.region, params.data);
          success(response);
          // Navigator.goBack();
        })
        .catch((err) => {
          console.log('CATCH CHALRA');
          setIsEditAddressLoading(false);
          fail(err);
        });
    }
  };

  const setLocationToGlobalStore = (region, data) => {
    let location = {
      id: region?.id,
      full_address: region.address ? region.address : region.full_address,
      lat: region.latitude,
      lng: region.longitude,
      type:
        region.type != null ? region.type : data?.type != null ? data?.type : 4,
      note_to_rider:
        region.note_to_rider != null
          ? region.note_to_rider
          : data?.note_to_rider,
      street: region.street != null ? region.street : data?.street,
      floor: region.floor != null ? region.floor : data?.floor,
    };

    // let location = {
    //   id: data.id ? data.id : region?.id,
    //   full_address: data?.full_address ? data?.full_address : region.address,
    //   lat: data.lat ? data.lat : region.latitude,
    //   lng: data.lng ? data.lng : region.longitude,
    //   type: data?.type ? data?.type : region?.type ? region?.type : 4,

    //   note_to_rider: data?.note_to_rider
    //     ? data?.note_to_rider
    //     : region?.note_to_rider,

    //   street: data?.street ? data.street : region?.street,
    //   floor: data?.floor ? data.floor : region.floor,
    // };

    // console.log("DATA:", data)
    // console.log("REGION:", region)
    // console.log('LOCATION::::', location);
    console.log('LOCATION ===> ', location);

    dispatchAction(setOrderAddress(location));
    dispatchAction(setUserSelectedOption(GeneralConst.optionType.Delivery));
    // dispatchAction(setPickupBranch(null));
    // dispatchAction(setUserLocation(location));
    Navigator.navigateAndReset(ScreenConst.home);
  };

  switch (themeNumber) {
    case 1:
      return (
        <ThemeOneMaps
          isLoggedIn={isLoggedIn}
          addressDetail={props.route.params?.addressDetail}
          setLocationToGlobalStore={setLocationToGlobalStore}
          saveAddress={saveAddress}
          isEditAddressLoading={isEditAddressLoading}
          {...props}></ThemeOneMaps>
      );

    default:
      return <ThemeOneMaps {...props}></ThemeOneMaps>;
  }
}
