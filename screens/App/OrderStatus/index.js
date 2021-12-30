import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ThemeOneOrderStatus from './ThemeOneOrderStatus';
import { useSelector } from 'react-redux';
import { getMyOrders, getMyOrdersForHistory } from '../../../services/Order';
import { useIsFocused } from '@react-navigation/native';
import NotLoggedIn from '../../Auth/NotLoggedIn';

const SIZE = 10;

export default function index(props) {
  const themeNumber = useSelector((state) => state.themeReducer.themeNumber);
  const [currentOrders, setcurrentOrders] = useState(null);
  const [historyOrders, sethistoryOrders] = useState(null);

  const [historyPageNumber, sethistoryPageNumber] = useState(1);
  const [historyLoader, sethistoryLoader] = useState(false);
  const [historyOrderlistTotalPages, sethistoryOrderlistTotalPages] =
    useState(1);

  const [historyRefreshControl, sethistoryRefreshControl] = useState(false);
  const [currentRefreshControl, setcurrentRefreshControl] = useState(false);

  const isFocused = useIsFocused();

  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);


  useEffect(() => {
    if (isLoggedIn) {
      // for history of orders
      if (isFocused) {
        sethistoryPageNumber(1);
        sethistoryLoader(true);
        GetHistoryOrdersApi();
      }
    }
  }, [historyPageNumber, isFocused]);

  const GetHistoryOrdersApi = () => {
    getMyOrdersForHistory(historyPageNumber)
      .then((response) => {
        if (historyPageNumber === 1) {
          sethistoryOrders(response.data.data);
        } else {
          sethistoryOrders([...historyOrders, ...response.data.data]);
        }
        sethistoryRefreshControl(false);
        sethistoryLoader(false);
      })
      .catch((error) => {
        sethistoryRefreshControl(false);
        sethistoryLoader(false);
      });
  };

  const [currentOrderPageNumber, setcurrentOrderPageNumber] = useState(1);
  const [currentOrderLoader, setcurrentOrderLoader] = useState(false);
  const [currentOrderlistTotalPages, setcurrentOrderlistTotalPages] =
    useState(1);

  const getCurrentOrdersApi = () => {
    getMyOrders(currentOrderPageNumber)
      .then((response) => {
        if (currentOrderPageNumber === 1) {
          setcurrentOrders(response.data.data);
        } else {
          setcurrentOrders([...currentOrders, ...response.data.data]);
        }
        setcurrentRefreshControl(false);
        setcurrentOrderLoader(false);
      })
      .catch((error) => {
        setcurrentRefreshControl(false);
        setcurrentOrderLoader(false);
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      // for current order / delivery
      if (isFocused) {
        sethistoryPageNumber(1);
        setcurrentOrderLoader(true);
        getCurrentOrdersApi();
      }
    }
  }, [currentOrderPageNumber, isFocused]);

  const onCurrentOrderListEndReach = () => {
    console.log(currentOrders.length, { size: SIZE });

    if (
      currentOrders.length % SIZE === 0 &&
      !currentOrderLoader &&
      currentOrderPageNumber <= currentOrderlistTotalPages
    ) {
      console.log('incrementing page');
      setcurrentOrderPageNumber((prev) => prev + 1);
    }
  };

  const onHistoryOrderListEndReach = () => {
    console.log(historyOrders.length, { size: SIZE });

    if (
      historyOrders.length % SIZE === 0 &&
      !historyLoader &&
      historyPageNumber <= historyOrderlistTotalPages
    ) {
      console.log('incrementing page');
      sethistoryPageNumber((prev) => prev + 1);
    }
  };

  const onHistoryOrderRefreshControl = () => {
    console.log('chaalra');
    sethistoryRefreshControl(true);
    setcurrentOrderPageNumber(1);
    GetHistoryOrdersApi();
  };

  const onCurrentOrderRefreshControl = () => {
    console.log('chaalra');
    setcurrentRefreshControl(true);
    setcurrentOrderPageNumber(1);
    getCurrentOrdersApi();
  };

  const showOrders = () => {

    switch (themeNumber) {
      case 1:
        return (
          <ThemeOneOrderStatus
            currentOrderLoader={currentOrderLoader}
            historyLoader={historyLoader}
            currentOrderPageNumber={currentOrderPageNumber}
            historyPageNumber={historyPageNumber}
            setcurrentOrderPageNumber={setcurrentOrderPageNumber}
            sethistoryPageNumber={sethistoryPageNumber}
            currentOrders={currentOrders}
            historyOrders={historyOrders}
            historyRefreshControl={historyRefreshControl}
            currentRefreshControl={currentRefreshControl}
            onHistoryOrderRefreshControl={onHistoryOrderRefreshControl}
            onCurrentOrderRefreshControl={onCurrentOrderRefreshControl}
            onCurrentOrderListEndReach={onCurrentOrderListEndReach}
            onHistoryOrderListEndReach={onHistoryOrderListEndReach}
            {...props}></ThemeOneOrderStatus>
        );

      default:
        return (
          <ThemeOneOrderStatus
            currentOrderLoader={currentOrderLoader}
            historyLoader={historyLoader}
            currentOrderPageNumber={currentOrderPageNumber}
            historyPageNumber={historyPageNumber}
            setcurrentOrderPageNumber={setcurrentOrderPageNumber}
            sethistoryPageNumber={sethistoryPageNumber}
            currentOrders={currentOrders}
            historyOrders={historyOrders}
            historyRefreshControl={historyRefreshControl}
            currentRefreshControl={currentRefreshControl}
            onHistoryOrderRefreshControl={onHistoryOrderRefreshControl}
            onCurrentOrderRefreshControl={onCurrentOrderRefreshControl}
            onCurrentOrderListEndReach={onCurrentOrderListEndReach}
            onHistoryOrderListEndReach={onHistoryOrderListEndReach}
            {...props}></ThemeOneOrderStatus>
        );
    }
  };

  const showIsNotLoggedIn = () => {
    return <NotLoggedIn></NotLoggedIn>;
  };

  return isLoggedIn ? showOrders() : showIsNotLoggedIn();
}

const styles = StyleSheet.create({});
