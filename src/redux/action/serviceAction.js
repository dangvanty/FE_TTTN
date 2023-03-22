import axiosClient from '#/helper/axiosClient';
export const GET_SERVICE = 'GET_SERVICE';
const LIMIT_SERVICE = 6;
export const loadService = () => {
  return (dispatch) => {
    axiosClient
      .get(`/services/getServiceHome?limit=${LIMIT_SERVICE}`)
      .then((res) => {
        dispatch({
          type: GET_SERVICE,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
};
