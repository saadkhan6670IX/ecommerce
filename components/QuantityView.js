import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { metrics, colors, scaleFont } from '../utils/Theme';
import { Text } from '../components'

//props
// onMinus = {()=>}
// onAdd ={()=>{}}
// quantityStyle = {{}}
// iconStyle ={{}}
//
export default function QuantityView(props) {
  return (
    <View style={styles.quantityView}>
      <TouchableOpacity
        activeOpacity={0.7}
        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
        onPress={props.onMinus}
        style={{
          ...styles.iconView(props.iconSize),
          ...props.iconStyle,
        }}>
        <Icon name="remove" style={{ ...styles.icon, color: colors.primaryBtnTextcolor }} />
      </TouchableOpacity>
      <Text medium style={[styles.quantity, props.quantityStyle]}>{props.value}</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
        onPress={props.onAdd}
        style={[styles.iconView(props.iconSize), props.iconStyle]}>
        <Icon name="add" style={{ ...styles.icon, color: colors.primaryBtnTextcolor }} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  quantity: {
    borderWidth: 1,
    paddingHorizontal: metrics.width * 0.04,
    marginHorizontal: 10,
    fontSize: scaleFont(15),
    // fontWeight: '600',
    borderRadius: 5,
    borderWidth: 1,
  },
  quantityView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  iconView: (size = 22) => {
    return {
      width: scaleFont(size),
      height: scaleFont(size),
      borderRadius: scaleFont(size / 2),
      backgroundColor: colors.primaryBtnBackcolor,
      alignItems: 'center',
      justifyContent: 'center',
    };
  },
  icon: {
    fontSize: scaleFont(20),
  },
});
