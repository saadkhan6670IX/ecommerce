import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { FastImage, Text } from '..';
import { colors, commonstyles, metrics, scaleFont } from '../../utils/Theme';

import { CheckBox } from 'react-native-elements';
import ImageConst from '../../constants/ImageConst';


export default function FilterCheckBox(props) {
  const { showRightIcon, checked, textStyle, data, onRightIconPressed, customCheckedIcon, rightIcon, onLeftIconPressed } = props;
  return (
    <View style={{ marginRight: metrics.width / 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

      <CheckBox
        activeOpacity={0.7}
        onPress={onLeftIconPressed}
        // key={val.id}
        iconType={'material-community'}
        center
        title={data.title}
        textStyle={{
          ...commonstyles.xsText,
          fontWeight: 'bold',
          color: colors.primary,
          marginLeft: metrics.smallMargin,
          ...textStyle
        }}
        checkedIcon={checked ? "checkbox-marked" : undefined}
        uncheckedIcon="checkbox-blank-outline"
        checkedColor={'black'}
        uncheckedColor={colors.grey}
        // size={20}

        containerStyle={{
          backgroundColor: null,
          borderWidth: null,
          alignItems: 'flex-start',
        }}
        checked={checked}
      />

      {showRightIcon &&
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onRightIconPressed}
          hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}        >
          <FastImage
            contain
            style={{
              width: metrics.height * 0.02,
              height: metrics.height * 0.02,
            }}
            source={rightIcon ? ImageConst.removeBlack :
              ImageConst.plusBlack
            }></FastImage>
        </TouchableOpacity>}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',

    width: '100%',
    marginRight: metrics.defaultMargin,
    borderRadius: 20,
    // overflow: 'hidden',
    ...commonstyles.shadow,
  },
  image: {
    height: metrics.height * 0.18,
    backgroundColor: colors.primary,
    borderRadius: 20,
  },
});
