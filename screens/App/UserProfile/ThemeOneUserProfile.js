import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {FastImage, RootView, Header, VerticalList} from '../../../components';
import {commonstyles, metrics, scaleFont, colors} from '../../../utils/Theme';
import {Text} from '../../../components';
export default function ThemeOneUserProfile() {
  const user = {
    id: 1,
    firstName: 'Akhlaq',
    lastName: 'Khan',
    email: 'AkhlaqKhan@gmail.com',
    phone: '+966 900 786 01',
    dob: '07.30.1996',
    gender: 'Male',
    city: 'Raydh, Saudi Arabia',
  };

  function Heading(props) {
    const {title} = props;
    return (
      <View>
        <Text style={{...styles.heading}}>{title}</Text>
      </View>
    );
  }

  function Feild(props) {
    const {title, value} = props;
    return (
      <View
        style={{
          backgroundColor: 'white',
          padding: metrics.smallMargin,
          borderRadius: 10,
          marginVertical: metrics.smallMargin,
        }}>
        <Text style={{...styles.feildValue}}>{value}</Text>
        <Text style={{...styles.feildTitle}}>{title}</Text>
      </View>
    );
  }

  return (
    <RootView bottom={0}>
      <Header showDrawer showNotification title={'User Profile'}></Header>
      <ScrollView>
        <View style={{padding: metrics.defaultMargin}}>
          <Heading title="User Details"></Heading>
          <Feild title={'First Name'} value={user.firstName}></Feild>
          <Feild title={'Last Name'} value={user.lastName}></Feild>

          <Heading title="Email and Phone"></Heading>
          <Feild title={'Email'} value={user.email}></Feild>
          <Feild title={'Phone'} value={user.phone}></Feild>

          <Heading title="Personal Details"></Heading>
          <Feild title={'Birth Date'} value={user.dob}></Feild>
          <Feild title={'Gender'} value={user.gender}></Feild>
          <Feild title={'City'} value={user.city}></Feild>
        </View>
      </ScrollView>
    </RootView>
  );
}

const styles = StyleSheet.create({
  heading: {
    // fontWeight: '600',
    fontSize: scaleFont(13),
    marginTop: 10,
  },
  feildTitle: {
    fontSize: scaleFont(12),
    color: colors.greyText,
  },
  feildValue: {
    fontSize: scaleFont(14),
    // fontWeight: '600',
    marginBottom: 8,
  },
});
