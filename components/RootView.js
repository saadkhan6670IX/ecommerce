import React, {Component} from 'react';
import {View, StatusBar, Platform} from 'react-native';
import {colors} from '../utils/Theme';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';

class RootView extends Component {
  render() {
    const {
      top,
      bottom,
      statusBar = 'white',
      barStyle = 'dark-content',
    } = this.props;
    return (
      <View style={{flex: 1, backgroundColor: statusBar}}>
        <StatusBar backgroundColor={'white'} barStyle={barStyle} />
        <SafeAreaInsetsContext.Consumer>
          {(insets) => (
            <View
              style={{
                flex: 1,
                ...Platform.select({
                  ios: {
                    marginTop: top == 0 ? top : insets.top,
                    paddingBottom: bottom == 0 ? bottom : insets.bottom,
                  },
                }),

                backgroundColor: colors.background,
                ...this.props.style,
              }}>
              {this.props.children}
            </View>
          )}
        </SafeAreaInsetsContext.Consumer>
      </View>
    );
  }
}

export default RootView;
