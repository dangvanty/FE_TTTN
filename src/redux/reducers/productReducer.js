import { FETCH_PRODUCTS_SUCCESS } from '../action/productActions';

const initState = {
  products: [],
};

const productReducer = (state = initState, action) => {
  if (action.type === FETCH_PRODUCTS_SUCCESS) {
    return {
      products: action.payload,
    };
  }

  return state;
};

export default productReducer;
