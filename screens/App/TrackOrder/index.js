import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ThemeOneTrackOrder from '../TrackOrder/ThemeOneTrackOrder';
import { Loader } from '../../../components';
import { trackOrderByID, cencelOrder } from '../../../services/Order';
import { useSelector } from 'react-redux';
import { successMessage } from '../../../utils/Toast';
import Navigator from '../../../utils/Navigator';
import ScreenConst from '../../../constants/ScreenConst';

export default function index(props) {
  const [trackOrderDetails, setTrackOrderDetails] = useState(null);
  const [loader, setloader] = useState(false);
  const language = useSelector((state) => state.userReducer.language);

  const orderNumber = props.route.params?.order_no;
  const commingFrom = props.route.params?.commingFrom;

  // API Call
  useEffect(() => {
    // if (props.route.params != null && props.route.params.order_no != null) {
    setloader(true);
    trackOrderByID(
      props.route.params?.order_no ? props.route.params?.order_no : 0,
    )
      .then((response) => {
        if (response.status == 200) {
          setTrackOrderDetails(response.data.data);
          setloader(false);
        }
      })
      .catch((error) => {
        setloader(false);
      });
  }, []);

  const [cencelButtonLoader, setcencelButtonLoader] = useState(false);
  const onCencelButtonPress = () => {
    setcencelButtonLoader(true);

    cencelOrder(orderNumber)
      .then((response) => {
        successMessage(response.data?.data?.message[language]);
        setcencelButtonLoader(false);

        // doing this because we are in an inner screen 2 level deep and we have to go to main tab bar screen as navigation has been changed
        Navigator.goBack();
        Navigator.goBack();
      })
      .catch((err) => {
        console.log(err);
        setcencelButtonLoader(false);
      });
  };

  return (
    <ThemeOneTrackOrder
      commingFrom={commingFrom}
      loader={loader}
      cencelButtonLoader={cencelButtonLoader}
      language={language}
      onCencelButtonPress={onCencelButtonPress}
      trackOrderDetails={trackOrderDetails}
      {...props}></ThemeOneTrackOrder>
  );
}
