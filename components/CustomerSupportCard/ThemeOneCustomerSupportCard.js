import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {metrics, colors, commonstyles, scaleFont} from '../../utils/Theme';
import Icon from 'react-native-vector-icons/AntDesign';
import ImageConst from '../../constants/ImageConst';
import { Text } from '../../components'

export default function index({item}) {
  return (
    <View style={styles.container}>
      {(() => {
        if (item.image) {
          return (
            <View style={styles.left}>
              <Image style={{height : metrics.height * 0.025, width: metrics.width * 0.25}} resizeMode={'contain'} source={item.image}></Image>
            </View>
          );
        }

        return null;
      })()}

      <View style={styles.middle}>
        <Text style={[styles.title]}>{item.title}</Text>
      </View>
      <View>
        <Image
          style={styles.forwardImage}
          source={ImageConst.forwardIcon}></Image>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: metrics.defaultMargin,
    borderRadius: 10,
    marginBottom: metrics.smallMargin,
    alignItems: 'center',
  },
  left: {
    paddingTop: metrics.height * 0.005,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  middle: {flex: 5},
  right: {flex: 3},
  title: {fontSize: scaleFont(14), marginHorizontal: 10},
  description: {
    fontSize: scaleFont(10),
    // fontWeight: '400',
    color: colors.greyText,
    marginTop: metrics.smallMargin,
  },

  forwardImage: {
    marginHorizontal: metrics.largeMargin,
  },
});
