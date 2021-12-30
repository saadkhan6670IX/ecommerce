import React, {Component} from 'react';
import {FlatList} from 'react-native';
import {metrics} from '../utils/Theme';
// USAGE

/* <HorizontalList
          data={[{name: 'hassan'}, {name: 'jaff'}, {name: 'sad'}]}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  width: 200,
                  height: 200,
                  backgroundColor: 'white',
                  marginRight: 20,
                }}>
                <Text>{item.name}</Text>
              </View>
            );
          }}
        /> */

export default class HorizontalList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      data,
      renderItem,
      style,
      containerStyle,
      horizontal = true,
      ...rest
    } = this.props;
    return (
      <FlatList
        //   bounces={false}
        data={data}
        horizontal={horizontal}
        contentContainerStyle={{
          paddingRight: metrics.defaultMargin,
          paddingVertical: horizontal ? '2%' : 0,
          paddingLeft: horizontal ? 0 : metrics.defaultMargin,
          ...style,
        }}
        keyExtractor={() => Math.random().toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        {...rest}
      />
    );
  }
}
