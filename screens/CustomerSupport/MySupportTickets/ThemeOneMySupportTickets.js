import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootView, Header, Input, Button } from '../../../components';
import { colors, fonts, metrics, scaleFont } from '../../../utils/Theme';
import DropDownPicker from 'react-native-dropdown-picker';
import { getOrderIds, sendSupport } from '../../../services/Order';
import { errorMessage, successMessage } from '../../../utils/Toast';
import Navigator from '../../../utils/Navigator';
import { useSelector } from 'react-redux';

export default function ThemeOneMySupportTickets(props) {

  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);

  const [state, setState] = useState({
    "order_id": "",
    "type": "",
    "message": ""
  })

  const [orderIDs, setOrderIDs] = useState([{
    label: 'Please Select Order ID',
    value: "",
  },])

  const [buttonLoader, setButtonLoader] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      getOrderIds()
        .then((response) => {
          console.log('response getOrderIds', response);

          setOrderIDs([...orderIDs, ...response.data.data])

          setState({ ...state, order_id: props.route.params?.order_no ? props.route.params?.order_no.toString() : "" })
        })
        .catch((err) => {
          console.log('err getOrderIds', err);

        });
    }
  }, [])


  const onChange = (keyName, value) => {
    setState({ ...state, [keyName]: value })
  }

  const onSubmit = () => {

    if (state.type === '') {
      errorMessage('Please select your issue');
      return
    }

    if (state.message === '') {
      errorMessage('please provide the details of issue');
      return
    }

    if (state.message.length > 500) {
      errorMessage('your message should not be more than 500 characters');
      return
    }

    else {
      setButtonLoader(true);
      sendSupport(state)
        .then((response) => {
          console.log('response sendSupport', response);
          successMessage('Issue successfully reported');
          setButtonLoader(false);

          Navigator.goBack();

        })
        .catch((err) => {
          console.log('rescatchponse sendSupport', err);
          errorMessage('something went wrong');

        });
    }

  }

  console.log('state.order_id', state.order_id);

  return (
    <RootView>
      <Header title={'My Support Tickets'}></Header>

      <View style={{ flex: 1, margin: metrics.defaultMargin }}>
        <View style={{ ...styles.dropDownStyle, zIndex: 200, }}>
          <DropDownPicker

            items={[
              {
                label: 'Please Select your issue',
                value: '',
              },
              {
                label: 'Payment Issue',
                value: '1',
              },
              {
                label: 'Food safety isse',
                value: '2',
              },
              {
                label: 'Order Not Delivered',
                value: '3',
              },
              {
                label: 'Order delivery issue',
                value: '4',
              },
              {
                label: 'General',
                value: '5',
              },
            ]}
            defaultValue={''}
            containerStyle={{ height: 50 }}
            dropDownStyle={{ backgroundColor: '#F3F3F3' }}
            globalTextStyle={styles.globalTextStyle}
            activeLabelStyle={{ color: colors.primaryBtnTextcolor }}
            activeItemStyle={{ backgroundColor: colors.primaryBtnBackcolor }}
            arrowColor={'#7E7E7E'}
            arrowSize={metrics.width / 14}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            closeAfterSelecting={true}
            placeholder={'Select your issue'}
            onChangeItem={(item) => {
              setState({ ...state, type: item.label })
            }}
          ></DropDownPicker>
        </View>

        {isLoggedIn &&
          <View style={{ ...styles.dropDownStyle, zIndex: 100 }}>
            <DropDownPicker
              closeAfterSelecting={true}
              items={orderIDs}
              defaultValue={state.order_id}
              containerStyle={{ height: 50 }}
              dropDownStyle={{ backgroundColor: '#F3F3F3' }}
              globalTextStyle={styles.globalTextStyle}
              activeLabelStyle={{
                color: colors.primaryBtnTextcolor
              }}
              activeItemStyle={{
                backgroundColor: colors.primaryBtnBackcolor
              }}
              arrowSize={metrics.width / 14}
              arrowColor={'#7E7E7E'}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              placeholder={'Select Order ID'}
              // dropDownStyle={{backgroundColor: 'white'}}
              onChangeItem={(item) => {
                setState({ ...state, order_id: item.value })
              }}
            ></DropDownPicker>
          </View>}

        <Text style={styles.textStyle}>Further More Details </Text>

        <Input
          style={[styles.inputField]}
          label={''}
          value={state.message}
          inputStyle={{ fontSize: scaleFont(14), }}
          placeholder={'Please enter details here.'}
          multiline={true}
          numberOfLines={5}
          onChangeText={(text) => onChange("message", text)}
        />

        <Button loading={buttonLoader}
          onPress={onSubmit} text={'Submit'}></Button>
      </View>
    </RootView>
  );
}

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    height: 200,
  },
  dropDownStyle: {
    backgroundColor: 'white',
    borderRadius: metrics.smallMargin,
    marginTop: metrics.defaultMargin,
  },
  textStyle: {
    marginTop: metrics.largeMargin,
    fontSize: scaleFont(14),
    fontFamily: fonts.medium,
    marginBottom: metrics.defaultMargin,
  },
  globalTextStyle: {
    fontSize: scaleFont(14), paddingHorizontal: metrics.defaultMargin, color: '#7E7E7E', fontFamily: fonts.regular,
  }
});
