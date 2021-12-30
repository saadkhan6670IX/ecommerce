import React from 'react';
import {StyleSheet, View, ImageBackground, I18nManager} from 'react-native';

import {colors, commonstyles, metrics, scaleFont} from '../../utils/Theme';
import {FastImage} from '..';
import Icon from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import {Text} from '../../components';
import {useTranslation} from 'react-i18next';

export default function index(props) {
  const language = useSelector((state) => state.userReducer.language);
  let {isCombo = false} = props;
  const {t} = useTranslation();

  const {id, image, name, promotion_heading, type_text, description, price} =
    props.item;
  let titleText = name ? name : '';
  let bottomHeaderDescription = description ? description : '';

  let bannerText = type_text ? type_text : price + ' SAR';

  return (
    <View style={[styles.container, props.style]}>
      <FastImage
        resizeMode={'cover'}
        source={{uri: image[language]}}
        style={styles.image}></FastImage>
      <View
        style={[
          styles.toptextcontainer,
          {backgroundColor: colors.primaryBtnBackcolor},
        ]}>
        <Text style={[styles.topText, {color: colors.primaryBtnTextcolor}]}>{bannerText}</Text>
      </View>
      <View style={styles.bottomTextContainer}>
        {/* <Text regular style={{...styles.bottomText}}>
          {titleText[language]}
        </Text> */}
        <Text numberOfLines={2} bold style={{...styles.bottomText}}>
          {bottomHeaderDescription[language]}
        </Text>
      </View>

      {/* <FastImage
        resizeMode={'cover'}
        source={{ uri: image[language] }}
        style={styles.image}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingVertical: metrics.smallMargin,
          }}>
          <View style={styles.toptextcontainer}>
            <Text style={styles.topText}>{'Sale Text'}</Text>
          </View>
          <View style={styles.bottomTextContainer}>
            <Text style={{...styles.bottomText}}>{name[language]}</Text>
            <Text
              numberOfLines={1}
              style={{
                ...styles.bottomText,
                fontSize: scaleFont(12),
                // fontWeight: '600',
              }}>
              {'Subtitle'}
            </Text>
          </View>
        </View>
      </FastImage> */}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    borderRadius: 10,
  },
  container: {
    minHeight: metrics.height / 5.5,
    backgroundColor: 'white',
    borderRadius: 10,

    // overflow: 'hidden',
  },
  toptextcontainer: {
    backgroundColor: 'red',
    paddingHorizontal: metrics.smallMargin,
    paddingVertical: 5,
    alignSelf: 'flex-start',
    borderTopRightRadius: 20,
    borderBottomEndRadius: 20,
    position: 'absolute',
    top: metrics.defaultMargin,
  },
  bottomTextContainer: {
    padding: metrics.smallMargin,
    alignItems: 'flex-start',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  topText: {
    fontSize: scaleFont(11),
  },
  bottomText: {
    // fontWeight: 'bold',
    color: 'white',
    fontSize: scaleFont(13),
  },
});
