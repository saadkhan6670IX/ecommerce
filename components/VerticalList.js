import React from 'react';
import {View, FlatList} from 'react-native';

export default function VerticalList(props) {
  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        {...props}

        style={{height : '100%'}}
      />
    </View>
  );
}
