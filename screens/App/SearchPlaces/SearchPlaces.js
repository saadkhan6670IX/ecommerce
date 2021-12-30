import React from 'react';
import {StyleSheet, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Maps_Places} from '../../../config/Maps';
import {commonStyles, metrics} from '../../../utils/Theme';
import StringConst from '../../../constants/StringConst';
import {
  RootView,
  Header,
} from '../../../components';
import {useSelector} from 'react-redux';
import Navigator from '../../../utils/Navigator';
import ScreenConst from '../../../constants/ScreenConst';

export default function SearchPlaces(props) {
  const language = useSelector((state) => state.userReducer.language);
  const prevScreen = props?.route?.params?.prevScreen;

  return (
    <RootView>
      <Header title={'Search Address'} />
      <View
        style={{
          width: '92%',
          alignSelf: 'center',
          marginTop: metrics.height * 0.02,
          flex: 1,
        }}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          fetchDetails
          onPress={(data, details = null) => {
            // console.log({data});
            // console.log({details});
            const {lat, lng} = details.geometry.location;
            // props.route.params.getback({
            //   latitude: lat,
            //   longitude: lng,
            //   animateMarker: true,
            // });
            // props.navigation.goBack();
            if (prevScreen === ScreenConst.selectBranch) {
              Navigator.navigate(ScreenConst.selectBranch, {
                latitude: lat,
                longitude: lng,
                searchTitle: data.description,
              });
            } else {
              Navigator.navigate(ScreenConst.selectAddress, {
                latitude: lat,
                longitude: lng,
                searchTitle: data.description,
              });
            }
          }}
          enablePoweredByContainer={false}
          query={{
            key: Maps_Places,
            language: language,
          }}
        />
      </View>
    </RootView>
  );
}

const styles = StyleSheet.create({
  // containerView: {commonStyles.},
});
