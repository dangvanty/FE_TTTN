import { GET_GALLERIES } from '../action/galleriesAction';

const initState = [];
const galleriesReducer = (state = initState, action) => {
  if (action.type === GET_GALLERIES) {
    return action.payload;
  }

  return state;
};

export default galleriesReducer;
