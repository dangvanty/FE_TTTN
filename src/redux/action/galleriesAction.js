import axiosClient from '#/helper/axiosClient';
export const GET_GALLERIES = 'GET_GALLERIES';
const LIMIT_GALLERIES = 9;
export const loadGalleries = () => {
  return (dispatch) => {
    axiosClient
      .get(`/galleries/getGalleryHome?limit=${LIMIT_GALLERIES}`)
      .then((res) => {
        dispatch({
          type: GET_GALLERIES,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
};
