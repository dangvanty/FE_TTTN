import { GET_SERVICE } from '../action/serviceAction';

const initState = [];
const serviceReducer = (state = initState, action) => {
  if (action.type === GET_SERVICE) {
    return action.payload;
  }

  return state;
};

export default serviceReducer;
