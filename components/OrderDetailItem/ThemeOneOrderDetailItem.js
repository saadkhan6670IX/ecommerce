import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { FastImage } from '..';
import { colors, metrics, scaleFont } from '../../utils/Theme';
import { Text } from '../../components';
import { formateNumber } from '../../utils/Helpers';

export default function ItemCard(props) {
  const {
    item,
    language
  } = props;

  return (
    <View style={{ ...styles.container }}>
      <View style={{ ...styles.left }}>
        <FastImage
          cover
          style={styles.image}
          source={{ uri: item.image[language] }}></FastImage>
      </View>
      <View style={{ ...styles.right }}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 5,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}>
            <View>
              <Text
                style={{
                  ...styles.text,
                  width: metrics.width / 2,
                }}>
                {item.name[language]} X {item.quantity}
              </Text>
            </View>

            {/* <View>
              <Text
                style={{
                  ...styles.text,
                  width: metrics.width / 2,
                }}>
                x{item.quantity}
              </Text>
            </View> */}

          </View>

          {item.variation && <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              paddingTop: metrics.height / 100,
            }}>
            {/* <View style={{ flex: 1, justifyContent: 'center' }}> */}
            <Text
              regular
              style={{
                ...styles.text2,
                width: metrics.width / 2.5,
                color: colors.primaryLight,
              }}>
              {item.variation.name[language]}
            </Text>
            {/* </View> */}
            <Text
              regular
              style={{
                ...styles.text2,
                color: colors.primaryLight,
              }}>
              {item.variation.price == 0 ? "Free" : `SR ${formateNumber(item.variation.price)}`}
            </Text>
          </View>}

          {item.add_ons.map((v) => (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}>
              {/* <View style={{ flex: 1, justifyContent: 'center' }}> */}
              <Text
                regular
                style={{
                  ...styles.text2,
                  width: metrics.width / 2.5,
                  color: colors.primaryLight,
                }}>
                {v.title[language]}
              </Text>
              {/* </View> */}
              <Text
                regular
                style={{
                  ...styles.text2,
                  color: colors.primaryLight,
                }}>
                {v.price == 0 ? "Free" : `SR ${formateNumber(v.price)}`}
              </Text>
            </View>
          ))}

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              paddingTop: metrics.height / 100,
            }}>
            <Text style={{ ...styles.text, color: 'black' }}>
              SR {formateNumber(item.price)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', backgroundColor: 'white' },
  left: { flex: 2, zIndex: 10, padding: 10 },
  right: {
    paddingVertical: 10,
    flex: 4,
    backgroundColor: 'white',
    // marginLeft: -metrics.width * 0.25,
    borderRadius: 10,
    flexDirection: 'row',
    paddingRight: 10,
    // paddingLeft: metrics.width * 0.25,
  },
  image: {
    width: '100%',
    height: metrics.height * 0.13,
    borderRadius: metrics.width / 60,
  },
  text: {
    fontSize: scaleFont(15),
    textAlign: 'left',
  },

  text2: {
    fontSize: scaleFont(14),
    textAlign: 'left',
    color: colors.primaryLight,
  },
});
