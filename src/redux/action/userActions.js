import axiosClient from '#/helper/axiosClient';
export const GET_USER_LOGIN = 'GET_USER_LOGIN';

// export const loadUser = () => {
//   return (dispatch) => {
//     axiosClient
//       .get(`/users/me`)
//       .then((res) => {
//         dispatch({
//           type: GET_USER_LOGIN,
//           payload: res.user,
//         });
//       })
//       .catch((err) => console.log(err));
//   };
// };

export const loadUser = () => async (dispatch) => {
  try {
    const user = await axiosClient.get(`/users/me`);

    dispatch({
      type: GET_USER_LOGIN,
      payload: user,
    });
  } catch (error) {
    // dispatch({
    //     type: LOAD_USER_FAIL,
    //     payload: error.response.data.message });
    console.log(error);
  }
};
