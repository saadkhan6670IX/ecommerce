import color from 'color';
import React from 'react';
import {Text} from 'react-native';
import {fonts, colors} from '../utils/Theme';

export default function TextComponent(props) {
  const GetFontFamily = () => {
    if (props.light) {
      return fonts.light;
    }

    if (props.medium) {
      return fonts.medium;
    }

    if (props.regular) {
      return fonts.regular;
    }

    if (props.semiBold) {
      return fonts.semibold;
    }

    if (props.bold) {
      return fonts.bold;
    }
    //default
    return fonts.medium;
  };

  const Font_Family = GetFontFamily();
  return (
    <Text
      {...props}
      style={[
        {color: colors.primary},
        props.style,
        {fontFamily: Font_Family},
      ]}></Text>
  );
}
