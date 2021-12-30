import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ThemeOneSubCategories from './ThemeOneSubCategories';
export default function index(props) {
  const subCategories = props.route.params.subCategories;
  const headerTitle = props.route.params.headerTitle;

  return (
    <ThemeOneSubCategories
      headerTitle={headerTitle}
      data={subCategories}
      {...props}></ThemeOneSubCategories>
  );
}

const styles = StyleSheet.create({});
