import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/';
import {Text} from '../../components';
import {FastImage, Input, Rating} from '../../components';

import ImageConst from '../../constants/ImageConst';
import {colors, commonstyles, metrics, scaleFont} from '../../utils/Theme';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

export default function index(props) {
  const {
    onEditIconPress,
    showEditIcon,
    showMoreButton,
    onMoreButtonPress,
    inverted,
    showRating,
    ratingBackgroundColor,
  } = props;

  const item = props.item || {};
  const {
    id = null,
    name = 'name',
    image = '',
    comments = '',
    datetime = '',
    rating = 0,
    replies = 0,
    customer_id = 0,
  } = item;

  const user = useSelector((state) => state.userReducer.user);
  const {t} = useTranslation();

  console.log('USER LOGGED IN:::: ', user);

  return (
    <View style={{paddingVertical: metrics.smallMargin}}>
      <View
        style={[
          styles.container,
          props.containerStyle,
          inverted && {flexDirection: 'row-reverse'},
        ]}>
        <View style={styles.left}>
          <FastImage
            cover
            style={styles.image}
            source={image ? {uri: image} : ImageConst.guestUserIcon}
          />
        </View>
        <View style={styles.right}>
          <View
            style={[
              {...commonstyles.spaceBetween},
              inverted && {flexDirection: 'row-reverse'},
            ]}>
            <Text
              numberOfLines={1}
              medium
              style={{
                fontSize: scaleFont(14),
                // fontWeight: '600',
                marginVertical: metrics.width * 0.02,
                width: metrics.width / 4.5,
              }}>
              {name}
            </Text>
            <View
              style={[
                {flexDirection: 'row', alignItems: 'center'},
                inverted && {flexDirection: 'row-reverse'},
              ]}>
              {showRating && (
                <Rating
                  ratingColor={colors.primaryBtnBackcolor}
                  count={rating}
                  backgroundColor={ratingBackgroundColor}></Rating>
              )}

              {/* // this is extra that will be remove in futre */}
              {/* <TouchableOpacity onPress={onEditIconPress}>
                <FastImage
                  style={{
                    width: metrics.width * 0.06,
                    height: metrics.height * 0.025,
                    marginLeft: metrics.width * 0.01,
                  }}
                  source={ImageConst.pencilIcon}></FastImage>
              </TouchableOpacity> */}

              {showEditIcon && (
                <TouchableOpacity onPress={onEditIconPress}>
                  <FastImage
                    style={{
                      width: metrics.width * 0.06,
                      height: metrics.height * 0.02,
                      marginLeft: metrics.width * 0.01,
                    }}
                    source={ImageConst.pencilIcon}></FastImage>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              padding: metrics.smallMargin,
              borderRadius: 10,
              // marginVertical: metrics.smallMargin,
              ...props.textContainerStyle,
            }}>
            <Text
              regular
              style={{
                fontSize: scaleFont(12),
                alignText: 'left',
                color : colors.placeHolder
              }}>
              {comments}
            </Text>
          </View>
        </View>
      </View>

      {(showMoreButton || replies > 0) && (
        <TouchableOpacity
          onPress={onMoreButtonPress}
          style={{alignSelf: 'flex-end'}}>
          <Text
            style={{
              // fontWeight: 'bold',
              fontSize: scaleFont(12),
              textDecorationLine: 'underline',
              padding: metrics.width * 0.01,
            }}>
            {t('more')}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  left: {
    flex: 1,
    alignItems: 'center',
  },
  right: {
    flex: 5,
    paddingLeft: metrics.smallMargin,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    backgroundColor: colors.lightBackground,
  },
});
