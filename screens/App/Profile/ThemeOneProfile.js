import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  RootView,
  Header,
  Button,
  FastImage,
  Input,
  Loader,
  Text,
} from '../../../components';
import {metrics, colors, scaleFont} from '../../../utils/Theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {errorMessage} from '../../../utils/Toast';
import ImageConst from '../../../constants/ImageConst';
import Cities from '../../../components/Cities';
import Modal from 'react-native-modal';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

export default function ThemeOneProfile(props) {
  const user = useSelector((state) => state.userReducer.user);
  const {
    onButtonPress,
    base64image,
    setbase64image,
    imageSource,
    setImageSource,
  } = props;
  // const userImage = useSelector((state) => state.userReducer.user?.image);
  // console.log('in profile', {userImage});

  const profileUser = useSelector((state) => state.userReducer.user);
  console.log('in profile', {profileUser});

  const [firstName, setFirstName] = useState(user?.first_name);
  const [lastName, setLastName] = useState(user?.last_name);
  const [emailAddress, setEmailAddress] = useState(user?.email);
  const [phoneNumber, setPhoneNumber] = useState(user?.phone_no);
  const [city, setCity] = useState(user?.city);

  const [isCityVisible, setIsCityVisible] = useState(false);

  const {t} = useTranslation();

  useEffect(() => {
    let phoneNo =
      '+' +
      ((user?.country_code ? user?.country_code : '') +
        (user?.phone_no ? user?.phone_no : ''));
    setPhoneNumber(phoneNo);
  }, []);

  function calllaunchCamera() {
    let options = {
      title: t('youCanChooseOneImage'),
      maxWidth: 256,
      maxHeight: 256,
      storageOptions: {
        skipBackup: true,
      },
      includeBase64: true,
    };
    launchCamera(options, (response) => {
      // console.log("RESPONSE:",response)

      if (response.didCancel) {
        // 'User cancelled photo picker');
        // Alert.alert('You did not select any image');
      } else if (response.error) {
        // 'ImagePicker Error:
      } else if (response.customButton) {
        // 'User tapped custom button: '
      } else {
        setbase64image(`data:image/png;base64,${response.base64}`);
        setImageSource({uri: response.uri});
      }
    });
  }

  function callLaunchGallery() {
    let options = {
      title: t('you'),
      maxWidth: 256,
      maxHeight: 256,
      storageOptions: {
        skipBackup: true,
      },
      includeBase64: true,
    };
    launchImageLibrary(options, (response) => {
      // console.log("RESPONSE:",response)
      // console.log({response});

      if (response.didCancel) {
        // console.log('User cancelled photo picker');
        // Alert.alert('You did not select any image');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      } else {
        setbase64image(`data:image/png;base64,${response.base64}`);
        setImageSource({uri: response.uri});
      }
    });
  }

  function showAlertImageOption() {
    Alert.alert(t('select'), t('pleaseSelectImageFrom'), [
      {
        text: t('camera'),
        onPress: () => handlePermissionForCamera(),
      },
      {text: t('gallery'), onPress: () => callLaunchGallery()},
      {
        text: t('cancel'),
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]);
  }

  const handlePermissionForCamera = () => {
    checkPermissions((callback) => {
      managePermissionResponse(callback);
    });
  };

  const managePermissionResponse = (callback) => {
    switch (callback) {
      case RESULTS.GRANTED:
        console.log('The permission is granted');
        calllaunchCamera();
        break;

      case RESULTS.BLOCKED:
        errorMessage(t('kindlyAllowPermissionFromSettings'));
        break;

      default:
        console.log('not granted');
        break;
    }
  };

  const checkPermissions = (callback) => {
    let permissionString;
    if (Platform.OS == 'android') {
      permissionString = PERMISSIONS.ANDROID.CAMERA;
    } else {
      permissionString = PERMISSIONS.IOS.CAMERA;
    }

    check(permissionString)
      .then((result) => {
        switch (result) {
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );

            request(permissionString).then((result) => {
              console.log('result', result);
              switch (result) {
                case RESULTS.GRANTED:
                  console.log('The permission is granted after requesting');

                  callback(RESULTS.GRANTED);
                  break;

                case RESULTS.BLOCKED:
                  console.log('The permission is blocked');

                  callback(RESULTS.BLOCKED);
                  break;

                default:
                  break;
              }
            });

            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');

            callback(RESULTS.GRANTED);
            break;

          case RESULTS.BLOCKED:
            console.log('The permission is blocked');

            callback(RESULTS.BLOCKED);
            break;

          default:
            console.log('something went wrong');

            break;
        }
      })
      .catch((error) => {
        console.log('checkPermissions error', error);
      });
  };

  const profile = () => {
    return (
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.imageContainerView}
            onPress={() => {
              console.log('OnPress:');
              showAlertImageOption();
            }}>
            <FastImage
              cover
              source={
                imageSource
                  ? imageSource
                  : user?.image
                  ? {uri: user?.image}
                  : ImageConst.guestUserIcon
              }
              style={styles.profileImage}
            />
            <FastImage
              contain
              source={ImageConst.editIcon}
              style={styles.imagePicker}
            />
          </TouchableOpacity>

          <View style={styles.inputFieldView}>
            <Input
              value={firstName}
              style={styles.inputField}
              label={t('firstName')}
              placeholder={t('enterFirstName')}
              onChangeText={(text) => {
                setFirstName(text);
              }}
            />
          </View>

          <View style={styles.inputFieldView}>
            <Input
              value={lastName}
              style={styles.inputField}
              label={t('lastName')}
              placeholder={t('enterLastName')}
              onChangeText={(text) => {
                setLastName(text);
              }}
            />
          </View>
          <View style={styles.inputFieldView}>
            <Input
              value={emailAddress}
              style={styles.inputField}
              label={t('emailAddress')}
              placeholder={t('enterYourEmailAddress')}
              onChangeText={(text) => {
                setEmailAddress(text);
              }}
            />
          </View>
          <View style={styles.inputFieldView}>
            <Input
              value={phoneNumber}
              style={styles.inputField}
              label={t('phoneNumber')}
              placeholder={t('enterYourPhoneNumber')}
              editable={false}
              onChangeText={(text) => {
                setPhoneNumber(text);
              }}
            />
          </View>

          <TouchableOpacity
          activeOpacity = {.5}
            onPress={() => {
              setIsCityVisible(true);
            }}>
            <View style={styles.inputFieldView}>
              <Text style={[styles.cityTitle, {color: colors.primary}]}>
                {t('city')}
              </Text>
              <View style={styles.cityField}>
                <Text
                  regular
                  style={{
                    textAlign: 'left',
                    color: colors.placeHolder,
                  }}>
                  {city ? city : 'Select City'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <View>
            <Button
              loading={props.loader}
              onPress={() => {
                onButtonPress &&
                  onButtonPress({
                    first_name: firstName,
                    last_name: lastName,
                    email: emailAddress,
                    country_code: '92',
                    city: city,
                    phone: phoneNumber,
                    image: base64image,
                  });
              }}
              style={styles.buttonContainer}
              text={t('save')}
            />
          </View>

          <Cities
            isVisible={isCityVisible}
            onDismiss={() => {
              setIsCityVisible(false);
            }}
            onCitySelect={(city) => {
              setCity(city);
              setIsCityVisible(false);
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  };

  return (
    <RootView bottom={0}>
      <Header showDrawer showNotification title={'Profile'} />
      {/* {props.loader ? <Loader></Loader> : profile()} */}
      {profile()}
      {/* <Cities/> */}
    </RootView>
  );
}

const imageWidth = metrics.width * 0.3;
const editImageWidth = metrics.width * 0.08;

const styles = StyleSheet.create({
  imageContainerView: {
    alignSelf: 'center',
  },
  container: {
    margin: metrics.smallMargin,
  },
  buttonContainer: {
    width: '60%',
    alignSelf: 'center',
    marginVertical: metrics.defaultMargin,
  },
  inputField: {
    // marginTop: -1 * (metrics.height * 0.001),
  },
  inputFieldView: {
    marginHorizontal: metrics.smallMargin,
  },
  profileImage: {
    width: imageWidth,
    height: imageWidth,
    borderRadius: imageWidth / 2,
    // backgroundColor: colors.primaryLight,
    marginVertical: metrics.defaultMargin,
  },
  imagePicker: {
    width: editImageWidth / 1.1,
    height: editImageWidth / 1.1,
    position: 'absolute',
    right: 0,
    top: metrics.width * 0.05,
    backgroundColor: colors.inputGreyBg,
    borderRadius: editImageWidth / 2,
    borderWidth: 2,
    borderColor: 'white',
  },
  cityTitle: {
    fontSize: scaleFont(13),
    color: colors.primaryLight,
    marginBottom: 10,
    textAlign: 'left',
  },
  cityField: {
    backgroundColor: 'white',
    width: '100%',
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: metrics.width * 0.03,
    textAlign: 'left',
  },
});
