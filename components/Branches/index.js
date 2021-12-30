import React from 'react';
import Branch from './ThemeOneBranches';
import { useDispatch, useSelector } from 'react-redux';


export default function index(props) {
  const themeNumber = useSelector((state) => state.themeReducer.themeNumber);
  const language = useSelector((state) => state.userReducer.language);

  switch (themeNumber) {
    case 1:
      return <Branch language={language}
        {...props}></Branch>;

    default:
      return <Branch language={language}
        {...props}></Branch>;
  }
}
