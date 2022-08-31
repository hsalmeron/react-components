import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View
} from 'react-native';

export const Separator = (props) => {
  const {flex, height, width, color, style} = props;
  let colorStyle = color ? { backgroundColor: color } : {}
  if (flex) {
    return <View style={[{flex},colorStyle,  style]}></View>
  } else {
    return <View style={[{height, width},colorStyle, style]}></View>
  }
}

export default Separator

const styles = ({
  separatorContainer:{
      flex:1
  }
})
