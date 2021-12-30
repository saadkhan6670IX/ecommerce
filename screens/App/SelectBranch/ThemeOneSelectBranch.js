import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {
  RootView,
  Header,
  Button,
  SearchBar,
  FastImage,
} from '../../../components/';
import {colors, metrics} from '../../../utils/Theme';
import ThemeOneBranches from '../../../components/Branches';
import SelectedMarker from '../../../resources/svg/SelectedMarker';
import CurrentLocationMarkerSVG from '../../../resources/svg/CurrentLocation';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {
  getCurrentLocation,
  getPlaceName,
  checkPermissions,
  androidLocationEnabler,
} from '../../../services/Maps';

import {errorMessage} from '../../../utils/Toast';
import {useDispatch, useSelector} from 'react-redux';
import Navigator from '../../../utils/Navigator';
import ScreenConst from '../../../constants/ScreenConst';
import {
  setOrderAddress,
  setPickupBranch,
  setUserSelectedOption,
} from '../../../store/User/action';

import {useTranslation} from 'react-i18next';
import ImageConst from '../../../constants/ImageConst';
import ThemeOneLocationChangeAlert from '../../../components/LocationChangeAlert';

import {getAllBranches} from '../../../services/Branch';
import GeneralConst from '../../../constants/General';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const DEFAULT_LOCATION = {
  latitude: 24.7136,
  longitude: 46.6753,
  distance: 1000,
};

export default function ThemeOneSelectBranch(props) {
  const language = useSelector((state) => state.userReducer.language);
  const flatListRef = useRef(null);
  const mapRef = useRef(null);
  const firstRender = useRef(true);
  const cartItem = useSelector((state) => state.cartReducer.items);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [searchBarTitle, setsearchBarTitle] = useState('Search Location Here');
  const userSelectedBranch = useSelector(
    (state) => state.userReducer.userSelectedBranch,
  );

  const [locationAlert, setLocationAlert] = useState(false);
  const [branches, setbranches] = useState([]);
  const dispatchAction = useDispatch();
  const {t} = useTranslation();

  const [region, setRegion] = useState({
    latitude: 24.7136,
    longitude: 46.6753,
    latitudeDelta: 0.15,
    longitudeDelta: 0.121,
  });

  useEffect(() => {
    if (props.route.params) {
      const {latitude, longitude, searchTitle} = props.route.params;

      setsearchBarTitle(searchTitle);

      animateToRegion({
        ...region, //delta same hona chahye na
        latitude,
        longitude,
      });
    }
  }, [props.route.params]);

  const getDistanceInMiles = (latitudeDelta) => (latitudeDelta * 111.045) / 2;

  const animateToRegion = (region) => {
    mapRef.current.animateToRegion(region);
  };

  const getUserCurrentLocation = () => {
    console.log('GETTING CURRENT LOCAITON');
    getCurrentLocation()
      .then((res) => {
        console.log('GOT  LOCAITON');
        const {address, city, country, latitude, longitude} = res;

        animateToRegion({
          longitude,
          latitude,
          longitudeDelta: region.longitudeDelta,
          latitudeDelta: region.latitudeDelta,
        });
        setsearchBarTitle(address);
        setRegion({
          ...region,
          latitude: latitude,
          longitude: longitude,
        });
      })
      .catch((err) => {
        console.error(err);
        getBranchesByRadius(DEFAULT_LOCATION);
      });
  };

  useEffect(() => {
    getUserCurrentLocation();
  }, []);

  const getBranchesByRadius = (location) => {
    console.log('GETTING BRANCH BY RADIUS LOCAITON');

    const params = {
      lat: location.latitude,
      lng: location.longitude,
      distance: location.distance,
    };

    getAllBranches(params)
      .then((res) => {
        if (res.data.data.length === 0) {
          errorMessage('There are no branches near you');
        }
        setbranches(res.data.data);
      })
      .catch((err) => console.log({err}));
  };

  const onRegionChange = (region) => {
    const {latitude, longitude, latitudeDelta, longitudeDelta} = region;
    console.log('CALLING ON REGION CHANGE');

    getPlaceName({latitude, longitude})
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        setsearchBarTitle(response?.results[0]?.formatted_address);
      })
      .catch((err) => {
        console.log(err, 'error in get current location api');
      });

    if (firstRender.current === false || Platform.OS === 'android') {
      console.log('CALLING api');
      getBranchesByRadius({
        latitude,
        longitude,
        distance: getDistanceInMiles(latitudeDelta),
      });
    }
    firstRender.current = false;
  };

  const onSelectBranch = (branch, index) => {
    console.log({branch, index});
    setSelectedBranch(branch);

    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({index});
    }
    // on branch click move the marker to the branch
    animateToRegion({
      latitude: branch.lat,
      longitude: branch.lng,
      longitudeDelta: region.longitudeDelta,
      latitudeDelta: region.latitudeDelta,
    });

    setRegion({
      ...region,
      latitude: branch.lat,
      longitude: branch.lng,
    });
  };

  const onSelectButtonPress = () => {
    if (selectedBranch) {
      if (
        cartItem.length > 0 &&
        userSelectedBranch.lat != selectedBranch.lat &&
        userSelectedBranch.lng != selectedBranch.lng
      ) {
        setLocationAlert(true);
      } else {
        dispatchAction(setUserSelectedOption(GeneralConst.optionType.Pickup));
        dispatchAction(setPickupBranch(selectedBranch));
        Navigator.navigateAndReset(ScreenConst.home);
      }
    } else {
      errorMessage('Please select branch first.');
    }
  };

  return (
    <RootView>
      <ThemeOneLocationChangeAlert
        isVisible={locationAlert}
        toggleVisible={() => {
          setLocationAlert(!locationAlert);
        }}
        onPress={() => {
          setLocationAlert(!locationAlert);
          dispatchAction(setUserSelectedOption(GeneralConst.optionType.Pickup));
          dispatchAction(setPickupBranch(selectedBranch));
          Navigator.navigateAndReset(ScreenConst.home);
        }}
      />
      <Header title={t('selectBranch')}></Header>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          loadingEnabled={true}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          initialRegion={region}
          onRegionChangeComplete={onRegionChange}>
          {branches.map((branch, index) => (
            <Marker
              key={index}
              coordinate={{latitude: branch.lat, longitude: branch.lng}}
              onPress={() => {
                onSelectBranch(branch, index);
              }}>
              {selectedBranch?.id === branch.id ? (
                <SelectedMarker
                  fillColor={colors.primaryBtnBackcolor}
                  height={metrics.width * 0.12}
                  width={metrics.width * 0.12}
                />
              ) : (
                <SelectedMarker
                  fillColor="#000"
                  height={metrics.width * 0.12}
                  width={metrics.width * 0.12}
                />
              )}

              {/* <FastImage
                style={{
                  width: metrics.width * 0.1,
                  height: metrics.width * 0.1,
                }}
                source={selectedBranch?.id === branch.id
                  ? require('../../../resources/assets/selected_marker.png')
                  : require('../../../resources/assets/marker.png')}
              /> */}
            </Marker>
          ))}
        </MapView>

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
                prevScreen: ScreenConst.selectBranch,
              });
            }}
            value={searchBarTitle}
            onRightIconPress={() => {
              getUserCurrentLocation();
            }}></SearchBar>
        </View>

        <View style={styles.branchesContainer}>
          <FlatList
            ref={flatListRef} // add ref
            keyExtractor={(item, index) => item.id + 'key'}
            horizontal
            data={branches}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              const isBranchSelected = selectedBranch?.id === item.id;
              return (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    onSelectBranch(item, index);
                  }}>
                  <ThemeOneBranches
                    isSelected={isBranchSelected}
                    branch={item}
                  />
                </TouchableOpacity>
              );
            }}
          />
          {branches.length > 0 && (
            <Button
              onPress={onSelectButtonPress}
              style={styles.selectButton}
              text={t('select')}
            />
          )}
        </View>
      </View>
    </RootView>
  );
}

// function ThemeOneSelectBranchdel(props) {
//   const language = useSelector((state) => state.userReducer.language);

//   const flatListRef = useRef(null);
//   const mapRef = useRef(null);
//   const [indexSelected, setindexSelected] = React.useState(null);

//   const [selectedBranch, setSelectedBranch] = useState(null);

//   const [locationAlert, setLocationAlert] = useState(false);

//   const dispatchAction = useDispatch();
//   const selectedBranchSelectorObj = useSelector(
//     (state) => state.userReducer.userSelectedBranch,
//   );

//   const cartItem = useSelector((state) => state.cartReducer.items);

//   useEffect(() => {
//     getBranchesByRadius(DEFAULT_LOCATION);
//   }, []);

//   const getBranchesByRadius = (location) => {
//     const params = {
//       latitude: location.latitude,
//       longitude: location.longitude,
//       distance: location.distance,
//     };
//     getAllBranches(params)
//       .then((res) => {
//         console.log(res.data.data);
//         return setbranches(res.data.data);
//       })
//       .catch((err) => console.log({err}));
//   };

//   // declaring region
//   const [region, setRegion] = React.useState({
//     latitude: 23.8859,
//     longitude: 45.0792,
//     latitudeDelta: 0.015,
//     longitudeDelta: 0.0121,
//     city: '',
//     country: '',
//     address: '',
//   });

//   const [currentLocation, setCurrentLocation] = React.useState({
//     latitude: 0.0,
//     longitude: 0.0,
//   });

//   const [branches, setBranches] = useState([]);

//   const {t} = useTranslation();

//   // checking for permissions for user location
//   useEffect(() => {
//     if (Platform.OS == 'android') {
//       androidLocationEnabler(
//         (success) => {
//           checkPermissions((callback) => {
//             managePermissionResponse(callback);
//           });
//         },
//         (error) => {
//           if (error.code == 'ERR00') {
//             errorMessage(error.message);
//           } else {
//             errorMessage(error.message);
//           }
//         },
//       );
//     } else {
//       // first ask for permission if granted then do the following....
//       checkPermissions((callback) => {
//         managePermissionResponse(callback);
//       });
//     }
//   }, []);

//   useEffect(() => {
//     setBranches(props.branches);

//     // console.log('Selected Branch Obj:', selectedBranchSelectorObj);
//     if (props.branches.length > 0 && selectedBranchSelectorObj) {
//       var selectedBranchIndex = props.branches.findIndex(
//         (v) => v.id == selectedBranchSelectorObj.id,
//       );

//       console.log('Selected Branch Index:', selectedBranchIndex);

//       props.branches[selectedBranchIndex].isSelected = true;

//       if (selectedBranchIndex >= 0) {
//         if (branches.length > 0) {
//           onSelectBranchItem(selectedBranchIndex);
//         }
//       }
//     }
//   }, [props.branches]);

//   const onSelectButtonPress = () => {
//     if (selectedBranch) {
//       if (cartItem.length > 0) {
//         setLocationAlert(true);
//       } else {
//         dispatchAction(setPickupBranch(branches[indexSelected]));
//         Navigator.navigateAndReset(ScreenConst.home);
//       }
//     } else {
//       errorMessage('Please select branch first.');
//     }
//   };

//   const managePermissionResponse = (callback) => {
//     switch (callback) {
//       case RESULTS.GRANTED:
//         console.log('The permission is granted');

//         // fetching users current location from service current location
//         getCurrentLocation(
//           ({latitude, longitude, city, country, address}, language) => {
//             // console.log(
//             //   'Lati:' + latitude,
//             //   'Longi:' + longitude,
//             //   'city:' + city,
//             //   'country:' + country,
//             //   'address:' + address,
//             // );

//             setCurrentLocation({
//               latitude: latitude,
//               longitude: longitude,
//             });

//             // first you need to set maps region of then you will animate camera position of google maps
//             setRegion({
//               ...region,
//               latitude: latitude,
//               longitude: longitude,
//               city: city,
//               country: country,
//               address: address,
//             });

//             mapRef.current.animateToRegion(
//               {
//                 ...region,
//                 latitude: latitude,
//                 longitude: longitude,
//               },
//               1500,
//             );
//           },
//         );

//         break;

//       case RESULTS.BLOCKED:
//         errorMessage('kindly allow permission from the settings');
//         break;

//       default:
//         console.log('not granted');
//         break;
//     }
//   };

//   const checkPermissions = (callback) => {
//     let permissionString;
//     if (Platform.OS == 'android') {
//       permissionString = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
//     } else {
//       permissionString = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
//     }

//     check(permissionString)
//       .then((result) => {
//         // console.log('result1', result);
//         switch (result) {
//           case RESULTS.DENIED:
//             console.log(
//               'The permission has not been requested / is denied but requestable',
//             );

//             request(permissionString).then((result) => {
//               // console.log('result', result);
//               switch (result) {
//                 case RESULTS.GRANTED:
//                   console.log('The permission is granted after requesting');

//                   callback(RESULTS.GRANTED);
//                   break;

//                 case RESULTS.BLOCKED:
//                   console.log('The permission is blocked');

//                   callback(RESULTS.BLOCKED);
//                   break;

//                 default:
//                   break;
//               }
//             });

//             break;
//           case RESULTS.GRANTED:
//             console.log('The permission is granted');

//             callback(RESULTS.GRANTED);
//             break;

//           case RESULTS.BLOCKED:
//             console.log('The permission is blocked');

//             callback(RESULTS.BLOCKED);
//             break;

//           default:
//             console.log('something went wrong');

//             break;
//         }
//       })
//       .catch((error) => {
//         console.log('checkPermissions error', error);
//       });
//   };

//   const onSelectBranchItem = (index) => {
//     console.log('INDEX -> :', index);
//     console.log('BRANCHES -> :', branches);
//     console.log('SELECTED BRANCH -> :', branches[index]);
//     // checking atlest first item to selected to false.
//     if (indexSelected) {
//       branches[indexSelected].isSelected = false;
//     } else {
//       branches[0].isSelected = false;
//     }

//     // scrolling to selected index
//     if (flatListRef.current) {
//       flatListRef.current.scrollToIndex({index: index}); // Scroll to day 10
//     }

//     // first holding the previous selcted index into indexSelected then selecting with new index
//     branches[index].isSelected = true;
//     setSelectedBranch(branches[index]);

//     // updating map region then animate map camera.
//     setRegion({
//       ...region,
//       latitude: branches[index].lat,
//       longitude: branches[index].lng,
//     });

//     mapRef.current.animateToRegion(
//       {
//         ...region,
//         latitude: branches[index].lat,
//         longitude: branches[index].lng,
//       },
//       1500,
//     );

//     setindexSelected(index);
//   };

//   const onRegionChange = (regionData) => {
//     getPlaceName(
//       {
//         latitude: regionData.latitude,
//         longitude: regionData.longitude,
//       },
//       language,
//     )
//       .then((res) => {
//         return res.json();
//       })
//       .then((response) => {
//         // console.log('response', response);

//         var city = '';
//         var country = '';

//         if (response.results.length > 0) {
//           //getting city and coutry from array response
//           response.results[0].address_components.map((val) => {
//             if (val.types.includes('locality')) {
//               city = val.long_name;
//             }
//             if (val.types.includes('country')) {
//               country = val.long_name;
//             }
//           });
//         }

//         setRegion({
//           ...region,
//           latitude: regionData.latitude,
//           longitude: regionData.longitude,
//           latitudeDelta: regionData.latitudeDelta
//             ? regionData.latitudeDelta
//             : 0.015,
//           longitudeDelta: regionData.longitudeDelta
//             ? regionData.longitudeDelta
//             : 0.0121,
//           city: city,
//           country: country,
//           address: response.results[0]?.formatted_address,
//         });

//         if (regionData.animateMarker) {
//           mapRef.current.animateToRegion(
//             {
//               ...region,
//               latitude: regionData.latitude,
//               longitude: regionData.longitude,
//             },
//             1500,
//           );
//         }
//       })
//       .catch((err) => console.log(err, 'error in get current location api'));
//   };

//   return (
//     // <View>
//     <RootView bottom={0}>
//       <ThemeOneLocationChangeAlert
//         isVisible={locationAlert}
//         toggleVisible={() => {
//           setLocationAlert(!locationAlert);
//         }}
//         onPress={() => {
//           dispatchAction(setPickupBranch(branches[indexSelected]));
//           Navigator.navigateAndReset(ScreenConst.home);
//           setLocationAlert(!locationAlert);
//         }}
//       />
//       <Header title={t('selectBranch')}></Header>
//       <View style={styles.container}>
//         <MapView
//           ref={mapRef}
//           provider={PROVIDER_GOOGLE} // remove if not using Google Maps
//           style={styles.map}
//           initialRegion={region}
//           onRegionChangeComplete={onRegionChange}>
//           {branches.map((marker, index) => (
//             <Marker
//               key={index}
//               coordinate={{latitude: marker.lat, longitude: marker.lng}}
//               // title={marker.title}
//               // description={marker.description}
//               image={
//                 marker.isSelected == true
//                   ? require('../../../resources/assets/selected_marker.png')
//                   : require('../../../resources/assets/marker.png')
//               }
//               onPress={() => {
//                 onSelectBranchItem(index);
//               }}
//             />
//           ))}
//         </MapView>

//         <View style={styles.markerFixed}>
//           <FastImage
//             style={{
//               width: metrics.width * 0.12,
//               height: metrics.width * 0.12,
//             }}
//             source={ImageConst.cpin}
//           />
//         </View>

//         <View
//           style={{
//             width: '92%',
//           }}>
//           <SearchBar
//             showLocationPointer
//             disable
//             onPress={() => {
//               Navigator.navigate(ScreenConst.searchPlacess, {
//                 address: region.address,
//                 // this is to get data from the screenand set it to the state while poping
//                 getback: onRegionChange,
//               });
//             }}
//             value={region.address}
//             onRightIconPress={() => {
//               if (Platform.OS == 'android') {
//                 androidLocationEnabler(
//                   (success) => {
//                     checkPermissions((callback) => {
//                       managePermissionResponse(callback);
//                     });
//                   },
//                   (error) => {
//                     if (error.code == 'ERR00') {
//                       errorMessage(error.message);
//                     } else {
//                       errorMessage(error.message);
//                     }
//                   },
//                 );
//               } else {
//                 checkPermissions((callback) => {
//                   managePermissionResponse(callback);
//                 });
//               }
//             }}></SearchBar>
//         </View>

//         <View style={styles.branchesContainer}>
//           <FlatList
//             ref={flatListRef} // add ref
//             // just to add unique number
//             keyExtractor={(item, index) => index}
//             horizontal
//             data={branches}
//             // viewabilityConfig={viewConfigRef.current}
//             showsHorizontalScrollIndicator={false}
//             renderItem={({item, index}) => {
//               return (
//                 <TouchableOpacity
//                   onPress={() => {
//                     onSelectBranchItem(index);
//                   }}>
//                   <ThemeOneBranches
//                     selectedBranchSelectorObj={selectedBranchSelectorObj}
//                     branch={item}
//                   />
//                 </TouchableOpacity>
//               );
//             }}
//           />
//           {branches != null && branches.length > 0 && (
//             <Button
//               onPress={onSelectButtonPress}
//               style={styles.selectButton}
//               text={t('select')}
//             />
//           )}
//         </View>
//       </View>
//     </RootView>
//     // </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  selectButton: {
    width: metrics.width / 2,
    alignSelf: 'center',
    marginVertical: metrics.smallMargin,
  },
  branchesContainer: {
    position: 'absolute',
    bottom: metrics.defaultMargin,
    marginStart: metrics.defaultMargin,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  selectAddress: {
    position: 'absolute',
    bottom: metrics.height * 0.04,
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -50,
    position: 'absolute',
    top: '50%',
  },
});
