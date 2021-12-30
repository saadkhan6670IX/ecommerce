import React, { useState, useEffect, useCallback } from 'react';
import ThemeOneHome from './ThemeOneHome';
import ThemeTwoHome from './ThemeTwoHome';

import { useSelector, useDispatch } from 'react-redux';
import {
  getProducts,
  getCateogries,
} from '../../../services/Product';

import {
  getPromotion,
  getCombos
} from '../../../services/Discount';
import { removeValue } from '../../../utils/AsyncStorage';

import { getAllCategory } from '../../../store/Products/action';

export default function index() {
  //api calling, any functionalit related to home page
  const themeNumber = useSelector((state) => state.themeReducer.themeNumber);
  const [categories, setcategories] = useState([]);
  const [products, setproducts] = useState(null);
  const [promotions, setpromotions] = useState([]);
  const [combos, setCombos] = useState([]);
  const [combosLoader, setCombosLoader] = useState([])
  const [loader, setloader] = useState(true);
  const [promotionLoader, setPromotionLoader] = useState()
  const language = useSelector((state) => state.userReducer.language);

  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    await setRefreshing(true);
    setloader(true);
    await getHomeCategories();
    await getHomeProducts();
    await getHomeCombos()
    await getHomePromotions()
    await setRefreshing(false);
  }, []);

  useEffect(() => {
    removeValue('languageChangeLocation');
  }, []);

  const getHomeCombos = () => {
    getCombos().then((response) => {
      setCombos(response.data.data);
      setCombosLoader(false)
      return response.data.data
    }).catch(() => {
      setCombosLoader(false)
    });
  };
  

  const getHomePromotions = () => {
    getPromotion().then((response) => {
            // filtering data to only when we have image...

      let promotions = response?.data?.data.filter((item) => (item?.image != null && item?.image[language] != null && item?.image[language] !== '' )) 
      setpromotions(promotions);
      setPromotionLoader(false)
      return promotions
    }).catch(() => {
      setPromotionLoader(false)
    });
  };

  const getHomeProducts = () => {
    return getProducts({
      parent_id: [],
      sub_cat_id: [],
      search_keyword: '',
      page: 1,
    }).then((response) => {
      setproducts(response.data.data);
      setloader(false);
      return response.data.data;
    });
  };

  const getHomeCategories = () => {
    return getCateogries({
      parent_id: [],
    }).then((response) => {
      setcategories(response.data.data);
      dispatch(getAllCategory(response.data.data));
      setloader(false);
      return response.data.data;
    });
  };

  useEffect(() => {
    getHomeCategories();
  }, []);

  useEffect(() => {
    getHomeProducts();
  }, []);

  useEffect(() => {
    getHomePromotions()
  }, []);

  useEffect(() => {
    getHomeCombos()
  }, []);

  switch (themeNumber) {
    case 1:
      return (
        <ThemeOneHome
          onRefresh={onRefresh}
          refreshing={refreshing}
          categories={categories}
          products={products}
          loader={loader}
          promotions={promotions}
          combos = {combos}></ThemeOneHome>
      );
    case 2:
      return (
        <ThemeTwoHome
          onRefresh={onRefresh}
          refreshing={refreshing}
          categories={categories}
          products={products}
          loader={loader}
          promotions={promotions}
          combos = {combos}></ThemeTwoHome>
      );
    default:
      return (
        <ThemeOneHome
          onRefresh={onRefresh}
          refreshing={refreshing}
          categories={categories}
          products={products}
          promotions={promotions}
          combos = {combos}></ThemeOneHome>
      );
  }
}
