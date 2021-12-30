import React, { useEffect, useState } from 'react';
import { LayoutAnimation, StyleSheet, Text, View } from 'react-native';
import ThemeOneAllProducts from './ThemeOneAllProducts';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../../services/Product';

import { getPromotionsProducts } from '../../../services/Discount';

import { debounce } from '../../../utils/Helpers';

const getProductsCallBack = (keyword = '', parent_id, sub_cat_id, cb) => {
  getProducts({
    parent_id: parent_id,
    sub_cat_id: sub_cat_id,
    search_keyword: keyword,
    page: 1,
  })
    .then((response) => {
      if (response.status == 200) {
        cb(response.data.data);
      }
    })
    .catch((error) => {
      cb(error);
    });
};

// to add delay function as we are calling search filter
const DebouncedSearchAPICall = debounce(getProductsCallBack, 700);

const delayCall = debounce((callback) => {
  callback();
}, 700);

export default function index(props) {
  const [categoryFilters, setCategoryFilters] = useState({
    parent_id: [],
    sub_cat_id: [],
  });

  const themeNumber = useSelector((state) => state.themeReducer.themeNumber);

  const categories = useSelector((state) => state.productsReducer.categories);

  const [products, setproducts] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMore, setloadingMore] = useState(false);
  const [totalPages, settotalPages] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [pageNo, setpageNo] = useState(1);
  useEffect(() => {
    validateData()
  }, [pageNo]);

  useEffect(() => {
    setpageNo(1);
    delayCall(() => {
      validateData()
    });
  }, [searchText]);

  const [paginationLoader, setpaginationLoader] = useState(false);

  const validateData = () => {
    if (pageNo <= totalPages) {
      const parent_id = categories.reduce((op, { id, isMainSelected }) => {
        if (isMainSelected) op.push(id);
        return op;
      }, []);

      let sub_cat_id = [];

      categories.map((v, i) => {
        v.sub_filter.reduce((op, { id, isSelected }) => {
          if (isSelected) sub_cat_id.push(id);
        }, []);
      });

      setCategoryFilters({
        sub_cat_id,
        parent_id,
      });

      // thats for sub category and category if the user is navigation from category/subcategory other wise use filtered sub category
      let subCategoryID = [];
      if (
        props?.route?.params != null &&
        props?.route?.params?.category?.id != null
      ) {
        subCategoryID = [props?.route?.params?.category?.id];
      } else {
        subCategoryID = sub_cat_id;
      }
      props?.route?.params?.discountId != null ? getAllPromotionsProduct(props?.route?.params?.discountId, searchText, pageNo) : getAllProdcutsFiltered(subCategoryID, parent_id);
    } else {
      console.log(
        'current page is greater than total pages so not calling api',
      );
      console.log({ totalPages, pageNo });
    }

  }

  const getAllProdcutsFiltered = (sub_cat_id, parent_id) => {
    setpaginationLoader(true);
    getProducts({
      parent_id: parent_id,
      sub_cat_id: [...sub_cat_id, ...parent_id],
      search_keyword: searchText,
      page: pageNo,
    })
      .then((response) => {
        settotalPages(response.data.total_pages);
        if (pageNo === 1) {
          setproducts(response.data.data);
        } else {
          setproducts([...products, ...response.data.data]);
        }
        // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setpaginationLoader(false);
      })
      .catch((error) => {
        console.log('ERROR:', error);
        setIsLoading(false);
      });
  };

  const getAllPromotionsProduct = (discountId, searchKeyword, pageNo) => {
    setpaginationLoader(true);
    getPromotionsProducts({
      discount_id: discountId,
      search_keyword: searchKeyword,
      page: pageNo,
    })
      .then((response) => {
        settotalPages(response.data.total_pages);
        if (pageNo === 1) {
          setproducts(response.data.data);
        } else {
          setproducts([...products, ...response.data.data]);
        }
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setpaginationLoader(false);
      })
      .catch((error) => {
        console.log('ERROR:', error);
        setIsLoading(false);
      });
  };

  switch (themeNumber) {
    case 1:
      return (
        <ThemeOneAllProducts
          pageNo={pageNo}
          paginationLoader={paginationLoader}
          setpageNo={setpageNo}
          settotalPages={settotalPages}
          loadingMore={loadingMore}
          products={products}
          isSearching={isSearching}
          isLoading={isLoading}
          searchText={searchText}
          setSearchText={setSearchText}
          totalPages={totalPages}
          {...props}
        />
      );

    default:
      return (
        <ThemeOneAllProducts
          pageNo={pageNo}
          setpageNo={setpageNo}
          settotalPages={settotalPages}
          products={products}
          paginationLoader={paginationLoader}
          loadingMore={loadingMore}
          isSearching={isSearching}
          isLoading={isLoading}
          searchText={searchText}
          setSearchText={setSearchText}
          totalPages={totalPages}
          {...props}
        />
      );
  }
}
