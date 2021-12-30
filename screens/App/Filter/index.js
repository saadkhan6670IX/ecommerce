import React from 'react';
import ThemeOneFilter from './ThemeOneFilter';
import ThemeTwoFilter from './ThemeTwoFilter';

import {useDispatch, useSelector} from 'react-redux';

import {getAllCategory} from '../../../store/Products/action';
import Navigator from '../../../utils/Navigator';
import ScreenConst from '../../../constants/ScreenConst';
import {errorMessage} from '../../../utils/Toast';

export default function index() {
  //api calling, any functionalit related to home page
  const themeNumber = useSelector((state) => state.themeReducer.themeNumber);

  const categories = useSelector((state) => state.productsReducer.categories);

  const language = useSelector((state) => state.userReducer.language);

  const dispatch = useDispatch();

  const applyFilter = (filteredArray) => {
    console.log('FILTERED ARRAY:', filteredArray);

    let selectedFilteredTitleArray = [];

    filteredArray.map((filteredObj, index) => {
      if (filteredObj?.sub_filter.length > 0) {
        filteredObj.sub_filter.map((sub_filterObj, index) => {
          if (sub_filterObj.isSelected) {
            selectedFilteredTitleArray.push(sub_filterObj.name[language]);
          }
        });
      } else if (filteredObj.isMainSelected) {
        selectedFilteredTitleArray.push(filteredObj.name[language]);
      }
    });

    console.log('FILTERED SELECTED TITLE ARRAY', selectedFilteredTitleArray);
    if (selectedFilteredTitleArray.length > 0) {
      Navigator.navigate(ScreenConst.allProducts, {
        Selected_Array: selectedFilteredTitleArray,
      });
    } else {
      errorMessage('Please Select Atleast One Filter');
    }
  };

  switch (themeNumber) {
    case 1:
      return (
        <ThemeOneFilter
          applyFilter={applyFilter}
          categories={categories}
          language={language}></ThemeOneFilter>
      );
    case 2:
      return <ThemeTwoFilter></ThemeTwoFilter>;
    default:
      return <ThemeOneFilter></ThemeOneFilter>;
  }
}
