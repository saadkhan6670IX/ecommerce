import React from 'react';
import {StyleSheet, View, Linking, TouchableOpacity} from 'react-native';
import {colors, metrics, commonstyles, scaleFont} from '../../utils/Theme';
import {FastImage} from '../../components';
import ImageConst from '../../constants/ImageConst';
import {Text} from '../../components';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

export default function ThemeOneCallCard(prop) {
  const {contactNumber, contactName} = prop;
  const {t} = useTranslation();
  const language = useSelector((state) => state.userReducer.language);

  const callNumber = (phone) => {
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => console.log('Phone Call Error:', err));
  };

  return (
    <>
      {contactNumber && (
        <TouchableOpacity
          onPress={() => {
            callNumber(contactNumber);
          }}>
          <View
            style={[
              commonstyles.rowCenter,
              {
                marginVertical: metrics.smallMargin,
                // marginHorizontal: metrics.largeMargin,
                backgroundColor: 'white',
                borderRadius: metrics.width * 0.18,
              },
            ]}>
            <View>
              <FastImage style={styles.callIcon} source={ImageConst.callIcon} />
            </View>

            <View>
              <Text
                regular
                style={{
                  marginVertical: metrics.width * 0.01,
                  textAlign: 'left',
                }}>
                {t('riderName') + ' : ' + (contactName ? contactName : '')}
              </Text>
              <Text regular style={{textAlign: 'left'}}>
                {t('contactNumber') +
                  ' : ' +
                  (contactNumber ? contactNumber : '')}
              </Text>
            </View>

            <View>
              <FastImage
                style={[
                  styles.forwardIcon,
                  {
                    transform:
                      language == 'ar'
                        ? [{rotate: '180deg'}]
                        : [{rotate: '180deg'}],
                  },
                ]}
                source={ImageConst.arrorRightCircle}
              />
            </View>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  callIcon: {
    height: metrics.width * 0.18,
    width: metrics.width * 0.18,
    marginRight: metrics.width * 0.05,
  },
  forwardIcon: {
    height: metrics.width * 0.18,
    width: metrics.width * 0.18,
    // marginLeft: metrics.width * 0.05,
  },
});
