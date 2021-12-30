import React, {useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  FlatList,
  I18nManager,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import Modal from 'react-native-modal';
import {colors, metrics, scaleFont} from '../../utils/Theme';
import ImageConst from '../../constants/ImageConst';
import {FastImage, Input, Button, Text} from '../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getTranslatedText} from '../../services/General';
import {RootSiblingParent} from 'react-native-root-siblings';
import Toast, {DURATION} from 'react-native-easy-toast';
import {errorMessage} from '../../utils/Toast';
import {useSelector} from 'react-redux';
import LocationIconSVG from '../../resources/svg/LocationIconSVG';

export default function ThemeOneEditAddress({
  isVisible,
  onSavePress,
  data,
  closeModal,
  isEditAddressLoading,
}) {
  const [savedLocation, setsavedLocation] = useState([
    {title: 'home', selected: true, type: 1},
    {title: 'work', selected: false, type: 2},
    {title: 'other', selected: false, type: 3},
  ]);
  const [selectedLocationType, setselectedLocationType] = useState(0);
  const [street, setStreet] = useState('');
  const [floor, setFloor] = useState('');
  const [nearestLandmark, setNearestLandmark] = useState('');
  const [noteToRider, setNoteToRider] = useState('');

  const toastRef = useRef(null);

  const theme = useSelector((state) => state.themeReducer);

  useEffect(() => {
    setStreet(data.street ? data.street : '');
    setFloor(data.floor ? data.floor : '');
    setNearestLandmark(data.nearestlandmark ? data.nearestlandmark : '');
    setNoteToRider(data.note_to_rider ? data.note_to_rider : '');
    getType(data.type ? data.type : 1);
  }, [data]);

  const getType = (type) => {
    let savedLocationIndex = savedLocation.findIndex((v) => v.type == type);
    savedLocation[selectedLocationType].selected = false;
    savedLocation[savedLocationIndex].selected = true;
    setsavedLocation([...savedLocation]);
    setselectedLocationType(savedLocationIndex);
  };

  const Item = ({item, index}) => (
    <TouchableOpacity
      onPress={() => {
        if (savedLocation[selectedLocationType] != index) {
          savedLocation[selectedLocationType].selected = false;
          savedLocation[index].selected = true;
          setsavedLocation([...savedLocation]);
          setselectedLocationType(index);
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        }
      }}
      style={[
        styles.item,
        item.selected
          ? {backgroundColor: colors.primaryBtnBackcolor}
          : {backgroundColor: colors.secondaryBtnBackcolor, borderWidth: 1},
      ]}>
      <Text
        style={{
          ...styles.title,
          color: item.selected
            ? colors.primaryBtnTextcolor
            : colors.secondaryBtnTextcolor,
        }}>
        {getTranslatedText(`${item.title}`)}
      </Text>
    </TouchableOpacity>
  );

  const validate = () => {
    if (street == '') {
      errorMessage('Street is required');
      // toastRef.current.show('Street is required');
      return false;
    }

    if (street.length > 100) {
      errorMessage(`Street can't be more than 100 characters`);
      // toastRef.current.show('Street is required');
      return false;
    }

    if (floor == '') {
      errorMessage('Floor is required');
      // toastRef.current.show('Floor is required');
      return false;
    }

    if (floor.length > 100) {
      errorMessage(`Floor can't be more than 100 characters`);
      // toastRef.current.show('Street is required');
      return false;
    }

    if (nearestLandmark == '') {
      // toastRef.current.show('Nearest landmark is required');
      errorMessage('Nearest landmark is required');
      return false;
    }

    if (nearestLandmark.length > 100) {
      errorMessage(`Nearest landmark can't be more than 100 characters`);
      // toastRef.current.show('Street is required');
      return false;
    }

    if (noteToRider.length > 200) {
      errorMessage(`Note to rider can't be more than 200 characters`);
      // toastRef.current.show('Street is required');
      return false;
    }

    return true;
  };

  const saveAddress = () => {
    if (validate()) {
      let dataToSend = {
        type: savedLocation[selectedLocationType].type,
        full_address: data.address,
        lat: data.latitude,
        lng: data.longitude,
        note_to_rider: noteToRider,
        street: street,
        floor: floor,
        nearestlandmark: nearestLandmark,
        id: data?.id,
      };

      onSavePress(dataToSend);
    }
  };

  const renderItem = ({item, index}) => <Item item={item} index={index} />;
  return (
    <View>
      {/* <KeyboardAwareScrollView> */}
      <Modal
        deviceWidth={metrics.width}
        deviceHeight={metrics.height}
        testID={'modal'}
        isVisible={isVisible}
        onSwipeComplete={closeModal}
        swipeDirection={['down']}
        hasBackdrop={true}
        propagateSwipe={true}
        onBackdropPress={closeModal}
        style={styles.view}>
        <RootSiblingParent>
          <View style={styles.content}>
            <View
              style={{
                height: 5,
                width: metrics.width * 0.2,
                backgroundColor: colors.greyText,
                marginV: 10,
                alignSelf: 'center',
                borderRadius: metrics.width / 2,
              }}></View>
            <KeyboardAwareScrollView extraHeight={400}>
              <View
                flex={1}
                style={styles.containerView}
                onStartShouldSetResponder={() => true}>
                <Text style={styles.addAddresstitle}>
                  {getTranslatedText('addNewAddress')}
                </Text>
                <View>
                  <View style={styles.container}>
                    <View style={styles.titleContainerView}>
                      <LocationIconSVG
                        fillColor={colors.primaryBtnBackcolor}
                        height={metrics.height * 0.035}
                        width={metrics.height * 0.035}
                      />
                      {/* <FastImage
                        style={{
                          height: 20,
                          width: 20,
                          marginVertical: 10,
                          marginRight: 15,
                        }}
                        source={ImageConst.pin}
                      /> */}
                      <View
                        style={{
                          flex: 1,
                        }}>
                        <TouchableOpacity
                          onPress={closeModal}
                          style={styles.titleView}>
                          <Text semiBold style={styles.title}>
                            {getTranslatedText(
                              savedLocation[selectedLocationType].title,
                            )}
                          </Text>
                          <Image
                            style={{marginVertical: metrics.width * 0.025}}
                            source={require('../../resources/assets/Edit.png')}></Image>
                        </TouchableOpacity>

                        <Text
                          regular
                          style={{
                            textAlign: 'left',
                            color: colors.greyText,
                          }}>
                          {data.address}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View>
                  <Input
                    onChangeText={(text) => {
                      setStreet(text);
                    }}
                    value={street}
                    style={styles.inputField}
                    label={getTranslatedText('Street')}
                    placeholder={getTranslatedText('streetPlaceHolder')}
                  />
                </View>

                <View>
                  <Input
                    onChangeText={(text) => {
                      setFloor(text);
                    }}
                    value={floor}
                    style={styles.inputField}
                    label={getTranslatedText('floor')}
                    placeholder={getTranslatedText('floorPlaceHolder')}
                  />
                </View>

                <View>
                  <Input
                    onChangeText={(text) => {
                      setNearestLandmark(text);
                    }}
                    value={nearestLandmark}
                    style={styles.inputField}
                    label={getTranslatedText('nearestLandmark')}
                    placeholder={getTranslatedText(
                      'nearestLandmarkPlaceHolder',
                    )}
                  />
                </View>
                <Input
                  onChangeText={(text) => {
                    setNoteToRider(text);
                  }}
                  value={noteToRider}
                  // inputStyle={{textAlignVertical: 'top'}}
                  textAlignVertical={'top'}
                  style={[styles.inputField, {height: 100, overflow: 'hidden'}]}
                  inputStyle={{height: 100, top: 10}}
                  label={getTranslatedText('optionalNoteToRider')}
                  placeholder={getTranslatedText('writeYourMessageHere')}
                  multiline={true}
                />

                <FlatList
                  data={savedLocation}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.title}
                  horizontal
                />

                <View
                  style={{
                    alignSelf: 'center',
                    marginTop: metrics.height * 0.03,
                  }}>
                  <Button
                    loading={isEditAddressLoading}
                    text={getTranslatedText('saveAndContinue')}
                    onPress={saveAddress}
                  />
                </View>
              </View>
            </KeyboardAwareScrollView>
          </View>

          <Toast ref={toastRef} />
        </RootSiblingParent>
      </Modal>
      {/* </KeyboardAwareScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  addAddresstitle: {
    // fontWeight: '500',
    fontSize: scaleFont(14),
    textAlign: 'left',
  },
  inputFieldContainer: {
    marginTop: metrics.height * 0.015,
  },
  inputField: {
    // marginVertical: -5,
    backgroundColor: colors.background,
    textAlign: 'left',
  },
  containerView: {
    marginVertical: metrics.height * 0.04,
    marginHorizontal: metrics.width * 0.05,
    // backgroundColor: 'red',
  },
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },

  content: {
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    maxHeight: metrics.height * 0.9,
    backgroundColor: 'white',
    width: '100%',
    marginTop: metrics.height * 0.02,
    borderTopStartRadius: metrics.height * 0.04,
    borderTopEndRadius: metrics.height * 0.04,
    overflow: 'hidden',
  },

  title: {
    fontSize: scaleFont(12),
    // fontWeight: '600',
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: metrics.width * 0.03,
  },

  titleContainerView: {
    width: '100%',
    backgroundColor: 'white',
    alignSelf: 'stretch',
    padding: 10,
    borderRadius: 8,
    backgroundColor: colors.background,
    flexDirection: 'row',
  },

  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  item: {
    backgroundColor: colors.primary,
    paddingVertical: metrics.width * 0.022,
    paddingHorizontal: metrics.width * 0.08,
    marginVertical: 2,
    marginHorizontal: metrics.width * 0.01,
    borderRadius: metrics.height / 2,
  },
  title: {
    fontSize: scaleFont(12),
    // fontWeight: '600',
  },
});
