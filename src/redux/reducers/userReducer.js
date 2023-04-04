import { GET_USER_LOGIN } from '../action/userActions';

const initState = {};
const userReducer = (state = initState, action) => {
  if (action.type === GET_USER_LOGIN) {
    return action.payload;
  }

  return state;
};

export default userReducer;
