import axiosClient from '#/helper/axiosClient';

export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';

const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

// fetch products
export const fetchProducts = (type) => {
  return (dispatch) => {
    axiosClient.get(type).then((res) => {
      dispatch(fetchProductsSuccess(res.data.rows));
    });
  };
};
