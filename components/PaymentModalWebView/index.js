import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import {colors, metrics, scaleFont} from '../../utils/Theme';
import {Text, RootView, Loader} from '../../components';
import {WebView} from 'react-native-webview';
import FastImage from 'react-native-fast-image';
import ImageConst from '../../constants/ImageConst';
import {errorMessage, successMessage} from '../../utils/Toast';
import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import {getPaymentPage} from '../../services/Order';
const BASE_URL = Config.ORDERS_BASE_URL;

const body = {
  email: 'jasd@gmail.com',
  amount: '92.00',
  phone: '+966512345678',
  address: {
    street1: 'johar',
    city: 'Madina',
    state: 'Riyad',
    country: 'SA',
  },
};

export default function index(props) {
  const {isVisible, onDismiss, onItemSelect, items, title, onSuccess} = props;

  const [loading, setloading] = useState(false);
  const [html, sethtml] = useState(null);
  const [response, setresponse] = useState('');

  const [send, setSend] = useState(false);


  useEffect(() => {
    if (isVisible) {
      console.log('useeffect chala');
      setloading(true);
      getPaymentPage(body).then((response) => {
        setloading(false);
        sethtml(response.data);
      });
    }
  }, [isVisible]);

  const onNavigationStateChange = (istate) => {
    // const interface = {
    //   canGoBack: false,
    //   canGoForward: false,
    //   loading: false,
    //   target: 4209,
    //   title: '',
    //   url: 'http://192.168.20.45:5004/api/v1/customer/payment/request',
    // };

    if(!send){
      try {
        if (istate.title !== '' && istate.title !== 'about:blank') {
          const response = JSON.parse(istate.title);
          const success = response.success;
          const data = response.data;
          const {code, description, short_description, trackId} = data;
          if (!success) {
            errorMessage(description);
            onDismiss();
          } else {
            successMessage("Payment Successful");
            setSend(true)
            onSuccess(trackId);
            onDismiss();
          }
          console.log({response});
        }
      } catch (error) {
        console.error(error);
      }
    }
    
  };

  return (
    <Modal
      style={{margin: 0}}
      isVisible={isVisible}
      onBackdropPress={onDismiss}>
      <RootView style={{backgroundColor: 'white'}}>
        <View style={{justifyContent: 'center', alignSelf: 'flex-end'}}>
          <TouchableOpacity onPress={onDismiss}>
            <FastImage
              style={{
                width: 20,
                height: 20,
                marginHorizontal: metrics.smallMargin,
              }}
              source={ImageConst.crossIcon}></FastImage>
          </TouchableOpacity>
        </View>
        {console.log('html render', html)}
        {!loading ? (
          <WebView
            source={{
              html: html,
              baseUrl:
                Config.ORDERS_BASE_URL + '/api/v1/customer/payment/request',
            }}
            originWhitelist={['*']}
            startInLoadingState={true}
            renderLoading={() => (
              <View
                style={{
                  flex: 1,
                  position: 'absolute',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  width: '100%',
                  height: '100%',
                }}>
                <Text>Loading...</Text>
              </View>
            )}
            onNavigationStateChange={onNavigationStateChange}
            onMessage={(event) => {
              console.log('message recievedd', event.nativeEvent.dataage);
            }}
          />
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Fetching View...</Text>
          </View>
        )}
      </RootView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  content: {
    maxHeight: metrics.height * 0.7,
    width: '100%',
    height: '80%',
    marginTop: metrics.height * 0.02,
  },
});
