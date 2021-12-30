import React, {Component} from 'react';
import {View} from 'react-native';
import {colors, fonts, metrics, scaleFont} from '../utils/Theme';
import {BarIndicator} from 'react-native-indicators';
import Ripple from 'react-native-material-ripple';
import {Text} from '../components';

class SimpleButton extends Component {
  render() {
    return (
      <Ripple
        rippleOpacity={this.props.disabled ? 0 : 0.2}
        disabled={this.props.loading ? this.props.loading : false}
        activeOpacity={this.props.disabled ? 1 : 0.7}
        onPress={() => {
          !this.props.disabled && this.props.onPress && this.props.onPress();
        }}>
        <View
          style={{
            width: '100%',
            height: metrics.height * 0.048,
            minWidth: metrics.width * 0.2,
            paddingHorizontal: metrics.defaultMargin,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            ...this.props.style,
            backgroundColor: this.props.disabled
            ? colors.darkGray
            : this.props.style?.backgroundColor ? this.props.style.backgroundColor : colors.primaryBtnBackcolor,
          }}>
          {this.props.loading ? (
            <BarIndicator
              style={{flex: 0}}
              count={3}
              size={20}
              color={'white'}
            />
          ) : (
            <Text
              medium
              style={{
                color: this.props.textStyle?.color ? this.props.textStyle.color : colors.primaryBtnTextcolor,
                fontSize: scaleFont(14),
                padding: 8,
                // fontWeight: '700',
                textAlign: 'center',
                ...this.props.textStyle,
              }}>
              {this.props.text}
            </Text>
          )}
        </View>
      </Ripple>
    );
  }
}

export default SimpleButton;
