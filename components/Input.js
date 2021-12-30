import React, {Component} from 'react';
import {View, TextInput, StyleSheet, I18nManager} from 'react-native';
import {colors, fonts, metrics, scaleFont} from '../utils/Theme';
import {Text} from '../components';
import {ColorPropType} from 'react-native';

class InputBox extends Component {
  constructor(props) {
    super(props);
    this.state = {hidePassword: this.props.type === 'password' ? true : false};
  }

  static defaultProps = {
    value: null,
    placeholderColor: colors.placeholder,
    keyboardType: 'default',
    ignoreRTL: false,
  };

  render() {
    return (
      <View>
        {this.props.label ? (
          <Text
            medium
            style={[
              styles.text,
              this.props.textStyle,
              {textAlign: 'left', color: colors.primary},
            ]}>
            {this.props.label}
          </Text>
        ) : (
          <View></View>
        )}
        <View
          style={[
            styles.container,
            this.props.ignoreRTL && {
              flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
            },
            this.props.style,
          ]}>
          {this.props.code && (
            <Text
              regular
              style={[
                styles.code,
                this.props.codeStyle,
                {paddingTop: metrics.width * 0.001},
              ]}>
              {this.props.code}
            </Text>
          )}
          <TextInput
            ref={(component) => (this._textInpdut = component)}
            style={{
              ...styles.input,
              width: this.props.type === 'password' ? '90%' : '100%',
              ...this.props.inputStyle,
              height: '100%',
              // paddingBottom: 0,
              fontFamily: fonts.regular,
              // backgroundColor:'red'
            }}
            value={this.props.value}
            textAlign={
              this.props.ignoreRTL
                ? 'left'
                : I18nManager.isRTL
                ? 'right'
                : 'left'
            }
            placeholder={this.props.placeholder}
            // color={colors.primaryLight}
            // placeholderTextColor={colors.primaryLight}
            secureTextEntry={this.state.hidePassword}
            onChangeText={(t) => {
              this.props.onChangeText(t.trimStart());
            }}
            keyboardType={this.props.keyboardType}
            blurOnSubmit={true}
            multiline={this.props.multiline}
            textAlignVertical={this.props.textAlignVertical || 'center'}
            numberOfLines={this.props.numberOfLines}
            maxLength={this.props.maxNumbers}
            editable={this.props.editable}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
            // {...this.props}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 45,
    marginBottom: 20,
    backgroundColor: colors.inputGreyBg,
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: metrics.width * 0.03,
  },
  code: {
    // paddingHorizontal: metrics.width * 0.01,
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    color : colors.placeHolder
  },

  input: {
    // paddingLeft: 15,
    // paddingRight: 15,
    color: colors.secondary,
    // paddingVertical: 15,
    // textTransform: 'lowercase',
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',

    // backgroundColor: 'red'
  },
  text: {
    fontSize: scaleFont(13),
    // fontFamily: fonts.primary,
    color: colors.primaryLight,
    marginBottom: 10,
  },
  icon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: 8,
    right: 10,
  },
});

export default InputBox;
