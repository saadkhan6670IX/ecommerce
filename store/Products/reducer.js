import {GET_ALL_CATEGORY} from './types';

const initialState = {
  categories: [],
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CATEGORY:
      return {
        ...state,
        categories: action.payload,
      };
 

    default:
      return state;
  }
}
