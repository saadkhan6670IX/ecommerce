import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  colors,
  commonstyles,
  fonts,
  metrics,
  scaleFont,
} from '../../utils/Theme';
import {CheckBox} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {Text} from '../../components';
import {useTranslation} from 'react-i18next';
import { formateNumber } from '../../utils/Helpers';

export default function index(props) {
  const items = props.items;
  const {title, selectedValues} = props;
  const language = useSelector((state) => state.userReducer.language);
  const {t} = useTranslation();

  return (
    <View>
      <Text style={styles.labelStyle}>{title}</Text>

      {items?.map((val, index) => {
        const isSelected = selectedValues.some((item) => item.id === val.id);

        const onCheckboxPress = () => {
          var arr = [];
          if (isSelected) {
            //it is already in selectedValues , toggle it / remove it
            arr = selectedValues.filter((item) => val.id !== item.id);
          } else {
            arr = [...selectedValues, val];
          }

          props.getSelectedValue && props.getSelectedValue(arr);
        };

        return (
          <View
            key={index}
            style={styles.checkBoxContainer(index === items.length - 1)}>
            <CheckBox
              activeOpacity={1}
              onPress={onCheckboxPress}
              key={val.id}
              center
              title={val.title[language]}
              textStyle={[styles.textStyle, {fontFamily: fonts.medium, color: colors.primaryLight}]}
              iconType={'material-community'}
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
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
              checked={isSelected}
            />
            <View>
              <Text
                regular
                style={{...styles.textStyle, color: 'black'}}>
                {val.price === 0 ? 'Free' : `+ ${t('SR')} ${ formateNumber(val.price)} `}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: scaleFont(14),
    fontWeight: '400',
    color: 'black',
  },
  labelStyle: {
    fontSize: scaleFont(16),
    // fontWeight: '600',
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
