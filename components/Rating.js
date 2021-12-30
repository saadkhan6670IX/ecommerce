import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors, commonstyles, scaleFont} from '../utils/Theme';
import {Rating} from 'react-native-elements';
import {Text} from '../components';
// usage
{
  /* <Rating starSize={17} valueSize={15} value={4.5}></Rating> */
}

export default function Ratings(props) {
  const count = props.count || 0;
  const size = props.size;
  const readOnly = props.readOnly;
  const ratingColor = props.ratingColor;

  const mapRating = () => {
    return (
      <Rating
        type={'custom'}
        readonly={readOnly ? readOnly : true}
        tintColor={props.backgroundColor}
        style={{color: 'transparent'}}
        ratingColor={ratingColor ? ratingColor : colors.primaryBtnBackcolor}
        ratingBackgroundColor={colors.darkGray}
        ratingCount={5}
        imageSize={20}
        startingValue={count}
        style={{paddingVertical: 10}}
      />
    );
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          ...commonstyles.smallheading,
          fontSize: props.valueSize
            ? scaleFont(props.valueSize)
            : commonstyles.smallheading.fontSize - 5,
        }}>
        {props.value}
      </Text>
      {mapRating()}
    </View>
  );
}

const styles = StyleSheet.create({});
