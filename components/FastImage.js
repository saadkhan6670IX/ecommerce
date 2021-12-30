import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import FastImage from 'react-native-fast-image';
import ImageConst from '../constants/ImageConst';
import { colors } from '../utils/Theme';

export default function CustomFastImage(props) {
  const [isLoading, setIsLoading] = useState(true)

  const renderImage = (source) => {
    if (source.uri === null || source.uri === "") {
      return ImageConst.Imgplaceholder
    }
    else {
      return source
    }
  }
  return (
    <>
      <FastImage
        style={{ width: 200, height: 200 }}
        resizeMode={
          props.cover
            ? FastImage.resizeMode.cover
            : props.stretch
              ? FastImage.resizeMode.stretch
              : FastImage.resizeMode.contain
        }
        {...props}
        source={renderImage(props.source)}
        onLoadStart={() => {
          setIsLoading(true)
        }}

        onLoadEnd={() => {
          setIsLoading(false)
        }}
      >
        {
          isLoading && <View>
            <ActivityIndicator style={props.style} size="large" color={colors.primaryBtnBackcolor} />
          </View>
        }
      </FastImage>
    </>
  );
}
