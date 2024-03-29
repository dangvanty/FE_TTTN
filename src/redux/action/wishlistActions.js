export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const DELETE_FROM_WISHLIST = 'DELETE_FROM_WISHLIST';
export const DELETE_ALL_FROM_WISHLIST = 'DELETE_ALL_FROM_WISHLIST';

// add to wishlist
export const addToWishlist = (item, addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast('Đã thêm vào yêu thích!', {
        appearance: 'success',
        autoDismiss: true,
      });
    }
    dispatch({ type: ADD_TO_WISHLIST, payload: item });
  };
};

// remove from wishlist
export const removeFromWishlist = (item, addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast('Đã xóa khỏi yêu thích!', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
    dispatch({ type: DELETE_FROM_WISHLIST, payload: item });
  };
};

//remove all from wishlist
export const removeAllFromWishlist = (addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast('Đã xóa tất cả khỏi yêu thích', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
    dispatch({ type: DELETE_ALL_FROM_WISHLIST });
  };
};
