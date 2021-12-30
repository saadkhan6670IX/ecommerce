import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {supportIssues} from '../../../data/index';
import {VerticalList, RootView, Header, Button} from '../../../components';
import CustomerSupportCard from '../../../components/CustomerSupportCard'
import { metrics } from '../../../utils/Theme';

export default function ThemeOneMySupportRequest() {
  return (
    <RootView>
      <Header title={'My Support Tickets'}></Header>
      <View style={{flex: 1, margin: metrics.defaultMargin}}>
        <ScrollView>
          {supportIssues.map((val, index) => (
            <View key={index}> 
             <CustomerSupportCard item = {val}/>
            </View>
          ))}

          <Button text={'Add a new Request'} />
        </ScrollView>
      </View>
    </RootView>
  );
}

const styles = StyleSheet.create({});
