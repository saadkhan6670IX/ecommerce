import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors, metrics, scaleFont} from '../../utils/Theme';
import FastImage from '../../components/FastImage';
import FastImageLib from 'react-native-fast-image';
import {Text} from '../../components';
import ImageConst from '../../constants/ImageConst';
import color from 'color';

export default function ThemeOneBranches(props) {
  const selectedBranch = props.selectedBranchSelectorObj;
  const isSelected = props.isSelected;
  const {language} = props;

  return (
    <View
      style={[
        styles.container,
        {borderWidth: 1},
        {
          borderColor: isSelected ? colors.primaryBtnBackcolor : 'white',
        },
      ]}>
      <FastImage
        resizeMode={FastImageLib.resizeMode.cover}
        style={styles.image}
        source={
          props.branch?.banner_image == ''
            ? ImageConst.Imgplaceholder
            : {uri: props.branch?.banner_image}
        }
      />
      <Text medium style={styles.branchName}>
        {/* Null value handling */}
        {props.branch?.name[language]}
      </Text>
      <Text
        regular
        numberOfLines={2}
        ellipsizeMode="tail"
        style={[styles.branchLocation, {color: colors.primaryLight}]}>
        {props.branch?.address ? props.branch?.address : ''}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: metrics.smallMargin,
    backgroundColor: 'white',
    borderRadius: metrics.defaultMargin,
    padding: metrics.defaultMargin,
  },
  image: {
    height: metrics.height / 8,
    width: metrics.width / 2,
    borderRadius: metrics.defaultMargin,
    marginBottom: metrics.smallMargin,
  },
  branchName: {
    fontSize: scaleFont(13),
    // fontWeight: '600',
    marginVertical: 2,
    marginBottom: metrics.smallMargin,
  },
  branchLocation: {
    fontSize: scaleFont(12),
    // fontWeight: '300',
    color: 'gray',
    width: metrics.width / 2,
  },
});
