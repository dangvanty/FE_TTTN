import axiosClient from '#/helper/axiosClient';
export const GET_GALLERIES = 'GET_GALLERIES';
const LIMIT_GALLERIES = 9;
export const loadGalleries = () => {
  return (dispatch) => {
    try {
      const { data } = axiosClient.get(`/galleries/getGalleryHome?limit=${LIMIT_GALLERIES}`);

      dispatch({
        type: GET_GALLERIES,
        payload: data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
