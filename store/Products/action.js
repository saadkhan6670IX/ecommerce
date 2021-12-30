import {
  GET_ALL_CATEGORY,
  GET_SELECTED_FILTER_COUNT
} from './types';

export const getAllCategory = (categories) => {
  return {
    type: GET_ALL_CATEGORY,
    payload: categories,
  };
};

