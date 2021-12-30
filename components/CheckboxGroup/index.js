import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  colors,
  commonstyles,
  fonts,
  metrics,
  scaleFont,
} from '../../utils/Theme';
import {CheckBox} from 'react-native-elements';
import {useTranslation} from 'react-i18next';
import {Text} from '../../components';
import {formateNumber} from '../../utils/Helpers';

export default function index(props) {
  const items = props.items;
  const selectedValue = props.value;
  const {
    title,
    language,
    titleStyle,
    hideSubtitle,
    hideLines,
    hideRightComponent,
  } = props;

  const {t} = useTranslation();

  // map((val) => {
  //   return {
  //     id: val.id,
  //     title: val.name[language],
  //     price: val.price,
  //   };
  // }

  // [{id: 1, name: {ar: 'فرخة', en: 'Single Patty'}, price: 0}];

  return (
    <View>
      <Text style={[styles.labelStyle, titleStyle]}>{title}</Text>
      {!hideSubtitle && (
        <Text
          style={{
            fontSize: scaleFont(14),
            color: colors.primary,
            // fontWeight: '600',
            textAlign: 'left',
          }}>
          {t('selectOne')}
        </Text>
      )}

      {items?.map((val, index) => (
        <View
          key={index}
          style={[
            styles.checkBoxContainer(
              hideLines ? true : index === items?.length - 1,
            ),
          ]}>
          <CheckBox
            activeOpacity={1}
            onPress={() => {
              props.getSelectedValue && props.getSelectedValue(val);
            }}
            key={val.id}
            center
            title={val.name[language]}
            textStyle={[
              styles.textStyle,
              {fontFamily: fonts.medium, color: colors.primaryLight},
            ]}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checkedColor={'black'}
            uncheckedColor={'black'}
            size={scaleFont(16)}
            right={false}
            containerStyle={{
              backgroundColor: null,
              borderWidth: null,
              alignItems: 'flex-start',
              marginLeft: 0,
              paddingLeft: 0,
              flex: 1,
            }}
            checked={val.id === selectedValue?.id ? true : false}
          />
          {!hideRightComponent && (
            <View>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text
                  medium
                  style={[
                    {
                      ...styles.priceText,
                      marginRight: 10,
                    },
                    val?.sale_price !== val?.price && {
                      textDecorationLine: 'line-through',
                      color: colors.grey,
                    },
                  ]}>
                  {t('SR') + ' ' + val?.price}
                </Text>
                {val?.sale_price === val?.price ? null : (
                  <Text medium style={{...styles.priceText}}>
                    {t('SR') + ' ' + val?.sale_price}
                  </Text>
                )}
              </View>
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: scaleFont(14),
    fontWeight: '400',
    color: colors.primary,
  },
  labelStyle: {
    fontSize: scaleFont(16),
    marginVertical: metrics.smallMargin,
    textAlign: 'left',
  },
  checkBoxContainer: (showBorder) => {
    return {
      ...commonstyles.spaceBetween,
      borderBottomWidth: showBorder ? 0 : 1,
      borderColor: colors.darkGray,
    };
  },
});
