export const ADD_TO_CART = 'ADD_TO_CART';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const DELETE_FROM_CART = 'DELETE_FROM_CART';
export const DELETE_ALL_FROM_CART = 'DELETE_ALL_FROM_CART';

//add to cart
export const addToCart = (item, addToast, quantityCount, selectedProductColor, selectedProductSize) => {
  return (dispatch) => {
    if (addToast) {
      addToast('Đã thêm vào giỏ hàng!', { appearance: 'success', autoDismiss: true });
    }
    dispatch({
      type: ADD_TO_CART,
      payload: {
        ...item,
        stock: quantityCount,
        selectedProductColor: selectedProductColor
          ? selectedProductColor
          : item.selectedProductColor
          ? item.selectedProductColor
          : null,
        selectedProductSize: selectedProductSize
          ? selectedProductSize
          : item?.selectedProductSize
          ? item?.selectedProductSize
          : null,
      },
    });
  };
};
//decrement from cart
export const decrementQty = (item, addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast('Giảm số lượng thành công!', {
        appearance: 'warning',
        autoDismiss: true,
      });
    }
    dispatch({ type: DECREASE_QUANTITY, payload: item });
  };
};
//remove from cart
export const removeFromCart = (item, addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast('Đã xóa khỏi giỏ hàng thành công!', { appearance: 'error', autoDismiss: true });
    }
    dispatch({ type: DELETE_FROM_CART, payload: item });
  };
};
//remove all from cart
export const removeAllFromCart = (addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast('Đã xóa tất cả khỏi giỏ hàng!', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
    dispatch({ type: DELETE_ALL_FROM_CART });
  };
};

// get stock of cart item
export const cartItemStock = (item, color, size) => {
  if (item.quantity) {
    return item.quantity;
  } else {
    return item?.variation
      .filter((single) => single?.color === color)[0]
      ?.size.filter((single) => single?.name === size)[0].quantity;
  }
};
