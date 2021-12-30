import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors, metrics, scaleFont} from '../../utils/Theme';
import { Text } from '../../components'
export default function index(props) {
  const {data = []} = props;

  return data.map((val, index) => {
    const isLastItem = data.length === index + 1;
    const hideLine = isLastItem;
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              width: scaleFont(26),
              height: scaleFont(26),
              borderRadius: scaleFont(13),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.primaryBtnBackcolor,
            }}>
            <Text style={{fontSize: scaleFont(12), 
              // fontWeight: '700'
              }}>
              {val.id}
            </Text>
          </View>
          {/* //line */}
          {!hideLine && <View style={{borderLeftWidth: 2, flex: 1}}></View>}
        </View>
        <View
          style={{
            flex: 1,
            paddingLeft: metrics.defaultMargin,
            justifyContent: 'space-between',
            paddingBottom: '5%',
          }}>
          <Text
            style={{
              ...styles.text,
              marginTop: metrics.height * 0.005,
              marginBottom: metrics.height * 0.025,
            }}>
            Step {val.id}
          </Text>
          <Text regular style={{...styles.text, textAlign: 'justify',  fontSize: scaleFont(13),}}>
            {val.details}
          </Text>
        </View>
      </View>
    );
  });
}

const styles = StyleSheet.create({
  text: {
    fontSize: scaleFont(15),
    // fontWeight: '600',
  },
});
