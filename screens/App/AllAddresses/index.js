import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ThemeOneAllAddresses from './ThemeOneAllAddresses';
import { viewAllAddress } from '../../../services/Account';
import { useSelector } from 'react-redux';

export default function index(props) {
  const [address, setAddress] = useState([]);
  const [loader, setloader] = useState(true);
  const userAddress = useSelector(
    (state) => state.userReducer.userSelectedAddress,
  );

  useEffect(() => {
    setloader(true);
    viewAllAddress()
      .then((response) => {
        // adding current location to the saved addresses object.
        var address = response.data.data;
        console.log({ userAddress });
        if (userAddress) {
          const result = address.filter((item) => item.id === userAddress.id);
          if (result.length == 0) {
            address.push(userAddress);
          }
        }
        console.log({ address });
        setAddress(address);
        setloader(false);

      })
      .catch((err) => {
        setloader(false);
      });
  }, []);

  return (
    <ThemeOneAllAddresses
      userAddress={userAddress}
      address={address}
      loader={loader}
      {...props}></ThemeOneAllAddresses>
  );
}

const styles = StyleSheet.create({});
