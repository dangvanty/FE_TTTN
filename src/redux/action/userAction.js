import axiosClient from '#/helper/axiosClient';
export const GET_USER_LOGIN = 'GET_USER_LOGIN';

export const loadUser = () => {
  return (dispatch) => {
    axiosClient
      .get(`/user/me`)
      .then((res) => {
        dispatch({
          type: GET_USER_LOGIN,
          payload: res,
        });
      })
      .catch((err) => console.log(err));
  };
};
