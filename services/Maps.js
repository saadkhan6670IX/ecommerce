import {Maps_Places, Maps_Geocoding, Maps_Geolocation} from '../config/Maps';
const BASE_URL = 'https://maps.googleapis.com/maps/api';
import Geolocation from 'react-native-geolocation-service';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {Platform} from 'react-native';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {useSelector} from 'react-redux';
import {errorMessage} from '../utils/Toast';

export const getPlaceName = (cordinates, language = 'en') => {
  return fetch(
    `${BASE_URL}/geocode/json?latlng=${cordinates.latitude},${cordinates.longitude}&key=${Maps_Geocoding}&language=${language}`,
    {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    },
  );
};

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    checkPermissions((result) => {
      switch (result) {
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          Geolocation.getCurrentPosition(
            (position) => {
              console.log('Got  positoon ');
              var {latitude, longitude} = position.coords;
              getPlaceName({latitude, longitude})
                .then((res) => {
                  return res.json();
                })
                .then((response) => {
                  var city = '';
                  var country = '';

                  //getting city and coutry from array response
                  response?.results[0]?.address_components?.map((val) => {
                    if (val.types.includes('locality')) {
                      city = val.long_name;
                    }
                    if (val.types.includes('country')) {
                      country = val.long_name;
                    }
                  });

                  resolve({
                    latitude,
                    longitude,
                    city,
                    country,
                    address: response?.results[0]?.formatted_address,
                  });
                })
                .catch((err) => {
                  console.log(err, 'error in get current location api');
                  reject(err);
                });
            },
            (error) => {
              // See error code charts below.
              reject(error);
              console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );

          break;

        case RESULTS.BLOCKED:
          errorMessage('kindly allow permission from the settings', {
            position: -100,
          });
          reject({message: 'kindly allow permission from the settings'});
          break;

        default:
          console.log('not granted');
          reject({message: 'not granted'});
          break;
      }
    });
  });
};

//this method is using callback appraoch, due to less cannot update map screen
//with promises , therefore not deleting this method

export const getCurrentLocationObselete = (callback, language) => {
  // const language = useSelector((state) => state.userReducer.language);
  Geolocation.getCurrentPosition(
    (position) => {
      var {latitude, longitude} = position.coords;
      getPlaceName({latitude, longitude}, language)
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          var city = '';
          var country = '';
          //getting city and coutry from array response
          response.results[0].address_components.map((val) => {
            if (val.types.includes('locality')) {
              city = val.long_name;
            }
            if (val.types.includes('country')) {
              country = val.long_name;
            }
          });
          callback(
            {
              latitude,
              longitude,
              city,
              country,
              address: response.results[0].formatted_address,
            },
            null,
          );
        })
        .catch((err) => console.log(err, 'error in get current location api'));
    },
    (error) => {
      // See error code charts below.
      console.log(error.code, error.message);
    },
    {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  );
};

export const androidLocationEnabler = (success, fail) => {
  RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
    interval: 10000,
    fastInterval: 5000,
  })
    .then((data) => {
      success(true);
    })
    .catch((err) => {
      if (err.code == 'ERR00') {
        fail({
          code: err.code,
          message: 'GPS is required to get your current location',
        });
      } else {
        fail({code: err.code, message: 'Something went wrong'});
      }
    });
};

export const checkPermissions = (callback) => {
  console.log('Checking Permssion');
  let permissionString;
  if (Platform.OS == 'android') {
    permissionString = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
  } else {
    permissionString = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
  }

  check(permissionString)
    .then((result) => {
      switch (result) {
        case RESULTS.DENIED:
          console.log(
            'The permission has not been requested / is denied but requestable',
          );

          request(permissionString).then((result) => {
            switch (result) {
              case RESULTS.GRANTED:
                callback(RESULTS.GRANTED);
                break;

              case RESULTS.BLOCKED:
                callback(RESULTS.BLOCKED);
                break;

              default:
                console.log('Default case chalra');
                break;
            }
          });

          break;
        case RESULTS.GRANTED:
          callback(RESULTS.GRANTED);
          break;

        case RESULTS.BLOCKED:
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
