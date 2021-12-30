import React, {useEffect, useState, useRef} from 'react';
import {Image, Platform, StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {colors, metrics} from '../../../utils/Theme';
import {
  RootView,
  Header,
  SearchBar,
  Button,
  FastImage,
  Text,
} from '../../../components';
import ImageConst from '../../../constants/ImageConst';
import Navigator from '../../../utils/Navigator';
import {
  getCurrentLocationObselete,
  getPlaceName,
  checkPermissions,
  androidLocationEnabler,
} from '../../../services/Maps';
import {getBranchForDelivery} from '../../../services/Branch';
import ScreenConst from '../../../constants/ScreenConst';
import EditAddress from '../../../components/EditAddress';
import Modal from 'react-native-modal';

import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';

import {errorMessage, successMessage} from '../../../utils/Toast';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import LocationChangeAlert from '../../../components/LocationChangeAlert';
import {setPickupBranch} from '../../../store/User/action';
import CurrentLocationMarkerSVG from '../../../resources/svg/CurrentLocation';


export default function ThemeOneMaps(props) {
  // console.log('-------------->', props.addressDetail);
  const language = useSelector((state) => state.userReducer.language);

  const [isVisible, setIsVisible] = useState(false);

  const dispatchAction = useDispatch();

  const mapRef = useRef(null);

  const [locationAlert, setLocationAlert] = useState(false);

  const [addressSaveData, setAddressSaveData] = useState(null);

  const [buttonTypePressed, setButtonTypePressed] = useState('select');

  const cartItem = useSelector((state) => state.cartReducer.items);

  const [region, setRegion] = useState({
    latitude: 24.7136,
    longitude: 46.6753,
    latitudeDelta: 0.15,
    longitudeDelta: 0.121,
    city: '',
    country: '',
    address: '',
  });

  const {t} = useTranslation();
  useSelector((state) => console.log({aaaaa: state.userReducer}));
  useEffect(() => {
    //search wali screen se agar data araha
    if (props.route.params) {
      const {latitude, longitude, searchTitle} = props.route.params;

      mapRef.current.animateToRegion({
        ...region, //delta same hona chahye na
        latitude,
        longitude,
      });
    }
  }, [props.route.params]);

  useEffect(() => {
    // doing this beacuse we are using the same screen for edit address so we send address details to thi screen also
      console.log("Test")
    if (props.addressDetail) {
      setRegion({
        ...region,
        latitudeDelta: 0.00493,
        longitudeDelta: 0.0029,
        latitude: Number(props.addressDetail.lat),
        longitude: Number(props.addressDetail.lng),
        address: props.addressDetail.full_address,
        floor: props.addressDetail.floor,
        note_to_rider: props.addressDetail.note_to_rider,
        street: props.addressDetail.street,
        type: props.addressDetail.type,
        id: props.addressDetail.id,
        nearestlandmark: props.addressDetail?.nearestlandmark,
      });

      setIsVisible(true);

      mapRef.current.animateToRegion(
        {
          ...region,
          latitude: Number(props.addressDetail.lat),
          longitude: Number(props.addressDetail.lng),
          latitudeDelta: 0.00493,
          longitudeDelta: 0.0029,
        },
        1500,
      );
    } else {
      if (Platform.OS == 'android') {
        androidLocationEnabler(
          (success) => {
            checkPermissions((callback) => {
              managePermissionResponse(callback);
            });
          },
          (error) => {
            if (error.code == 'ERR00') {
              errorMessage(error.message);
            } else {
              errorMessage(error.message);
            }
          },
        );
      } else {
        checkPermissions((callback) => {
          managePermissionResponse(callback);
        });
      }
    }
  }, []);

  const managePermissionResponse = (callback) => {
    switch (callback) {
      case RESULTS.GRANTED:
        getCurrentLocationObselete(
          ({latitude, longitude, city, country, address}, language) => {
            setRegion({
              ...region,
              latitudeDelta: 0.00493,
              longitudeDelta: 0.0029,
              latitude: latitude,
              longitude: longitude,
              city: city,
              country: country,
              address: address,
            });

            mapRef.current.animateToRegion(
              {
                ...region,
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.00493,
                longitudeDelta: 0.0029,
              },
              1500,
            );
          },
        );

        break;

      case RESULTS.BLOCKED:
        errorMessage('kindly allow permission from the settings');
        break;

      default:
        console.log('not granted');
        break;
    }
  };

  const onSavePress = (data) => {
    console.log('onSavePress', data);
    if (cartItem.length > 0) {
      setIsVisible(false);
      setTimeout(() => {
        setLocationAlert(true);
      }, 500);
      setAddressSaveData(data);
    } else {
      console.log('cart me item nahi tw else chalraha', data);
      props.saveAddress(
        {data: data, region: region},
        (response) => {
          // console.log('RESPONSE: ', response.data.data);
          // console.log('REGION: ', {region});

          // props.setLocationToGlobalStore(response.data.data);
          setIsVisible(false);
        },
        (fail) => {
          console.log('FAIL:', fail);
        },
      );
    }
  };

  const fetchBranch = () => {
    return getBranchForDelivery({
      lat: region.latitude,
      lng: region.longitude,
      distance: '1000',
    }).then((response) => {
      //name should be setUserSelectedBranch // its for delivery
      const data = response.data.data;
      if (data.length > 0) {
        dispatchAction(setPickupBranch(data[0]));
        return true;
      } else {
        errorMessage('Currently We do not operate in your area');
        return false;
      }
    });
  };

  const onRegionChange = (regionData) => {
    getPlaceName(
      {
        latitude: regionData.latitude,
        longitude: regionData.longitude,
      },
      language,
    )
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        var city = '';
        var country = '';

        // console.log('resukt', response.results);
        if (response.results.length > 0) {
          //getting city and coutry from array response
          response?.results[0]?.address_components?.map((val) => {
            if (val.types.includes('locality')) {
              city = val.long_name;
            }
            if (val.types.includes('country')) {
              country = val.long_name;
            }
          });
        }

        setRegion({
          ...region,
          latitude: regionData.latitude,
          longitude: regionData.longitude,
          latitudeDelta: regionData.latitudeDelta
            ? regionData.latitudeDelta
            : 0.015,
          longitudeDelta: regionData.longitudeDelta
            ? regionData.longitudeDelta
            : 0.0121,
          city: city,
          country: country,
          address: response.results[0]?.formatted_address,
        });

        if (regionData.animateMarker) {
          mapRef.current.animateToRegion(
            {
              ...region,
              latitude: regionData.latitude,
              longitude: regionData.longitude,
            },
            1500,
          );
        }
      })
      .catch((err) => console.log(err, 'error in get current location api'));
  };

  return (
    <RootView bottom={0}>
      <LocationChangeAlert
        isVisible={locationAlert}
        toggleVisible={() => {
          setLocationAlert(!locationAlert);
        }}
        onPress={() => {
          // this is to check if the user has pressed save button to save address
          if (
            buttonTypePressed == 'saveAndSelect' ||
            props?.addressDetail?.id
          ) {
            console.log('saveAndSelect IF CONDITION');
            props.saveAddress(
              {data: addressSaveData, region: region},
              (success) => {
                // console.log({success: success.data.data});

                //add address me api me sethorha global store
                // props.setLocationToGlobalStore(success.data.data);
                setIsVisible(false);
                setLocationAlert(!locationAlert);
              },
              (fail) => {},
            );
          }
          //  if not than user has tapped select button
          else {
            console.log('saveAndSelect ELSE CONDITION');
            props.setLocationToGlobalStore(region);
            setLocationAlert(!locationAlert);
          }
        }}
      />

      <Header title={t('select')}></Header>

      <EditAddress
        onSavePress={onSavePress}
        closeModal={() => {
          setIsVisible(false);
        }}
        isEditAddressLoading={props.isEditAddressLoading}
        isVisible={isVisible}
        data={region}></EditAddress>

      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          ref={mapRef}
          onRegionChangeComplete={onRegionChange}
          initialRegion={region}
        />

        <View style={styles.markerFixed}>
          <CurrentLocationMarkerSVG
            fillColor={colors.primaryBtnBackcolor}
            width={metrics.width * 0.12}
            height={metrics.width * 0.12}
          />
          {/* <FastImage
            style={{
              width: metrics.width * 0.12,
              height: metrics.width * 0.12,
            }}
            source={ImageConst.cpin}
          /> */}
        </View>

        <View
          style={{
            width: '92%',
          }}>
          <SearchBar
            showLocationPointer
            disable
            onPress={() => {
              Navigator.navigate(ScreenConst.searchPlacess, {
                prevScreen: ScreenConst.selectAddress,
              });
              // Navigator.navigate(ScreenConst.searchPlacess, {
              //   address: region.address,
              //   // this is to get data from the screenand set it to the state while poping
              //   getback: onRegionChange,
              // });
            }}
            value={region.address}
            onRightIconPress={() => {
              if (Platform.OS == 'android') {
                androidLocationEnabler(
                  (success) => {
                    checkPermissions((callback) => {
                      managePermissionResponse(callback);
                    });
                  },
                  (error) => {
                    if (error.code == 'ERR00') {
                      errorMessage(error.message);
                    } else {
                      errorMessage(error.message);
                    }
                  },
                );
              } else {
                checkPermissions((callback) => {
                  managePermissionResponse(callback);
                });
              }
            }}></SearchBar>
        </View>

        <View style={styles.selectAddress}>
          <Button
            disabled={false}
            text={t('select')}
            onPress={() => {
              fetchBranch().then((gotBranch) => {
                if (gotBranch) {
                  if (cartItem.length > 0) {
                    setButtonTypePressed('select');
                    setLocationAlert(true);
                  } else {
                    props.setLocationToGlobalStore(region);
                  }
                }
              });
            }}
          />
          {props.isLoggedIn && (
            <Button
              text={t('save')}
              onPress={() => {
                fetchBranch().then((gotBranch) => {
                  if (gotBranch) {
                    setIsVisible(true);
                    setButtonTypePressed('saveAndSelect');
                  }
                });
              }}
            />
          )}
        </View>
      </View>
    </RootView>
  );
}

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    // justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  selectAddress: {
    position: 'absolute',
    bottom: metrics.height * 0.04,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },

  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%',
  },
  marker: {
    height: 48,
    width: 48,
  },
});
