import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {getCateogries} from '../../../services/Product';
import ThemeOneAllCategories from './ThemeOneAllCategories';

export default function index() {
  const themeNumber = useSelector((state) => state.themeReducer.themeNumber);

  const [allCategories, setallCategories] = useState(null);
  const [loading, setloading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const getAllCategories = () => {
    setloading(true);
    getCateogries().then((response) => {
      setloading(false);
      setRefreshing(false);
      setallCategories(response.data.data);
    });
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const onPullToRefresh = () => {
    setRefreshing(true);
    getAllCategories();
  };

  switch (themeNumber) {
    case 1:
      return (
        <ThemeOneAllCategories
          refreshing={refreshing}
          onPullToRefresh={onPullToRefresh}
          data={allCategories}></ThemeOneAllCategories>
      );

    default:
      return (
        <ThemeOneAllCategories
          onPullToRefresh={onPullToRefresh}
          data={allCategories}></ThemeOneAllCategories>
      );
  }
}
