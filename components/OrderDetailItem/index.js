import React from 'react';
import ThemeOneOrderDetailItem from './ThemeOneOrderDetailItem';
import {useSelector} from 'react-redux';


export default function index(props) {
  //this file will work as a wrapper around cart's itemcard
  //this will work like controller
  //place all bussiness logic here

  const themeNumber = useSelector((state) => state.themeReducer.themeNumber);
  const language = useSelector((state) => state.userReducer.language);
  // console.log("lan",language)
  
  switch (themeNumber) {
    case 1:
      return (
        <ThemeOneOrderDetailItem
          language={language}
          {...props}></ThemeOneOrderDetailItem>
      );

    default:
      return (
        <ThemeOneOrderDetailItem
          language={language}
          {...props}></ThemeOneOrderDetailItem>
      );
  }
}
