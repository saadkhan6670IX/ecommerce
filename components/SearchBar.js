import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Touchable,
  I18nManager,
} from 'react-native';
import {metrics, colors, scaleFont, fonts} from '../utils/Theme';
import {FastImage} from '../components';
import Icon from 'react-native-vector-icons/AntDesign';
import Navigator from '../utils/Navigator';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ImageConst from '../constants/ImageConst';
import {useTranslation} from 'react-i18next';
import {Text} from '../components';
import {useSelector} from 'react-redux';

const height = metrics.height / 18;

//props

export default function SearchBar(props) {
  const {t} = useTranslation();
  const language = useSelector((state) => state.userReducer.language);

  const {
    onRightIconPress,
    hideRightIcon,
    placeholder = t('searchHere'),
  } = props;

  const renderRightIcon = () => {
    if (!props.hideRightIcon) {
      return (
        <View>
          <TouchableOpacity
            onPress={() => {
              onRightIconPress && onRightIconPress();
            }}
            style={{...styles.iconView}}>
            <FastImage
              contain
              style={{width: '100%', height: height / 2}}
              source={
                props.showLocationPointer
                  ? ImageConst.locationPointer
                  : ImageConst.filterIcon
              }></FastImage>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <View style={[styles.container, props.containerStyle]}>
      <View style={styles.iconView}>
        <Icon
          name="search1"
          size={height / 2}
          color={colors.darkBackground}></Icon>
      </View>
      {!props.disable ? (
        <TextInput
          autoFocus={false}
          placeholder={placeholder}
          placeholderTextColor={colors.grey}
          style={{
            ...styles.textInput,
            fontFamily: fonts.regular,
            textAlign: I18nManager.isRTL ? 'right' : 'left',
          }}
          {...props}
        />
      ) : (
        <TouchableWithoutFeedback
          onPress={() => {
            if (props.disable && props.onPress) {
              props.onPress();
            }
            // else{
            //   Navigator.navigate("Search")
            // }
          }}>
          <View style={{...styles.textInput, justifyContent: 'center'}}>
            <Text
              numberOfLines={1}
              style={{color: colors.grey, textAlign: 'left'}}>
              {props.value ? props.value : placeholder}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      )}
      {renderRightIcon()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: metrics.smallMargin,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  iconView: {
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  },
  textInput: {
    // alignSelf: 'flex-end',
    flex: 7,
    height: height,
    // fontSize: scaleFont(16),
    fontWeight: 'bold',
    textAlign: 'left',
  },
});
