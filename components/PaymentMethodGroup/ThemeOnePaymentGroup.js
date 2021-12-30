import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {colors, commonstyles, metrics, scaleFont} from '../../utils/Theme';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import CheckboxGroup from '../../../src/components/CheckboxGroup';

export default function ThemeOnePaymentGroup(props) {
  const {data, getSelectedValue} = props;

  const language = useSelector((state) => state.userReducer.language);
  // const [selectedOption, setselectedOption] = useState(data[0]);

  const {t} = useTranslation();

  return (
    <View>
      <View
        style={{
          marginTop: metrics.defaultMargin,
        }}>
        <CheckboxGroup
          titleStyle={{
            ...commonstyles.xsText,
          }}
          hideSubtitle={true}
          hideLines
          hideRightComponent
          title={'Payment Method'}
          // value={selectedOption}
          // getSelectedValue={(val) => {
          //   setselectedOption(val);
          // }}
          items={data}
          language={language}
          {...props}
        />
      </View>
    </View>
  );
}
